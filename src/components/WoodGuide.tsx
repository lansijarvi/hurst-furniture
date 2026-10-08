"use client";
import { useState } from "react";
import { woods } from "@/lib/site";

const MAX = 2000; // top of the hardness bar scale, lbf

export default function WoodGuide() {
  const [sort, setSort] = useState<"hard" | "name">("hard");
  const list = [...woods].sort((a, b) => (sort === "hard" ? b.janka - a.janka : a.name.localeCompare(b.name)));

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Sort woods">
        <button role="tab" aria-selected={sort === "hard"} onClick={() => setSort("hard")}>Hardest first</button>
        <button role="tab" aria-selected={sort === "name"} onClick={() => setSort("name")}>A to Z</button>
      </div>
      <ul className="wood-grid">
        {list.map((w) => (
          <li key={w.name} className="wood-card">
            {w.image ? (
              <img src={w.image} alt={`${w.name} board`} loading="lazy" />
            ) : (
              <div className="wood-swatch" style={{ background: w.tone }} aria-hidden="true" />
            )}
            <div className="wood-body">
              <div className="wood-title">
                <h3>{w.name}</h3>
                {w.local && <span className="tag">PNW</span>}
              </div>
              <div className="hardness">
                <span className="hardness-num">{w.janka.toLocaleString()} lbf</span>
                <span className="hardness-bar" aria-hidden="true"><span style={{ width: `${(w.janka / MAX) * 100}%` }} /></span>
              </div>
              <p>{w.uses}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
