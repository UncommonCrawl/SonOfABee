import fs from "fs";
import path from "path";
import { execFile as execFileCb } from "child_process";
import { promisify } from "util";

const DEFAULT_HOST = "wordsapiv1.p.rapidapi.com";
const BASE_DELAY_MS = 300;
const MAX_RETRIES = 4;
const REQUEST_TIMEOUT_MS = 10000;
const execFile = promisify(execFileCb);

const envCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), ".env.local"),
  path.resolve(process.cwd(), ".env.development"),
  path.resolve(process.cwd(), ".env.production"),
  path.resolve(process.cwd(), ".env.test")
];

export const loadDotEnv = () => {
  for (const envPath of envCandidates) {
    if (!fs.existsSync(envPath)) continue;
    const raw = fs.readFileSync(envPath, "utf-8");
    raw.split(/\r?\n/g).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const idx = trimmed.indexOf("=");
      if (idx <= 0) return;
      const key = trimmed.slice(0, idx).trim();
      if (!key || process.env[key] !== undefined) return;
      let value = trimmed.slice(idx + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    });
    break;
  }
};

const getWordsApiConfig = () => ({
  host: process.env.WORDS_API_HOST || DEFAULT_HOST,
  key: process.env.WORDS_API_KEY || ""
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const findIpaText = (data, word) => {
  if (!data || typeof data !== "object") return null;
  const pronunciation = data.pronunciation;
  if (!pronunciation) return null;
  const wantsRhotic = Boolean(word && word.includes("R"));
  if (typeof pronunciation === "string") return pronunciation;
  if (typeof pronunciation !== "object") return null;
  const orderedKeys = wantsRhotic ? ["all", "us", "uk"] : ["us", "all", "uk"];
  for (const key of orderedKeys) {
    if (typeof pronunciation[key] === "string") return pronunciation[key];
  }
  const first = Object.values(pronunciation).find((value) => typeof value === "string");
  return first || null;
};

export const fetchIpaForWord = async (word, attempt = 1, options = {}) => {
  const maxRetries = Number.isFinite(options.maxRetries)
    ? Math.max(0, Number(options.maxRetries))
    : MAX_RETRIES;
  loadDotEnv();
  const { host, key } = getWordsApiConfig();
  if (!key) return { ipa: null, errorType: "missing_key" };

  try {
    const url = `https://${host}/words/${encodeURIComponent(word)}/pronunciation`;
    const { stdout } = await execFile(
      "curl",
      [
        "--silent",
        "--show-error",
        "--request",
        "GET",
        "--url",
        url,
        "--header",
        `x-rapidapi-host: ${host}`,
        "--header",
        `x-rapidapi-key: ${key}`,
        "--write-out",
        "\n__HTTP_STATUS__:%{http_code}"
      ],
      { timeout: REQUEST_TIMEOUT_MS, maxBuffer: 1024 * 1024 }
    );

    const marker = "\n__HTTP_STATUS__:";
    const idx = stdout.lastIndexOf(marker);
    if (idx === -1) return { ipa: null, errorType: "fetch" };
    const body = stdout.slice(0, idx);
    const status = Number(stdout.slice(idx + marker.length).trim());
    if (!Number.isFinite(status)) return { ipa: null, errorType: "fetch" };

    if (status === 404) return { ipa: null, errorType: "missing" };
    if (status === 429 && attempt <= maxRetries) {
      await sleep(BASE_DELAY_MS * (attempt + 2));
      return fetchIpaForWord(word, attempt + 1, options);
    }
    if (status >= 500 && attempt <= maxRetries) {
      await sleep(BASE_DELAY_MS * (attempt + 1));
      return fetchIpaForWord(word, attempt + 1, options);
    }
    if (status < 200 || status >= 300) {
      return { ipa: null, errorType: "fetch" };
    }

    let data = null;
    try {
      data = JSON.parse(body);
    } catch {
      return { ipa: null, errorType: "fetch" };
    }
    if (data?.success === false || data?.message === "word not found") {
      return { ipa: null, errorType: "missing" };
    }
    return { ipa: findIpaText(data, word), errorType: null };
  } catch {
    if (attempt <= maxRetries) {
      await sleep(BASE_DELAY_MS * (attempt + 1));
      return fetchIpaForWord(word, attempt + 1, options);
    }
    return { ipa: null, errorType: "fetch" };
  }
};
