import {
  Cover, Problem3Col, OKRBoard, SWOTGrid, Roadmap,
  CompetitiveMatrix, BigQuote, BeforeAfter, ValueProp,
  CustomerJourney, WeeklyStatus, SlideShell,
} from "../patterns";
import {
  KPITile, PersonCard, BigStat, Badge, StatusPill,
  BulletList, Arrow, Symbol, BrandFooter, DecorativeCorner, SectionLabel,
} from "../components";
import { Icon } from "../icons";
import { Logo } from "../logos";

export function Showcase() {
  return (
    <div className="bg-th-gray-3 min-h-screen p-6 space-y-12">
      <header className="max-w-5xl mx-auto">
        <h1 className="text-th-title font-heading font-bold text-th-black">The Heart Design System</h1>
        <p className="mt-2 text-th-h2 font-light text-th-gray-1">
          Tokens, widgets, and slide patterns generated from the deck-builder plugin.
        </p>
        <p className="mt-2 text-th-supporting text-th-gray-1">
          Mirrors slide 11 of <code>blank.pptx</code> — Wytyczne: Rekomendowane czcionki, kształty i kolory.
        </p>
      </header>

      {/* ── Brand guideline section — replicates the canonical slide ─── */}
      <section className="max-w-5xl mx-auto bg-white rounded-md p-8 relative">
        <SectionLabel>Wytyczne</SectionLabel>
        <h2 className="mt-2 text-th-h1 font-heading font-bold text-th-black">
          Rekomendowane czcionki, kształty i kolory
        </h2>

        <div className="mt-8 grid grid-cols-4 gap-6">
          {/* Fonts */}
          <div>
            <h3 className="text-th-h2 font-heading font-semibold text-th-primary">Fonts</h3>
            <p className="mt-1 text-th-caption text-th-gray-1">
              Mniejsze czcionki jedynie w ostateczności — slajdy raportowe
            </p>
            <div className="mt-3 space-y-1 font-body">
              <div style={{ fontSize: 10 }}>Raleway (10)</div>
              <div style={{ fontSize: 12 }}>Raleway (12)</div>
              <div style={{ fontSize: 14 }}>Raleway (14)</div>
              <div style={{ fontSize: 16 }}>Raleway (16)</div>
            </div>
          </div>

          {/* Icons */}
          <div>
            <h3 className="text-th-h2 font-heading font-semibold text-th-primary">Icons</h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <Icon name="building-2" size={36} />
              <Icon name="shield"     size={36} />
              <Icon name="users"      size={36} />
              <Icon name="trending-up" size={36} />
              <Icon name="target"     size={36} />
              <Icon name="rocket"     size={36} />
            </div>
            <p className="mt-2 text-th-caption text-th-gray-1">
              41 icons available — see <code>icon-manifest.json</code>
            </p>
          </div>

          {/* Bullets */}
          <div>
            <h3 className="text-th-h2 font-heading font-semibold text-th-primary">Bullets</h3>
            <div className="mt-3 space-y-4">
              <BulletList
                kind="filled-circle"
                items={[{ text: "The Heart", children: [{ text: "Lorem ipsum" }] }]}
              />
              <BulletList
                kind="filled-square"
                items={[{ text: "The Heart", children: [{ text: "Lorem ipsum" }] }]}
              />
              <BulletList
                kind="numbered"
                items={[
                  { text: "The Heart", children: [{ text: "Lorem ipsum" }] },
                  { text: "The Heart", children: [{ text: "Lorem ipsum" }] },
                ]}
              />
            </div>
          </div>

          {/* Arrows + Symbols */}
          <div>
            <h3 className="text-th-h2 font-heading font-semibold text-th-primary">Arrows</h3>
            <div className="mt-3 space-y-3">
              <Arrow style="solid" length={140} />
              <Arrow style="dotted" length={140} />
            </div>
            <h3 className="mt-6 text-th-h2 font-heading font-semibold text-th-black">Symbols</h3>
            <div className="mt-3 flex gap-3 text-2xl">
              <Symbol kind="check" size={26} />
              <Symbol kind="cross" size={26} />
              <Symbol kind="dot"   size={26} />
            </div>
          </div>
        </div>

        {/* Colour palette — matches the bottom half of the guideline slide */}
        <div className="mt-12">
          <h3 className="sr-only">Colour palette</h3>
          <div className="grid grid-cols-8 gap-4">
            {[
              ["Red",       "var(--th-color-primary)",   "#e61b25"],
              ["Black",     "var(--th-color-black)",     "#000000"],
              ["Gray 1",    "var(--th-color-gray-1)",    "#969696"],
              ["Gray 2",    "var(--th-color-gray-2)",    "#e6e6e6"],
              ["Green",     "var(--th-color-green)",     "#13a538"],
              ["Red light", "var(--th-color-red-light)", "#e9787e"],
              ["Blue",      "var(--th-color-blue)",      "#0056a4"],
              ["Gray 3",    "var(--th-color-gray-3)",    "#f0f0f0"],
            ].map(([name, css, hex]) => (
              <div key={hex} className="flex flex-col items-center text-center gap-2">
                <div
                  className="w-20 h-20 rounded-full border border-th-gray-2"
                  style={{ backgroundColor: css }}
                />
                <div className="text-th-supporting font-heading font-semibold text-th-black">{name}</div>
                <div className="text-th-caption text-th-gray-1">{hex}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 text-center text-th-supporting font-heading font-semibold">
            <div className="text-th-primary">← Main colors →</div>
            <div className="text-th-gray-1">← Accents if needed →</div>
          </div>
        </div>
      </section>

      {/* ── Logo lock-ups — 3 variants × 3 themes ─────────────────── */}
      <section className="max-w-5xl mx-auto bg-white rounded-md p-8">
        <SectionLabel>Brand assets</SectionLabel>
        <h2 className="mt-2 text-th-h1 font-heading font-bold text-th-black">Logotypes</h2>
        <p className="mt-1 text-th-supporting text-th-gray-1">
          Three lock-ups — pick the one that fits the surface. Aspect ratios are real,
          derived from the source PNGs, so the logo is never stretched.
        </p>

        {/* Color (default) — light surface */}
        <div className="mt-8 grid grid-cols-3 gap-6 items-center">
          <div className="flex flex-col items-center gap-3 p-6 rounded-md border border-th-gray-2 bg-white">
            <Logo variant="horizontal" height={48} />
            <div className="text-th-caption text-th-gray-1">horizontal · 2.86 : 1</div>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-md border border-th-gray-2 bg-white">
            <Logo variant="vertical" height={96} />
            <div className="text-th-caption text-th-gray-1">vertical · 1.24 : 1</div>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-md border border-th-gray-2 bg-white">
            <Logo variant="icon" height={64} />
            <div className="text-th-caption text-th-gray-1">icon · 0.66 : 1</div>
          </div>
        </div>

        {/* White — dark surface */}
        <div className="mt-4 grid grid-cols-3 gap-6 items-center">
          <div className="flex flex-col items-center gap-3 p-6 rounded-md bg-th-black">
            <Logo variant="horizontal" theme="white" height={48} />
            <div className="text-th-caption text-white opacity-70">theme="white"</div>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-md bg-th-black">
            <Logo variant="vertical" theme="white" height={96} />
            <div className="text-th-caption text-white opacity-70">theme="white"</div>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-md bg-th-black">
            <Logo variant="icon" theme="white" height={64} />
            <div className="text-th-caption text-white opacity-70">theme="white"</div>
          </div>
        </div>

        {/* Black — monochrome for photo overlays */}
        <div className="mt-4 grid grid-cols-3 gap-6 items-center">
          <div className="flex flex-col items-center gap-3 p-6 rounded-md bg-th-gray-3 border border-th-gray-2">
            <Logo variant="horizontal" theme="black" height={48} />
            <div className="text-th-caption text-th-gray-1">theme="black"</div>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-md bg-th-gray-3 border border-th-gray-2">
            <Logo variant="vertical" theme="black" height={96} />
            <div className="text-th-caption text-th-gray-1">theme="black"</div>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-md bg-th-gray-3 border border-th-gray-2">
            <Logo variant="icon" theme="black" height={64} />
            <div className="text-th-caption text-th-gray-1">theme="black"</div>
          </div>
        </div>

        <div className="mt-6 text-th-caption text-th-gray-1">
          Usage: <code>{`<Logo variant="horizontal" height={32} />`}</code> — pass <em>one</em>
          of <code>width</code> / <code>height</code>; the other is computed from the
          real aspect ratio. <code>theme</code> defaults to <code>"color"</code>.
        </div>
      </section>

      <header className="max-w-5xl mx-auto">
        <h2 className="text-th-h1 font-heading font-bold text-th-black">Component & pattern catalogue</h2>
        <p className="mt-1 text-th-supporting text-th-gray-1">
          Every shape available to the deck-builder + Claude Design.
        </p>
      </header>

      <section className="max-w-5xl mx-auto">
        <h2 className="text-th-h1 font-heading font-semibold mb-4">Atomic widgets</h2>
        <div className="grid grid-cols-3 gap-6 bg-white p-6 rounded-md">
          <KPITile value="127k" label="Monthly active users" trend="+18%" trendDirection="up" />
          <KPITile value="94%"  label="Month-1 retention"     trend="+3pp" trendDirection="up" />
          <KPITile value="12d"  label="Time to value"          trend="-3d"  trendDirection="down" />
        </div>
        <div className="mt-6 flex gap-3">
          <StatusPill status="done" />
          <StatusPill status="in_progress" />
          <StatusPill status="at_risk" />
          <StatusPill status="blocked" />
          <StatusPill status="planned" />
          <Badge>Custom badge</Badge>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-6 bg-white p-6 rounded-md">
          <PersonCard name="Jan Andrzejczuk" role="Venture Architect"
            bio="7y in venture building at Digital Gateways, AIS Gateway." />
          <PersonCard name="Tomasz Czapliński" role="Co-founder"
            bio="Managing Partner at SpeedUp VC; investment and BD lead." />
          <PersonCard name="Tomasz Wilczak" role="Product Owner"
            bio="6y in product strategy across online banking and education." />
          <PersonCard name="Bartosz Gembicki" role="COO"
            bio="10y in operations management at Nomad Electric and Polenergia." />
        </div>
        <div className="mt-6 bg-white p-10 rounded-md">
          <BigStat value="€4.2B" caption="uncaptured loyalty revenue in CEE" />
        </div>
      </section>

      <section className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-th-h1 font-heading font-semibold">Slide patterns</h2>

        <Cover title="ScanPay" subtitle="Dining kiosk in your mobile" />

        <Problem3Col
          title="Labor shortages push restaurants to digitise"
          subtitle="Rising costs and changing expectations meet a tightening labour market"
          columns={[
            { heading: "68%", body: "of customers prefer self-service" },
            { heading: "97%", body: "of restaurants cite rising costs"  },
            { heading: "45%", body: "of operators understaffed"          },
          ]}
          pageNumber={3} totalPages={13}
        />

        <OKRBoard
          title="Q4 OKR scorecard"
          objective="Become the default payment method for Polish QSRs by end of Q4."
          keyResults={[
            { label: "Active restaurants",  current: "117",     target: "200",       status: "on_track" },
            { label: "Monthly recurring revenue", current: "98k PLN", target: "150k PLN", status: "at_risk"  },
            { label: "NPS",                 current: "62",      target: ">50",      status: "done"     },
          ]}
        />

        <SWOTGrid
          title="Where we win and where we are exposed"
          strengths={["Self-checkout 4× faster than competition", "POS integrations cover 80% of market"]}
          weaknesses={["Brand recognition still low", "Only 2 enterprise deals closed"]}
          opportunities={["EU regulation forcing transparency in tips", "12% CAGR food service market"]}
          threats={["Square entering CEE in 2027", "Rising payment processing fees"]}
        />

        <Roadmap
          title="Roadmap to Series A"
          milestones={[
            { date: "Q2 2025", label: "Slovakia pilot",       status: "done" },
            { date: "Q3 2025", label: "Czech expansion",      status: "in_progress" },
            { date: "Q4 2025", label: "200 restaurants live", status: "in_progress" },
            { date: "Q1 2026", label: "Series A close",       status: "planned" },
          ]}
        />

        <CompetitiveMatrix
          title="Where we beat the incumbents"
          columns={["ScanPay", "SumUp", "Square", "Glovo Pay"]}
          rows={[
            { label: "Self-order menu",  values: [true, false, false, true] },
            { label: "Bill splitting",   values: [true, false, true,  false] },
            { label: "POS integrations", values: ["6", "12", "4", "2"] },
          ]}
        />

        <BigQuote
          quote="Banks spend 14 months building what we ship in 4 weeks."
          attribution="Head of Innovation, Top 5 EU bank"
        />

        <BeforeAfter
          title="What changes for a restaurant on day one"
          before={{ heading: "Before", bullets: ["8-min checkout", "Cash tips lost", "POS reprogramming"] }}
          after={{ heading: "After", bullets: ["30s self-pay", "Cashless tips routed", "Menu pushes live"] }}
        />

        <ValueProp
          title="Three sides of the value prop"
          segments={[
            { name: "For customers",   pain: "Long wait.",          gain: "30-second checkout." },
            { name: "For restaurants", pain: "Staff shortage.",     gain: "Higher turnover." },
            { name: "For waiters",     pain: "Cash tips in pocket.", gain: "Cashless tips routed." },
          ]}
        />

        <CustomerJourney
          title="How a guest experiences ScanPay"
          steps={[
            { label: "Discover", body: "Sees QR on the table." },
            { label: "Browse",   body: "Filters menu in 10s." },
            { label: "Order",    body: "Adds items, sends to kitchen." },
            { label: "Pay",      body: "Splits, tips, leaves." },
          ]}
        />

        <WeeklyStatus
          title="Workstream health"
          streams={[
            { name: "Product",     status: "on_track",    summary: "Beta shipped to 12 design partners." },
            { name: "Sales",       status: "at_risk",     summary: "Two enterprise deals slipped to Q2." },
            { name: "Engineering", status: "done",        summary: "Migration complete." },
            { name: "Marketing",   status: "in_progress", summary: "Content engine 3 pieces / week." },
          ]}
        />
      </section>
    </div>
  );
}
