import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";
import { useQuery } from "../lib/useQuery";

// Owners always look at their own portfolio. Staff pick an owner, kept in ?owner=.
export function useOwnerSelection() {
  const { profile } = useAuth();
  const [params, setParams] = useSearchParams();
  const isStaff = profile?.role === "staff";
  const owners = useQuery<{ id: string; name: string }[]>(
    async () => (isStaff ? await supabase.from("owners").select("id, name").order("name") : { data: [], error: null }),
    [isStaff],
  );
  const selected = isStaff ? params.get("owner") ?? owners.data?.[0]?.id ?? null : profile?.owner_id ?? null;

  useEffect(() => {
    if (isStaff && !params.get("owner") && selected) {
      const next = new URLSearchParams(params);
      next.set("owner", selected);
      setParams(next, { replace: true });
    }
  }, [isStaff, params, selected, setParams]);

  const picker = isStaff ? (
    <label className="field">
      <span>Owner</span>
      <select
        value={selected ?? ""}
        onChange={(e) => {
          const next = new URLSearchParams(params);
          next.set("owner", e.target.value);
          setParams(next);
        }}
      >
        {owners.data?.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </label>
  ) : null;

  return { ownerId: selected, picker, noOwners: isStaff && owners.data?.length === 0 };
}
