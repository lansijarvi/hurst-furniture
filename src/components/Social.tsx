import { social } from "@/lib/site";

// Facebook + Instagram icon links.
export default function Social() {
  return (
    <div className="social">
      <a href={social.facebook} target="_blank" rel="noopener" aria-label="Hurst on Facebook">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" />
        </svg>
      </a>
      <a href={social.instagram} target="_blank" rel="noopener" aria-label="Hurst on Instagram">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
    </div>
  );
}
