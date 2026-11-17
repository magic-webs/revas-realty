"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ---------- hero ----------
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".hero-char", { yPercent: 115, rotate: 6, duration: 1.4, stagger: 0.06 })
          .from(".hero-fade", { y: 24, opacity: 0, duration: 1, stagger: 0.12 }, "-=0.9")
          .from(".plan-line", { strokeDashoffset: (_, el: SVGGeometryElement) => el.getTotalLength?.() ?? 1000, duration: 2.4, stagger: 0.08, ease: "power2.inOut" }, 0);

        gsap.set(".plan-line", {
          strokeDasharray: (_, el: SVGGeometryElement) => el.getTotalLength?.() ?? 1000,
        });

        gsap.to(".hero-plan", {
          yPercent: 25, scale: 1.15, rotate: 8, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-title", {
          yPercent: -18, opacity: 0.2, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });

        // ---------- manifesto word reveal ----------
        gsap.fromTo(".m-word", { opacity: 0.12 }, {
          opacity: 1, stagger: 0.1, ease: "none",
          scrollTrigger: { trigger: ".manifesto", start: "top 70%", end: "bottom 60%", scrub: true },
        });

        // ---------- stats ----------
        gsap.utils.toArray<HTMLElement>(".stat").forEach((el) => {
          const num = el.querySelector<HTMLElement>(".stat-num")!;
          const target = Number(num.dataset.n);
          const pre = num.dataset.prefix ?? "";
          const suf = num.dataset.suffix ?? "";
          const o = { v: 0 };
          gsap.from(el, { y: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
          gsap.to(o, {
            v: target, duration: 2, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            onUpdate: () => (num.textContent = pre + Math.round(o.v).toLocaleString("en-IN") + suf),
          });
        });

        // ---------- headings ----------
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, { y: 70, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
        });

        // ---------- timeline ----------
        gsap.fromTo(".tl-line", { scaleY: 0 }, {
          scaleY: 1, ease: "none", transformOrigin: "top",
          scrollTrigger: { trigger: ".timeline", start: "top 60%", end: "bottom 70%", scrub: true },
        });
        gsap.utils.toArray<HTMLElement>(".tl-item").forEach((el) => {
          gsap.from(el, { x: -40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 80%" } });
        });

        // ---------- guide section ----------
        gsap.fromTo(".guide", { clipPath: "inset(8% 6% round 48px)" }, {
          clipPath: "inset(0% 0% round 0px)", ease: "none",
          scrollTrigger: { trigger: ".guide", start: "top 95%", end: "top 20%", scrub: true },
        });
        gsap.from(".guide-card", {
          y: 120, rotate: 10, opacity: 0, duration: 1.3, ease: "power4.out",
          scrollTrigger: { trigger: ".guide", start: "top 45%" },
        });
        gsap.from(".chapter", {
          x: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".chapters", start: "top 80%" },
        });
        gsap.to(".guide-card", {
          yPercent: -8, rotate: -2, ease: "none",
          scrollTrigger: { trigger: ".guide", start: "top 30%", end: "bottom top", scrub: true },
        });

        // ---------- footer ----------
        gsap.from(".cta-word", {
          yPercent: 110, stagger: 0.1, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: ".cta", start: "top 70%" },
        });
      });

      // horizontal pillars only on larger screens
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = document.querySelector<HTMLElement>(".h-track")!;
        const dist = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -dist(), ease: "none",
          scrollTrigger: {
            trigger: ".h-wrap", pin: true, scrub: 0.6, start: "top top",
            end: () => "+=" + dist(), invalidateOnRefresh: true,
          },
        });
        gsap.to(".h-progress", {
          scaleX: 1, ease: "none", transformOrigin: "left",
          scrollTrigger: { trigger: ".h-wrap", start: "top top", end: () => "+=" + dist(), scrub: true, invalidateOnRefresh: true },
        });
        gsap.utils.toArray<HTMLElement>(".pillar-no").forEach((el) => {
          gsap.from(el, {
            xPercent: 40, opacity: 0, ease: "none",
            scrollTrigger: { trigger: el, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true },
          });
        });
      });

      // magnetic download button
      const btn = document.querySelector<HTMLElement>(".magnet");
      if (btn && window.matchMedia("(hover: hover)").matches) {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
        const move = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const leave = () => { xTo(0); yTo(0); };
        btn.addEventListener("mousemove", move);
        btn.addEventListener("mouseleave", leave);
      }
    }, root);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="grain">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 mix-blend-difference md:px-10">
        <a href="#top" className="font-mono text-xs uppercase tracking-[0.25em] text-white">
          Revas <span className="opacity-60">Realty</span>
        </a>
        <nav className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white">
          <a href="#about" className="hidden hover:opacity-60 sm:block">About</a>
          <a href="#roadmap" className="hidden hover:opacity-60 sm:block">Roadmap</a>
          <a href="#guide" className="border-b border-white pb-0.5">Guide ↓</a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="hero relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-12 pt-32 md:px-10">
        <svg
          className="hero-plan pointer-events-none absolute -right-[20%] top-[-10%] h-[120%] w-[120%] md:right-[-5%] md:w-[75%]"
          viewBox="0 0 800 800" fill="none" stroke="var(--saffron)" strokeWidth="1.2" opacity="0.55"
        >
          {[60, 130, 200, 270, 340].map((r) => (
            <circle key={r} className="plan-line" cx="400" cy="400" r={r} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            return <line key={i} className="plan-line" x1={400 + Math.cos(a) * 60} y1={400 + Math.sin(a) * 60} x2={400 + Math.cos(a) * 340} y2={400 + Math.sin(a) * 340} />;
          })}
          <rect className="plan-line" x="40" y="40" width="720" height="720" strokeDasharray="4 8" />
          <path className="plan-line" d="M0 620 C 200 560, 300 700, 520 640 S 760 600, 800 560" stroke="var(--moss)" />
        </svg>

        <div className="hero-fade relative mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70">
          <span className="inline-flex items-center gap-2"><i className="size-1.5 animate-pulse rounded-full bg-saffron" /> Gujarat, India</span>
          <span>22.25°N · 72.20°E</span>
          <span>Delhi–Mumbai Industrial Corridor</span>
        </div>

        <h1 className="hero-title display relative text-[clamp(2.6rem,16.5vw,20rem)] font-light">
          {"DHOLERA".split("").map((c, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.06em]">
              <span className="hero-char inline-block origin-bottom-left">{c}</span>
            </span>
          ))}
        </h1>

        <div className="relative mt-8 grid items-end gap-8 md:grid-cols-[1.2fr_1fr]">
          <p className="hero-fade max-w-xl text-lg leading-relaxed text-bone/80 md:text-xl">
            A smart city being built <em className="display not-italic text-saffron">from a blank map</em> — and a
            plain-spoken guide to buying land in it, without the hype.
          </p>
          <div className="hero-fade flex flex-wrap gap-3 md:justify-end [&>a]:flex-1 [&>a]:text-center md:[&>a]:flex-none">
            <a href="#guide" className="rounded-full bg-saffron px-7 py-4 text-sm font-semibold text-ink transition hover:bg-bone">
              Get the investment guide
            </a>
            <a href="#about" className="rounded-full border border-bone/30 px-7 py-4 text-sm transition hover:border-bone">
              Explore Dholera
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-bone/15 bg-saffron py-4 text-ink">
        <div className="marquee flex w-max gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-[0.2em]">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-10" aria-hidden={k === 1}>
              {["Greenfield smart city", "Special Investment Region", "Expressway to Ahmedabad", "Semiconductor anchor", "Town Planning Schemes", "Gulf of Khambhat"].map((t) => (
                <span key={t}>{t} <span className="mx-4">✦</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* MANIFESTO */}
      <section id="about" className="manifesto px-6 py-28 md:px-10 md:py-56">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-saffron">( About Dholera )</p>
        <p className="display mt-10 max-w-6xl text-[clamp(1.9rem,6vw,5.8rem)] font-light !leading-[1.02]">
          {MANIFESTO.split(" ").map((w, i) => (
            <span key={i} className="m-word inline-block pr-[0.25em]">{w}</span>
          ))}
        </p>
      </section>

      {/* STATS */}
      <section className="px-6 pb-24 md:px-10 md:pb-40">
        <div className="grid border-t border-bone/20 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="stat border-b border-bone/20 py-12 sm:pr-8 lg:border-r lg:last:border-r-0">
              <div
                className="stat-num display text-5xl text-saffron sm:text-6xl md:text-7xl"
                data-n={s.n} data-suffix={s.suffix} data-prefix={s.prefix ?? ""}
              >
                {(s.prefix ?? "") + s.n.toLocaleString("en-IN") + s.suffix}
              </div>
              <p className="mt-4 max-w-[16ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-bone/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS — horizontal scroll */}
      <section className="h-wrap relative bg-ink-2 md:h-screen md:overflow-hidden">
        <div className="px-6 pt-24 md:absolute md:left-10 md:top-10 md:z-10 md:p-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-saffron">( Why it matters )</p>
        </div>
        <div className="h-track flex flex-col md:h-full md:w-max md:flex-row md:items-center">
          <div className="reveal flex flex-col justify-center px-6 py-16 md:h-full md:w-[60vw] md:px-10 md:py-0">
            <h2 className="display text-[clamp(2.8rem,8vw,8rem)] font-light">
              Five reasons <br /> the map <br /> is <em className="text-saffron">moving.</em>
            </h2>
          </div>
          {PILLARS.map((p) => (
            <article key={p.no} className="relative flex flex-col justify-end border-t border-bone/15 px-6 py-14 md:h-[70vh] md:w-[42vw] md:border-l md:border-t-0 md:px-12 md:py-12">
              <span className="pillar-no display absolute right-6 top-6 text-[8rem] text-bone/[0.06] md:text-[14rem]">{p.no}</span>
              <h3 className="display relative text-4xl font-light md:text-6xl">{p.title}</h3>
              <p className="relative mt-5 max-w-md text-base leading-relaxed text-bone/70 md:text-lg">{p.body}</p>
            </article>
          ))}
          <div className="hidden md:block md:w-[20vw]" />
        </div>
        <div className="absolute inset-x-10 bottom-8 hidden h-px bg-bone/15 md:block">
          <div className="h-progress h-full origin-left scale-x-0 bg-saffron" />
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="timeline px-6 py-24 md:px-10 md:py-40">
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
          <div className="md:sticky md:top-32 md:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-saffron">( Roadmap )</p>
            <h2 className="display reveal mt-6 text-[clamp(2.8rem,6vw,6rem)] font-light">
              From notification <br /> to <em className="text-saffron">neighbourhood.</em>
            </h2>
            <p className="reveal mt-6 max-w-sm text-bone/65">
              Large projects move slowly. Treat every date as a plan, not a promise, and confirm progress with official sources.
            </p>
          </div>
          <div className="relative pl-10">
            <div className="absolute left-0 top-0 h-full w-px bg-bone/15" />
            <div className="tl-line absolute left-0 top-0 h-full w-px bg-saffron" />
            {TIMELINE.map((t, i) => (
              <div key={i} className="tl-item relative pb-20 last:pb-0">
                <i className="absolute -left-[46px] top-2 size-3 rounded-full border-2 border-saffron bg-ink" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-saffron">{t.y}</span>
                <h3 className="display mt-2 text-3xl font-light md:text-5xl">{t.t}</h3>
                <p className="mt-3 max-w-lg text-bone/65">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT GUIDE */}
      <section id="guide" className="guide relative bg-bone px-6 py-24 text-ink md:px-10 md:py-44">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div className="guide-card relative mx-auto w-full max-w-md">
            <div className="aspect-[3/4] rotate-[-3deg] overflow-hidden rounded-sm bg-ink p-8 text-bone shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]">
              <svg className="absolute -bottom-10 -right-10 w-[110%] opacity-40" viewBox="0 0 400 400" fill="none" stroke="var(--saffron)" strokeWidth="1">
                {[40, 80, 120, 160, 200].map((r) => <circle key={r} cx="200" cy="200" r={r} />)}
              </svg>
              <div className="relative flex h-full flex-col justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-saffron">Revas Realty · Free guide</p>
                <div>
                  <h3 className="display text-6xl font-light">Dholera <br /> Plot <br /> Buyer&apos;s <br /> Guide</h3>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/60">PDF · 2 pages · Edition 2026</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-clay">( Investment guide )</p>
            <h2 className="display reveal mt-6 text-[clamp(2.8rem,6vw,6rem)] font-light">
              Read this <br /> <em className="text-clay">before</em> you <br /> pay a token.
            </h2>
            <p className="reveal mt-6 max-w-lg text-lg text-ink/70">
              A short, honest primer: what to check, what to ask, and what to walk away from. No guaranteed-return claims, no sign-up wall.
            </p>
            <ul className="chapters mt-8 border-t border-ink/20">
              {CHAPTERS.map((c, i) => (
                <li key={c} className="chapter flex gap-5 border-b border-ink/20 py-4">
                  <span className="font-mono text-xs text-clay">0{i + 1}</span>
                  <span className="text-base md:text-lg">{c}</span>
                </li>
              ))}
            </ul>
            <a
              href="/downloads/Dholera-Investment-Guide.pdf"
              download="Dholera-Investment-Guide.pdf"
              className="magnet group mt-10 inline-flex max-w-full items-center gap-4 rounded-full bg-ink py-3 pl-8 pr-3 text-bone transition hover:bg-clay"
            >
              <span className="font-semibold">Download the free guide</span>
              <span className="grid size-12 place-items-center rounded-full bg-saffron text-xl text-ink transition group-hover:rotate-[135deg]">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA / FOOTER */}
      <footer className="cta px-6 pb-10 pt-28 md:px-10 md:pt-40">
        <h2 className="display text-[clamp(2.8rem,13vw,12rem)] font-light">
          {["Walk the", "plan first."].map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span className="cta-word block">{line}</span>
            </span>
          ))}
        </h2>
        <div className="mt-16 flex flex-col justify-between gap-8 border-t border-bone/20 pt-8 md:flex-row">
          <a href="#top" className="font-mono text-xs uppercase tracking-[0.25em] text-saffron">↑ Back to top</a>
          <p className="max-w-2xl text-xs leading-relaxed text-bone/50">
            Disclaimer: Information is for general awareness only and is not financial, legal or tax advice. It does not promise
            any return. Property values can fall as well as rise, and project timelines change. Verify details with official
            sources (such as DICDL) and a qualified advocate before investing. © 2026 Revas Realty.
          </p>
        </div>
      </footer>
    </div>
  );
}
