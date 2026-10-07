import { faqs } from "@/lib/site";

// Native <details> accordion: works without JavaScript and is keyboard accessible.
export default function Faq() {
  return (
    <div className="faq">
      {faqs.map((f, i) => (
        <details key={i} open={i === 0}>
          <summary>{f.q}</summary>
          {f.a.map((p, j) => <p key={j}>{p}</p>)}
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
  };
}
