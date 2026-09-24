import { withBase } from "../../lib/base";
import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Field, FormMessage, formValues, numOrNull, orNull } from "../../components/Forms";
import { money, shortDate } from "../../lib/format";
import { SITE } from "../../lib/site";
import { supabase, supabaseConfigured } from "../../lib/supabase";
import { usePageTitle } from "../../lib/usePageTitle";
import { useQuery } from "../../lib/useQuery";

interface Listing {
  unit_id: string;
  title: string | null;
  city: string;
  neighborhood_address: string;
  label: string;
  beds: number | null;
  baths: number | null;
  asking_rent: number | null;
  available_on: string | null;
  description: string | null;
  pets_allowed: boolean | null;
}

const listingName = (l: Listing) => `${l.neighborhood_address}${l.label ? ` — Unit ${l.label}` : ""}, ${l.city}`;

export default function Rentals() {
  usePageTitle("Available rentals");
  const [params, setParams] = useSearchParams();
  const selected = params.get("unit") ?? "";
  const { data: listings, loading, error } = useQuery<Listing[]>(
    async () =>
      supabaseConfigured
        ? await supabase.rpc("public_listings")
        : { data: [], error: null },
    [],
  );

  return (
    <>
      <div className="hero hero-sm">
        <div className="wrap">
          <div style={{ maxWidth: "62ch" }}>
            <span className="kicker">Available rentals</span>
            <h1 style={{ fontSize: "clamp(2.1rem,5.2vw,3.3rem)" }}>Homes we're leasing right now</h1>
            <p className="lede">
              Every applicant is screened against the same published standards. Read them on the{" "}
              <a href={withBase("/tenants#apply")} style={{ color: "var(--amber)" }}>tenant page</a> before you apply.
            </p>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap">
          <span className="kicker">Listings</span>
          <h2>Open units</h2>
          {loading && <p style={{ marginTop: 24 }}>Loading listings…</p>}
          {error && <p className="form-msg err" style={{ marginTop: 24 }}>Listings couldn't load: {error}</p>}
          {!loading && !error && listings?.length === 0 && (
            <div className="empty">
              <h3>Nothing open this week</h3>
              <p style={{ marginTop: 8 }}>
                Units usually list about 30 days before they're available. Call {SITE.phone} or send an application below
                and we'll contact you when something fits.
              </p>
            </div>
          )}
          <div className="list-grid">
            {listings?.map((l) => (
              <article className="listing" key={l.unit_id}>
                <span className="kicker" style={{ marginBottom: 0 }}>{l.city}</span>
                <h3>{l.title ?? listingName(l)}</h3>
                <p style={{ fontSize: ".92rem" }}>{listingName(l)}</p>
                <p className="rent">
                  {money(l.asking_rent)}
                  <small> / month</small>
                </p>
                <div className="facts">
                  {l.beds !== null && <span>{Number(l.beds)} bd</span>}
                  {l.baths !== null && <span>{Number(l.baths)} ba</span>}
                  <span>Available {l.available_on ? shortDate(l.available_on) : "now"}</span>
                  {l.pets_allowed !== null && <span>{l.pets_allowed ? "Pets considered" : "No pets"}</span>}
                </div>
                {l.description && <p style={{ fontSize: ".95rem" }}>{l.description}</p>}
                <a
                  className="btn btn-primary"
                  href={withBase(`/rentals?unit=${l.unit_id}#apply`)}
                  onClick={(e) => {
                    e.preventDefault();
                    setParams({ unit: l.unit_id });
                    document.getElementById("apply")?.scrollIntoView();
                  }}
                >
                  Apply for this unit
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" style={{ background: "var(--paper-2)" }}>
        <div className="wrap">
          <span className="kicker">Apply</span>
          <h2>Start an application</h2>
          <p className="lede" style={{ marginTop: 16 }}>
            This starts your file. We'll email a secure link for the screening authorization and the credit-check fee,
            which is capped at what Wisconsin allows. Every adult 18 or older in the household applies.
          </p>
          <ApplicationForm listings={listings ?? []} selected={selected} key={selected} />
        </div>
      </section>
    </>
  );
}

function ApplicationForm({ listings, selected }: { listings: Listing[]; selected: string }) {
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const v = formValues(form);
    if (v.website) return;
    if (!supabaseConfigured) {
      setError(`Online applications aren't connected yet. Call ${SITE.phone}.`);
      return;
    }
    setBusy(true);
    setError(null);
    const { error } = await supabase.from("rental_applications").insert({
      unit_id: orNull(v.unit_id),
      full_name: v.full_name,
      email: v.email,
      phone: orNull(v.phone),
      desired_move_in: orNull(v.desired_move_in),
      adults: numOrNull(v.adults),
      monthly_income: numOrNull(v.monthly_income),
      current_address: orNull(v.current_address),
      pets: orNull(v.pets),
      message: orNull(v.message),
    });
    setBusy(false);
    if (error) {
      setError(`That didn't go through (${error.message}). Try again or call ${SITE.phone}.`);
    } else {
      form.reset();
      setOk("Application started. Watch your email for the screening link; decisions usually land within two business days of a complete file.");
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <Field label="Unit">
        <select name="unit_id" defaultValue={selected}>
          <option value="">Any unit that fits</option>
          {listings.map((l) => (
            <option key={l.unit_id} value={l.unit_id}>
              {listingName(l)} — {money(l.asking_rent)}
            </option>
          ))}
        </select>
      </Field>
      <div className="row">
        <Field label="Full name">
          <input name="full_name" required maxLength={200} autoComplete="name" />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required maxLength={320} autoComplete="email" />
        </Field>
      </div>
      <div className="row">
        <Field label="Phone">
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" />
        </Field>
        <Field label="Desired move-in">
          <input name="desired_move_in" type="date" />
        </Field>
      </div>
      <div className="row">
        <Field label="Adults in the household">
          <input name="adults" type="number" min={1} max={20} defaultValue={1} />
        </Field>
        <Field label="Gross monthly household income" hint="Any lawful source. We look for about three times the rent.">
          <input name="monthly_income" type="number" min={0} step="1" inputMode="numeric" />
        </Field>
      </div>
      <Field label="Current address">
        <input name="current_address" maxLength={500} autoComplete="street-address" />
      </Field>
      <Field label="Pets" hint="Assistance animals aren't pets and are never charged for.">
        <input name="pets" maxLength={500} placeholder="e.g. one cat, 9 lbs" />
      </Field>
      <Field label="Anything else">
        <textarea name="message" maxLength={4000} />
      </Field>
      <label className="hp" aria-hidden="true">
        Website <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <FormMessage ok={ok} error={error} />
      <div className="btn-row">
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? "Sending…" : "Start application"}
        </button>
      </div>
    </form>
  );
}
