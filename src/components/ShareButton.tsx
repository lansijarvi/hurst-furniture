"use client";
import { useState } from "react";

// Uses the phone's share sheet when available, otherwise copies the link.
export default function ShareButton({ className = "btn btn-outline" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  async function share() {
    const url = window.location.origin;
    if (navigator.share) {
      try { await navigator.share({ title: "Hurst Concepts", text: "Custom furniture and millwork in Ballard", url }); } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }
  return (
    <button type="button" className={className} onClick={share}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3v13M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
      </svg>
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
