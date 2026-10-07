const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret, defineString } = require("firebase-functions/params");
const admin = require("firebase-admin");

admin.initializeApp();

const PLACES_API_KEY = defineSecret("PLACES_API_KEY");
const PLACE_ID = defineString("GOOGLE_PLACE_ID");
const NOTIFY_EMAIL = defineString("NOTIFY_EMAIL", { default: "admin@hurstfurniture.com" });

// Short in-memory cache so every page view doesn't hit (and bill) the Places API.
// Check Google's current Places API terms on caching and attribution before launch.
let cache = { at: 0, body: null };
const CACHE_MS = 60 * 60 * 1000;

exports.getReviews = onRequest(
  { secrets: [PLACES_API_KEY], cors: ["https://www.hurstfurniture.com", "https://hurstfurniture.com", /localhost/] },
  async (req, res) => {
    try {
      if (!cache.body || Date.now() - cache.at > CACHE_MS) {
        const r = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID.value()}`, {
          headers: {
            "X-Goog-Api-Key": PLACES_API_KEY.value(),
            "X-Goog-FieldMask": "rating,userRatingCount,reviews",
          },
        });
        if (!r.ok) throw new Error(`Places API ${r.status}: ${await r.text()}`);
        const p = await r.json();
        cache = {
          at: Date.now(),
          body: {
            rating: p.rating ?? 0,
            count: p.userRatingCount ?? 0,
            reviews: (p.reviews ?? [])
              .filter((x) => x.text?.text)
              .map((x) => ({
                author: x.authorAttribution?.displayName ?? "Google user",
                authorUrl: x.authorAttribution?.uri,
                rating: x.rating ?? 5,
                text: x.text.text,
                when: x.relativePublishTimeDescription ?? "",
              })),
          },
        };
      }
      res.set("Cache-Control", "public, max-age=1800");
      res.json(cache.body);
    } catch (e) {
      console.error(e);
      res.status(502).json({ error: "Reviews are unavailable right now." });
    }
  }
);

// When someone submits the project form, queue an email for the
// "Trigger Email from Firestore" extension (install it from the Firebase console, collection: mail).
exports.notifyInquiry = onDocumentCreated("inquiries/{id}", async (event) => {
  const d = event.data?.data();
  if (!d) return;
  const lines = [
    `Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone || "-"}`, `Address: ${d.address || "-"}`,
    `Project type: ${d.projectType}`, `Budget: ${d.budget || "-"}`, `Time frame: ${d.timeframe || "-"}`,
    "", d.details, "",
    d.photos?.length ? `Photos (${d.photos.length}) in Storage: inquiries/${event.params.id}/` : "No photos attached.",
  ];
  const db = admin.firestore();
  await db.collection("mail").add({
    to: NOTIFY_EMAIL.value(),
    replyTo: d.email,
    message: { subject: `New project inquiry: ${d.name} (${d.projectType})`, text: lines.join("\n") },
  });
  await db.collection("mail").add({
    to: d.email,
    message: {
      subject: "We got your project details – Hurst Concepts",
      text: `Hi ${d.name},\n\nThanks for reaching out! Depending on the scale of your project, expect us to reach out with estimates or more questions within 1–2 business days.\n\nHurst Concepts\n943 NW 50th St, Seattle, WA 98107\n(206) 782-1377`,
    },
  });
});
