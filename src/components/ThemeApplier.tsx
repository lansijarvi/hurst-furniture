"use client";
import { useEffect, useState } from "react";
import { useContent } from "@/lib/useContent";

// Applies the site theme chosen in /admin ("Site look"). An admin preview (?theme=dark|light)
// overrides it for this browser tab only, with a small tag to end the preview.
export default function ThemeApplier() {
  const mode = useContent().theme.mode;
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    let p: string | null = null;
    try { p = sessionStorage.getItem("themePreview"); } catch {}
    setPreview(p);
    document.documentElement.dataset.theme = p || mode;
  }, [mode]);

  if (!preview) return null;
  return (
    <div className="theme-preview" role="status">
      Previewing <strong>{preview}</strong> theme
      <a href="?theme=off">End preview</a>
    </div>
  );
}
