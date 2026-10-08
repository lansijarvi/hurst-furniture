"use client";
import Link from "next/link";
import { useState } from "react";
import Stars from "./Stars";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/reviews", label: "Reviews" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#team", label: "Team" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-name">Hurst Concepts</span>
          <span className="brand-sub">Custom furniture and millwork, Ballard</span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="site-nav" aria-label="Main" className={open ? "nav open" : "nav"}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/review" className="nav-review" onClick={() => setOpen(false)}>
            <Stars size={14} /> Leave a review
          </Link>
          <Link href="/start" className="btn btn-accent" onClick={() => setOpen(false)}>
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
