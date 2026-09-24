import { LEASE_STATUS_LABEL, WO_STATUS_LABEL, type LeaseStatus, type WorkOrderStatus } from "../lib/types";

const WO_TONE: Record<WorkOrderStatus, string> = {
  open: "",
  awaiting_approval: "warn",
  approved: "flag",
  declined: "",
  scheduled: "flag",
  closed: "ok",
};

export function WorkOrderTag({ status, closedOn }: { status: WorkOrderStatus; closedOn?: string | null }) {
  return <span className={`tag ${WO_TONE[status]}`}>{WO_STATUS_LABEL[status]}{status === "closed" && closedOn ? ` ${closedOn}` : ""}</span>;
}

const LEASE_TONE: Record<LeaseStatus, string> = { active: "ok", notice_given: "warn", renewal_out: "warn", ended: "" };

export function LeaseTag({ status }: { status: LeaseStatus }) {
  return <span className={`tag ${LEASE_TONE[status]}`}>{LEASE_STATUS_LABEL[status]}</span>;
}

export function Loading({ error, loading }: { error?: string | null; loading?: boolean }) {
  if (error) return <p className="notice">Couldn't load: {error}</p>;
  if (loading) return <p className="muted" style={{ marginTop: 16 }}>Loading…</p>;
  return null;
}
