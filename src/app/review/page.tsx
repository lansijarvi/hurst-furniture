import type { Metadata } from "next";
import ReviewRedirect from "./ReviewRedirect";

// Short link for cards, invoices and QR codes: hurstfurniture.com/review → Google "write a review".
export const metadata: Metadata = {
  title: "Leave a Review",
  robots: { index: false },
};

export default function ReviewPage() {
  return <ReviewRedirect />;
}
