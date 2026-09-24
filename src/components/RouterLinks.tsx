import { stripBase } from "../lib/base";
import { useEffect, type MouseEvent, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// The marketing pages were ported from static HTML and use plain <a href="/owners#portal">
// links. This wrapper routes those clicks through React Router instead of reloading.
export function RouterLinks({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement).closest("a");
    if (!a || a.target || a.hasAttribute("download")) return;
    const href = a.getAttribute("href");
    if (!href || !href.startsWith("/") || href.startsWith("//")) return;
    e.preventDefault();
    navigate(stripBase(href));
  };
  return <div onClick={onClick}>{children}</div>;
}

// Scroll to #hash targets after navigation, or to the top on a new page.
export function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
