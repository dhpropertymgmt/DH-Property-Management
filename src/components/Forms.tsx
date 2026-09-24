import type { ReactNode } from "react";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  );
}

export function FormMessage({ ok, error }: { ok?: string | null; error?: string | null }) {
  if (error) return <p className="form-msg err" role="alert">{error}</p>;
  if (ok) return <p className="form-msg ok" role="status">{ok}</p>;
  return null;
}

// Read a <form>'s fields into a plain object of trimmed strings.
export function formValues(form: HTMLFormElement) {
  const out: Record<string, string> = {};
  new FormData(form).forEach((v, k) => {
    out[k] = typeof v === "string" ? v.trim() : "";
  });
  return out;
}

export const orNull = (s: string | undefined) => (s ? s : null);
export const numOrNull = (s: string | undefined) => (s ? Number(s) : null);
