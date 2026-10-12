// Fixed links and IDs (Google reviews, map). Editable copy and lists live in src/lib/content.ts (edited at /admin).

// Place ID of the "Hurst Custom Furniture LLC" Google Business listing (the one with the reviews),
// not the bare 943 NW 50th St address listing, which has posting turned off.
const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || "";

// Until the Place ID is set, both links fall back to a Google search that shows Hurst's business panel.
const googleSearchUrl = "https://www.google.com/search?q=Hurst+Custom+Furniture+LLC+Seattle";

// Opens Google's "write a review" box for Hurst directly.
export const writeReviewUrl = placeId
  ? `https://search.google.com/local/writereview?placeid=${placeId}`
  : googleSearchUrl;

// Opens Google's reviews panel for Hurst.
export const allReviewsUrl = placeId
  ? `https://search.google.com/local/reviews?placeid=${placeId}`
  : googleSearchUrl;

// Map and directions for the Ballard shop (keyless Google Maps embed).
const mapsQuery = encodeURIComponent("Hurst Custom Furniture LLC, 943 NW 50th St, Seattle, WA 98107");
export const mapEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
export const directionsUrl = placeId
  ? `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}&destination_place_id=${placeId}`
  : `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
