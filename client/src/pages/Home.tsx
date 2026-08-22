import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  MoveUpRight,
  Plus,
  X,
} from "lucide-react";
import { ProjectInquiryExperience } from "@/components/project-inquiry/ProjectInquiryExperience";
import { SYNRA_TEAM } from "@/data/company";

const HERO_URL = "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1800&q=86";
const HUSH_URL = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=86";
const TIDEWELL_URL = "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1800&q=86";
const NORTHLINE_URL = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=86";
const SIGNAL_URL = "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=86";
const MARK_URL = "/synra-mark.svg";

type ServiceId = "build" | "grow" | "manage" | "automate";

const services: Record<
  ServiceId,
  { number: string; title: string; intro: string; items: string[]; accent: string }
> = {
  build: {
    number: "01",
    title: "BUILD",
    intro: "Digital foundations with a point of view — made to be useful, memorable, and ready to grow.",
    items: ["Websites", "E-commerce", "Landing pages", "Branding"],
    accent: "peach",
  },
  grow: {
    number: "02",
    title: "GROW",
    intro: "The systems that help the right people find you, trust you, and choose you.",
    items: ["SEO", "Local SEO", "Google Business", "Instagram", "LinkedIn", "Content", "Analytics"],
    accent: "pink",
  },
  manage: {
    number: "03",
    title: "MANAGE",
    intro: "A steady hand after launch — keeping your digital presence sharp, visible, and moving.",
    items: ["Website maintenance", "SEO management", "Social media", "Content", "Performance monitoring"],
    accent: "terra",
  },
  automate: {
    number: "04",
    title: "AUTOMATE",
    intro: "Practical intelligence for the work that repeats, connects, and should happen without chasing.",
    items: ["AI agents", "AI automation", "Business workflows", "Integrations"],
    accent: "coal",
  },
};

const projects = [
  {
    title: "Hush House",
    type: "Hospitality / Brand + Web",
    description: "A quieter digital front door for a guesthouse built around pause, place, and considered detail.",
    image: HUSH_URL,
    number: "01",
  },
  {
    title: "Tidewell",
    type: "Wellness / E-commerce",
    description: "A tactile commerce system that turns a botanical ritual into a clear, confident customer journey.",
    image: TIDEWELL_URL,
    number: "02",
  },
  {
    title: "Northline",
    type: "Engineering / Strategy + SEO",
    description: "A sharper signal for a technical consultancy — translating deep expertise into discoverable momentum.",
    image: NORTHLINE_URL,
    number: "03",
  },
];

const insights = [
  { category: "SEO", title: "Visibility is a product decision, not a final polish.", date: "04.06.26" },
  { category: "AI", title: "Where automation earns its place in a growing business.", date: "21.05.26" },
  { category: "Websites", title: "The useful website: less brochure, more working system.", date: "08.05.26" },
];

function LivingAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.2 : 1.6);
    const pointer = { x: 0.5, y: 0.45, targetX: 0.5, targetY: 0.45 };
    const blobs = mobile ? 3 : 5;
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = !document.hidden;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paint = (time = 0) => {
      const t = time * 0.0001;
      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;
      context.clearRect(0, 0, width, height);

      for (let index = 0; index < blobs; index += 1) {
        const phase = index * 1.76;
        const x = width * (0.14 + ((index * 0.23) % 0.75)) + Math.sin(t * (index + 1.2) + phase) * width * 0.08 + (pointer.x - 0.5) * width * 0.025;
        const y = height * (0.15 + ((index * 0.19) % 0.7)) + Math.cos(t * (index + 1.1) + phase) * height * 0.08 + (pointer.y - 0.5) * height * 0.02;
        const radius = Math.min(width, height) * (0.16 + (index % 2) * 0.07);
        const colors = ["rgba(255,190,152,0.14)", "rgba(240,187,180,0.12)", "rgba(234,120,91,0.055)", "rgba(81,85,89,0.035)", "rgba(255,247,242,0.22)"];
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, colors[index]);
        gradient.addColorStop(1, "rgba(247,233,222,0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }

      context.save();
      context.globalAlpha = mobile ? 0.2 : 0.28;
      context.strokeStyle = "#EA785B";
      context.lineWidth = 0.65;
      for (let index = 0; index < (mobile ? 6 : 12); index += 1) {
        const offset = ((index / 12) * width + Math.sin(t * 1.4 + index) * 24) % (width + 180) - 90;
        context.beginPath();
        context.moveTo(offset, -40);
        context.bezierCurveTo(offset + width * 0.08, height * 0.3, offset - width * 0.08, height * 0.65, offset + width * 0.06, height + 40);
        context.stroke();
      }
      context.restore();

      if (!reduced && running) frame = requestAnimationFrame(paint);
    };

    const visibilityChange = () => {
      running = !document.hidden;
      cancelAnimationFrame(frame);
      if (running && !reduced) frame = requestAnimationFrame(paint);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.targetX = event.clientX / window.innerWidth;
      pointer.targetY = event.clientY / window.innerHeight;
    };

    resize();
    paint();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", visibilityChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", visibilityChange);
    };
  }, []);

  return (
    <div className="synra-atmosphere" style={{ backgroundImage: `url(${HERO_URL})` }} aria-hidden="true">
      <div className="synra-atmosphere__wash" />
      <canvas ref={canvasRef} className="synra-atmosphere__canvas" />
      <div className="synra-atmosphere__grain" />
    </div>
  );
}

function Reveal({ children, delay = 0, className = "", y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ number, children, light = false }: { number: string; children: ReactNode; light?: boolean }) {
  return (
    <div className={`section-label ${light ? "section-label--light" : ""}`}>
      <span className="section-label__number">{number}</span>
      <span className="section-label__line" />
      <span>{children}</span>
    </div>
  );
}

function MagneticButton({ children, dark = false, className = "", onClick }: { children: ReactNode; dark?: boolean; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!ref.current || event.pointerType === "touch") return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.1;
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.1;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`magnetic-link ${dark ? "magnetic-link--dark" : ""} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight size={16} strokeWidth={1.7} />
    </button>
  );
}

function MagneticLink({ href, children, dark = false, className = "", onClick }: { href: string; children: ReactNode; dark?: boolean; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (!ref.current || event.pointerType === "touch") return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.1;
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.1;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`magnetic-link ${dark ? "magnetic-link--dark" : ""} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight size={16} strokeWidth={1.7} />
    </a>
  );
}

