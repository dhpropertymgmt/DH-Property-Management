import "../../styles/reports.css";
import { SITE } from "../../lib/site";
import { usePageTitle } from "../../lib/usePageTitle";

// Static sample pack from the prototype: a fictional seven-unit portfolio whose four
// reports reconcile to one another. The live versions are in the owner portal.
export default function SampleReports() {
  usePageTitle("Sample owner reports");
  return (
    <div className="rpt">
      <div className="toc noprint">
        <div className="toc-in">
          <h1>Sample owner reports</h1>
          <p>The four documents a DH Property Management owner receives: a monthly statement, a rent roll, a maintenance log, and a year-end tax summary. All figures below belong to a fictional seven-unit portfolio and tie to each other across the four reports. Print to PDF for a paginated pack.</p>
          <ul>
            <li><a href="#stmt">1 · Monthly owner statement</a></li>
            <li><a href="#roll">2 · Rent roll &amp; occupancy</a></li>
            <li><a href="#maint">3 · Maintenance log</a></li>
            <li><a href="#tax">4 · Year-end tax summary</a></li>
          </ul>
          <p className="note">Prototype — company, owner, tenants, vendors, addresses and amounts are invented.</p>
        </div>
      </div>

      {/* ============ 1. MONTHLY STATEMENT ============ */}
      <div className="sheet" id="stmt">
        <div className="rpt-head">
          <div className="brand">
            <svg className="mark" viewBox="0 0 26 26" aria-hidden="true">
              <rect x="0" y="0" width="26" height="26" rx="6" fill="#EFB13B"/>
              <text x="13" y="18.5" textAnchor="middle" fontFamily="Bricolage Grotesque, Georgia, serif" fontSize="12.5" fontWeight="700" fill="#101B2B">DH</text>
            </svg>
            DH Property Management
          </div>
          <div className="meta">
            212 Rochester St, Suite 4<br />
            Mukwonago, WI 53149<br />
            {SITE.phone}
          </div>
        </div>

        <div className="rpt-title">
          <span className="kind">Report 1 of 4</span>
          <h2>Monthly owner statement</h2>
          <p className="sub">August 1 – 31, 2026 · Statement 2026-08-KRH · Posted September 12, 2026</p>
        </div>

        <div className="who">
          <div><b>Owner</b>Kettle Ridge Holdings LLC<br />c/o C. Bauer</div>
          <div><b>Portfolio</b>3 properties · 7 units</div>
          <div><b>Management rate</b>8% of collected rent<br />(4–9 unit tier)</div>
          <div><b>Distribution</b>ACH ending 4417<br />Sent September 3, 2026</div>
        </div>

        <div className="band">
          <div><span>Collected</span><b>$9,365.00</b><small>Rent plus one late fee</small></div>
          <div><span>Operating costs</span><b>$1,005.48</b><small>Paid to vendors at cost</small></div>
          <div><span>Management fee</span><b>$749.20</b><small>8% of collected</small></div>
          <div><span>Net to you</span><b>$7,610.32</b><small>Deposited Sep 3</small></div>
        </div>

        <h3 className="sec">Cash activity by property</h3>
        <div className="scroll">
        <table>
          <thead>
            <tr>
              <th>Property</th><th className="n">Collected</th><th className="n">Operating</th>
              <th className="n">Mgmt fee</th><th className="n">Net</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1042 Tallmadge St, Mukwonago <span className="pill grey">2 units</span></td><td className="n">2,820.00</td><td className="n neg">(262.00)</td><td className="n neg">(225.60)</td><td className="n">2,332.40</td></tr>
            <tr><td>318 Brinkman Ave, Elkhorn <span className="pill grey">1 unit</span></td><td className="n">1,795.00</td><td className="n neg">(165.00)</td><td className="n neg">(143.60)</td><td className="n">1,486.40</td></tr>
            <tr><td>7 Foundry Ct, Waukesha <span className="pill grey">4 units</span></td><td className="n">4,750.00</td><td className="n neg">(578.48)</td><td className="n neg">(380.00)</td><td className="n">3,791.52</td></tr>
            <tr className="grand"><td>Total</td><td className="n">9,365.00</td><td className="n">(1,005.48)</td><td className="n">(749.20)</td><td className="n">7,610.32</td></tr>
          </tbody>
        </table>
        </div>

        <h3 className="sec">Receipts</h3>
        <div className="scroll">
        <table>
          <thead>
            <tr><th>Date</th><th>Unit</th><th>Tenant</th><th>Type</th><th>Method</th><th className="n">Amount</th></tr>
          </thead>
          <tbody>
            <tr><td>Aug 1</td><td>Tallmadge A</td><td>R. Vasquez</td><td>Rent</td><td>Autopay</td><td className="n">1,350.00</td></tr>
            <tr><td>Aug 1</td><td>Foundry 1</td><td>A. Neumann</td><td>Rent</td><td>Autopay</td><td className="n">1,175.00</td></tr>
            <tr><td>Aug 1</td><td>Foundry 3</td><td>L. Brzezinski</td><td>Rent</td><td>Autopay</td><td className="n">1,225.00</td></tr>
            <tr><td>Aug 1</td><td>Foundry 4</td><td>S. Okonkwo</td><td>Rent</td><td>Autopay</td><td className="n">1,200.00</td></tr>
            <tr><td>Aug 2</td><td>Brinkman</td><td>T. Ellsworth</td><td>Rent</td><td>Bank transfer</td><td className="n">1,795.00</td></tr>
            <tr><td>Aug 3</td><td>Foundry 2</td><td>J. Pahl</td><td>Rent</td><td>Bank transfer</td><td className="n">1,150.00</td></tr>
            <tr><td>Aug 8</td><td>Tallmadge B</td><td>D. &amp; M. Kohler</td><td>Rent</td><td>Bank transfer</td><td className="n">1,425.00</td></tr>
            <tr><td>Aug 8</td><td>Tallmadge B</td><td>D. &amp; M. Kohler</td><td>Late fee <span className="pill warn">per lease</span></td><td>Bank transfer</td><td className="n">45.00</td></tr>
            <tr className="total"><td colSpan={5}>Total receipts</td><td className="n">9,365.00</td></tr>
          </tbody>
          <caption>All rent for August collected in full. One late fee assessed on Tallmadge B under the lease's five-day grace period; no notice required.</caption>
        </table>
        </div>

        <h3 className="sec">Disbursements</h3>
        <div className="scroll">
        <table className="wide">
          <thead>
            <tr><th>Date</th><th>Unit</th><th>Category</th><th>Description</th><th>Vendor</th><th>Ref</th><th className="n">Amount</th></tr>
          </thead>
          <tbody>
            <tr><td>Aug 4</td><td>Tallmadge — common</td><td>Grounds</td><td>Lawn contract, monthly</td><td>Hoerig Lawn &amp; Snow</td><td>INV 4821</td><td className="n">120.00</td></tr>
            <tr><td>Aug 4</td><td>Foundry — common</td><td>Grounds</td><td>Lawn contract, monthly</td><td>Hoerig Lawn &amp; Snow</td><td>INV 4822</td><td className="n">180.00</td></tr>
            <tr><td>Aug 7</td><td>Tallmadge B</td><td>Repair</td><td>Water heater igniter assembly, labor 1.0 hr</td><td>Krueger Plumbing</td><td>WO-2608-02</td><td className="n">142.00</td></tr>
            <tr><td>Aug 14</td><td>Brinkman</td><td>Repair</td><td>Gutter clearing, rear elevation</td><td>Sturm Exteriors</td><td>WO-2608-03</td><td className="n">165.00</td></tr>
            <tr><td>Aug 18</td><td>Foundry — common</td><td>Utilities</td><td>Water &amp; sewer, Jun–Jul cycle (owner-paid)</td><td>City of Waukesha</td><td>ACCT 88-2140</td><td className="n">312.44</td></tr>
            <tr><td>Aug 19</td><td>Foundry 3</td><td>Life safety</td><td>Smoke and CO detectors, 10-year date expired</td><td>DH PM (at cost)</td><td>WO-2608-04</td><td className="n">47.85</td></tr>
            <tr><td>Aug 21</td><td>Foundry — common</td><td>Supplies</td><td>Stairwell lamps and photocell</td><td>Ace Hardware</td><td>WO-2608-01</td><td className="n">38.19</td></tr>
            <tr className="total"><td colSpan={6}>Total disbursements</td><td className="n">1,005.48</td></tr>
          </tbody>
          <caption>Vendor invoices are attached to this statement as PDFs in the portal. Nothing above carries a markup, coordination fee or trip charge from DH Property Management.</caption>
        </table>
        </div>

        <h3 className="sec">Reserve and trust balances</h3>
        <div className="scroll">
        <table>
          <thead>
            <tr><th>Account</th><th className="n">Opening</th><th className="n">Activity</th><th className="n">Closing</th><th>Target</th></tr>
          </thead>
          <tbody>
            <tr><td>Operating reserve (your funds, held by us)</td><td className="n">1,500.00</td><td className="n">0.00</td><td className="n">1,500.00</td><td>$1,500</td></tr>
            <tr><td>Security deposits (separate trust account)</td><td className="n">8,095.00</td><td className="n">0.00</td><td className="n">8,095.00</td><td>Held per lease</td></tr>
          </tbody>
          <caption>Deposits are held in a separate trust account and are never used for operating costs. They are not your funds and are excluded from the distribution above.</caption>
        </table>
        </div>

        <div className="callout">
          <b>Open items as of this statement.</b> Foundry 2 furnace inducer motor — $410 bid from Bauer Heating sent for your approval Aug 29, above your $500 threshold only when combined with the diagnostic, so it is waiting on you. Foundry 3 vacated Aug 31 and the turnover is underway; both appear on your September statement. Brinkman gave notice Sep 1 for an Oct 31 move-out.
        </div>

        <div className="rpt-foot">
          <span>DH Property Management · Statement 2026-08-KRH</span>
          <span>Page 1 of 4</span>
        </div>
      </div>

      {/* ============ 2. RENT ROLL ============ */}
      <div className="sheet" id="roll">
        <div className="rpt-head">
          <div className="brand">
            <svg className="mark" viewBox="0 0 26 26" aria-hidden="true">
              <rect x="0" y="0" width="26" height="26" rx="6" fill="#EFB13B"/>
              <text x="13" y="18.5" textAnchor="middle" fontFamily="Bricolage Grotesque, Georgia, serif" fontSize="12.5" fontWeight="700" fill="#101B2B">DH</text>
            </svg>
            DH Property Management
          </div>
          <div className="meta">
            Kettle Ridge Holdings LLC<br />
            3 properties · 7 units<br />
            As of September 1, 2026
          </div>
        </div>

        <div className="rpt-title">
          <span className="kind">Report 2 of 4</span>
          <h2>Rent roll and occupancy</h2>
          <p className="sub">In-place rent against market, lease expirations, deposits held, and delinquency</p>
        </div>

        <div className="band">
          <div><span>Physical occupancy</span><b>85.7%</b><small>6 of 7 units</small></div>
          <div><span>Economic occupancy</span><b>84.1%</b><small>In-place ÷ market rent</small></div>
          <div><span>Loss to lease</span><b>$250</b><small>Monthly, occupied units</small></div>
          <div><span>Delinquency</span><b>$0.00</b><small>No balance over 30 days</small></div>
        </div>

        <h3 className="sec">Unit detail</h3>
        <div className="scroll">
        <table className="wide">
          <thead>
            <tr>
              <th>Unit</th><th>Tenant</th><th>Type</th><th className="n">Market</th><th className="n">In place</th>
              <th>Lease term</th><th className="n">Deposit</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="group"><td colSpan={8}>1042 Tallmadge St, Mukwonago — duplex, built 1968</td></tr>
            <tr className="sub"><td>A</td><td>R. Vasquez</td><td>2 bd / 1 ba</td><td className="n">1,395</td><td className="n">1,350</td><td>7/1/25 – 6/30/27</td><td className="n">1,350</td><td><span className="pill ok">Current</span></td></tr>
            <tr className="sub"><td>B</td><td>D. &amp; M. Kohler</td><td>2 bd / 1 ba</td><td className="n">1,450</td><td className="n">1,425</td><td>9/1/25 – 8/31/27</td><td className="n">1,425</td><td><span className="pill ok">Current</span></td></tr>

            <tr className="group"><td colSpan={8}>318 Brinkman Ave, Elkhorn — single family, built 1954</td></tr>
            <tr className="sub"><td>—</td><td>T. Ellsworth</td><td>3 bd / 1.5 ba</td><td className="n">1,850</td><td className="n">1,795</td><td>11/1/24 – 10/31/26</td><td className="n">1,795</td><td><span className="pill warn">Notice given</span></td></tr>

            <tr className="group"><td colSpan={8}>7 Foundry Ct, Waukesha — four-plex, built 1977</td></tr>
            <tr className="sub"><td>1</td><td>A. Neumann</td><td>1 bd / 1 ba</td><td className="n">1,200</td><td className="n">1,175</td><td>5/1/26 – 4/30/27</td><td className="n">1,175</td><td><span className="pill ok">Current</span></td></tr>
            <tr className="sub"><td>2</td><td>J. Pahl</td><td>2 bd / 1 ba</td><td className="n">1,225</td><td className="n">1,150</td><td>3/1/25 – 2/28/27</td><td className="n">1,150</td><td><span className="pill ok">Current</span></td></tr>
            <tr className="sub"><td>3</td><td>Vacant</td><td>2 bd / 1 ba</td><td className="n">1,275</td><td className="n">—</td><td>Vacated 8/31/26</td><td className="n">—</td><td><span className="pill flag">Turnover</span></td></tr>
            <tr className="sub"><td>4</td><td>S. Okonkwo</td><td>1 bd / 1 ba</td><td className="n">1,225</td><td className="n">1,200</td><td>10/1/25 – 9/30/26</td><td className="n">1,200</td><td><span className="pill warn">Renewal out</span></td></tr>

            <tr className="grand"><td colSpan={3}>Totals — 7 units</td><td className="n">9,620</td><td className="n">8,095</td><td></td><td className="n">8,095</td><td></td></tr>
          </tbody>
          <caption>Market rent reflects a September survey of comparable units within one mile, not a county average. Deposits equal one month's rent at each unit and sit in trust.</caption>
        </table>
        </div>

        <div className="two">
          <div>
            <h3 className="sec">Lease expirations, next 12 months</h3>
            <div className="scroll">
            <table style={{ minWidth: "0" }}>
              <thead><tr><th>Month</th><th className="n">Units</th><th className="n">Rent at risk</th></tr></thead>
              <tbody>
                <tr><td>Sep 2026</td><td className="n">1</td><td className="n">1,200</td></tr>
                <tr><td>Oct 2026</td><td className="n">1</td><td className="n">1,795</td></tr>
                <tr><td>Feb 2027</td><td className="n">1</td><td className="n">1,150</td></tr>
                <tr><td>Apr 2027</td><td className="n">1</td><td className="n">1,175</td></tr>
                <tr><td>Jun 2027</td><td className="n">1</td><td className="n">1,350</td></tr>
                <tr><td>Aug 2027</td><td className="n">1</td><td className="n">1,425</td></tr>
                <tr className="total"><td>Total</td><td className="n">6</td><td className="n">8,095</td></tr>
              </tbody>
              <caption>Two expirations land back to back this fall. We stagger renewal terms where we can so a single month never carries more than a third of the rent.</caption>
            </table>
            </div>
          </div>
          <div>
            <h3 className="sec">Action items</h3>
            <ul className="plain">
              <li><b>Foundry 4</b> — renewal offered Aug 15 at $1,225, a $25 increase. No reply yet; we follow up Sep 15 and again Sep 22.</li>
              <li><b>Brinkman</b> — tenant of 22 months vacating Oct 31 for a purchase. Listing goes live Oct 1 at $1,850. Recommend paint and refinishing the tub surround between tenants; bid coming.</li>
              <li><b>Foundry 3</b> — vacant 15 days, listed Sep 8 at $1,275, six showings booked, two applications in screening.</li>
              <li><b>Foundry 2</b> — in place since 2025 at $1,150 against $1,225 market. Largest single loss-to-lease in the portfolio; worth raising at the February renewal.</li>
            </ul>
          </div>
        </div>

        <div className="rpt-foot">
          <span>DH Property Management · Rent roll 09-01-2026</span>
          <span>Page 2 of 4</span>
        </div>
      </div>

      {/* ============ 3. MAINTENANCE ============ */}
      <div className="sheet" id="maint">
        <div className="rpt-head">
          <div className="brand">
            <svg className="mark" viewBox="0 0 26 26" aria-hidden="true">
              <rect x="0" y="0" width="26" height="26" rx="6" fill="#EFB13B"/>
              <text x="13" y="18.5" textAnchor="middle" fontFamily="Bricolage Grotesque, Georgia, serif" fontSize="12.5" fontWeight="700" fill="#101B2B">DH</text>
            </svg>
            DH Property Management
          </div>
          <div className="meta">
            Kettle Ridge Holdings LLC<br />
            Approval threshold: $500<br />
            August 2026
          </div>
        </div>

        <div className="rpt-title">
          <span className="kind">Report 3 of 4</span>
          <h2>Maintenance and work order log</h2>
          <p className="sub">Every request received, what it cost, and how long it stayed open</p>
        </div>

        <div className="band">
          <div><span>Requests</span><b>6</b><small>4 closed, 2 open</small></div>
          <div><span>Median close time</span><b>1.0 day</b><small>Closed items, business days</small></div>
          <div><span>Closed within 3 days</span><b>100%</b><small>4 of 4</small></div>
          <div><span>Billed to you</span><b>$393.04</b><small>Work orders only</small></div>
        </div>

        <h3 className="sec">Work orders</h3>
        <div className="scroll">
        <table className="wide">
          <thead>
            <tr><th>WO</th><th>Opened</th><th>Unit</th><th>Category</th><th>Description</th><th>Vendor</th><th>Status</th><th className="n">Cost</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>2608-01</td><td>Aug 2</td><td>Foundry, common</td><td>Electrical</td>
              <td>Stairwell fixture dark; lamps and photocell replaced</td><td>In-house</td>
              <td><span className="pill ok">Closed Aug 2</span></td><td className="n">38.19</td>
            </tr>
            <tr>
              <td>2608-02</td><td>Aug 6</td><td>Tallmadge B</td><td>Plumbing</td>
              <td>No hot water. Igniter assembly failed on an 11-year-old heater; replaced same visit. Tank is at end of expected life — plan a replacement in the next 18 months.</td>
              <td>Krueger Plumbing</td><td><span className="pill ok">Closed Aug 7</span></td><td className="n">142.00</td>
            </tr>
            <tr>
              <td>2608-03</td><td>Aug 11</td><td>Brinkman</td><td>Exterior</td>
              <td>Rear gutters overflowing in heavy rain; cleared and downspout re-seated</td>
              <td>Sturm Exteriors</td><td><span className="pill ok">Closed Aug 14</span></td><td className="n">165.00</td>
            </tr>
            <tr>
              <td>2608-04</td><td>Aug 19</td><td>Foundry 3</td><td>Life safety</td>
              <td>Smoke and CO units past their 10-year replacement date; all three replaced and logged</td>
              <td>In-house</td><td><span className="pill ok">Closed Aug 19</span></td><td className="n">47.85</td>
            </tr>
            <tr>
              <td>2608-05</td><td>Aug 28</td><td>Foundry 2</td><td>HVAC</td>
              <td>Inducer motor grinding on startup. Diagnostic confirms bearing failure; unit still heats. Bid sent for your approval Aug 29.</td>
              <td>Bauer Heating</td><td><span className="pill warn">Awaiting your OK</span></td><td className="n">410.00</td>
            </tr>
            <tr>
              <td>2608-06</td><td>Aug 31</td><td>Foundry 3</td><td>Turnover</td>
              <td>Move-out inspection complete. Paint two rooms, replace bedroom carpet, full clean, re-key. Scope and bid sent Sep 1.</td>
              <td>Multiple</td><td><span className="pill flag">Approved Sep 2</span></td><td className="n">1,240.00</td>
            </tr>
            <tr className="total"><td colSpan={7}>Closed and billed in August</td><td className="n">393.04</td></tr>
            <tr className="total"><td colSpan={7}>Committed, appears on a later statement</td><td className="n">1,650.00</td></tr>
          </tbody>
          <caption>Recurring contracts — lawn, snow, and owner-paid utilities — are not work-ordered. They appear on the monthly statement under Grounds and Utilities. August recurring: $612.44.</caption>
        </table>
        </div>

        <div className="two">
          <div>
            <h3 className="sec">Turnover detail — Foundry 3</h3>
            <div className="scroll">
            <table style={{ minWidth: "0" }}>
              <thead><tr><th>Item</th><th>Charged to</th><th className="n">Amount</th></tr></thead>
              <tbody>
                <tr><td>Interior paint, 2 rooms</td><td>Owner (wear)</td><td className="n">520.00</td></tr>
                <tr><td>Bedroom carpet, 7 years old</td><td>Owner (wear)</td><td className="n">445.00</td></tr>
                <tr><td>Full clean</td><td>Owner</td><td className="n">185.00</td></tr>
                <tr><td>Re-key, 2 cylinders</td><td>Owner</td><td className="n">90.00</td></tr>
                <tr className="total"><td colSpan={2}>Owner cost</td><td className="n">1,240.00</td></tr>
                <tr><td>Interior door, punctured</td><td>Tenant deposit</td><td className="n">165.00</td></tr>
                <tr><td>Balcony debris removal</td><td>Tenant deposit</td><td className="n">75.00</td></tr>
                <tr className="total"><td colSpan={2}>Withheld from deposit</td><td className="n">240.00</td></tr>
              </tbody>
              <caption>Itemized statement and $985 refund issued to the former tenant Sep 9 — nine days after move-out, inside Wisconsin's 21-day requirement.</caption>
            </table>
            </div>
          </div>
          <div>
            <h3 className="sec">What we're watching</h3>
            <ul className="plain">
              <li><b>Tallmadge B water heater</b> — 11 years old, one failed component already. Budget $1,400–$1,800 and replace on your schedule rather than on a Sunday.</li>
              <li><b>Foundry roof</b> — original 1977 structure, shingles re-done roughly 2011. Two summers of granule loss visible. Worth a bid next spring for planning, not for work.</li>
              <li><b>Brinkman tub surround</b> — cracked caulk and a soft spot at the corner. Best fixed during the November vacancy, not around a tenant.</li>
              <li><b>Foundry 1 windows</b> — two sashes won't hold open. Low cost, no urgency, queued for the next vendor visit to that building.</li>
            </ul>
          </div>
        </div>

        <div className="rpt-foot">
          <span>DH Property Management · Maintenance log 08-2026</span>
          <span>Page 3 of 4</span>
        </div>
      </div>

      {/* ============ 4. TAX SUMMARY ============ */}
      <div className="sheet" id="tax">
        <div className="rpt-head">
          <div className="brand">
            <svg className="mark" viewBox="0 0 26 26" aria-hidden="true">
              <rect x="0" y="0" width="26" height="26" rx="6" fill="#EFB13B"/>
              <text x="13" y="18.5" textAnchor="middle" fontFamily="Bricolage Grotesque, Georgia, serif" fontSize="12.5" fontWeight="700" fill="#101B2B">DH</text>
            </svg>
            DH Property Management
          </div>
          <div className="meta">
            Kettle Ridge Holdings LLC<br />
            Tax year 2025 · cash basis<br />
            Issued January 14, 2026
          </div>
        </div>

        <div className="rpt-title">
          <span className="kind">Report 4 of 4</span>
          <h2>Year-end tax summary</h2>
          <p className="sub">Income and expense by property, mapped to Schedule E line numbers, for your CPA</p>
        </div>

        <h3 className="sec">Schedule E worksheet</h3>
        <div className="scroll">
        <table className="wide">
          <thead>
            <tr>
              <th>Sch. E</th><th>Line item</th>
              <th className="n">1042 Tallmadge</th><th className="n">318 Brinkman</th><th className="n">7 Foundry Ct</th><th className="n">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>3</td><td>Rents received</td><td className="n">32,100.00</td><td className="n">21,540.00</td><td className="n">54,275.00</td><td className="n">107,915.00</td></tr>
            <tr className="group"><td colSpan={6}>Expenses</td></tr>
            <tr><td>5</td><td>Advertising</td><td className="n">—</td><td className="n">—</td><td className="n">265.00</td><td className="n">265.00</td></tr>
            <tr><td>7</td><td>Cleaning and maintenance</td><td className="n">1,480.00</td><td className="n">640.00</td><td className="n">3,925.00</td><td className="n">6,045.00</td></tr>
            <tr><td>9</td><td>Insurance</td><td className="n">1,310.00</td><td className="n">980.00</td><td className="n">2,640.00</td><td className="n">4,930.00</td></tr>
            <tr><td>10</td><td>Legal and professional fees</td><td className="n">150.00</td><td className="n">150.00</td><td className="n">300.00</td><td className="n">600.00</td></tr>
            <tr><td>11</td><td>Management fees</td><td className="n">2,568.00</td><td className="n">1,723.20</td><td className="n">4,342.00</td><td className="n">8,633.20</td></tr>
            <tr><td>12</td><td>Mortgage interest paid to banks</td><td className="n">9,840.00</td><td className="n">7,210.00</td><td className="n">18,470.00</td><td className="n">35,520.00</td></tr>
            <tr><td>14</td><td>Repairs</td><td className="n">2,210.00</td><td className="n">1,065.00</td><td className="n">4,480.00</td><td className="n">7,755.00</td></tr>
            <tr><td>15</td><td>Supplies</td><td className="n">310.00</td><td className="n">180.00</td><td className="n">740.00</td><td className="n">1,230.00</td></tr>
            <tr><td>16</td><td>Taxes (real estate)</td><td className="n">4,620.00</td><td className="n">3,180.00</td><td className="n">7,940.00</td><td className="n">15,740.00</td></tr>
            <tr><td>17</td><td>Utilities</td><td className="n">640.00</td><td className="n">220.00</td><td className="n">4,860.00</td><td className="n">5,720.00</td></tr>
            <tr><td>19</td><td>Other — lawn, snow, licenses, inspections</td><td className="n">1,440.00</td><td className="n">960.00</td><td className="n">2,880.00</td><td className="n">5,280.00</td></tr>
            <tr className="total"><td>20</td><td>Total expenses</td><td className="n">24,568.00</td><td className="n">16,308.20</td><td className="n">50,842.00</td><td className="n">91,718.20</td></tr>
            <tr className="grand"><td>{"\u00a0"}</td><td>Income before depreciation</td><td className="n">7,532.00</td><td className="n">5,231.80</td><td className="n">3,433.00</td><td className="n">16,196.80</td></tr>
          </tbody>
          <caption>Line 18, depreciation, is deliberately blank. We don't hold your basis, placed-in-service dates, prior-year schedules, or any cost segregation study — your CPA carries those forward.</caption>
        </table>
        </div>

        <h3 className="sec">Cash reconciliation</h3>
        <div className="scroll">
        <table>
          <thead><tr><th>{"\u00a0"}</th><th className="n">Amount</th><th>Where it appears</th></tr></thead>
          <tbody>
            <tr><td>Rents collected by us</td><td className="n">107,915.00</td><td>Line 3</td></tr>
            <tr><td>Management fees withheld</td><td className="n neg">(8,633.20)</td><td>Line 11</td></tr>
            <tr><td>Operating costs paid by us on your behalf</td><td className="n neg">(26,895.00)</td><td>Lines 5, 7, 10, 14, 15, 17, 19</td></tr>
            <tr><td>Net change in operating reserve</td><td className="n neg">(500.00)</td><td>Not an expense</td></tr>
            <tr className="total"><td>Distributions deposited to you in 2025</td><td className="n">71,886.80</td><td>12 ACH deposits</td></tr>
            <tr><td>Items you paid directly, not through us</td><td className="n neg">(56,190.00)</td><td>Lines 9, 12, 16</td></tr>
            <tr className="grand"><td>Income before depreciation</td><td className="n">16,196.80</td><td>Ties to worksheet above</td></tr>
          </tbody>
          <caption>Insurance, mortgage interest and property taxes were paid by you directly. We include them here only because your CPA needs them on the same page; the amounts come from documents you provided, not from our records.</caption>
        </table>
        </div>

        <div className="two">
          <div>
            <h3 className="sec">Also in your January packet</h3>
            <ul className="plain">
              <li>Form 1099-MISC reporting the rents we collected for you</li>
              <li>Copies of 1099-NEC filings for vendors we paid on your behalf above the reporting threshold</li>
              <li>Twelve monthly statements with all vendor invoices, as one PDF per property</li>
              <li>A CSV of every transaction with date, unit, category and Schedule E line, for import</li>
              <li>Rent roll as of December 31 with deposits held per unit</li>
            </ul>
          </div>
          <div>
            <h3 className="sec">Worth a conversation with your CPA</h3>
            <ul className="plain">
              <li><b>Repairs vs improvements.</b> The $4,480 at Foundry includes a $2,150 bathroom item we coded as a repair. Your CPA may prefer to capitalize it.</li>
              <li><b>Foundry's thin margin.</b> $3,433 before depreciation on four units is mostly interest and taxes, not operations. Worth reviewing against the rents.</li>
              <li><b>Per-property books.</b> Every figure above is tracked by property, so a future cost segregation study or a 1031 has clean history behind it.</li>
            </ul>
          </div>
        </div>

        <div className="rpt-foot">
          <span>DH Property Management · 2025 tax summary · Not tax advice</span>
          <span>Page 4 of 4</span>
        </div>
      </div>

      <p className="disclaimer noprint">
        Sample documents for a prototype. Every owner, tenant, vendor, address and dollar figure is invented, though the four reports reconcile to one another. Wisconsin references — the 21-day security deposit return in particular — should be confirmed against current ATCP 134 language before any of this text is used with real clients.
      </p>
    </div>
  );
}
