import { useCallback, useEffect, useState } from "react";

// Tiny loader for Supabase queries: runs `fn` on mount and whenever `deps` change,
// and exposes reload() for after a write.
export function useQuery<T>(fn: () => PromiseLike<{ data: T | null; error: { message: string } | null }>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fn().then((res) => {
      if (!active) return;
      setData(res.data);
      setError(res.error?.message ?? null);
      setLoading(false);
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  const reload = useCallback(() => setTick((t) => t + 1), []);
  return { data, error, loading, reload };
}
