import defaults from "@/content/content.json";

// All editable copy, lists and image URLs. Edited at /admin (saved to Firestore `site/content`).
// src/content/content.json is the built-in copy: `npm run share` refreshes it from Firestore before building,
// and the live site also fetches the latest saved content on load, so edits show up right away.
export type Content = typeof defaults;
export type Wood = Content["woods"]["items"][number];
export const defaultContent = defaults as Content;

export const CONTENT_DOC = "site/content";
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "hurst-furniture";
export const contentRestUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${CONTENT_DOC}`;

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

// Saved content wins, section by section; sections or fields it doesn't have yet come from the defaults.
export function mergeContent(remote: unknown): Content {
  if (!isObj(remote)) return defaultContent;
  const out: Record<string, unknown> = { ...defaultContent };
  for (const [k, def] of Object.entries(defaultContent)) {
    const r = remote[k];
    if (r === undefined) continue;
    out[k] = isObj(def) && isObj(r) ? { ...def, ...r } : r;
  }
  return out as Content;
}
