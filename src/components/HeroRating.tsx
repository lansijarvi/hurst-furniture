"use client";
import { RatingBadge, useReviews } from "./Reviews";

export default function HeroRating() {
  const data = useReviews();
  return <RatingBadge data={data} dark />;
}
