const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const plain = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const money = (n: number | string | null | undefined) =>
  n === null || n === undefined || n === "" ? "—" : usd.format(Number(n));

// Accounting style for tables: 1,005.48 and (1,005.48)
export const acct = (n: number, negative = false) =>
  negative && n !== 0 ? `(${plain.format(Math.abs(n))})` : plain.format(n);

export const pct = (n: number | string) => `${(Number(n) * 100).toFixed(Number(n) * 100 % 1 ? 1 : 0)}%`;

// Dates come from Postgres as YYYY-MM-DD; parse them as local dates, not UTC.
export const parseDate = (d: string) => {
  const [y, m, day] = d.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, day);
};

export const shortDate = (d: string | null | undefined) =>
  d ? parseDate(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—";

export const fullDate = (d: string | null | undefined) =>
  d ? parseDate(d).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "2-digit" }) : "—";

export const monthLabel = (ym: string) =>
  parseDate(`${ym}-01`).toLocaleDateString("en-US", { month: "long", year: "numeric" });

export const unitName = (u: { label: string; properties?: { address: string } | null }) =>
  `${u.properties?.address ?? ""}${u.label ? ` — ${u.label}` : ""}`;

export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// First day of the next month, for half-open month ranges.
export const nextMonth = (ym: string) => {
  const d = parseDate(`${ym}-01`);
  d.setMonth(d.getMonth() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
};
