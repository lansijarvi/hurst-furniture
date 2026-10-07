import type { Metadata } from "next";
import Reviews from "@/components/Reviews";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What Hurst Concepts clients say about our custom furniture and millwork, and how to leave a review.",
};

export default function ReviewsPage() {
  return (
    <section className="section-band page-top">
      <div className="wrap section">
        <Reviews full />
      </div>
    </section>
  );
}
