"use client";
import { useEffect } from "react";
import Stars from "@/components/Stars";
import { writeReviewUrl } from "@/lib/site";

export default function ReviewRedirect() {
  useEffect(() => {
    window.location.replace(writeReviewUrl);
  }, []);
  return (
    <section className="page-top">
      <div className="wrap section redirect">
        <Stars size={32} />
        <h1>Thanks for reviewing us</h1>
        <p>Taking you to Google…</p>
        <a href={writeReviewUrl} className="btn btn-sun btn-big">Open Google reviews</a>
      </div>
    </section>
  );
}