function CustomCursor({ mode, x, y, visible }: { mode: string; x: number; y: number; visible: boolean }) {
  return (
    <div className={`custom-cursor custom-cursor--${mode} ${visible ? "is-visible" : ""}`} style={{ left: x, top: y }} aria-hidden="true">
      {mode === "view" && <span>view</span>}
      {mode === "link" && <ArrowUpRight size={13} />}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState<ServiceId>("build");
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, mode: "default" });
  const [projectInquiryOpen, setProjectInquiryOpen] = useState(false);
  const [inquiryInitialService, setInquiryInitialService] = useState<string | undefined>(undefined);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const savedScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
      let frame = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      const parallaxElements = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      parallaxElements.forEach((element, index) => {
        gsap.to(element, {
          yPercent: index % 2 === 0 ? 6 : -6,
          ease: "none",
          scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      });

      return () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        window.removeEventListener("scroll", onScroll);
      };
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY, visible: true }));
    const onLeave = () => setCursor((current) => ({ ...current, visible: false }));
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const setCursorMode = (mode: string) => setCursor((current) => ({ ...current, mode }));
  const closeMenu = () => setMenuOpen(false);

  const openProjectInquiry = (initialService?: string) => {
    savedScrollY.current = window.scrollY;
    setInquiryInitialService(initialService);
    setProjectInquiryOpen(true);
    closeMenu();
  };

  const closeProjectInquiry = () => {
    setProjectInquiryOpen(false);
    // Restore scroll position after modal closes
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
    });
  };

  return (
    <>
      <LivingAtmosphere />
      <div className="synra-site">
      <CustomCursor {...cursor} />

      {/* Project Inquiry Experience */}
      <ProjectInquiryExperience
        isOpen={projectInquiryOpen}
        onClose={closeProjectInquiry}
        initialService={inquiryInitialService}
      />

      <header className={`site-header glass-surface ${scrolled ? "site-header--scrolled" : ""}`}>
        <a href="#top" className="brand-lockup" aria-label="SYNRA home" onPointerEnter={() => setCursorMode("link")} onPointerLeave={() => setCursorMode("default")}>
          <img src={MARK_URL} alt="" className="brand-mark" />
          <span className="brand-wordmark">S<span className="wordmark-y">Y</span>NRA</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {[
            ["Work", "#work"],
            ["Services", "#services"],
            ["About", "#about"],
            ["Insights", "#insights"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a key={href} href={href} onPointerEnter={() => setCursorMode("link")} onPointerLeave={() => setCursorMode("default")}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <MagneticButton className="header-cta glass-surface" onClick={() => openProjectInquiry()}>Start a project</MagneticButton>
          <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={21} strokeWidth={1.6} /> : <Menu size={21} strokeWidth={1.6} />}
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__top">
          <span>Index / 00</span>
          <button type="button" onClick={closeMenu} aria-label="Close menu"><X size={22} strokeWidth={1.5} /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {[
            ["Work", "#work"],
            ["Services", "#services"],
            ["About", "#about"],
            ["Insights", "#insights"],
            ["Contact", "#contact"],
          ].map(([label, href], index) => (
            <a key={href} href={href} onClick={closeMenu}>
              <span>0{index + 1}</span>{label}<ArrowUpRight size={22} strokeWidth={1.4} />
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="magnetic-link mt-8 self-start"
          style={{ fontSize: "0.75rem" }}
          onClick={() => openProjectInquiry()}
        >
          <span>Start a project</span>
          <ArrowUpRight size={16} strokeWidth={1.7} />
        </button>
        <p>Synergy. Strategy. Results.</p>
      </div>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-copy">
              <Reveal y={18}>
                <div className="hero-identity"><div className="hero-identity__mark"><img src={MARK_URL} alt="" /><span className="hero-identity__cross" /></div><div><span className="hero-identity__wordmark">SYNRA</span><span className="hero-identity__descriptor">Digital growth systems / 2026</span></div></div>
                <p className="eyebrow">Independent digital growth studio / 2026</p>
              </Reveal>
              <h1 className="hero-title" aria-label="We build your digital growth.">
                <span className="hero-line"><span>We build</span></span>
                <span className="hero-line"><span>your digital</span></span>
                <span className="hero-line hero-line--accent"><span>growth<span className="hero-dot">.</span></span></span>
              </h1>
              <Reveal delay={0.22} y={18}>
                <p className="hero-lede">Websites, SEO and digital growth systems that help businesses get discovered, attract customers and grow.</p>
              </Reveal>
              <Reveal delay={0.3} y={18}>
                <div className="hero-actions">
                  <MagneticButton className="glass-surface" onClick={() => openProjectInquiry()}>Start a project</MagneticButton>
                  <a href="#work" className="text-link" onPointerEnter={() => setCursorMode("link")} onPointerLeave={() => setCursorMode("default")}>Explore our work <ArrowDownRight size={16} strokeWidth={1.7} /></a>
                </div>
              </Reveal>
              <div className="hero-footnote"><span>Based in the real world</span><span>Working everywhere</span></div>
              <div className="hero-model-rail" aria-label="SYNRA operating model"><span>Build</span><i /> <span>Get found</span><i /> <span>Get customers</span><i /> <span>Grow</span></div>
            </div>

            <div className="hero-art" data-parallax>
              <img src={HERO_URL} alt="Abstract warm editorial sculpture showing four forms converging into one path" />
              <div className="hero-art__veil" />
              <div className="hero-art__caption glass-surface"><span>01 / 04</span><span>Growth, in motion</span></div>
              <div className="hero-art__orb" />
            </div>
          </div>
          <div className="hero-scroll"><span>Scroll to explore</span><span className="hero-scroll__line" /></div>
        </section>

        <section className="journey-section section-pad" id="journey">
          <div className="journey-intro section-grid">
            <Reveal><SectionLabel number="01">The SYNRA model</SectionLabel></Reveal>
            <Reveal delay={0.1} className="journey-intro__copy">
              <h2>From first impression<br />to <em>forward motion.</em></h2>
              <p>Most businesses do not need more disconnected tactics. They need the pieces to work together — so every new touchpoint makes the next one stronger.</p>
            </Reveal>
          </div>

          <div className="journey-rail" aria-label="The SYNRA growth journey">
            <div className="journey-rail__track" />
            {[
              ["BUILD", "Websites · E-commerce · Branding", "A digital foundation with a clear point of view."],
              ["GET FOUND", "SEO · Google · Instagram · LinkedIn", "Make the right people aware you exist."],
              ["GET CUSTOMERS", "Content · Conversion · Analytics", "Turn attention into a reason to choose you."],
              ["GROW", "Management · Optimization · Automation", "Keep learning, improving, and moving forward."],
            ].map(([title, items, copy], index) => (
              <Reveal key={title} delay={index * 0.08} className="journey-step">
                <span className="journey-step__number">0{index + 1}</span>
                <div className="journey-step__mark">{index === 0 ? "↗" : index === 1 ? "⌁" : index === 2 ? "＋" : "∞"}</div>
                <div className="journey-step__body"><h3>{title}</h3><p className="journey-step__items">{items}</p><p>{copy}</p></div>
                <ArrowUpRight className="journey-step__arrow" size={19} strokeWidth={1.5} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="work-section section-pad" id="work">
          <div className="work-heading section-grid">
            <Reveal><SectionLabel number="02">Selected work</SectionLabel></Reveal>
            <Reveal delay={0.1} className="work-heading__copy">
              <h2>Good work<br />creates <em>gravity.</em></h2>
              <p>We make digital experiences that give a business somewhere to go next — and give its audience a reason to stay.</p>
              <div className="utility-trace"><span>Phase 02 / get customers</span><span>Outcome / stronger reasons to choose</span></div>
            </Reveal>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.08} className={`project-card project-card--${index + 1}`}>
                <a href="#contact" className="project-card__link" onPointerEnter={() => setCursorMode("view")} onPointerLeave={() => setCursorMode("default")}>
                  <div className="project-card__image-wrap">
                    <img src={project.image} alt={`${project.title} project visual`} className="project-card__image" loading="lazy" />
                    <div className="project-card__overlay glass-surface"><span>View case study</span><ArrowUpRight size={20} strokeWidth={1.4} /></div>
                  </div>
                  <div className="project-card__meta"><span>{project.number} / 03</span><span>{project.type}</span></div>
                  <div className="project-card__details"><h3>{project.title}</h3><p>{project.description}</p><span className="project-card__arrow"><ArrowUpRight size={18} strokeWidth={1.5} /></span></div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="section-grid services-heading">
            <Reveal><SectionLabel number="03">What we do</SectionLabel></Reveal>
            <Reveal delay={0.1} className="services-heading__copy"><h2>One partner.<br /><em>Four ways</em> forward.</h2><p>Start where you are. Build what is missing. Keep the whole system in view.</p><div className="utility-trace"><span>System / 04 capabilities</span><span>Build → grow → manage → automate</span></div></Reveal>
          </div>
          <div className="services-layout">
            <div className="service-tabs" role="tablist" aria-label="SYNRA services">
              {(Object.entries(services) as [ServiceId, typeof services[ServiceId]][]).map(([id, service]) => (
                <button key={id} type="button" role="tab" aria-selected={activeService === id} className={`service-tab ${activeService === id ? "service-tab--active" : ""}`} onClick={() => setActiveService(id)}>
                  <span className="service-tab__number">{service.number}</span><span>{service.title}</span><ArrowRight size={18} strokeWidth={1.4} />
                </button>
              ))}
            </div>
            <motion.div key={activeService} className={`service-panel glass-surface service-panel--${services[activeService].accent}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}>
              <div className="service-panel__top"><span>{services[activeService].number} / 04</span><span>Capability / {activeService}</span></div>
              <h3>{services[activeService].title}</h3>
              <p>{services[activeService].intro}</p>
              <div className="service-panel__outcome"><span>What it changes</span><strong>{activeService === "build" ? "A digital presence people remember." : activeService === "grow" ? "A clearer path to discovery." : activeService === "manage" ? "More consistency after launch." : "More capacity for the work ahead."}</strong></div>
              <div className="service-panel__list">{services[activeService].items.map((item) => <span key={item}><Check size={15} strokeWidth={1.8} />{item}</span>)}</div>
              <button
                type="button"
                className="service-panel__link"
                onClick={() => openProjectInquiry(services[activeService].title === "BUILD" ? "Website" : services[activeService].title === "GROW" ? "SEO" : services[activeService].title === "MANAGE" ? "Website Maintenance" : "AI Automation")}
              >
                Talk to us about {activeService} <ArrowUpRight size={18} strokeWidth={1.5} />
              </button>
            </motion.div>
          </div>
        </section>

        <section className="philosophy-section" ref={philosophyRef}>
          <div className="philosophy-section__inner section-pad">
            <div className="philosophy-section__label"><SectionLabel number="04" light>Our north star</SectionLabel></div>
            <div className="philosophy-copy">
              <p className="philosophy-kicker">Design, technology and growth — brought into the same room.</p>
              <h2><span>Synergy<span className="philosophy-punctuation">.</span></span><span>Strategy<span className="philosophy-punctuation">.</span></span><span>Results<span className="philosophy-punctuation">.</span></span></h2>
              <div className="philosophy-footer"><p>Because the strongest digital presence is not a collection of channels. It is a system that makes each part more useful.</p><ArrowDownRight size={30} strokeWidth={1.2} /></div>
            </div>
          </div>
          <div className="philosophy-watermark" data-parallax>synra / synra / synra</div>
        </section>

        <section className="process-section section-pad">
          <div className="section-grid process-heading"><Reveal><SectionLabel number="05">How we work</SectionLabel></Reveal><Reveal delay={0.1}><div><h2>A clear process<br />for <em>real progress.</em></h2><p className="process-heading__note">Five steps, documented in the open, so momentum never has to be guessed at.</p></div></Reveal></div>
          <div className="process-layout">
            <div className="process-phase-spine" aria-label="SYNRA phase spine"><span>BUILD</span><i /><span>FOUND</span><i /><span>CHOOSE</span><i /><span>GROW</span></div>
            <div className="process-intro"><p>Enough structure to keep momentum. Enough curiosity to find the better answer.</p><span>01 — 05</span></div>
            <div className="process-list">
              {["DISCOVER", "STRATEGIZE", "BUILD", "LAUNCH", "GROW"].map((stage, index) => (
                <Reveal key={stage} delay={index * 0.06} className="process-row"><span className="process-row__number">0{index + 1}</span><h3>{stage}</h3><p>{["Understand the business, audience and goals.", "Define the digital direction and growth strategy.", "Design and develop the solution.", "Deploy, optimize and measure.", "Continuously improve visibility, conversion and performance."][index]}</p><ArrowUpRight size={18} strokeWidth={1.4} /></Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="about-intro section-grid"><Reveal><SectionLabel number="06">About SYNRA</SectionLabel></Reveal><Reveal delay={0.1} className="about-intro__copy"><h2>Five people.<br /><em>One vision.</em></h2><p>A focused team for businesses that want thoughtful work, direct communication, and a partner who can see beyond the next deliverable.</p><div className="utility-trace"><span>Team / 05 people</span><span>Mode / focused partner</span></div></Reveal></div>
          <div className="about-body">
            <div className="about-art" data-parallax><img src={SIGNAL_URL} alt="Abstract editorial image of four pathways converging into one growth signal" loading="lazy" /><span>Four disciplines / one direction</span></div>
            <div className="team-list">
              {SYNRA_TEAM.map((member, index) => (
                <div className="team-row" key={member.id}>
                  <span className="team-row__index">0{index + 1}</span>
                  <div>
                    <h3>{member.name}</h3>
                    <p className="team-row__role">{member.role} · {member.focus}</p>
                  </div>
                  <p className="team-row__bio">{member.focus}</p>
                  <button
                    type="button"
                    aria-label={`Start a project with ${member.name}`}
                    onClick={() => openProjectInquiry()}
                    style={{ display: "grid", placeItems: "center", width: "1.9rem", height: "1.9rem", border: "1px solid var(--line-strong)", borderRadius: "50%", transition: "color 220ms, background 220ms" }}
                    onPointerEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--surface)"; (e.currentTarget as HTMLButtonElement).style.background = "var(--terra)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--terra)"; }}
                    onPointerLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = ""; (e.currentTarget as HTMLButtonElement).style.background = ""; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line-strong)"; }}
                  >
                    <MoveUpRight size={17} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="insights-section section-pad" id="insights">
          <div className="section-grid insights-heading"><Reveal><SectionLabel number="07">Field notes</SectionLabel></Reveal><Reveal delay={0.1}><div><h2>Useful thinking<br />for the <em>way forward.</em></h2><div className="utility-trace"><span>Notes / SEO · AI · Web</span><span>Updated / 2026</span></div></div></Reveal></div>
          <div className="insights-list">{insights.map((insight, index) => <Reveal key={insight.title} delay={index * 0.07} className="insight-row"><span className="insight-row__number">0{index + 1}</span><span className="insight-row__category">{insight.category}</span><h3>{insight.title}</h3><span className="insight-row__date">{insight.date}</span><ArrowUpRight size={18} strokeWidth={1.4} /></Reveal>)}</div>
          <a href="#contact" className="insights-more">Read the latest from SYNRA <ArrowRight size={17} strokeWidth={1.5} /></a>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-section__inner section-pad">
            <SectionLabel number="08" light>Start a project</SectionLabel>
            <div className="contact-copy">
              <h2>Ready to grow<br />your <em>business?</em></h2>
              <p>Let's build a digital presence that gets your business seen, trusted and chosen.</p>
              <MagneticButton dark className="glass-surface" onClick={() => openProjectInquiry()}>Start a project</MagneticButton>
            </div>
            <div className="contact-bottom">
              <span>info.synrastudios@gmail.com</span>
              <span>Usually replies within 2 working days</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-model"><span className="footer-model__label">SYNRA operating model</span><div className="footer-model__track"><span>BUILD</span><i /><span>GET FOUND</span><i /><span>GET CUSTOMERS</span><i /><span>GROW</span></div><span className="footer-model__mark">↗</span></div>
        <div className="site-footer__top"><div><a href="#top" className="footer-brand"><img src={MARK_URL} alt="" className="brand-mark" /><span>SYNRA</span></a><p>Synergy. Strategy. Results.</p></div><div className="footer-column"><span className="footer-column__label">Navigate</span><a href="#work">Work</a><a href="#services">Services</a><a href="#about">About</a><a href="#insights">Insights</a><a href="#contact">Contact</a></div><div className="footer-column"><span className="footer-column__label">Capabilities</span><a href="#services">Build</a><a href="#services">Grow</a><a href="#services">Manage</a><a href="#services">Automate</a></div><div className="footer-column"><span className="footer-column__label">Elsewhere</span><a href="https://www.instagram.com/synrastudios?igsh=bXA3em56YTN6NDd4" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="mailto:info.synrastudios@gmail.com">Email <ArrowUpRight size={13} /></a></div></div>
        <div className="site-footer__bottom"><span>© 2026 SYNRA Studio</span><span>Privacy policy</span><span>Terms</span><span className="site-footer__back"><a href="#top">Back to top <ArrowUpRight size={15} /></a></span></div>
      </footer>
      </div>
    </>
  );
}
