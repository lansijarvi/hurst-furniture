import type { Metadata } from "next";
import ProjectForm from "@/components/ProjectForm";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell Hurst Concepts about your custom furniture or millwork project and get an estimate within 1–2 business days.",
};

export default function StartPage() {
  return (
    <section className="page-top">
      <div className="wrap section start-grid">
        <div className="start-copy">
          <h1>Get in touch</h1>
          <p>
            Fill out the form to begin the estimate process for your project. Don't hesitate to include the
            details! As much description as possible is helpful to us as we are researching what will be needed to
            complete your new project.
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
  );
}
