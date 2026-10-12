"use client";
import { useContent } from "@/lib/useContent";

// Native <details> accordion: works without JavaScript and is keyboard accessible.
// Also emits FAQPage structured data for Google.
export default function Faq() {
  const items = useContent().faq.items;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
  };
  return (
    <div className="faq">
      {items.map((f, i) => (
        <details key={i} open={i === 0}>
          <summary>{f.q}</summary>
          {f.a.map((p, j) => <p key={j}>{p}</p>)}
        </details>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
