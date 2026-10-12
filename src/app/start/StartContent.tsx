"use client";
import ProjectForm from "@/components/ProjectForm";
import { useContent } from "@/lib/useContent";

export default function StartContent() {
  const { startPage, contact } = useContent();
  return (
    <section className="page-top">
      <div className="wrap section start-grid">
        <div className="start-copy">
          <h1>{startPage.title}</h1>
          {startPage.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          <p className="contact-lines">
            <a href={`mailto:${contact.email}`}>{contact.email}</a><br />
            <a href={contact.phoneHref}>{contact.phone}</a><br />
            {contact.street}, {contact.city}
          </p>
        </div>
        <div className="form-panel"><ProjectForm /></div>
      </div>
    </section>
  );
}
