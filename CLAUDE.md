# Hurst Concepts website (hurstfurniture.com)

Rebuild of Hurst Custom Furniture's site, replacing a Format.com template site.

## Stack
- Next.js (App Router, TypeScript) with `output: "export"` → static files in `out/`
- Firebase Hosting serves `out/`; redirects for old Format URLs live in `firebase.json`
- Firestore `inquiries` (project form, create-only rules) + Storage `inquiries/{id}/` (photo uploads)
- Cloud Functions (`functions/`): `getReviews` (Google Places API → rating + reviews, cached 1h),
  `notifyInquiry` (writes to `mail` collection for the Trigger Email extension)
- Plain CSS in `src/app/globals.css` (no Tailwind). Font: Inter (headings + body) via next/font.

## Content
- All editable copy/data is in `src/lib/site.ts` (team, projects, FAQ, contact, review links).
- Site copy is Hurst's own. Edit with minimal intervention and keep their voice.

## Look
Light, modern home: warm white `#fbfaf6`, forest green `#2f5d46` (primary buttons), sage `#eef2e8` (tinted sections), sunshine yellow `#f2c94c` / soft `#fcf3d3` (review CTAs). Lean and modern to match the logo: Inter, 4px corners, thin borders instead of shadows, uppercase wordmark. Logo in `/public/logo.png` (also `src/app/icon.png` favicon). `.wood` divs are soft sage photo placeholders.

## Reviews
Reviews are a priority: yellow review band under the hero, reviews section right after facts, "Leave a review" in the nav, and `/review` short link (redirects to Google's write-a-review box; use it on cards/QR codes).

## Wood guide (/woods)
Data in `woods` in `src/lib/site.ts` (Janka lbf, uses, PNW tag). Photos in `/public/woods/` are from Wikimedia Commons;
CC BY / BY-SA ones need their `credit` kept (shown under "Photo credits"). Replace with shop photos when available.

## Open items
- Real photos: hero, projects (`/public/work/`), Jonathan, team headshots
- Placeholders: `[LABOR RATE]`, testimonial `[Client name]`, project titles
- Shop page (old `/store`): decide what's sold, then Stripe Checkout
- Set NEXT_PUBLIC_GOOGLE_PLACE_ID and NEXT_PUBLIC_REVIEWS_URL in `.env.local`
- Consider Google Business Profile API later for the full review list (Places API returns ~5)
