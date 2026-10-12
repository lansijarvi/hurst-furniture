"use client";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebase } from "@/lib/firebase";
import type { Field } from "./schema";

/* eslint-disable @typescript-eslint/no-explicit-any -- content is edited generically from the schema */
type Obj = Record<string, any>;

// Shrink big phone photos to at most 2000px wide JPEGs before uploading.
async function resize(file: File, max = 2000): Promise<Blob> {
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") return file;
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return new Promise((res) => canvas.toBlob((b) => res(b || file), "image/jpeg", 0.85));
}

export function ImageField({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function upload(file?: File) {
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      const blob = await resize(file);
      const name = file.name.replace(/\.[^.]+$/, "").replace(/[^\w-]/g, "_").slice(0, 60);
      const r = ref(firebase().storage, `site/uploads/${Date.now()}-${name}.jpg`);
      await uploadBytes(r, blob, { contentType: "image/jpeg", cacheControl: "public, max-age=31536000" });
      onChange(await getDownloadURL(r));
    } catch (e: any) {
      setErr(e?.message || "Upload failed");
    }
    setBusy(false);
  }
  return (
    <div className="a-field">
      <span className="a-label">{label}</span>
      <div className="a-image">
        {value ? <img src={value} alt="" /> : <div className="a-image-empty">No photo</div>}
        <div className="a-image-actions">
          <label className="btn btn-outline">
            {busy ? "Uploading…" : value ? "Replace photo" : "Upload photo"}
            <input type="file" accept="image/*" hidden disabled={busy} onChange={(e) => upload(e.target.files?.[0])} />
          </label>
          {value && <button type="button" className="a-link" onClick={() => onChange("")}>Remove</button>}
          {hint && <span className="a-hint">{hint}</span>}
          {err && <span className="a-error">{err}</span>}
        </div>
      </div>
    </div>
  );
}

function Paragraphs({ label, value, onChange, hint }: { label: string; value: string[]; onChange: (v: string[]) => void; hint?: string }) {
  const list = value ?? [];
  const set = (i: number, v: string) => onChange(list.map((x, j) => (j === i ? v : x)));
  return (
    <div className="a-field">
      <span className="a-label">{label}</span>
      {hint && <span className="a-hint">{hint}</span>}
      {list.map((p, i) => (
        <div key={i} className="a-para">
          <textarea rows={4} value={p} onChange={(e) => set(i, e.target.value)} />
          <button type="button" className="a-link" onClick={() => onChange(list.filter((_, j) => j !== i))}>Remove</button>
        </div>
      ))}
      <button type="button" className="a-link" onClick={() => onChange([...list, ""])}>+ Add paragraph</button>
    </div>
  );
}

function ListField({ field, value, onChange }: { field: Extract<Field, { type: "list" }>; value: Obj[]; onChange: (v: Obj[]) => void }) {
  const list = value ?? [];
  const [open, setOpen] = useState<number | null>(null);
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpen(open === i ? j : open);
  };
  const update = (i: number, item: Obj) => onChange(list.map((x, j) => (j === i ? item : x)));
  return (
    <div className="a-field">
      <span className="a-label">{field.label}</span>
      <ol className="a-list">
        {list.map((item, i) => (
          <li key={i} className={open === i ? "open" : ""}>
            <div className="a-list-row">
              <button type="button" className="a-list-title" onClick={() => setOpen(open === i ? null : i)}>
                {item.image || item.photo ? <img src={item.image || item.photo} alt="" /> : null}
                {item[field.titleKey] || `New ${field.itemLabel.toLowerCase()}`}
              </button>
              <button type="button" className="a-icon" aria-label="Move up" onClick={() => move(i, -1)}>↑</button>
              <button type="button" className="a-icon" aria-label="Move down" onClick={() => move(i, 1)}>↓</button>
              <button type="button" className="a-icon a-danger" aria-label="Delete"
                onClick={() => confirm(`Delete "${item[field.titleKey] || field.itemLabel}"?`) && onChange(list.filter((_, j) => j !== i))}>✕</button>
            </div>
            {open === i && (
              <div className="a-list-body">
                {field.fields.map((f) => (
                  <FieldEditor key={f.key} field={f} value={item[f.key]}
                    onChange={(v) => {
                      const next = { ...item, [f.key]: v };
                      // A new photo replaces a Wikimedia one, so its credit no longer applies.
                      if ((f.key === "image" || f.key === "photo") && "credit" in next) delete next.credit;
                      update(i, next);
                    }} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
      <button type="button" className="btn btn-outline" onClick={() => { onChange([...list, { ...field.newItem }]); setOpen(list.length); }}>
        + Add {field.itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

export function FieldEditor({ field, value, onChange }: { field: Field; value: any; onChange: (v: any) => void }) {
  switch (field.type) {
    case "text":
    case "number":
      return (
        <label className="a-field">
          <span className="a-label">{field.label}</span>
          <input type={field.type} value={value ?? ""} onChange={(e) => onChange(field.type === "number" ? Number(e.target.value) : e.target.value)} />
          {field.hint && <span className="a-hint">{field.hint}</span>}
        </label>
      );
    case "textarea":
      return (
        <label className="a-field">
          <span className="a-label">{field.label}</span>
          <textarea rows={4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
          {field.hint && <span className="a-hint">{field.hint}</span>}
        </label>
      );
    case "checkbox":
      return (
        <label className="a-field a-check">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          <span className="a-label">{field.label}</span>
        </label>
      );
    case "color":
      return (
        <label className="a-field a-check">
          <input type="color" value={value || "#cccccc"} onChange={(e) => onChange(e.target.value)} />
          <span className="a-label">{field.label}</span>
        </label>
      );
    case "select":
      return (
        <label className="a-field">
          <span className="a-label">{field.label}</span>
          <select value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
            {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
      );
    case "image":
      return <ImageField label={field.label} value={value ?? ""} onChange={onChange} hint={field.hint} />;
    case "images": {
      const arr: string[] = Array.from({ length: field.count }, (_, i) => (value ?? [])[i] ?? "");
      return (
        <div className="a-group">
          {field.names.map((n, i) => (
            <ImageField key={i} label={n} value={arr[i]} onChange={(v) => onChange(arr.map((x, j) => (j === i ? v : x)))} />
          ))}
        </div>
      );
    }
    case "paragraphs":
      return <Paragraphs label={field.label} value={value} onChange={onChange} hint={field.hint} />;
    case "object":
      return (
        <fieldset className="a-group">
          <legend className="a-label">{field.label}</legend>
          {field.fields.map((f) => (
            <FieldEditor key={f.key} field={f} value={value?.[f.key]} onChange={(v) => onChange({ ...value, [f.key]: v })} />
          ))}
        </fieldset>
      );
    case "list":
      return <ListField field={field} value={value} onChange={onChange} />;
  }
}
