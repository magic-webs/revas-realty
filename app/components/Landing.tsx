"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import GuideLeadForm from "./GuideLeadForm";

const MANIFESTO =
  "Most cities grow by accident. Dholera is being drawn first — every road, duct, canal and park placed on a plan before the first resident arrives.";

const STATS = [
  { n: 920, suffix: " km²", label: "Special Investment Region" },
  { n: 22, suffix: "", label: "Villages folded into the plan" },
  { n: 109, suffix: " km", label: "Ahmedabad–Dholera Expressway" },
  { n: 91000, suffix: " Cr", prefix: "₹", label: "Announced semiconductor fab" },
];

const PILLARS = [
  {
    no: "01",
    title: "A city drawn first",
    body: "India's first greenfield smart city, planned zone by zone — residential, commercial, industrial and green — inside the Delhi–Mumbai Industrial Corridor.",
  },
  {
    no: "02",
    title: "Roads, rail & runway",
    body: "A dedicated expressway to Ahmedabad, a greenfield international airport and proposed rail and metro links tie Dholera into the national grid.",
  },
  {
    no: "03",
    title: "Industry as the anchor",
    body: "Semiconductor, electronics, solar and manufacturing projects have been announced — jobs that eventually need homes, shops and services.",
  },
  {
    no: "04",
    title: "Utilities underground",
    body: "Utility ducts, storm-water drains, water and power networks and ICT cabling are designed city-wide, not patched in later.",
  },
  {
    no: "05",
    title: "Room to breathe",
    body: "Wide boulevards, green belts and a coastal location on the Gulf of Khambhat keep density low and the city open.",
  },
];

const TIMELINE = [
  { y: "2009", t: "DMIC & Dholera SIR notified", d: "The Gujarat government designates the Dholera Special Investment Region." },
  { y: "2015", t: "Master plan takes shape", d: "Town Planning Schemes define roads, zones and public land across the region." },
  { y: "Next", t: "Activation area builds out", d: "The first ~22 km² gets trunk infrastructure — roads, power, water, drainage." },
  { y: "Next", t: "Airport, fab & expressway", d: "Large anchor projects drive the next phase of demand. Timelines can slip — verify current status." },
];

const CHAPTERS = [
  "Reading the master plan & TPS numbers",
  "Land categories and zones, decoded",
  "A 7-point legal due-diligence checklist",
  "Budget, costs and the 5–10 year horizon",
  "Mistakes that cost first-time buyers",
];

