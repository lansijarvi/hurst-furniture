import type { Metadata } from "next";
import Link from "next/link";
import WoodGuide from "@/components/WoodGuide";
import { woods } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wood Guide",
  description: "Furniture and woodworking woods compared by Janka hardness: white oak, walnut, maple, cherry, Douglas fir and more.",
};

export default function WoodsPage() {
  return (
    <section className="section wrap page-top">
      <div className="section-head">
        <p className="eyebrow">Wood guide</p>
        <h1>Choosing your wood</h1>
        <p>
          The Janka hardness test measures how much force it takes to press a steel ball halfway into a board.
          Higher numbers resist dents better. Hardness is only part of the picture, so ask us about color,
          grain and how a wood will age in your space.
        </p>
      </div>
      <WoodGuide />
      <p className="wood-note">
        Hardness values are commonly published Janka side-hardness averages; individual boards vary.{" "}
        <Link href="/start">Not sure what fits your project? Ask us.</Link>
      </p>
      <details className="credits">
        <summary>Photo credits</summary>
        <ul>
          {woods.filter((w) => w.credit).map((w) => (
            <li key={w.name}>
              {w.name}: <a href={w.credit!.source} target="_blank" rel="noopener">photo</a> by {w.credit!.author},{" "}
              {w.credit!.licenseUrl ? (
                <a href={w.credit!.licenseUrl} target="_blank" rel="noopener">{w.credit!.license}</a>
              ) : (
                w.credit!.license
              )}
              , via Wikimedia Commons
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
