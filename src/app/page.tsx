import Link from "next/link";
import HeroRating from "@/components/HeroRating";
import WorkGallery from "@/components/WorkGallery";
import Reviews from "@/components/Reviews";
import Faq, { faqJsonLd } from "@/components/Faq";
import ProjectForm from "@/components/ProjectForm";
import { contact, team } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero dark">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>Let's refine your space together.</h1>
            <p className="lede">
              Let our team of highly skilled craftspeople create pieces or complete projects that are durable,
              beautiful and memorable.
            </p>
            <div className="btn-row">
              <Link href="/start" className="btn btn-accent btn-big">Start a project</Link>
              <a href="#work" className="btn btn-outline-light btn-big">See our work</a>
            </div>
            <HeroRating />
          </div>
          <div className="hero-images" aria-hidden="true">
            {/* Replace with <img src="/work/hero.jpg" alt="..."> once photos are ready */}
            <div className="wood hero-main" />
            <div className="wood wood-dark" />
            <div className="wood" />
          </div>
        </div>
      </section>

      <section className="facts">
        <div className="wrap facts-row">
          <div><strong>Since 2011</strong><span>Building in Seattle</span></div>
          <div><strong>Engineer-led</strong><span>Founded by an aerospace engineer</span></div>
          <div><strong>Licensed GC</strong><span>Furniture to finish carpentry</span></div>
          <div><strong>Ballard shop</strong><span>{contact.street}</span></div>
        </div>
      </section>

      <section id="work" className="section wrap">
        <div className="section-head">
          <h2>Built to be lived with</h2>
        </div>
        <WorkGallery />
      </section>

      <section id="reviews" className="section-band">
        <div className="wrap section"><Reviews /></div>
      </section>

      <section id="pricing" className="section wrap">
        <div className="section-head">
          <h2>Cost plus, no padding</h2>
          <p>
            At Hurst Concepts, we function on a "Cost Plus" model, and pricing is based on our best estimate of
            what will be required to complete any job. We try to be as conservative as possible, and will charge
            the actual cost for the work completed.
          </p>
        </div>
        <div className="steps">
          <ol>
            <li>
              <h3>Tell us your idea</h3>
              <p>No finished design needed. Our team works with you to collect the details and bring what you're imagining to life.</p>
            </li>
            <li>
              <h3>Get an estimate</h3>
              <p>Within a day we're reaching out to suppliers and calculating labor. Expect estimates or questions within 1–2 business days.</p>
            </li>
            <li>
              <h3>Design and build</h3>
              <p>A 50% deposit starts design drawings and material purchasing. You pay the actual cost for the work completed.</p>
            </li>
          </ol>
          <aside className="numbers dark">
            <h3>The numbers</h3>
            <p>20% markup on subcontractors and reimbursable expenses like materials, plus labor at [LABOR RATE] per hour.</p>
            <p>Fixed quotes would mean padding every job 10 to 15 percent to cover the unknowns. We'd rather charge you for what it actually takes.</p>
          </aside>
        </div>
      </section>

      <section className="dark">
        <div className="wrap section about">
          <div className="wood about-photo" aria-hidden="true" />
          <div className="about-copy">
            <h2>About Jonathan Hurst</h2>
            <p>
              While earning a degree in mechanical engineering from Stevens Institute of Technology, Jonathan spent
              his spare time assisting with major residential additions, renovations, and cabinetry work.
            </p>
            <p>
              After graduation, Jonathan began working in the aerospace industry for United Technologies, and
              continued his woodworking practice in Connecticut. He finally touched down in Seattle, Washington, to
              work on the 787 flight test program where he used the creative freedom of making custom furniture and
              finished pieces as a balance for the stress of his job.
            </p>
            <p>
              Throughout the six-plus years that he worked as an aerospace engineer, wood crafting was his creative
              outlet. After some time, Jonathan decided to open a woodworking business and in 2011 created Hurst
              Concepts.
            </p>
            <p>
              Jonathan is now a custom woodworker and licensed general contractor specializing in fine home
              furniture, cabinetry, and high-end finish carpentry. His experience as a mechanical engineer creates a
              unique viewpoint, style, and approach to structural design throughout all of his woodcrafting
              endeavors.
            </p>
          </div>
        </div>
      </section>

      <section id="team" className="section wrap">
        <div className="section-head split">
          <h2>Meet the makers</h2>
          <p>
            We are a tight-knit team of ten, including Jonathan. Between us are backgrounds in manufacturing
            education, aerospace engineering, large-scale construction, and fine arts criticism and production.
          </p>
        </div>
        <ul className="team-grid">
          {team.map((m) => (
            <li key={m.name}>
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
          <h2>Good questions</h2>
          <Faq />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      </section>

      <section id="start" className="dark">
        <div className="wrap section start-grid">
          <div className="start-copy">
            <h2>We'd love to know your ideas!</h2>
            <p>
              Jonathan created this business to connect directly with people and to help design pieces that will
              enrich the lives of the clients he builds relationships with. The Hurst Concepts Team is a group of
              folks who share that goal. Please reach out!
            </p>
            <p>
              Depending on the scale of your project, expect us to reach out to you with estimates or more questions
              within 1–2 business days.
            </p>
            <p className="contact-lines">
              <a href={`mailto:${contact.email}`}>{contact.email}</a><br />
              <a href={contact.phoneHref}>{contact.phone}</a><br />
              {contact.street}, {contact.city}
            </p>
          </div>
          <div className="form-panel"><ProjectForm /></div>
        </div>
      </section>
    </>
  );
}
