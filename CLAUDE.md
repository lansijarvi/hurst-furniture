# Hurst Concepts website (hurstfurniture.com)

Rebuild of Hurst Custom Furniture's site, replacing a Format.com template site.

## Stack
- Next.js (App Router, TypeScript) with `output: "export"` → static files in `out/`
- Firebase Hosting serves `out/`; redirects for old Format URLs live in `firebase.json`
- Firestore `inquiries` (project form, create-only rules) + Storage `inquiries/{id}/` (photo uploads)
- Cloud Functions (`functions/`): `getReviews` (Google Places API → rating + reviews, cached 1h),
  `notifyInquiry` (writes to `mail` collection for the Trigger Email extension)
- Plain CSS in `src/app/globals.css` (no Tailwind). Fonts: Barlow + Barlow Condensed via next/font.

## Content
- All editable copy/data is in `src/lib/site.ts` (team, projects, FAQ, contact, review links).
- Site copy is Hurst's own. Edit with minimal intervention and keep their voice.

## Look
PNW woodshop: fir green `#1c2a23`, paper `#eeebe5`, cedar `#9e4423`. Wood-grain `.wood` divs are photo placeholders.

## Open items
- Real photos: hero, projects (`/public/work/`), Jonathan, team headshots
- Placeholders: `[LABOR RATE]`, testimonial `[Client name]`, project titles
- Shop page (old `/store`): decide what's sold, then Stripe Checkout
- Set NEXT_PUBLIC_GOOGLE_PLACE_ID and NEXT_PUBLIC_REVIEWS_URL in `.env.local`
- Consider Google Business Profile API later for the full review list (Places API returns ~5)
