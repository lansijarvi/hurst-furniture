"use client";
import { useState } from "react";
import { projects } from "@/lib/site";

export default function WorkGallery() {
  const [kind, setKind] = useState<"furniture" | "millwork">("furniture");
  const items = projects.filter((p) => p.kind === kind);
  return (
    <>
      <div className="tabs" role="tablist" aria-label="Project type">
        <button role="tab" aria-selected={kind === "furniture"} onClick={() => setKind("furniture")}>
          Custom furniture
        </button>
        <button role="tab" aria-selected={kind === "millwork"} onClick={() => setKind("millwork")}>
          Built-ins and millwork
        </button>
      </div>
      <div className="work-grid">
        {items.map((p, i) => (
          <article className="work-item" key={`${kind}-${i}`}>
            {p.image ? (
              <img src={p.image} alt={p.title} loading="lazy" />
            ) : (
              <div className={i % 2 ? "wood wood-dark" : "wood"} aria-hidden="true" />
            )}
            <h3>{p.title}</h3>
            <p>{p.detail}</p>
          </article>
        ))}
      </div>
    </>
  );
}
