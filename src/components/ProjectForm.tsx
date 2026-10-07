"use client";
import { useState, FormEvent } from "react";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { firebase } from "@/lib/firebase";

const MAX_FILES = 6;
const MAX_BYTES = 10 * 1024 * 1024;

export default function ProjectForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: real people never see or fill this field.
    if (fd.get("website")) return setStatus("sent");

    const files = (fd.getAll("photos") as File[]).filter((f) => f.size > 0);
    if (files.length > MAX_FILES) {
      setError(`Attach up to ${MAX_FILES} photos.`);
      return setStatus("error");
    }
    if (files.some((f) => f.size > MAX_BYTES || !f.type.startsWith("image/"))) {
      setError("Photos must be images under 10 MB each.");
      return setStatus("error");
    }

    setStatus("sending");
    setError("");
    try {
      const { db, storage } = firebase();
      const docRef = doc(collection(db, "inquiries"));

      const photos: string[] = [];
      for (const [i, f] of files.entries()) {
        const safe = f.name.replace(/[^\w.\-]/g, "_").slice(-80);
        const path = `inquiries/${docRef.id}/${i}-${safe}`;
        await uploadBytes(ref(storage, path), f, { contentType: f.type });
        photos.push(path);
      }

      await setDoc(docRef, {
        name: String(fd.get("name") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        phone: String(fd.get("phone") || "").trim(),
        address: String(fd.get("address") || "").trim(),
        projectType: String(fd.get("projectType") || ""),
        budget: String(fd.get("budget") || "").trim(),
        timeframe: String(fd.get("timeframe") || "").trim(),
        details: String(fd.get("details") || "").trim(),
        photos,
        createdAt: serverTimestamp(),
      });
      form.reset();
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setError(`Your project didn't send. Try again, or email us at admin@hurstfurniture.com.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <h3>Thanks!</h3>
        <p>We will reach back out to you via email soon.</p>
      </div>
    );
  }

  return (
    <form className="project-form" onSubmit={onSubmit}>
      <div className="field-row">
        <label>Name<input name="name" required autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <div className="field-row">
        <label>Phone number<input name="phone" type="tel" autoComplete="tel" /></label>
        <label>
          Project type
          <select name="projectType" defaultValue="Custom furniture">
            <option>Custom furniture</option>
            <option>Built-ins and millwork</option>
            <option>Matching existing pieces</option>
            <option>Something else</option>
          </select>
        </label>
      </div>
      <label>Address<input name="address" autoComplete="street-address" /></label>
      <div className="field-row">
        <label>Budget<input name="budget" placeholder="A rough range is fine" /></label>
        <label>Time frame<input name="timeframe" placeholder="For example, by spring" /></label>
      </div>
      <label>
        Project details
        <textarea name="details" rows={5} required
          placeholder="Include details like materials you'd like to use, dimensions, and where it will live." />
      </label>
      <label>
        Photos (optional)
        <span className="hint">Your space, pieces to match, or inspiration. Up to {MAX_FILES} images.</span>
        <input name="photos" type="file" accept="image/*" multiple />
      </label>
      <label className="hp" aria-hidden="true">
        Website<input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="hint">
        We require a deposit equal to 50% of the estimated project cost before delivery of any design drawings or
        material purchasing.
      </p>
      {status === "error" && <p className="form-error" role="alert">{error}</p>}
      <button className="btn btn-accent btn-big" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending your project…" : "Send my project"}
      </button>
    </form>
  );
}
