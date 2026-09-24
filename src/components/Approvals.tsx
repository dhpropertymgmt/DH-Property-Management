import { useState } from "react";
import { money, shortDate } from "../lib/format";
import { supabase } from "../lib/supabase";
import type { WorkOrder } from "../lib/types";

export type WorkOrderRow = WorkOrder & {
  properties: { address: string } | null;
  units: { label: string } | null;
};

export const WO_SELECT = "*, properties(address), units(label)";
// Same shape, filterable by owner: .eq("properties.owner_id", id)
export const WO_SELECT_BY_OWNER = "*, properties!inner(owner_id, address), units(label)";

export const woPlace = (w: WorkOrderRow) =>
  `${w.properties?.address ?? ""}${w.units ? (w.units.label ? ` — ${w.units.label}` : "") : " — common"}`;

// Bids above the owner's threshold, with approve / decline buttons.
export function Approvals({ items, onDone }: { items: WorkOrderRow[]; onDone: () => void }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  async function decide(id: string, approve: boolean) {
    setBusy(id);
    setError(null);
    const { error } = await supabase.rpc("decide_work_order", {
      p_id: id,
      p_approve: approve,
      p_note: notes[id] || null,
    });
    setBusy(null);
    if (error) setError(error.message);
    else onDone();
  }

  if (items.length === 0) return <p className="muted">Nothing is waiting on you.</p>;
  return (
    <>
      {error && <p className="form-msg err">{error}</p>}
      {items.map((w) => (
        <div className="approval" key={w.id}>
          <h3>
            {w.title} &middot; {money(w.bid_amount)}
          </h3>
          <p className="meta">
            WO {w.number} &middot; {woPlace(w)} &middot; {w.vendor ?? "Vendor TBD"} &middot; opened {shortDate(w.opened_on)}
          </p>
          {w.description && <p style={{ marginTop: 8, fontSize: ".93rem" }}>{w.description}</p>}
          <label className="field" style={{ marginTop: 10 }}>
            <span>Note to your manager (optional)</span>
            <input
              value={notes[w.id] ?? ""}
              onChange={(e) => setNotes({ ...notes, [w.id]: e.target.value })}
              maxLength={2000}
            />
          </label>
          <div className="btn-row">
            <button className="btn btn-pine btn-xs" disabled={busy === w.id} onClick={() => void decide(w.id, true)}>
              Approve {money(w.bid_amount)}
            </button>
            <button className="btn btn-danger btn-xs" disabled={busy === w.id} onClick={() => void decide(w.id, false)}>
              Decline
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
