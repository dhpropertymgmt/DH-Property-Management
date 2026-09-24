import { withBase } from "../../../lib/base";
import { WO_SELECT, woPlace, type WorkOrderRow } from "../../../components/Approvals";
import { Loading, WorkOrderTag } from "../../../components/Status";
import { fullDate, money, shortDate, todayISO } from "../../../lib/format";
import { supabase } from "../../../lib/supabase";
import { useQuery } from "../../../lib/useQuery";

interface Lead {
  id: string;
  created_at: string;
  name?: string;
  full_name?: string;
  email: string;
  unit_count?: number | null;
  service?: string;
}

interface Expiring {
  id: string;
  end_date: string;
  rent: number;
  status: string;
  units: { label: string; properties: { address: string } | null } | null;
}

export default function StaffToday() {
  const in60 = new Date();
  in60.setDate(in60.getDate() + 60);
  const horizon = in60.toISOString().slice(0, 10);

  const data = useQuery(async () => {
    const [quotes, apps, wos, leases, unlinked] = await Promise.all([
      supabase.from("quote_requests").select("id, created_at, name, email, unit_count, service").eq("status", "new").order("created_at", { ascending: false }),
      supabase.from("rental_applications").select("id, created_at, full_name, email").eq("status", "submitted").order("created_at", { ascending: false }),
      supabase.from("work_orders").select(WO_SELECT).not("status", "in", "(closed,declined)").order("opened_on"),
      supabase
        .from("leases")
        .select("id, end_date, rent, status, units(label, properties(address))")
        .neq("status", "ended")
        .gte("end_date", todayISO())
        .lte("end_date", horizon)
        .order("end_date"),
      supabase.from("profiles").select("id", { count: "exact", head: true }).is("role", null),
    ]);
    const error = quotes.error ?? apps.error ?? wos.error ?? leases.error ?? unlinked.error;
    if (error) return { data: null, error };
    return {
      data: {
        quotes: quotes.data as Lead[],
        apps: apps.data as Lead[],
        wos: wos.data as WorkOrderRow[],
        leases: leases.data as unknown as Expiring[],
        unlinked: unlinked.count ?? 0,
      },
      error: null,
    };
  }, []);

  const d = data.data;
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Today</h1>
          <p className="sub">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>
      <Loading error={data.error} loading={data.loading && !d} />
      {d && (
        <>
          <div className="stats">
            <div>
              <span>New quote requests</span>
              <b>{d.quotes.length}</b>
              <small><a href={withBase("/portal/requests")}>Open leads</a></small>
            </div>
            <div>
              <span>New applications</span>
              <b>{d.apps.length}</b>
              <small>Waiting for screening</small>
            </div>
            <div>
              <span>Open work orders</span>
              <b>{d.wos.length}</b>
              <small>{d.wos.filter((w) => w.status === "awaiting_approval").length} waiting on owners</small>
            </div>
            <div>
              <span>Leases ending</span>
              <b>{d.leases.length}</b>
              <small>Next 60 days</small>
            </div>
          </div>
          {d.unlinked > 0 && (
            <p className="notice">
              {d.unlinked} signed-in {d.unlinked === 1 ? "account isn't" : "accounts aren't"} linked to an owner or tenant.{" "}
              <a href={withBase("/portal/accounts")}>Review accounts</a>
            </p>
          )}

          <div className="split">
            <div className="card">
              <h2>Open work orders</h2>
              {d.wos.length === 0 && <p className="muted">All clear.</p>}
              {d.wos.map((w) => (
                <div key={w.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <b style={{ color: "var(--ink)" }}>
                      {w.is_emergency && <span className="tag flag">Emergency</span>} {w.title}
                    </b>
                    <WorkOrderTag status={w.status} />
                  </div>
                  <p className="muted" style={{ fontSize: ".85rem" }}>
                    {w.number} &middot; {woPlace(w)} &middot; opened {shortDate(w.opened_on)}
                    {w.bid_amount ? ` · bid ${money(w.bid_amount)}` : ""}
                  </p>
                </div>
              ))}
            </div>
            <div className="card">
              <h2>Leases ending in 60 days</h2>
              {d.leases.length === 0 && <p className="muted">None.</p>}
              {d.leases.map((l) => (
                <div key={l.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                  <b style={{ color: "var(--ink)" }}>
                    {l.units?.properties?.address}
                    {l.units?.label ? ` — ${l.units.label}` : ""}
                  </b>
                  <p className="muted" style={{ fontSize: ".85rem" }}>
                    Ends {fullDate(l.end_date)} &middot; {money(l.rent)} &middot; {l.status.replace("_", " ")}
                  </p>
                </div>
              ))}
              <h2 style={{ marginTop: 22 }}>New leads</h2>
              {d.quotes.length + d.apps.length === 0 && <p className="muted">No new leads.</p>}
              {d.quotes.map((q) => (
                <p key={q.id} style={{ padding: "6px 0", fontSize: ".93rem" }}>
                  <b>{q.name}</b> — quote, {q.unit_count ?? "?"} units ({q.service === "leasing" ? "leasing only" : "full"}) &middot;{" "}
                  <span className="muted">{shortDate(q.created_at)}</span>
                </p>
              ))}
              {d.apps.map((a) => (
                <p key={a.id} style={{ padding: "6px 0", fontSize: ".93rem" }}>
                  <b>{a.full_name}</b> — rental application &middot; <span className="muted">{shortDate(a.created_at)}</span>
                </p>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
