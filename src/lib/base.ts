// The site may be served from a sub-path (e.g. GitHub Pages: /DH-Property-Management/).
// Vite sets BASE_URL from the build's `base`; links written as "/owners" go through here.
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export const withBase = (path: string) => `${BASE}${path}`;

// Router paths are relative to the base; strip it from a full href.
export const stripBase = (href: string) => (BASE && href.startsWith(BASE) ? href.slice(BASE.length) || "/" : href);
