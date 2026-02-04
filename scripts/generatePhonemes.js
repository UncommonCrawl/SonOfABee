import fs from "fs";
import { levelData } from "../src/data/levels.js";

const words = Array.from(
  new Set(
    levelData
      .map((level) => level.word)
      .filter(Boolean)
      .map((word) => word.toUpperCase())
  )
);

const findIpaText = (data) => {
  if (!Array.isArray(data)) return null;
  for (const entry of data) {
    if (entry?.phonetic) return entry.phonetic;
    if (Array.isArray(entry?.phonetics)) {
      const match = entry.phonetics.find((p) => p?.text)?.text;
      if (match) return match;
    }
  }
  return null;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchIpa = async (word, attempt = 1) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    if (data?.title === "No Definitions Found") return null;
    return findIpaText(data);
  } catch (error) {
    if (attempt < 2) {
      await sleep(200);
      return fetchIpa(word, attempt + 1);
    }
    throw error;
  }
};

async function getIPA() {
  let existing = {};
  try {
    existing = JSON.parse(
      fs.readFileSync("./src/data/phoneme_data.json", "utf-8")
    );
  } catch (e) {
    existing = {};
  }
  const mapping = {};
  const failed = [];
  for (const word of words) {
    if (existing[word] && existing[word] !== "ERROR") {
      mapping[word] = existing[word];
      continue;
    }
    try {
      let ipa = await fetchIpa(word);
      await sleep(150);
      if (!ipa) ipa = await fetchIpa(word.toLowerCase());
      if (!ipa) {
        mapping[word] = "ERROR";
        console.log(`⚠️  ${word}: missing IPA`);
        failed.push(word);
      } else {
        mapping[word] = ipa.replace(/\//g, "");
        console.log(`✅ ${word}: ${mapping[word]}`);
      }
    } catch (e) {
      mapping[word] = "ERROR";
      console.log(`❌ ${word}: fetch error`);
      failed.push(word);
    }
  }

  if (failed.length > 0) {
    console.log(`Retrying ${failed.length} words with longer delay...`);
    for (const word of failed) {
      try {
        await sleep(500);
        let ipa = await fetchIpa(word);
        if (!ipa) ipa = await fetchIpa(word.toLowerCase());
        if (!ipa) continue;
        mapping[word] = ipa.replace(/\//g, "");
        console.log(`✅ ${word}: ${mapping[word]} (retry)`);
      } catch (e) {
        console.log(`❌ ${word}: retry failed`);
      }
    }
  }
  fs.writeFileSync(
    "./src/data/phoneme_data.json",
    JSON.stringify(mapping, null, 2)
  );
}

getIPA();
