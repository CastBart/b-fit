import fs from "fs";
import path from "path";
import prompts from "prompts";

const releasePath = path.resolve("public/release.json");

// --- Helpers ---
function bumpVersion(version, type = "patch") {
  const parts = version.split(".").map(Number);
  if (type === "major") parts[0]++;
  else if (type === "minor") parts[1]++;
  else parts[2]++;
  if (type === "major") {
    parts[1] = 0;
    parts[2] = 0;
  } else if (type === "minor") {
    parts[2] = 0;
  }
  return parts.join(".");
}

async function run() {
  console.log("🧩 Checking for release update...");

  const { update } = await prompts({
    type: "confirm",
    name: "update",
    message: "Do you want to update release notes?",
    initial: false,
  });

  if (!update) {
    console.log("⚙️ Skipping release update...");
    process.exit(0); // continue with build
  }

  const { type } = await prompts({
    type: "select",
    name: "type",
    message: "Select release type:",
    choices: [
      { title: "Patch (bug fixes, minor tweaks)", value: "patch" },
      { title: "Minor (new features, improvements)", value: "minor" },
      { title: "Major (breaking changes)", value: "major" },
    ],
  });

  const { notes } = await prompts({
    type: "list",
    name: "notes",
    message: "Enter release notes (comma separated):",
    separator: ",",
  });

  if (!fs.existsSync(releasePath)) {
    console.error("❌ No existing public/release.json found!");
    process.exit(1);
  }

  const existing = JSON.parse(fs.readFileSync(releasePath, "utf-8"));
  const newVersion = bumpVersion(existing.version, type);
  const newDate = new Date().toISOString().split("T")[0];

  const updated = {
    version: newVersion,
    date: newDate,
    showInApp: true,
    notes: notes.length ? notes : existing.notes,
  };

  fs.writeFileSync(releasePath, JSON.stringify(updated, null, 2));
  console.log(`✅ Updated release.json → v${newVersion}`);
  console.log("📝 Notes:", updated.notes.join("; "));
}

await run();
