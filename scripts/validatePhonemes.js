import fs from "fs";
const phonemeMapping = JSON.parse(
  fs.readFileSync(new URL("../src/data/phoneme_mapping.json", import.meta.url), "utf-8")
);

const alignmentIssues = [];

for (const [word, phonemes] of Object.entries(phonemeMapping)) {
  if (!Array.isArray(phonemes) || phonemes.length === 0) {
    alignmentIssues.push({ word, issue: "No phonemes" });
    continue;
  }

  for (const entry of phonemes) {
    if (!entry || entry.grapheme === undefined) {
      alignmentIssues.push({ word, issue: "Missing grapheme" });
      continue;
    }
    if (entry.soundId === undefined) {
      alignmentIssues.push({ word, issue: "Missing soundId" });
    }
  }

  const reconstructed = phonemes.map((entry) => entry.grapheme).join("");
  if (reconstructed !== word.toUpperCase()) {
    alignmentIssues.push({ word, issue: `Mismatch: ${reconstructed}` });
  }
}

if (alignmentIssues.length > 0) {
  console.log("Alignment issues:");
  for (const issue of alignmentIssues) {
    console.log(`- ${issue.word}: ${issue.issue}`);
  }
}

if (alignmentIssues.length === 0) {
  console.log("All phoneme tokens mapped and aligned.");
}
