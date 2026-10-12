// Before publishing: copy the latest content saved in /admin (Firestore site/content) into
// src/content/content.json so it's built into the static pages. Leaves the file alone if nothing is saved yet.
import { readFileSync, writeFileSync } from "node:fs";

const file = new URL("../src/content/content.json", import.meta.url);
const project = JSON.parse(readFileSync(new URL("../.firebaserc", import.meta.url))).projects.default;
const url = `https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents/site/content`;

const isObj = (v) => !!v && typeof v === "object" && !Array.isArray(v);
const local = JSON.parse(readFileSync(file, "utf8"));

const res = await fetch(url).catch(() => null);
if (!res || !res.ok) {
  console.log(`pull-content: no saved content (${res ? res.status : "offline"}), using src/content/content.json`);
  process.exit(0);
}
const json = (await res.json())?.fields?.json?.stringValue;
if (!json) process.exit(0);
const remote = JSON.parse(json);

// Same merge as the site: saved sections win, new fields keep their defaults.
const merged = { ...local };
for (const [k, def] of Object.entries(local)) {
  if (remote[k] === undefined) continue;
  merged[k] = isObj(def) && isObj(remote[k]) ? { ...def, ...remote[k] } : remote[k];
}
writeFileSync(file, JSON.stringify(merged, null, 2) + "\n");
console.log("pull-content: updated src/content/content.json from saved site content");
