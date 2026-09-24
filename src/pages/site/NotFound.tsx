import { withBase } from "../../lib/base";
import { usePageTitle } from "../../lib/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <div className="hero hero-sm">
      <div className="wrap">
        <span className="kicker">404</span>
        <h1 style={{ fontSize: "clamp(2.1rem,5.2vw,3.3rem)" }}>That page isn't here</h1>
        <div className="btn-row" style={{ marginTop: 26 }}>
          <a className="btn btn-primary" href={withBase("/")}>Home</a>
          <a className="btn btn-ghost-dark" href={withBase("/tenants")}>For tenants</a>
        </div>
      </div>
    </div>
  );
}
