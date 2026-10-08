import Link from "next/link";
import { contact, writeReviewUrl } from "@/lib/site";
import Social from "./Social";
import ShareButton from "./ShareButton";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <img src="/logo.png" alt="" width="56" height="56" className="footer-logo" />
          <p className="footer-brand">Hurst Concepts</p>
          <p>Custom furniture, built-ins and millwork, made in Ballard since 2011.</p>
          <div className="footer-actions">
            <Social />
            <ShareButton />
          </div>
        </div>
        <div>
          <p className="footer-head">Visit</p>
          <p>{contact.street}<br />{contact.city}</p>
        </div>
        <div>
          <p className="footer-head">Contact</p>
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a><br />
            <a href={contact.phoneHref}>{contact.phone}</a>
          </p>
        </div>
        <div>
          <p className="footer-head">Reviews</p>
          <p>
            <a href={writeReviewUrl} target="_blank" rel="noopener">Leave us a Google review</a><br />
            <Link href="/reviews">Read what clients say</Link>
          </p>
        </div>
        <div>
          <p className="footer-head">Join the shop</p>
          <p>Skilled or curious? <a href={`mailto:${contact.email}?subject=Resume`}>Send us a resume.</a> We'd love to show you the shop.</p>
        </div>
      </div>
      <div className="wrap footer-base">© {new Date().getFullYear()} Hurst Concepts LLC. Licensed general contractor.</div>
    </footer>
  );
}
