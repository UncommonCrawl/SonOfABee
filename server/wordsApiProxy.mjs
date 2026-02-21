import http from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ENV_FILE = resolve(process.cwd(), ".env");

const loadDotEnv = () => {
  if (!existsSync(ENV_FILE)) return;
  const raw = readFileSync(ENV_FILE, "utf8");
  raw.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex <= 0) return;
    const key = trimmed.slice(0, eqIndex).trim();
    if (!key || process.env[key] !== undefined) return;
    let value = trimmed.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  });
};

loadDotEnv();

const PORT = Number(process.env.WORDS_API_PROXY_PORT || 8787);
const WORDS_API_HOST = process.env.WORDS_API_HOST || "wordsapiv1.p.rapidapi.com";
const WORDS_API_KEY = process.env.WORDS_API_KEY || "";

const sendJson = (res, status, body) => {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(body));
};

const getWordFromUrl = (url) => {
  const word = url.searchParams.get("word");
  if (!word) return null;
  return word.trim();
};

const server = http.createServer(async (req, res) => {
  if (!req.url || req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/health") {
    sendJson(res, 200, { ok: true, hasWordsApiKey: Boolean(WORDS_API_KEY) });
    return;
  }

  if (url.pathname !== "/api/words") {
    sendJson(res, 404, { error: "Not found" });
    return;
  }

  if (!WORDS_API_KEY) {
    sendJson(res, 500, {
      error: "WORDS_API_KEY is not set. Add it to your local .env file."
    });
    return;
  }

  const word = getWordFromUrl(url);
  if (!word) {
    sendJson(res, 400, { error: "Missing query parameter: word" });
    return;
  }

  const upstreamUrl = `https://${WORDS_API_HOST}/words/${encodeURIComponent(word)}`;

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        "x-rapidapi-host": WORDS_API_HOST,
        "x-rapidapi-key": WORDS_API_KEY
      }
    });
    const text = await upstreamResponse.text();
    let payload;
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { raw: text };
    }
    sendJson(res, upstreamResponse.status, payload);
  } catch (error) {
    sendJson(res, 502, {
      error: "Failed to reach WordsAPI",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
});

server.listen(PORT, () => {
  console.log(`WordsAPI proxy listening on http://localhost:${PORT}`);
});
