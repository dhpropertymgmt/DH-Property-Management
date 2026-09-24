import { useState, type FormEvent } from "react";
import { Field, FormMessage, formValues, orNull } from "../../../components/Forms";
import { Loading, WorkOrderTag } from "../../../components/Status";
import { shortDate } from "../../../lib/format";
import { SITE } from "../../../lib/site";
import { supabase } from "../../../lib/supabase";
import { useQuery } from "../../../lib/useQuery";
import { leasePlace, loadMyLeases, type MyWorkOrder } from "./tenantData";

const CATEGORIES = ["Plumbing", "Electrical", "Appliance", "Heating / cooling", "Doors, windows & locks", "Pests", "Exterior", "General"];

export default function TenantMaintenance() {
  const leases = useQuery(loadMyLeases, []);
  const requests = useQuery<MyWorkOrder[]>(async () => await supabase.rpc("my_work_orders"), []);
  const current = leases.data?.filter((l) => l.status !== "ended" && l.units) ?? [];
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const v = formValues(form);
    setBusy(true);
    setError(null);
    setOk(null);
    const { data, error } = await supabase.rpc("submit_maintenance_request", {
      p_unit_id: v.unit_id,
      p_title: v.title,
      p_description: [v.description, v.worse ? `Getting worse: ${v.worse}` : ""].filter(Boolean).join("\n\n"),
      p_category: v.category,
      p_entry_permission: v.entry_permission === "on",
      p_pet_on_site: orNull(v.pet_on_site),
      p_availability: orNull(v.availability),
    });
    setBusy(false);
    if (error) {
      setError(error.message);
    } else {
      form.reset();
      setOk(`Request #${(data as MyWorkOrder).number} is in. We'll acknowledge it by the end of the business day and schedule it within three.`);
      requests.reload();
    }
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Report maintenance</h1>
          <p className="sub">Submit it with details and you'll hear back the same business day.</p>
        </div>
      </div>

      <div className="callout" style={{ marginTop: 0 }}>
        <h3>Emergency? Don't use this form.</h3>
        <p>
          Call <a href={SITE.phoneHref}>{SITE.phone}</a> and press 1, any hour. Fire, gas smell, or an active electrical
          hazard: call 911 first. Emergencies include no heat in winter, no water, no working toilet in a one-bath unit,
          active flooding, a sewage backup, or a door or window that no longer locks.
        </p>
      </div>

      <div className="card">
        <h2>New request</h2>
        <Loading error={leases.error} loading={leases.loading && !leases.data} />
        {leases.data && current.length === 0 ? (
          <p className="notice">We couldn't find a current lease for your account. Call {SITE.phone}.</p>
        ) : (
          <form className="form" onSubmit={submit}>
            <div className="row">
              <Field label="Unit">
                <select name="unit_id" required>
                  {current.map((l) => (
                    <option key={l.id} value={l.units!.id}>
                      {leasePlace(l)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Category">
                <select name="category" defaultValue="General">
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="What's wrong, in a few words">
              <input name="title" required maxLength={200} placeholder="e.g. Kitchen faucet drips" />
            </Field>
            <Field label="Details" hint="For an appliance, include the brand and model from the model plate.">
              <textarea name="description" maxLength={3000} />
            </Field>
            <Field label="Is it getting worse or holding steady?">
              <input name="worse" maxLength={300} />
            </Field>
            <div className="row">
              <Field label="Two windows a technician can come">
                <input name="availability" maxLength={500} placeholder="e.g. Tue after 3pm, Thu morning" />
              </Field>
              <Field label="Pets we should know about before entry">
                <input name="pet_on_site" maxLength={500} />
              </Field>
            </div>
            <label className="check">
              <input type="checkbox" name="entry_permission" />
              <span>You may use a key to enter if I'm not home. We still give notice before anyone enters.</span>
            </label>
            <FormMessage ok={ok} error={error} />
            <div>
              <button className="btn btn-primary" type="submit" disabled={busy || current.length === 0}>
                {busy ? "Sending…" : "Submit request"}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="card">
        <h2>Your requests</h2>
        <Loading error={requests.error} />
        {requests.data?.length === 0 && <p className="muted">No requests yet.</p>}
        {!!requests.data?.length && (
          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opened</th>
                  <th>Request</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.data.map((w) => (
                  <tr key={w.id}>
                    <td>{w.number}</td>
                    <td>{shortDate(w.opened_on)}</td>
                    <td>
                      <b>{w.title}</b>
                      <div className="muted" style={{ fontSize: ".85rem" }}>{w.category}</div>
                    </td>
                    <td>
                      <WorkOrderTag status={w.status} closedOn={w.closed_on ? shortDate(w.closed_on) : null} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
