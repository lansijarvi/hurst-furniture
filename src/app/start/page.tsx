import type { Metadata } from "next";
import StartContent from "./StartContent";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell Hurst Concepts about your custom furniture or millwork project and get an estimate within 1–2 business days.",
};

export default function StartPage() {
  return <StartContent />;
}
