"use client";
import Link from "next/link";
import WoodGuide from "@/components/WoodGuide";
import { useContent } from "@/lib/useContent";

export default function WoodsContent() {
  const w = useContent().woods;
  return (
    <section className="section wrap page-top">
      <div className="section-head">
        <p className="eyebrow">{w.kicker}</p>
        <h1>{w.title}</h1>
        <p>{w.intro}</p>
      </div>
      <WoodGuide />
      <p className="wood-note">
        Hardness values are commonly published Janka side-hardness averages; individual boards vary.{" "}
        <Link href="/start">Not sure what fits your project? Ask us.</Link>
      </p>
      <details className="credits">
        <summary>Photo credits</summary>
        <ul>
          {w.items.filter((x) => x.credit).map((x) => (
            <li key={x.name}>
              {x.name}: <a href={x.credit!.source} target="_blank" rel="noopener">photo</a> by {x.credit!.author},{" "}
              {x.credit!.licenseUrl ? (
                <a href={x.credit!.licenseUrl} target="_blank" rel="noopener">{x.credit!.license}</a>
              ) : (
                x.credit!.license
              )}
              , via Wikimedia Commons
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
