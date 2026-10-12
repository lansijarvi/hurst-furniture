"use client";
import Stars from "./Stars";
import { useReviews } from "./Reviews";
import { writeReviewUrl } from "@/lib/site";
import { useContent } from "@/lib/useContent";

// Yellow strip under the hero: rating (once the getReviews function is live) + one-tap "leave a review".
export default function ReviewBand() {
  const data = useReviews();
  const c = useContent().reviewBand;
  return (
    <section className="review-band" aria-label="Google reviews">
      <div className="wrap review-band-row">
        <div className="review-band-copy">
          <Stars rating={data?.rating ?? 5} size={22} />
          {data ? (
            <span><strong>{data.rating.toFixed(1)}</strong> from {data.count} Google reviews</span>
          ) : (
            <strong>{c.headline}</strong>
          )}
          <span>{c.text}</span>
        </div>
        <div className="btn-row">
          <a href={writeReviewUrl} target="_blank" rel="noopener" className="btn btn-accent">Leave a review</a>
          <a href="/reviews" className="btn btn-outline">Read reviews</a>
        </div>
      </div>
    </section>
  );
}
