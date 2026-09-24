import { Loading, WorkOrderTag } from "../../../components/Status";
import { fullDate, money, shortDate } from "../../../lib/format";
import { SITE } from "../../../lib/site";
import { supabase } from "../../../lib/supabase";
import { CATEGORY_LABEL, LEASE_STATUS_LABEL, type Transaction } from "../../../lib/types";
import { useQuery } from "../../../lib/useQuery";
import { leasePlace, loadMyLeases, type MyWorkOrder } from "./tenantData";

export default function TenantHome() {
  const leases = useQuery(loadMyLeases, []);
  const payments = useQuery<Transaction[]>(
    async () => await supabase.from("transactions").select("*").eq("kind", "receipt").order("txn_date", { ascending: false }).limit(24),
    [],
  );
  const requests = useQuery<MyWorkOrder[]>(async () => await supabase.rpc("my_work_orders"), []);
  const current = leases.data?.filter((l) => l.status !== "ended") ?? [];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>My home</h1>
          <p className="sub">Rent is due on the 1st. Questions? Call {SITE.phone}, weekdays 8 to 5.</p>
        </div>
        <div className="controls">
          <a className="btn btn-primary btn-sm" href="/portal/maintenance">
            Report maintenance
          </a>
        </div>
      </div>
      <Loading error={leases.error} loading={leases.loading && !leases.data} />

      {current.map((l) => (
        <div className="card" key={l.id}>
          <div className="card-head">
            <h2>{leasePlace(l)}</h2>
            <span className={`tag ${l.status === "active" ? "ok" : "warn"}`}>{LEASE_STATUS_LABEL[l.status]}</span>
          </div>
          <dl className="kv">
            <dt>Monthly rent</dt>
            <dd>{money(l.rent)}</dd>
            <dt>Lease term</dt>
            <dd>
              {fullDate(l.start_date)} – {l.end_date ? fullDate(l.end_date) : "month to month"}
            </dd>
            <dt>Late fee</dt>
            <dd>
              {money(l.late_fee)} after a {l.grace_days}-day grace period, per your lease
            </dd>
            <dt>Security deposit</dt>
            <dd>{money(l.deposit)}, held in trust</dd>
          </dl>
        </div>
      ))}
      {leases.data && current.length === 0 && <p className="notice">We don't have a current lease on file for you.</p>}

      <div className="split">
        <div className="card">
          <h2>Payment history</h2>
          <Loading error={payments.error} />
          {payments.data?.length === 0 && <p className="muted">No payments recorded yet.</p>}
          {!!payments.data?.length && (
            <div className="tbl-wrap">
              <table className="tbl" style={{ minWidth: 0 }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Method</th>
                    <th className="n">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.data.map((t) => (
                    <tr key={t.id}>
                      <td>{shortDate(t.txn_date)}</td>
                      <td>{CATEGORY_LABEL[t.category] ?? t.category}</td>
                      <td>{t.method ?? "—"}</td>
                      <td className="n">{money(t.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card">
          <h2>Maintenance requests</h2>
          <Loading error={requests.error} />
          {requests.data?.length === 0 && <p className="muted">No requests yet.</p>}
          {requests.data?.slice(0, 8).map((w) => (
            <div key={w.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <b style={{ color: "var(--ink)" }}>{w.title}</b>
                <WorkOrderTag status={w.status} />
              </div>
              <p className="muted" style={{ fontSize: ".85rem" }}>
                #{w.number} &middot; opened {shortDate(w.opened_on)}
                {w.closed_on ? ` · closed ${shortDate(w.closed_on)}` : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
