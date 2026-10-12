import type { Metadata } from "next";
import WoodsContent from "./WoodsContent";

export const metadata: Metadata = {
  title: "Wood Guide",
  description: "Furniture and woodworking woods compared by Janka hardness: white oak, walnut, maple, cherry, Douglas fir and more.",
};

export default function WoodsPage() {
  return <WoodsContent />;
}
