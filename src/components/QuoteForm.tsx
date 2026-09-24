import { useState, type FormEvent } from "react";
import { supabase, supabaseConfigured } from "../lib/supabase";
import { SITE } from "../lib/site";
import { Field, FormMessage, formValues, numOrNull, orNull } from "./Forms";

export default function QuoteForm() {
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const v = formValues(form);
    if (v.website) return; // honeypot: bots fill every field
    if (!supabaseConfigured) {
      setError(`The quote form isn't connected yet. Call ${SITE.phone} instead.`);
      return;
    }
    setBusy(true);
    setError(null);
    const { error } = await supabase.from("quote_requests").insert({
      name: v.name,
      email: v.email,
      phone: orNull(v.phone),
      service: v.service || "full",
      unit_count: numOrNull(v.unit_count),
      addresses: orNull(v.addresses),
      message: orNull(v.message),
    });
    setBusy(false);
    if (error) {
      setError(`That didn't go through (${error.message}). Try again, or call ${SITE.phone}.`);
    } else {
      form.reset();
      setOk("Got it. We'll call you within one business day to set up the walkthrough.");
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="row">
        <Field label="Your name">
          <input name="name" required maxLength={200} autoComplete="name" />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required maxLength={320} autoComplete="email" />
        </Field>
      </div>
      <div className="row">
        <Field label="Phone">
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" />
        </Field>
        <Field label="Number of units">
          <input name="unit_count" type="number" min={1} max={500} inputMode="numeric" />
        </Field>
      </div>
      <Field label="What you need">
        <select name="service" defaultValue="full">
          <option value="full">Full management</option>
          <option value="leasing">Leasing only — fill a vacancy</option>
        </select>
      </Field>
      <Field label="Property addresses" hint="One per line. Rent roll details help but aren't required.">
        <textarea name="addresses" maxLength={4000} />
      </Field>
      <Field label="Anything else we should know">
        <textarea name="message" maxLength={4000} />
      </Field>
      <label className="hp" aria-hidden="true">
        Website <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <FormMessage ok={ok} error={error} />
      <div className="btn-row">
        <button className="btn btn-ghost" type="submit" disabled={busy}>
          {busy ? "Sending…" : "Request a quote"}
        </button>
        <a className="btn btn-ghost" href={SITE.phoneHref}>{SITE.phone}</a>
      </div>
    </form>
  );
}
