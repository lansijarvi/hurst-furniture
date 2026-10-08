"use client";
import Stars from "./Stars";
import { useReviews } from "./Reviews";
import { writeReviewUrl } from "@/lib/site";

// Yellow strip under the hero: rating (once the getReviews function is live) + one-tap "leave a review".
export default function ReviewBand() {
  const data = useReviews();
  return (
    <section className="review-band" aria-label="Google reviews">
      <div className="wrap review-band-row">
        <div className="review-band-copy">
          <Stars rating={data?.rating ?? 5} size={22} />
          {data ? (
            <span><strong>{data.rating.toFixed(1)}</strong> from {data.count} Google reviews</span>
          ) : (
            <strong>Loved by Seattle homeowners</strong>
          )}
          <span>Worked with us? Your review helps neighbors find us.</span>
        </div>
        <div className="btn-row">
          <a href={writeReviewUrl} target="_blank" rel="noopener" className="btn btn-accent">Leave a review</a>
          <a href="/reviews" className="btn btn-outline">Read reviews</a>
        </div>
      </div>
    </section>
  );
}
