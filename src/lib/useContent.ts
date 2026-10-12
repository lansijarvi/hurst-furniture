"use client";
import { useSyncExternalStore } from "react";
import { contentRestUrl, defaultContent, mergeContent, type Content } from "./content";

// One fetch per page view, shared by every component. Pages render the built-in content first
// (so the static HTML is complete), then swap in the latest saved content from Firestore.
let current: Content = defaultContent;
let started = false;
const listeners = new Set<() => void>();

function load() {
  if (started) return;
  started = true;
  fetch(contentRestUrl)
    .then((r) => (r.ok ? r.json() : null))
    .then((doc) => {
      const json = doc?.fields?.json?.stringValue;
      if (!json) return;
      current = mergeContent(JSON.parse(json));
      listeners.forEach((l) => l());
    })
    .catch(() => {});
}

function subscribe(l: () => void) {
  listeners.add(l);
  load();
  return () => listeners.delete(l);
}

export function useContent(): Content {
  return useSyncExternalStore(subscribe, () => current, () => defaultContent);
}