export default function Landing() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-char", { yPercent: 110, duration: 1.1, stagger: 0.04 })
        .from(".hero-fade", { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.6");
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="grain">
      {/* NAV */}
      <header className="hero-header">
        <a href="#top" className="hero-brand" aria-label="Revas Realty home">
          <svg viewBox="0 0 24 26" aria-hidden="true"><path d="M3 22 13 5h9L12 22Z" fill="currentColor" /><path d="M13 5v9L8 22H0L10 5Z" fill="currentColor" opacity=".6" /></svg>
          <span>Revas <span className="hero-brand-light">Realty</span></span>
        </a>
        <nav className="hero-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#guide">Guide <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
      {/* HERO */}
      <section id="top" className="hero" aria-labelledby="hero-heading">
        <div className="hero-img">
          <Image src="/dholera/airport-3.jpg" alt="Aerial view of the Dholera International Airport runway under construction" fill preload sizes="100vw" className="hero-photo" />
        </div>
        <div className="hero-shade" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-fade hero-location">
            <span className="hero-place">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" /></svg>
              Gujarat, India
            </span>
            <span className="hero-coordinates">22.25°N | 72.20°E</span>
            <span className="hero-corridor">Delhi–Mumbai Industrial Corridor</span>
          </div>

          <h1 id="hero-heading" className="hero-title" aria-label="Dholera">
            {"DHOLERA".split("").map((c, i) => (
              <span key={i} className="hero-letter" aria-hidden="true">
                <span className="hero-char">{c}</span>
              </span>
            ))}
          </h1>
          <div className="hero-fade hero-rule" aria-hidden="true" />
          <p className="hero-fade hero-description">
            A smart city being built <em>from a blank map</em> — and a
            plain-spoken guide to buying land in it, without the hype.
          </p>

          <ul className="hero-fade hero-features">
            <li>
              <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 36h34M6 35V19l7-4v20m0 0V7l7-4 6 4v28m0-20 7 4v16M18 10v4m4-4v4m-4 4v4m4-4v4m-4 4v9m4-9v9M9 21v3m0 4v3m21-10v3m0 4v3" />
              </svg>
              <span>India&apos;s First<br />Greenfield Smart City</span>
            </li>
            <li>
              <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="m4 37 10-34m12 0 10 34M20 3v5m0 5v6m0 6v8" />
              </svg>
              <span>DMIC<br />Connectivity</span>
            </li>
            <li>
              <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 36h34M6 35V25h5v10m6 0V19h5v16m6 0V12h5v23M5 20l10-9 7 3L34 3m-7 0h7v7" />
              </svg>
              <span>Long-Term<br />Growth Potential</span>
            </li>
          </ul>

          <div className="hero-fade hero-actions">
            <a href="#guide" className="hero-button hero-button-primary">
              Get the Investment Guide <span aria-hidden="true">⟶</span>
            </a>
            <a href="#about" className="hero-button hero-button-secondary">Explore Dholera</a>
          </div>
        </div>
      </section>

      <div className="region-strip">
        <span>Gujarat’s next chapter</span>
        <span>Planned infrastructure</span>
        <span>Connected to opportunity</span>
        <a href="#ground">See the land <span aria-hidden="true">↗</span></a>
      </div>

      <section id="about" className="section-shell about-section" aria-labelledby="about-heading">
        <div className="section-heading">
          <div><p className="section-label">About Dholera</p><h2 id="about-heading">A city imagined.<br />A future taking shape.</h2></div>
          <div className="about-copy"><p>{MANIFESTO}</p><a className="text-link" href="#roadmap">Follow the roadmap <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <p className="stat-value">{s.prefix ?? ""}{s.n.toLocaleString("en-IN")}<span>{s.suffix}</span></p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ground" className="section-shell ground-section" aria-labelledby="ground-heading">
        <div className="section-heading">
          <div><p className="section-label">On the ground</p><h2 id="ground-heading">The plan. The land.<br />The bigger picture.</h2></div>
          <p className="section-intro">Look beyond the master plan. Explore the region’s infrastructure, open landscapes and the work already taking shape.</p>
        </div>
        <div className="land-gallery">
          <figure className="land-map">
            <div className="gallery-image"><Image src="/dholera/landuse.jpg" alt="Proposed land-use plan of Dholera Special Investment Region" fill sizes="(min-width: 900px) 38vw, 90vw" className="object-contain" /></div>
            <figcaption><span>The master plan</span><span>Land use & zoning</span></figcaption>
          </figure>
          <figure className="land-airport">
            <div className="gallery-image"><Image src="/dholera/airport-1.jpg" alt="Dholera International Airport construction in progress" fill sizes="(min-width: 900px) 52vw, 90vw" className="object-cover" /></div>
            <figcaption><span>A new gateway</span><span>Airport · Phase 1 works</span></figcaption>
          </figure>
          <figure className="land-wetland">
            <div className="gallery-image"><Image src="/dholera/wetland.jpg" alt="Painted storks in the Bhal wetlands near Dholera" fill sizes="(min-width: 900px) 28vw, 90vw" className="object-cover" /></div>
            <figcaption><span>Room to breathe</span><span>Bhal wetlands</span></figcaption>
          </figure>
          <figure className="land-road">
            <div className="gallery-image"><Image src="/dholera/sign.jpg" alt="Road sign showing distances to Dholera and Ahmedabad" fill sizes="(min-width: 900px) 22vw, 90vw" className="object-cover" /></div>
            <figcaption><span>The road ahead</span><span>Ahmedabad connection</span></figcaption>
          </figure>
        </div>
        <p className="image-credit">Images: Wikimedia Commons · CC BY-SA 3.0/4.0, CC BY 3.0 · Respective authors.</p>
      </section>

      <section className="pillars-section" aria-labelledby="pillars-heading">
        <div className="section-shell pillars-layout">
          <div className="pillars-heading"><p className="section-label">Built with intent</p><h2 id="pillars-heading">What makes<br />the plan different.</h2><p className="section-intro">A closer look at the foundations of a city designed from the ground up.</p><a className="text-link" href="#guide">Understand before you invest <span aria-hidden="true">↗</span></a></div>
          <div className="pillar-list">
            {PILLARS.map((p, i) => (
              <details className="pillar-detail" key={p.no} open={i === 0}>
                <summary><h3>{p.title}</h3><span className="detail-toggle" aria-hidden="true">+</span></summary>
                <p>{p.body}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="section-shell roadmap-section" aria-labelledby="roadmap-heading">
        <div className="roadmap-heading"><p className="section-label">The roadmap</p><h2 id="roadmap-heading">From a vision<br />to a neighbourhood.</h2><p className="section-intro">A city is built in chapters. Here’s how the plan is unfolding.</p><div className="roadmap-note">Every date is a plan, not a promise. Confirm project progress with official sources before making a decision.</div></div>
        <ol className="roadmap-list">
          {TIMELINE.map((t, i) => (
            <li key={t.t} className={i < 2 ? "milestone milestone-past" : "milestone"}>
              <span className="milestone-dot" aria-hidden="true" /><span className="milestone-date">{t.y === "Next" ? "Next chapter" : t.y}</span>
              <h3>{t.t}</h3><p>{t.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="guide" className="guide-section" aria-labelledby="guide-heading">
        <div className="section-shell guide-layout">
          <div className="guide-book">
            <Image src="/dholera/airport-3.jpg" alt="" fill sizes="(min-width: 900px) 32vw, 80vw" className="object-cover" />
            <div className="book-shade" />
            <div className="book-content"><span className="book-brand">Revas Realty</span><div><p className="section-label">A little clarity goes a long way.</p><h3>Dholera<br />Plot Buyer’s<br />Guide</h3></div><div className="book-bottom"><span>2026 edition</span><span>Free PDF · 2 pages</span></div></div>
          </div>
          <div className="guide-copy">
            <p className="section-label">The investment guide</p><h2 id="guide-heading">Your first step.<br />A better understanding.</h2>
            <p className="section-intro">Before you pay a token, know what to check, what to ask and when to walk away. A short, honest guide.</p>
            <ul className="guide-chapters">{CHAPTERS.map((c) => <li key={c}><span aria-hidden="true">✓</span>{c}</li>)}</ul>
            <GuideLeadForm />
          </div>
        </div>
      </section>
      </main>

      <footer className="section-shell site-footer">
        <div className="footer-top"><div><p className="section-label">Revas Realty</p><h2>Walk the plan first.</h2></div><a href="#top" className="back-top">Back to top <span aria-hidden="true">↑</span></a></div>
        <div className="footer-bottom"><p>© 2026 Revas Realty.<br />Perspective before property.</p><p>Information is for general awareness, not financial, legal or tax advice. Returns are not guaranteed. Property values and project timelines can change. Verify details with official sources and a qualified advocate before investing.</p><nav aria-label="Footer navigation"><a href="#about">About</a><a href="#roadmap">Roadmap</a><a href="#guide">The guide</a></nav></div>
      </footer>
    </div>
  );
}
