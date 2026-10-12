"use client";
import Link from "next/link";
import HeroRating from "@/components/HeroRating";
import WorkGallery from "@/components/WorkGallery";
import Reviews from "@/components/Reviews";
import ReviewBand from "@/components/ReviewBand";
import Faq from "@/components/Faq";
import ProjectForm from "@/components/ProjectForm";
import ShopMap from "@/components/ShopMap";
import Photo from "@/components/Photo";
import { useContent } from "@/lib/useContent";

export default function Home() {
  const c = useContent();
  const [heroMain, heroA, heroB] = c.hero.images;
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{c.hero.title}</h1>
            <p className="lede">{c.hero.lede}</p>
            <div className="btn-row">
              <Link href="/start" className="btn btn-accent btn-big">Start a project</Link>
              <a href="#work" className="btn btn-outline btn-big">See our work</a>
            </div>
            <HeroRating />
          </div>
          <div className="hero-images">
            <Photo src={heroMain} className="hero-main" />
            <Photo src={heroA} className="wood-dark" />
            <Photo src={heroB} />
          </div>
        </div>
      </section>

      <ReviewBand />

      <section className="facts">
        <div className="wrap facts-row">
          {c.facts.map((f, i) => (
            <div key={i}><strong>{f.title}</strong><span>{f.text}</span></div>
          ))}
        </div>
      </section>

      <section id="reviews" className="section-band">
        <div className="wrap section"><Reviews /></div>
      </section>

      <section id="work" className="section wrap">
        <div className="section-head">
          <p className="eyebrow">{c.work.kicker}</p>
          <h2>{c.work.title}</h2>
        </div>
        <WorkGallery />
      </section>

      <section id="pricing" className="section wrap">
        <div className="section-head">
          <p className="eyebrow">{c.pricing.kicker}</p>
          <h2>{c.pricing.title}</h2>
          <p>{c.pricing.intro}</p>
        </div>
        <div className="steps">
          <ol>
            {c.pricing.steps.map((s, i) => (
              <li key={i}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <aside className="numbers tint">
            <h3>{c.pricing.numbersTitle}</h3>
            {c.pricing.numbers.map((p, i) => <p key={i}>{p}</p>)}
          </aside>
        </div>
      </section>

      <section className="tint">
        <div className="wrap section about">
          <Photo src={c.about.photo} className="about-photo" alt={c.about.title} />
          <div className="about-copy">
            <p className="eyebrow">{c.about.kicker}</p>
            <h2>{c.about.title}</h2>
            {c.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      <section id="team" className="section wrap">
        <div className="section-head split">
          <div className="kicker-head">
            <p className="eyebrow">{c.team.kicker}</p>
            <h2>{c.team.title}</h2>
          </div>
          <p>{c.team.intro}</p>
        </div>
        <ul className="team-grid">
          {c.team.members.map((m, i) => (
            <li key={i}>
              {m.photo ? (
                <img src={m.photo} alt={m.name} loading="lazy" />
              ) : (
                <div className="wood wood-dark headshot" aria-hidden="true">
                  {m.name.replace(/".*?"\s/, "").split(" ").map((w) => w[0]).join("")}
                </div>
              )}
              <strong>{m.name}</strong>
              <span>{m.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="faq" className="section-band">
        <div className="wrap section narrow">
          <p className="eyebrow">{c.faq.kicker}</p>
          <h2>{c.faq.title}</h2>
          <Faq />
        </div>
      </section>

      <section id="start" className="tint">
        <div className="wrap section start-grid">
          <div className="start-copy">
            <p className="eyebrow">{c.start.kicker}</p>
            <h2>{c.start.title}</h2>
            {c.start.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            <p className="contact-lines">
              <a href={`mailto:${c.contact.email}`}>{c.contact.email}</a><br />
              <a href={c.contact.phoneHref}>{c.contact.phone}</a><br />
              {c.contact.street}, {c.contact.city}
            </p>
            <ShopMap />
          </div>
          <div className="form-panel"><ProjectForm /></div>
        </div>
      </section>
    </>
  );
}
