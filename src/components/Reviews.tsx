"use client";
import { useEffect, useState } from "react";
import Stars from "./Stars";
import { allReviewsUrl, featuredTestimonial, writeReviewUrl } from "@/lib/site";

type Review = {
  author: string;
  authorUrl?: string;
  rating: number;
  text: string;
  when: string;
};
type ReviewData = { rating: number; count: number; reviews: Review[] };

// Fetches live Google reviews from the getReviews Cloud Function.
// If it's not deployed yet, the section still shows the featured testimonial and review buttons.
export function useReviews() {
  const [data, setData] = useState<ReviewData | null>(null);
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_REVIEWS_URL;
    if (!url) return;
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {});
  }, []);
  return data;
}

export function RatingBadge({ data }: { data: ReviewData | null }) {
  return (
    <a href="/reviews" className="rating-badge">
      <Stars rating={data?.rating ?? 5} />
      {data ? (
        <span><strong>{data.rating.toFixed(1)}</strong> on Google, {data.count} reviews</span>
      ) : (
        <span>Read our Google reviews</span>
      )}
    </a>
  );
}

export default function Reviews({ full = false }: { full?: boolean }) {
  const data = useReviews();
  const reviews = data?.reviews ?? [];
  const shown = full ? reviews : reviews.slice(0, 2);

  return (
    <div className="reviews-layout">
      <div className="reviews-intro">
        <p className="eyebrow">Reviews</p>
        <h2>What our clients say</h2>
        {data && (
          <div className="rating-card">
            <span className="rating-num">{data.rating.toFixed(1)}</span>
            <div>
              <Stars rating={data.rating} size={20} />
              <p>Based on {data.count} Google reviews</p>
            </div>
          </div>
        )}
        <div className="write-review">
          <Stars size={22} />
          <h3>Worked with us?</h3>
          <p>
            Had us build something for you? We'd be grateful if you shared your experience. It takes about a
            minute and helps your neighbors find us.
          </p>
          <a href={writeReviewUrl} target="_blank" rel="noopener" className="btn btn-sun btn-big">
            Leave a Google review
          </a>
        </div>
        <a href={allReviewsUrl} target="_blank" rel="noopener" className="btn btn-outline">
          Read all reviews on Google
        </a>
      </div>

      <div className="reviews-cards">
        <figure className="review-feature">
          <Stars size={20} />
          <blockquote>{featuredTestimonial.quote}</blockquote>
          <figcaption>{featuredTestimonial.author}</figcaption>
        </figure>
        {shown.map((r, i) => (
          <figure className="review-card" key={i}>
            <Stars rating={r.rating} size={16} />
            <blockquote>{r.text}</blockquote>
            <figcaption>
              {r.authorUrl ? <a href={r.authorUrl} target="_blank" rel="noopener">{r.author}</a> : r.author}
              {r.when ? `, ${r.when}` : ""}
            </figcaption>
          </figure>
        ))}
        {data && <p className="attribution">Reviews from Google</p>}
      </div>
    </div>
  );
}
