import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Home, ChevronRight, ArrowUp, Star, ArrowUpRight, Copy, Check, Moon, Sun } from "lucide-react";
import heroImg from "@/assets/pic.png";
import { Button } from "@/components/ui/button";
import { link } from "fs";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);
 
const EMAIL = "awan.shahzaib.0314@gmail.com";

const GREETINGS = [, "Hola", "Ciao", "Bonjour", "Salam", "Hallo", "नमस्ते", "こんにちは", "안녕하세요", "Olá", "Привет",  "Hello",];

const SERVICES = [
  { tag: "Top performing", title: "Frontend Development", desc: "I build fast, responsive and pixel-perfect web apps with clean code, smooth motion and SEO-ready structure.", items: ["React / Next.js", "TypeScript", "Tailwind CSS", "GSAP & Framer Motion", "TanStack", "Vite", "REST & GraphQL APIs"] },
  { tag: "Autopilot mode", title: "AI Automation", desc: "I automate repetitive business work — leads, emails, CRMs, reports — so teams save hours every single week.", items: ["n8n", "Make.com", "Zapier", "Webhooks & APIs", "Google Workspace", "CRM integrations"] },
  { tag: "Thinks & acts", title: "AI Agents", desc: "I design and ship custom AI agents that reason, use tools and talk to your customers 24/7.", items: ["OpenAI / Gemini / Claude", "LangChain & LangGraph", "RAG & vector databases", "Voice agents", "WhatsApp & chat bots", "Tool calling / MCP"] },
  { tag: "User focused", title: "UI/UX Implementation", desc: "I turn Figma designs into living interfaces with attention to every pixel, interaction and accessibility detail.", items: ["Figma to code", "Design systems", "Micro-interactions", "Accessibility", "Mobile-first layouts"] },
  { tag: "Full picture", title: "Full-stack & Backend", desc: "When a product needs more, I connect databases, auth, payments and serverless functions end to end.", items: ["Node.js", "Supabase / Postgres", "Auth & payments", "Serverless functions", "Deployments"] },
  { tag: "AI native since day one", title: "AI Vibe Coding", desc: "I use AI daily to prototype, test and ship at a speed that keeps clients ahead of the curve.", items: ["Cursor", "Claude Code", "Lovable", "ChatGPT / Codex", "Rapid prototyping"] },
];

const STATS = ["3+ Years of Experience", "12+ Projects Delivered", "17+ AI Agents Built", "100+ Automations Running", "100% Client Satisfaction", "24/7 Agents at Work"];

const WINS = [
  ["Customer Support AI Agent", "E-commerce", "2026"],
  ["Lead Generation Automation", "Agency", "2026"],
  ["SaaS Dashboard Frontend", "Startup", "2025"],
  ["WhatsApp Booking Bot", "Clinic", "2025"],
  ["Voice Calling Agent", "Real Estate", "2025"], 
  ["Portfolio & Landing Pages", "Freelance", "2024"], 
];


const PROJECTS = [
  {
    name: "Modern Web Experience",
    kind: "Nexa UI",
    grad: "from-primary/80 to-ink",
    link: "https://codingavr.vercel.app/",
    image: "/pic3.png",
  },
  {
    name: "FlowPilot",
    kind: "Automation Platform",
    grad: "from-ink to-primary/60",
    link: "",
    image: "/pic5.png",
  },
  {
    name: "Nova UI",
    kind: "SaaS Frontend",
    grad: "from-muted-foreground to-ink",
    link: "https://sr-closet.vercel.app/",
    image: "/pic4.png",
  },
  {
    name: "LeadLoop",
    kind: "Lead Gen Workflow",
    grad: "from-primary to-muted-foreground",
    link: "",
    image: "/pic7.png",
  },
];

const EXPERIENCE = [
  ["AI Automation Engineer", "2025 – Current", "Freelance / Clients worldwide"],
  ["Frontend Developer", "2024 – Current", "Agency projects"],
  ["AI Agent Developer", "2024 – 2025", "Startups"],
  ["React Developer", "2023 – 2024", "Remote"],
  ["Web Developer (projects)", "2024 – 2026", "Fiverr / Upwork"],
];

const REVIEWS = [
  ["Shahzaib built our support agent in a week. It now answers 70% of tickets on its own.", "Ali R.", "Founder, e-commerce"],
  ["Clean code, great animations and super fast delivery. Exactly the frontend we wanted.", "Sarah K.", "Product Lead"],
  ["Our lead pipeline is fully automated now. Saved us around 20 hours every week.", "Usman T.", "Agency Owner"],
];

const MISSION = "I work with founders, startups and brands to build interfaces and AI systems that actually work. One goal, no noise, real results. When the job is done, it is live, automated and measured.";

function useClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Karachi" }));
  
    f();
    const i = setInterval(f, 10000);
    return () => clearInterval(i);
  }, []);
  return t;
}

function Preloader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i < GREETINGS.length - 1) {
      const t = setTimeout(() => setI(i + 1), i === 0 ? 700 : 170);
      return () => clearTimeout(t);
    }
    const tw = gsap.to(ref.current, {
      yPercent: -100, duration: 1, ease: "power4.inOut", delay: 0.5, onComplete: onDone,
    });
    return () => { tw.kill(); };
  }, [i, onDone]);
  return (
    <div ref={ref} className="fixed inset-0 z-[100] flex items-center justify-center bg-ink text-ink-foreground">
      <span className="flex items-center gap-3 text-4xl font-medium">
        <span className="h-2 w-2 rounded-full bg-primary" />
        {GREETINGS[i]}
      </span>
    </div>
  );
}

export function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const clock = useClock();

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const shouldUseDark = savedTheme === "dark";
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    setIsDark((current) => {
      const next = !current;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
      return next;
    });
  };

  const copy = () => {
    navigator.clipboard?.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useGSAP(
    () => {
      if (!loaded) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-img", { scale: 0.6, rotate: -6, opacity: 0, duration: 1.4 })
        .from(".hero-name", { yPercent: 110, duration: 1.2, stagger: 0.12 }, "-=1.1")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.8")
        .from(".nav-bar", { y: 120, duration: 1 }, "-=0.8");

      gsap.to(".hero-img", {
        yPercent: 40, scale: 0.85, rotate: 4, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-left", { xPercent: -30, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-right", { xPercent: 30, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, filter: "blur(10px)", duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });

      const cards = gsap.utils.toArray<HTMLElement>(".svc-card");
      cards.forEach((card, idx) => {
        gsap.fromTo(card, { rotate: idx % 2 ? 3 : -3, y: 120 }, {
          rotate: idx % 2 ? -1.5 : 1.5, y: 0, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "top 20%", scrub: true },
        });
        if (idx < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9, opacity: 0.3, filter: "blur(4px)", ease: "none",
            scrollTrigger: { trigger: cards[idx + 1]!, start: "top 80%", end: "top 20%", scrub: true },
          });
        }
      });
      gsap.to(".svc-photo", {
        rotate: 360 * 0.02, ease: "none",
        scrollTrigger: { trigger: ".services", start: "top center", end: "bottom bottom", scrub: true },
      });

      gsap.to(".marquee-track", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });

      gsap.from(".win-row", {
        y: 40, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".wins", start: "top 75%" },
      });

      gsap.fromTo(".mission-word", { opacity: 0.12 }, {
        opacity: 1, stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: ".mission", start: "top 75%", end: "bottom 45%", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>(".proj-img").forEach((el) => {
        gsap.fromTo(el, { yPercent: -10, scale: 1.15 }, { yPercent: 10, scale: 1.15, ease: "none", scrollTrigger: { trigger: el, scrub: true } });
      });

      gsap.from(".exp-row", {
        x: -60, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".exp", start: "top 75%" },
      });

      gsap.from(".contact-title span", {
        yPercent: 110, stagger: 0.1, duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: ".contact", start: "top 75%" },
      });

      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [loaded] },
  );

  return (
    <div ref={root} className="relative">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="fixed right-6 top-6 z-50 h-11 w-11 rounded-full border-foreground/15 bg-card text-foreground shadow-card"
      >
        {isDark ? <Sun /> : <Moon />}
      </Button>

      {/* Floating nav */}
      <nav className="nav-bar fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full bg-ink p-1.5 text-sm text-ink-foreground shadow-card">
          <a href="#top" className="px-4 py-2"><Home className="h-5 w-5" /></a>
          <a href="#skills" className="hidden px-3 py-2 hover:text-primary sm:block">Skills</a>
          <a href="#about" className="hidden px-3 py-2 hover:text-primary sm:block">About</a>
          <a href="#work" className="flex items-center px-3 py-2 hover:text-primary">Work <ChevronRight className="h-4 w-4" /></a>
          <a href="#reviews" className="hidden px-3 py-2 hover:text-primary sm:block">Reviews</a>
          <a href="#contact" className="ml-2 rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground transition-transform hover:scale-105">Contact me</a>
        </div>
      </nav>
      <a href="#top" aria-label="Back to top" className="fixed bottom-0 right-[5%] z-40 rounded-t-lg bg-ink px-4 py-2 text-ink-foreground">
        <ArrowUp className="h-4 w-4" />
      </a>

      {/* Hero */}
      <section id="top" className="hero relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <div className="mx-auto grid w-full max-w-[1100px] items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
          <div className="hero-left order-2 text-center md:order-1 md:text-left">
            <p className="hero-sub mb-4 text-muted-foreground">Frontend Developer & AI Engineer</p>
            <h1 className="mask-line"><span className="hero-name font-wide block text-6xl lg:text-7xl">SHAHZAIB</span></h1>
          </div>
          <div className="hero-img order-1 mx-auto h-[380px] w-[270px] overflow-hidden rounded-3xl shadow-card md:order-2">
            <img src={heroImg} alt="Developer workspace with code and AI agent workflow" width={864} height={1152} className="h-full w-full object-cover" />
          </div>
          <div className="hero-right order-3 text-center md:text-right">
            <p className="hero-sub mb-4 text-muted-foreground">AI Automation & Agents</p>
            <h1 className="mask-line"><span className="hero-name font-wide block text-6xl lg:text-7xl">AWAN</span></h1>
            <p className="hero-sub mt-8 text-muted-foreground">Pakistan - {clock} GMT+5</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="skills" className="services mx-auto max-w-[1100px] px-6 pb-32">
        <p className="reveal font-hand text-muted-foreground">/ Services, Skills, Abilities</p>
        <h2 className="reveal mt-4 text-5xl font-semibold tracking-tight md:text-6xl">What I do <span className="text-primary">best?</span></h2>
        <p className="reveal mt-4 max-w-lg text-muted-foreground">I build interfaces, automations and AI agents — products that help businesses move faster and make a real impact.</p>

        <div className="mt-24 grid gap-10 md:grid-cols-2">
          <div className="space-y-[30vh]">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="svc-card sticky top-[12vh] rounded-[2rem] bg-card p-10 shadow-card md:p-12">
                <p className="font-hand text-foreground">{s.tag}</p>
                <h3 className="mt-6 text-4xl font-semibold tracking-tight">{String(i + 1).padStart(2, "0")}. {s.title}</h3>
                <p className="mt-8 text-lg text-muted-foreground">{s.desc}</p>
                <ul className="mt-8 list-disc space-y-1 pl-10 text-sm text-muted-foreground">
                  {s.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <div className="svc-photo sticky top-[25vh] ml-auto h-[380px] w-[280px] overflow-hidden rounded-3xl shadow-card">
              <img src={heroImg} alt="" loading="lazy" width={864} height={1152} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-[1100px] px-6 py-24">
        <p className="reveal font-hand text-muted-foreground">/ About Me</p>
        <h2 className="reveal mt-4 font-wide text-5xl md:text-7xl">Developer <span className="text-primary">at the core</span></h2>
        <p className="reveal mt-6 text-xl font-medium">Developer. Automator. Agent builder. Problem-solver.</p>
        <p className="reveal mt-4 max-w-2xl text-muted-foreground">
          I combine modern frontend craft with AI automation to build products that look premium and run on autopilot. From pixel-perfect React interfaces to AI agents that close leads and answer customers, I ship things that save time and grow revenue.
        </p>
        <div className="reveal mt-10 flex flex-wrap gap-3">
          <a href="#contact" className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-transform hover:scale-105">Schedule a call</a>
          <button onClick={copy} className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-ink-foreground">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied!" : "Copy email"}
          </button>
          <a href="#" className="rounded-full border border-foreground/20 px-6 py-3 font-medium">Download CV</a>
        </div>
        <div className="reveal mt-12 flex items-center gap-4">
          <div className="flex text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
          <span className="font-semibold">5.0 / 5</span>
          <span className="text-muted-foreground">Trusted by 30+ clients</span>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-foreground/10 py-6">
        <div className="marquee-track flex w-max whitespace-nowrap text-2xl font-medium">
          {[...STATS, ...STATS].map((s, i) => (
            <span key={i} className="px-6">{s} <span className="pl-6 text-primary">/</span></span>
          ))}
        </div>
      </div>

      {/* Wins */}
      <section className="wins mx-auto max-w-[1100px] px-6 py-32">
        <p className="reveal font-hand text-muted-foreground">/ Real Results</p>
        <h2 className="reveal mt-4 text-5xl font-semibold tracking-tight md:text-6xl">Highlights & Wins</h2>
        <p className="reveal mt-4 max-w-xl text-muted-foreground">Results matter more than words. A few builds I'm proud of — each one live, used and measured.</p>
        <div className="mt-16 border-t border-foreground/15">
          {WINS.map(([t, c, y], i) => (
            <div key={t} className="win-row group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-foreground/15 py-6 transition-colors hover:bg-ink hover:text-ink-foreground md:grid-cols-[4rem_1fr_1fr_auto] md:px-4">
              <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-xl font-semibold">{t}</span>
              <span className="hidden text-muted-foreground md:block">{c}</span>
              <span className="text-muted-foreground">{y}</span>
            </div>
          ))}
          <div className="win-row grid grid-cols-[3rem_1fr] gap-4 py-6 md:grid-cols-[4rem_1fr] md:px-4">
            <span className="text-primary">++</span>
            <span className="text-muted-foreground">There's more. But you get the picture.</span>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mission mx-auto max-w-[1100px] px-6 py-24">
        <h3 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          {MISSION.split(" ").map((w, i) => <span key={i} className="mission-word inline-block pr-[0.25em]">{w}</span>)}
        </h3>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-[1100px] px-6 py-32">
        <p className="reveal font-hand text-muted-foreground">/ Portfolio Projects</p>
        <h2 className="reveal mt-4 text-5xl font-semibold tracking-tight md:text-6xl">Selected Work</h2>
        <p className="reveal mt-4 max-w-xl text-muted-foreground">A carefully picked showcase of products, automations and agents I've built.</p>
       
<div className="mt-16 grid gap-6 md:grid-cols-2">
  {PROJECTS.map((p, i) => (
    <a
      key={p.name}
      href={p.link || "#contact"}
      target="_blank"
      rel="noopener noreferrer"
      className={`reveal group relative block h-[420px] overflow-hidden rounded-[2rem] shadow-card ${
        i % 2 ? "md:mt-24" : ""
      }`}
    >
      
<div
  className={`proj-img absolute inset-0 bg-gradient-to-br ${p.grad}`}
>
  <img
    src={p.image}
    alt={p.name}
    loading="lazy"
    width={864}
    height={1152}
    className="h-full w-full object-cover opacity-60 mix-blend-overlay"
  />
</div>

<div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-8 text-ink-foreground">
  <div>
    <p className="font-hand opacity-80">{p.kind}</p>
    <h3 className="font-wide text-3xl">{p.name}</h3>
  </div>

  <span className="rounded-full bg-primary p-3 text-primary-foreground transition-transform group-hover:rotate-45">
    <ArrowUpRight className="h-5 w-5" />
  </span>
</div>
</a>
))}
</div>


      </section>

      {/* Experience */}
      <section className="exp mx-auto max-w-[1100px] px-6 py-32">
        <p className="reveal font-hand text-muted-foreground">/ Career</p>
        <h2 className="reveal mt-4 text-5xl font-semibold tracking-tight md:text-6xl">Work Experience</h2>
        <p className="reveal mt-4 text-muted-foreground">My journey so far.</p>
        <div className="mt-16">
          {EXPERIENCE.map(([r, y, c]) => (
            <div key={r} className="exp-row flex flex-col justify-between gap-2 border-b border-foreground/15 py-8 md:flex-row md:items-end">
              <h3 className="font-wide text-2xl md:text-4xl">{r}</h3>
              <div className="text-left md:text-right">
                <p className="font-medium">{y}</p>
                <p className="text-muted-foreground">{c}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-[1100px] px-6 py-32">
        <p className="reveal font-hand text-muted-foreground">/ Community Trust – Testimonials</p>
        <h2 className="reveal mt-4 text-5xl font-semibold tracking-tight md:text-6xl">What people say</h2>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {REVIEWS.map(([q, n, r], i) => (
            <figure key={n} className="reveal rounded-[2rem] bg-card p-8 shadow-card" style={{ transform: `rotate(${(i - 1) * 1.5}deg)` }}>
              <div className="flex text-primary">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-6 text-lg">“{q}”</blockquote>
              <figcaption className="mt-8"><p className="font-semibold">{n}</p><p className="font-hand text-sm text-muted-foreground">{r}</p></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact bg-ink px-6 pb-40 pt-32 text-ink-foreground">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-hand opacity-70">/ Hello, it's me</p>
          <h2 className="contact-title mt-6 font-wide text-6xl md:text-8xl">
            <span className="mask-line"><span className="block">Let's build</span></span>
            <span className="mask-line"><span className="block text-primary">together.</span></span>
          </h2>
          <div className="mt-12 flex flex-wrap gap-3">
            <a href={`mailto:${EMAIL}`} className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground">{EMAIL}</a>
            <button onClick={copy} className="rounded-full border border-ink-foreground/30 px-6 py-3">{copied ? "Copied!" : "Copy e-mail"}</button>
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t border-ink-foreground/15 pt-8 text-sm opacity-70 md:flex-row">
            <span>Shahzaib Awan ©</span>
            <span>Pakistan — {clock} GMT+5</span>
          </div>
        </div>
      </section>
    </div>
  );
}
