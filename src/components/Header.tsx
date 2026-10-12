"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Stars from "./Stars";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/reviews", label: "Reviews" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#team", label: "Team" },
  { href: "/#faq", label: "FAQ" },
  { href: "/woods", label: "Woods" },
];

// Magazine-style header: centered masthead, then a dark sticky nav bar.
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const close = () => setOpen(false);
  if (path?.startsWith("/admin")) return null;
  return (
    <>
      <header className="masthead">
        <div className="wrap masthead-row">
          <Link href="/review" className="masthead-review">
            <Stars size={14} /> Leave a review
          </Link>
          <Link href="/" className="brand">
            <img src="/logo.png" alt="" width="56" height="56" className="brand-logo" />
            <span className="brand-text">
              <span className="brand-name">Hurst Concepts</span>
              <span className="brand-sub">Custom furniture and millwork, Ballard</span>
            </span>
          </Link>
          <Link href="/start" className="btn btn-accent masthead-cta">Start a project</Link>
        </div>
      </header>
      <div className="navbar">
        <div className="wrap navbar-row">
          <button className="menu-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
            {open ? "Close" : "Menu"}
          </button>
          <nav id="site-nav" aria-label="Main" className={open ? "nav open" : "nav"}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={close}>{l.label}</Link>
            ))}
            <Link href="/review" className="nav-mobile-only" onClick={close}>Leave a review</Link>
            <Link href="/start" className="nav-mobile-only" onClick={close}>Start a project</Link>
          </nav>
        </div>
      </div>
    </>
  );
}
