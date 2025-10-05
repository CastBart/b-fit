import fs from "fs";
import path from "path";

const releasePath = path.resolve("public/release.json");

// Simple semver bump helper
function bumpVersion(version, type = "patch") {
  const parts = version.split(".").map(Number);
  if (type === "major") parts[0]++;
  else if (type === "minor") parts[1]++;
  else parts[2]++;
  parts[1] = type === "major" ? 0 : parts[1];
  parts[2] = type !== "patch" ? 0 : parts[2];
  return parts.join(".");
}

function updateReleaseNotes({
  type = "patch",
  notes = [],
  showInApp = true,
}) {
  if (!fs.existsSync(releasePath)) {
    console.error("❌ No existing release.json found at:", releasePath);
    process.exit(1);
  }

  const existing = JSON.parse(fs.readFileSync(releasePath, "utf-8"));
  const newVersion = bumpVersion(existing.version, type);
  const newDate = new Date().toISOString().split("T")[0];

  const updated = {
    version: newVersion,
    date: newDate,
    showInApp,
    notes: notes.length > 0 ? notes : existing.notes,
  };

  fs.writeFileSync(releasePath, JSON.stringify(updated, null, 2));
  console.log(`✅ Updated release.json → v${newVersion}`);
  console.log("Notes:", updated.notes.join("; "));
}

// --- CLI arguments ---
const args = process.argv.slice(2);
const type = args[0] || "patch"; // e.g. node scripts/update-release.js minor
const noteArgs = args.slice(1);
const notes = noteArgs.length ? noteArgs : ["General improvements and fixes"];

updateReleaseNotes({ type, notes });
