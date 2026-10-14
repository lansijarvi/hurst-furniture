"use client";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { firebase, firebaseAuth } from "@/lib/firebase";
import { CONTENT_DOC, mergeContent, type Content } from "@/lib/content";
import { FieldEditor } from "./fields";
import { sections } from "./schema";

/* eslint-disable @typescript-eslint/no-explicit-any -- content is edited generically from the schema */
type Status = "loading" | "signed-out" | "not-admin" | "ready" | "error";

export default function AdminApp() {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");
  const [content, setContent] = useState<Content | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => onAuthStateChanged(firebaseAuth(), async (u) => {
    setUser(u);
    if (!u) return setStatus("signed-out");
    const { db } = firebase();
    try {
      const admin = await getDoc(doc(db, "admins", u.uid));
      if (!admin.exists()) return setStatus("not-admin");
      const snap = await getDoc(doc(db, CONTENT_DOC));
      const json = snap.exists() ? snap.data().json : null;
      setContent(mergeContent(json ? JSON.parse(json) : null));
      setStatus("ready");
    } catch (e: any) {
      if (e?.code === "permission-denied") return setStatus("not-admin");
      setError(e?.message || String(e));
      setStatus("error");
    }
  }), []);

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  async function save() {
    if (!content || !user) return;
    setSaving(true);
    setError("");
    try {
      const { db } = firebase();
      const json = JSON.stringify(content);
      await setDoc(doc(db, CONTENT_DOC), { json, updatedAt: serverTimestamp(), updatedBy: user.email });
      // Keep every saved version so a mistake can be rolled back.
      await addDoc(collection(db, "siteHistory"), { json, savedAt: serverTimestamp(), savedBy: user.email });
      setDirty(false);
      setSavedAt(new Date());
    } catch (e: any) {
      setError(e?.message || String(e));
    }
    setSaving(false);
  }

  if (status === "loading") return <div className="admin-center">Loading…</div>;

  if (status === "signed-out")
    return (
      <div className="admin-center">
        <h1>Site editor</h1>
        <p>Sign in with the Google account that's allowed to edit the site.</p>
        <button className="btn btn-accent btn-big" onClick={() => signInWithPopup(firebaseAuth(), new GoogleAuthProvider()).catch((e) => setError(e.message))}>
          Sign in with Google
        </button>
        {error && <p className="a-error">{error}</p>}
      </div>
    );

  if (status === "not-admin")
    return (
      <div className="admin-center">
        <h1>Not set up as an editor yet</h1>
        <p>Signed in as <strong>{user?.email}</strong>. To allow this account to edit, add it in the Firebase console:</p>
        <ol className="admin-steps">
          <li>Firestore Database → <strong>Start collection</strong> → Collection ID: <code>admins</code></li>
          <li>Document ID: <code className="admin-uid">{user?.uid}</code></li>
          <li>Add any field (for example <code>name</code> = your name) and save. Then reload this page.</li>
        </ol>
        <button className="a-link" onClick={() => signOut(firebaseAuth())}>Sign out</button>
      </div>
    );

  if (status === "error" || !content)
    return (
      <div className="admin-center">
        <h1>Couldn't load the editor</h1>
        <p className="a-error">{error}</p>
        <p>If Firestore hasn't been created yet in the Firebase console, do that first.</p>
      </div>
    );

  return (
    <Editor
      content={content}
      onChange={(c) => { setContent(c); setDirty(true); }}
      bar={
        <>
          <span className="admin-status">
            {saving ? "Saving…" : dirty ? "Unsaved changes" : savedAt ? `Saved ${savedAt.toLocaleTimeString()}` : "All changes saved"}
          </span>
          <a href="/" target="_blank" rel="noopener" className="a-link">View site ↗</a>
          <button className="btn btn-accent" disabled={!dirty || saving} onClick={save}>Save</button>
          <button className="a-link" onClick={() => signOut(firebaseAuth())}>Sign out</button>
        </>
      }
      error={error}
    />
  );
}

// The editing screen: section menu + form. Separate from sign-in/saving so it can be previewed on its own.
export function Editor({ content, onChange, bar, error, initialSection }: { content: Content; onChange: (c: Content) => void; bar: React.ReactNode; error?: string; initialSection?: string }) {
  const [active, setActive] = useState(initialSection ?? sections[0].key);
  const section = sections.find((s) => s.key === active)!;
  const data = (content as any)[section.key];
  const setSection = (v: any) => onChange({ ...content, [section.key]: v } as Content);

  return (
    <div className="admin">
      <header className="admin-bar">
        <strong>Site editor</strong>
        {bar}
      </header>
      {error && <p className="a-error admin-msg">{error}</p>}
      <div className="admin-body">
        <nav className="admin-nav" aria-label="Sections">
          {sections.map((s) => (
            <button key={s.key} className={s.key === active ? "active" : ""} onClick={() => setActive(s.key)}>{s.label}</button>
          ))}
        </nav>
        <main className="admin-main">
          <h1>{section.label}</h1>
          {section.key === "theme" && (
            <div className="a-field">
              <span className="a-hint">Try each theme on the real site before choosing. Previews only show in your browser tab; nothing is saved.</span>
              <div className="theme-previews">
                <a className="btn btn-outline" href="/?theme=light" target="_blank" rel="noopener">Preview light ↗</a>
                <a className="btn btn-outline" href="/?theme=dark" target="_blank" rel="noopener">Preview dark ↗</a>
              </div>
            </div>
          )}
          {section.list ? (
            <FieldEditor field={section.list} value={data} onChange={setSection} />
          ) : (
            section.fields.map((f) => (
              <FieldEditor key={f.key} field={f} value={data?.[f.key]} onChange={(v) => setSection({ ...data, [f.key]: v })} />
            ))
          )}
          <p className="a-hint admin-foot">
            Saved changes show on the live site right away. Each time the site is published (<code>npm run share</code>),
            they're also built into the pages so Google sees them.
          </p>
        </main>
      </div>
    </div>
  );
}
