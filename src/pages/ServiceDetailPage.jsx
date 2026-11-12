import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, ChevronUp, Package, Zap, Crown, ArrowRight, Rocket } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import Navbar from '../components/Navbar';
import ContactModal from '../components/ContactModal';
import Footer from '../components/Footer';

// ── Visual Roadmap ────────────────────────────────────────────────────────────

function ProcessSection({ steps }) {
  return (
    <section id="process" className="py-28 px-6 border-t border-slate-300/70 dark:border-white/5 bg-[#eaedf2] dark:bg-black transition-colors duration-300 relative overflow-hidden">
      {/* Ambient background glow for glass refraction */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-20 top-1/4 w-[550px] h-[550px] rounded-full blur-[140px] opacity-20 dark:opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #5D72CC 0%, #8b5cf6 50%, transparent 70%)',
          }}
        />
        <div
          className="absolute -right-20 bottom-1/4 w-[550px] h-[550px] rounded-full blur-[140px] opacity-20 dark:opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #38bdf8 0%, #5D72CC 50%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">How We Build</h2>
          <p className="text-slate-600 dark:text-neutral-400 text-lg max-w-xl mx-auto">A clear, structured journey from idea to launch.</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-300/70 dark:via-white/20 to-transparent hidden md:block" />

          <div className="space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex items-center gap-0 md:gap-10 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row pb-16`}
                >
                  <div className={`w-full md:w-[calc(50%-2.5rem)] group`}>
                    <div className="relative p-6 md:p-7 rounded-3xl bg-white/45 dark:bg-white/[0.035] backdrop-blur-2xl border border-white/75 dark:border-white/10 hover:border-white/95 dark:hover:border-white/25 hover:bg-white/60 dark:hover:bg-white/[0.06] transition-all duration-400 overflow-hidden shadow-[0_8px_32px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
                      {/* Top specular sheen */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />

                      <span className="absolute top-4 right-5 text-6xl font-black text-slate-900/5 dark:text-white/4 select-none leading-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <div className="relative z-10">
                        <div className="w-11 h-11 rounded-2xl bg-white/65 dark:bg-white/[0.06] backdrop-blur-md border border-white/80 dark:border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-none flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                          <Icon className="w-5 h-5 text-slate-700 dark:text-white transition-colors duration-300" />
                        </div>
                        <p className="text-xs font-bold text-slate-500/80 dark:text-white/35 tracking-[0.2em] mb-2 uppercase">Step {String(i + 1).padStart(2, '0')}</p>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{step.title}</h3>
                        <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>

                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px w-10 bg-slate-300/70 dark:bg-white/15 ${isLeft ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'}`} />
                  </div>

                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex-col items-center z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                      className="w-10 h-10 rounded-full bg-white/55 dark:bg-white/5 backdrop-blur-xl border border-white/80 dark:border-white/20 flex items-center justify-center shadow-[0_4px_16px_rgba(15,23,42,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    >
                      <span className="text-slate-900 dark:text-white text-xs font-black">{i + 1}</span>
                    </motion.div>
                  </div>

                  <div className="hidden md:block w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

// Deterministic pseudo-random from a seed (avoids hydration mismatch)
function seededRand(seed) {
  const x = Math.sin(seed + 0) * 10000;
  return x - Math.floor(x);
}

// ── Real tech icon URLs (devicons + simpleicons CDN) ──────────────────────────
const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SI = 'https://cdn.simpleicons.org';
const TECH_ICON_URLS = {
  // Web Development
  'React': `${DI}/react/react-original.svg`,
  'Next.js': `${DI}/nextjs/nextjs-original.svg`,
  'Node.js': `${DI}/nodejs/nodejs-original.svg`,
  'TypeScript': `${DI}/typescript/typescript-original.svg`,
  'PostgreSQL': `${DI}/postgresql/postgresql-original.svg`,
  'GraphQL': `${DI}/graphql/graphql-plain.svg`,
  'Tailwind': `${DI}/tailwindcss/tailwindcss-original.svg`,
  'Docker': `${DI}/docker/docker-original.svg`,
  'Redis': `${DI}/redis/redis-original.svg`,
  'Vite': `${DI}/vitejs/vitejs-original.svg`,
  'REST API': `${SI}/openapiinitiative/6BA539`,
  'AWS': '/aws.svg',
  // UI / UX
  'Figma': `${DI}/figma/figma-original.svg`,
  'Adobe XD': `${SI}/adobexd/FF61F6`,
  'Illustrator': `${DI}/illustrator/illustrator-plain.svg`,
  'Photoshop': `${DI}/photoshop/photoshop-plain.svg`,
  'Framer': `${SI}/framer/0055FF`,
  'Protopie': `${SI}/protopie/8844EE`,
  'Lottie': `${SI}/lottiefiles/00DDB3`,
  'Storybook': `${DI}/storybook/storybook-original.svg`,
  'Zeplin': `${SI}/zeplin/FDBD39`,
  'WCAG': `${SI}/w3c/005A9C`,
  // Cloud / DevOps
  'Kubernetes': `${DI}/kubernetes/kubernetes-plain.svg`,
  'Terraform': `${DI}/terraform/terraform-original.svg`,
  'GitHub Actions': `${SI}/githubactions/2088FF`,
  'Prometheus': `${DI}/prometheus/prometheus-original.svg`,
  'Grafana': `${SI}/grafana/F46800`,
  'Ansible': `${DI}/ansible/ansible-original.svg`,
  'Nginx': `${DI}/nginx/nginx-original.svg`,
  'Vault': `${SI}/vault/000000`,
  'ArgoCD': `${SI}/argo/EF7B4D`,
  // Mobile
  'React Native': `${DI}/react/react-original.svg`,
  'Flutter': `${DI}/flutter/flutter-original.svg`,
  'Expo': `${SI}/expo/000020`,
  'Firebase': `${DI}/firebase/firebase-plain.svg`,
  'Swift': `${DI}/swift/swift-original.svg`,
  'Kotlin': `${DI}/kotlin/kotlin-original.svg`,
  'Xcode': `${DI}/xcode/xcode-original.svg`,
  'TestFlight': `${SI}/testflight/0D83F6`,
  'Stripe SDK': `${SI}/stripe/008CDD`,
  'RevenueCat': `${SI}/revenuecat/E04B3A`,
  // Cyber Security
  'Burp Suite': `${SI}/portswigger/FF6633`,
  'Metasploit': `${SI}/metasploit/2596CD`,
  'Nmap': `${SI}/nmap/4B8BBE`,
  'Wireshark': `${SI}/wireshark/1679A7`,
  'OWASP ZAP': `${SI}/owasp/E3001B`,
  'Kali Linux': `${SI}/kalilinux/367BF0`,
  'HashiCorp Vault': `${SI}/vault/000000`,
  'Snyk': `${SI}/snyk/4C4A73`,
  'Splunk': `${SI}/splunk/64A70B`,
  'Fail2ban': `${SI}/linux/CC0000`,
  // AI / ML
  'Python': `${DI}/python/python-original.svg`,
  'OpenAI': `${SI}/openai/412991`,
  'LangChain': `${SI}/langchain/1C3C3C`,
  'PyTorch': `${DI}/pytorch/pytorch-original.svg`,
  'TensorFlow': `${DI}/tensorflow/tensorflow-original.svg`,
  'HuggingFace': `${SI}/huggingface/FFD21E`,
  'Pinecone': `${DI}/python/python-original.svg`,
  'FastAPI': `${DI}/fastapi/fastapi-original.svg`,
  'Pandas': `${DI}/pandas/pandas-original.svg`,
  'scikit-learn': `${SI}/scikitlearn/F7931E`,
  'MLflow': `${SI}/mlflow/0194E2`,
};



// ── Reliable built-in tech badge components (guarantees 0 broken images) ────
const CUSTOM_TECH_ICONS = {
  'OpenAI': ({ size }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }} className="text-stone-900 dark:text-white">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 10.5.42a6.045 6.045 0 0 0-5.772 4.212 5.984 5.984 0 0 0-4.04 2.926 6.058 6.058 0 0 0 .614 7.106 5.988 5.988 0 0 0 .517 4.91 6.054 6.054 0 0 0 6.51 2.9A6.057 6.057 0 0 0 13.5 23.58a6.044 6.044 0 0 0 5.772-4.212 5.985 5.985 0 0 0 4.04-2.926 6.056 6.056 0 0 0-.614-7.106zm-7.608 12.184a4.53 4.53 0 0 1-2.73-1.018l.128-.073 4.417-2.55a.77.77 0 0 0 .385-.667v-6.223l1.884 1.088a.07.07 0 0 1 .038.051v5.184a4.55 4.55 0 0 1-4.122 4.208zm-9.33-4.103a4.52 4.52 0 0 1-.548-2.863l.128.075 4.416 2.55a.76.76 0 0 0 .77 0l5.39-3.111v2.175a.07.07 0 0 1-.027.058l-4.49 2.593a4.55 4.55 0 0 1-5.639-.477zm-1.722-9.288a4.52 4.52 0 0 1 2.182-1.845v5.247a.76.76 0 0 0 .385.666l5.39 3.112-1.884 1.088a.07.07 0 0 1-.064 0l-4.49-2.593a4.55 4.55 0 0 1-1.519-5.675zm13.626 2.553-5.39-3.112 1.884-1.088a.07.07 0 0 1 .064 0l4.49 2.593a4.55 4.55 0 0 1 1.519 5.675 4.52 4.52 0 0 1-2.182 1.845v-5.247a.76.76 0 0 0-.385-.666zm2.27 4.103a4.52 4.52 0 0 1 .548 2.863l-.128-.075-4.416-2.55a.76.76 0 0 0-.77 0l-5.39 3.111v-2.175a.07.07 0 0 1 .027-.058l4.49-2.593a4.55 4.55 0 0 1 5.639.477zm-9.873-5.64 2.37-1.368 2.37 1.369v2.737l-2.37 1.369-2.37-1.369z"/>
    </svg>
  ),
  'Adobe XD': ({ size }) => (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#470137] border border-[#FF61F6]/60 flex items-center justify-center font-black text-[#FF61F6] text-xs select-none shadow-sm"
    >
      Xd
    </div>
  ),
  'Zeplin': ({ size }) => (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#2e2003] border border-[#FDBD39]/60 flex items-center justify-center font-black text-[#FDBD39] text-xs select-none shadow-sm"
    >
      Zp
    </div>
  ),
  'Protopie': ({ size }) => (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#1e0a3c] border border-[#8844EE]/60 flex items-center justify-center font-black text-[#8844EE] text-xs select-none shadow-sm"
    >
      Pp
    </div>
  ),
  'WCAG': ({ size }) => (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#021d33] border border-[#38bdf8]/60 flex items-center justify-center font-black text-[#38bdf8] text-[9px] tracking-tighter select-none shadow-sm"
    >
      WCAG
    </div>
  ),
  'TestFlight': ({ size }) => (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#041a30] border border-[#0D83F6]/60 flex items-center justify-center font-black text-[#0D83F6] text-xs select-none shadow-sm"
    >
      TF
    </div>
  ),
  'Nmap': ({ size }) => (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#081a28] border border-[#4B8BBE]/60 flex items-center justify-center font-black text-[#4B8BBE] text-[9px] tracking-tight select-none shadow-sm"
    >
      NMAP
    </div>
  ),
  'REST API': ({ size }) => (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#10220a] border border-[#6BA539]/60 flex items-center justify-center font-black text-[#6BA539] text-[9px] select-none shadow-sm"
    >
      REST
    </div>
  ),
  'Burp Suite': ({ size }) => (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#2e1003] border border-[#FF6633]/60 flex items-center justify-center font-black text-[#FF6633] text-xs select-none shadow-sm"
    >
      BS
    </div>
  ),
  'Metasploit': ({ size }) => (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#061822] border border-[#2596CD]/60 flex items-center justify-center font-black text-[#2596CD] text-xs select-none shadow-sm"
    >
      MS
    </div>
  ),
  'OWASP ZAP': ({ size }) => (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#2b0507] border border-[#E3001B]/60 flex items-center justify-center font-black text-[#E3001B] text-[9px] select-none shadow-sm"
    >
      ZAP
    </div>
  ),
  'RevenueCat': ({ size }) => (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#260a08] border border-[#E04B3A]/60 flex items-center justify-center font-black text-[#E04B3A] text-xs select-none shadow-sm"
    >
      RC
    </div>
  ),
  'Stripe SDK': ({ size }) => (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#120e36] border border-[#635BFF]/60 flex items-center justify-center font-black text-[#635BFF] text-xs select-none shadow-sm"
    >
      S
    </div>
  ),
  'Fail2ban': ({ size }) => (
    <div
      style={{ width: size, height: size }}
      className="rounded-xl bg-[#2b0000] border border-[#CC0000]/60 flex items-center justify-center font-black text-[#CC0000] text-[9px] select-none shadow-sm"
    >
      F2B
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// FloatingBadge — pure CSS animation, zero JS timing bugs.
//
// WHY CSS (not framer-motion animate()):
//   framer-motion's animate() returns a Promise that cannot be cancelled on
//   component unmount.  When the user navigates away the promises keep running,
//   then resolve on the new mount's elements and overwrite their state →
//   "collapse" bug.  CSS animations stop the instant the element is removed
//   from the DOM and restart cleanly on every new mount.
//
// HOW PRE-POSITIONING WORKS:
//   `animation-delay: -${initFrac * dur}s`  (negative delay).
//   The browser treats a negative delay as "the animation started that many
//   seconds ago", placing each badge partway through its journey on first paint.
//   Result: hero looks fully populated the instant the page loads.
// ─────────────────────────────────────────────────────────────────────────────
function FloatingBadge({ tech, index }) {
  const [imgFailed, setImgFailed] = useState(false);
  const r = (n) => seededRand(index * 31 + n);

  const size     = Math.round(52 + r(0) * 22);  // 52–74 px circle
  const xPct     = 2  + r(1) * 88;              // 2–90 % across width
  const dur      = 22 + r(2) * 14;              // 22–36 s per cycle
  const initFrac = r(10);                        // 0=bottom  1=near-top
  const sw1      = Math.round((r(4)  - 0.5) * 50); // sway keyframes
  const sw2      = Math.round((r(5)  - 0.5) * 70);
  const sw3      = Math.round((r(6)  - 0.5) * 40);

  const iconUrl    = TECH_ICON_URLS[tech.label];
  const CustomIcon = CUSTOM_TECH_ICONS[tech.label];
  const iconSize   = Math.round(size * 0.54);
  // CSS-safe animation name (no spaces / special chars)
  const animName = `br${index}${tech.label.replace(/\W/g, '')}`;

  // Keyframe: rise from 100vh+size below section top to -(size+30) above it.
  // Opacity fades in quickly (first 5 %), holds, fades out (last 5 %).
  // X-sway is encoded at anchor stops so each badge has a unique path.
  const css = `
    @keyframes ${animName} {
      0%   { transform: translateY(calc(100vh + ${size + 40}px)) translateX(0px);       opacity: 0;    }
      5%   { transform: translateY(calc(80vh))                   translateX(${sw1}px);  opacity: 0.85; }
      35%  { transform: translateY(calc(60vh))                   translateX(${sw2}px);  opacity: 0.85; }
      65%  { transform: translateY(calc(35vh))                   translateX(${sw3}px);  opacity: 0.85; }
      90%  { transform: translateY(calc(10vh))                   translateX(${sw1}px);  opacity: 0.85; }
      95%  { transform: translateY(calc(3vh))                    translateX(0px);        opacity: 0;    }
      100% { transform: translateY(${-(size + 30)}px)            translateX(0px);        opacity: 0;    }
    }
  `;

  return (
    <>
      {/* Inject per-badge keyframes — React deduplicates style tags with same content */}
      <style>{css}</style>

      <div
        className="absolute top-0 pointer-events-none select-none"
        style={{
          left: `${xPct}%`,
          width: size,
          height: size,
          // Animate via CSS — starts immediately, loops forever, pre-positioned
          animationName: animName,
          animationDuration: `${dur}s`,
          animationDelay: `${-(initFrac * dur).toFixed(2)}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationFillMode: 'both',
          willChange: 'transform, opacity',
        }}
      >
        {/* Diffuse aura glow */}
        <div
          className="absolute rounded-full"
          style={{
            inset: -10,
            background: `radial-gradient(circle, ${tech.color}20 0%, transparent 65%)`,
            filter: 'blur(14px)',
          }}
        />
        {/* Frosted glass circle */}
        <div
          className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${tech.color}22 0%, ${tech.color}08 100%)`,
            border: `1.5px solid ${tech.color}45`,
            boxShadow: `0 0 20px ${tech.color}1e, 0 0 5px ${tech.color}10, inset 0 1px 0 rgba(255,255,255,0.20)`,
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          {/* Top-left glint */}
          <div
            className="absolute -top-2 -left-2 w-8 h-8 rounded-full opacity-20 blur-md"
            style={{ background: 'white' }}
          />
          {/* Icon rendering priority:
              1. Reliable built-in custom SVG/Badge component (zero network, 100% reliable)
              2. Real SVG image from CDN (with onError fallback)
              3. Clean styled typography monogram (never broken browser image!) */}
          {CustomIcon ? (
            <div className="relative z-10 flex items-center justify-center">
              <CustomIcon size={iconSize} />
            </div>
          ) : iconUrl && !imgFailed ? (
            <img
              src={iconUrl}
              alt=""
              draggable={false}
              onError={() => setImgFailed(true)}
              className="relative z-10 object-contain"
              style={{ width: iconSize, height: iconSize }}
            />
          ) : (
            <div
              className="relative z-10 rounded-full flex items-center justify-center font-black uppercase tracking-tight select-none"
              style={{
                width: iconSize,
                height: iconSize,
                fontSize: Math.round(size * 0.30),
                color: tech.color,
                textShadow: `0 0 10px ${tech.color}66`,
              }}
            >
              {tech.label.slice(0, 3)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
// ── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ service, onBookConsultation }) {
  const techStack = service.techStack || [];
  // On small screens show fewer badges; on desktop show all
  const visibleStack = typeof window !== 'undefined' && window.innerWidth < 768
    ? techStack.slice(0, 6)
    : techStack;


  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#eaedf2] dark:bg-black transition-colors duration-300">

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.07] dark:opacity-[0.05] blur-[150px] rounded-full"
          style={{ background: 'radial-gradient(circle, #a78bfa, #f59e0b, transparent)' }}
        />
      </div>

      {/* ── Floating tech stack asteroid field ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {visibleStack.map((tech, i) => (
          <FloatingBadge key={tech.label} tech={tech} index={i} total={visibleStack.length} />
        ))}
      </div>

      {/* ── Centre text content ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <motion.div
          className="mb-7 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
        </motion.div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-7">
          {service.title}
        </h1>

        <p className="text-xl sm:text-2xl text-slate-700 dark:text-neutral-300 font-medium tracking-tight mb-5 whitespace-pre-line leading-snug">
          {service.tagline}
        </p>

        <p className="text-sm sm:text-base lg:text-lg text-slate-500 dark:text-neutral-500 max-w-xl mx-auto leading-relaxed mb-8">
          {service.subtext}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <button
            onClick={onBookConsultation}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold tracking-wide hover:bg-slate-800 dark:hover:bg-neutral-200 hover:scale-105 transition-all duration-300 shadow-[0_4px_24px_rgba(15,23,42,0.18)] dark:shadow-[0_0_35px_rgba(255,255,255,0.15)]"
          >
            <Rocket className="w-4 h-4 text-[#5D72CC]" />
            <span>Book Consultation</span>
          </button>
          <Link
            to={`/contact?service=${service.slug}`}
            className="px-8 py-3.5 rounded-full border border-slate-300/80 dark:border-white/20 text-slate-800 dark:text-white text-sm font-bold bg-white/40 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
          >
            Inquire via Contact Page →
          </Link>
        </div>

        {/* Quick-read tech pills row */}
        {/* {techStack.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-stone-400 dark:text-neutral-600 self-center mr-1">Stack</span>
            {techStack.slice(0, 6).map(tech => (
              <span
                key={tech.label}
                className="px-2.5 py-1 rounded-full text-[10px] font-bold border tracking-wide"
                style={{ color: tech.color, background: `${tech.color}12`, borderColor: `${tech.color}30` }}
              >
                {tech.icon} {tech.label}
              </span>
            ))}
            {techStack.length > 6 && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold border border-stone-200 dark:border-white/10 text-stone-400 dark:text-neutral-500 tracking-wide">
                +{techStack.length - 6} more
              </span>
            )}
          </motion.div>
        )} */}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border border-stone-300 dark:border-white/20 flex items-start justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-stone-400 dark:bg-white/40" />
        </div>
      </motion.div>
    </section>
  );
}


// ── Features ──────────────────────────────────────────────────────────────────

function FeaturesSection({ features }) {
  return (
    <section id="features" className="py-28 px-6 border-t border-slate-300/70 dark:border-white/5 bg-[#eaedf2] dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">What's Included</h2>
          <p className="text-slate-600 dark:text-neutral-400 text-lg max-w-xl mx-auto">Everything you need, nothing you don't.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 rounded-3xl bg-white/45 dark:bg-white/[0.035] backdrop-blur-2xl border border-white/75 dark:border-white/10 hover:border-white/95 dark:hover:border-white/25 hover:bg-white/60 dark:hover:bg-white/[0.06] transition-all duration-300 shadow-[0_8px_32px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] relative overflow-hidden"
              >
                {/* Top specular sheen */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />

                <div className="w-11 h-11 rounded-2xl bg-white/65 dark:bg-white/[0.06] backdrop-blur-md border border-white/80 dark:border-white/15 flex items-center justify-center mb-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-none group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-slate-700 dark:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold mb-1 tracking-tight">{feature.title}</h3>
                <p className="text-slate-600 dark:text-neutral-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────

const tierConfig = [
  {
    // Starter — light & dark styles
    lightBg: 'bg-white/90 backdrop-blur-md',
    lightBorder: 'border-slate-300/80',
    lightTitle: 'text-slate-900',
    lightText: 'text-slate-600',
    lightFeature: 'text-slate-700',
    lightCheckBg: 'bg-slate-100 border-slate-300/80',
    lightCheckColor: 'text-slate-600',
    lightBadge: 'text-slate-500',
    icon: Package,
    // dark styles (unchanged)
    glow: 'rgba(148,163,184,0.12)',
    accent: 'from-slate-400/20 to-slate-600/5',
    borderGrad: 'from-white/10 via-white/5 to-white/10',
    badgeColor: 'text-slate-300',
    iconBg: 'bg-slate-500/10 border-slate-400/20',
    iconColor: 'text-slate-300',
  },
  {
    lightBg: 'bg-violet-50',
    lightBorder: 'border-violet-200',
    lightTitle: 'text-violet-900',
    lightText: 'text-violet-600',
    lightFeature: 'text-stone-700',
    lightCheckBg: 'bg-violet-100 border-violet-200',
    lightCheckColor: 'text-violet-600',
    lightBadge: 'text-violet-600',
    icon: Zap,
    glow: 'rgba(168,85,247,0.18)',
    accent: 'from-violet-500/20 via-fuchsia-500/10 to-purple-600/5',
    borderGrad: 'from-violet-400/40 via-fuchsia-400/30 to-purple-400/40',
    badgeColor: 'text-violet-300',
    iconBg: 'bg-violet-500/15 border-violet-400/30',
    iconColor: 'text-violet-300',
  },
  {
    lightBg: 'bg-amber-50',
    lightBorder: 'border-amber-200',
    lightTitle: 'text-amber-900',
    lightText: 'text-amber-700',
    lightFeature: 'text-stone-700',
    lightCheckBg: 'bg-amber-100 border-amber-200',
    lightCheckColor: 'text-amber-600',
    lightBadge: 'text-amber-600',
    icon: Crown,
    glow: 'rgba(234,179,8,0.14)',
    accent: 'from-yellow-500/15 via-amber-400/10 to-orange-500/5',
    borderGrad: 'from-yellow-400/30 via-amber-300/20 to-orange-400/30',
    badgeColor: 'text-yellow-300',
    iconBg: 'bg-yellow-500/10 border-yellow-400/20',
    iconColor: 'text-yellow-300',
  },
];

function PricingSection({ pricing, onBookConsultation }) {
  return (
    <section id="pricing" className="py-28 px-6 border-t border-slate-300/70 dark:border-white/5 relative overflow-hidden bg-[#eaedf2] dark:bg-black transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">Simple, Honest Pricing</h2>
          <p className="text-slate-600 dark:text-neutral-400 text-lg max-w-xl mx-auto">No hidden fees. Pick the plan that fits your stage.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {pricing.map((plan, i) => {
            const cfg = tierConfig[i];
            const TierIcon = cfg.icon;
            const isHighlight = plan.highlight;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: isHighlight ? -4 : -6, transition: { duration: 0.3 } }}
                className={`relative flex flex-col ${isHighlight ? 'lg:-mt-6 lg:mb-0' : ''}`}
              >
                {/* ── LIGHT MODE CARD ── */}
                <div className={`dark:hidden relative rounded-3xl p-8 flex flex-col h-full border-2 ${cfg.lightBg} ${cfg.lightBorder} shadow-[0_4px_24px_rgba(28,26,23,0.08)] ${isHighlight ? ' scale-[1.02]' : ''} transition-all duration-300`}>
                  {isHighlight && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="px-4 py-1.5 rounded-full bg-violet-600 text-white text-[10px] font-black tracking-[0.2em] whitespace-nowrap shadow-lg">
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-6 mt-2">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${cfg.lightCheckBg}`}>
                      <TierIcon className={`w-5 h-5 ${cfg.lightCheckColor}`} />
                    </div>
                    <div>
                      <p className={`text-xs font-bold tracking-[0.2em] uppercase ${cfg.lightBadge}`}>Plan</p>
                      <p className={`${cfg.lightTitle} font-black text-lg tracking-tight leading-tight`}>{plan.tier}</p>
                    </div>
                  </div>

                  <div className="mb-5 pb-5 border-b border-stone-200">
                    <p className={`text-2xl font-black ${cfg.lightTitle} tracking-tighter leading-none mb-2`}>{plan.price}</p>
                    <p className={`${cfg.lightText} text-sm leading-relaxed`}>{plan.description}</p>
                  </div>

                  <div className="flex-1 space-y-2.5 mb-8">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${cfg.lightCheckBg}`}>
                          <CheckCircle2 className={`w-3 h-3 ${cfg.lightCheckColor}`} />
                        </div>
                        <span className={`text-sm ${cfg.lightFeature} leading-relaxed`}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onBookConsultation(plan)}
                    className={`w-full py-3.5 rounded-2xl text-sm font-black tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${isHighlight
                      ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_4px_30px_rgba(139,92,246,0.6)]'
                      : 'bg-stone-900 text-white hover:bg-stone-800 border border-stone-200'
                      }`}
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* ── DARK MODE CARD (original) ── */}
                <div className="hidden dark:flex flex-col h-full">
                  <div
                    className="absolute -inset-4 rounded-4xl blur-2xl opacity-60 pointer-events-none transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at center, ${cfg.glow} 0%, transparent 70%)` }}
                  />

                  <div className={`relative rounded-3xl p-px bg-gradient-to-br ${cfg.borderGrad} ${isHighlight ? '' : ''}`}>
                    <div className={`relative rounded-[calc(1.5rem-1px)] p-8 flex flex-col h-full
                      ${isHighlight
                        ? 'bg-[radial-gradient(ellipse_at_top,_rgba(109,40,217,0.18)_0%,_rgba(0,0,0,0.95)_60%)]'
                        : 'bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04)_0%,_rgba(0,0,0,0.92)_60%)]'
                      } backdrop-blur-2xl`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${cfg.accent} opacity-80 pointer-events-none rounded-3xl`} />

                      {isHighlight && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[900]">
                          <motion.div
                            animate={{ boxShadow: ['0 0 12px rgba(168,85,247,0.5)', '0 0 28px rgba(168,85,247,0.8)', '0 0 12px rgba(168,85,247,0.5)'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="px-5 py-1.5 rounded-full bg-white text-black shadow-[0_0_60px_rgba(255,255,255,0.15)] text-[10px] font-black tracking-[0.2em] whitespace-nowrap"
                          >
                            MOST POPULAR
                          </motion.div>
                        </div>
                      )}

                      <div className="relative z-10 flex items-center gap-3 mb-6 mt-2">
                        <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${cfg.iconBg}`}>
                          <TierIcon className={`w-5 h-5 ${cfg.iconColor}`} />
                        </div>
                        <div>
                          <p className={`text-xs font-bold tracking-[0.2em] uppercase ${cfg.badgeColor} opacity-70`}>Plan</p>
                          <p className="text-white font-black text-lg tracking-tight leading-tight">{plan.tier}</p>
                        </div>
                      </div>

                      <div className="relative z-10 mb-6 pb-6 border-b border-white/8">
                        <p className="text-2xl font-black text-white tracking-tighter leading-none mb-2">{plan.price}</p>
                        <p className="text-neutral-500 text-sm leading-relaxed">{plan.description}</p>
                      </div>

                      <div className="relative z-10 flex-1 space-y-3 mb-8">
                        {plan.features.map((feature, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${cfg.iconBg}`}>
                              <CheckCircle2 className={`w-3 h-3 ${cfg.iconColor}`} />
                            </div>
                            <span className="text-sm text-neutral-300 leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="relative z-10">
                        {isHighlight ? (
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => onBookConsultation(plan)}
                            className="w-full py-4 rounded-2xl text-sm font-black tracking-wide bg-white text-black flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_45px_rgba(255,255,255,0.4)] transition-all duration-300"
                          >
                            {plan.cta} <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onBookConsultation(plan)}
                            className="w-full py-4 rounded-2xl text-sm font-bold tracking-wide border border-white/15 text-neutral-300 hover:text-white hover:border-white/30 hover:bg-white/5 flex items-center justify-center gap-2 transition-all duration-300"
                          >
                            {plan.cta} <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

function FAQSection({ faq }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-28 px-6 border-t border-slate-300/70 dark:border-white/5 bg-[#eaedf2] dark:bg-black transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">Common Questions</h2>
        </motion.div>

        <div className="space-y-3">
          {faq.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl bg-white/45 dark:bg-white/[0.035] backdrop-blur-xl border border-white/75 dark:border-white/10 overflow-hidden shadow-[0_8px_30px_rgba(15,23,42,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:bg-white/60 dark:hover:bg-white/[0.06] transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/30 dark:hover:bg-white/3 transition-colors duration-200"
              >
                <span className="text-slate-900 dark:text-white font-semibold tracking-tight">{item.q}</span>
                {openIndex === i
                  ? <ChevronUp className="w-5 h-5 text-slate-400 dark:text-neutral-400 shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-slate-400 dark:text-neutral-400 shrink-0" />
                }
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-slate-600 dark:text-neutral-400 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = servicesData[slug];
  const [showContact, setShowContact] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleBookConsultation = (plan = null) => {
    setSelectedPlan(plan);
    setShowContact(true);
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-[#eaedf2] dark:bg-black flex flex-col items-center justify-center text-slate-900 dark:text-white gap-6 transition-colors duration-300">
        <h1 className="text-4xl font-black tracking-tighter">Service Not Found</h1>
        <p className="text-slate-600 dark:text-neutral-400">That service doesn't exist yet.</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 rounded-full border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white text-sm font-bold hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-slate-900 transition-all duration-300"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen w-full bg-[#eaedf2] dark:bg-black text-slate-900 dark:text-white overflow-x-hidden transition-colors duration-300"
    >
      <Navbar backTo="/" serviceTitle={service.title} />

      <div>
        <HeroSection service={service} onBookConsultation={() => handleBookConsultation(null)} />
        <ProcessSection steps={service.steps} />
        <FeaturesSection features={service.features} />
        <PricingSection pricing={service.pricing} onBookConsultation={handleBookConsultation} />
        <FAQSection faq={service.faq} />

        {/* Footer CTA */}
        <section className="py-28 px-6 border-t border-slate-300/70 dark:border-white/5 text-center bg-gradient-to-b from-[#eef1f6] via-[#eaedf2] to-[#e3e7ed] dark:from-black dark:via-black dark:to-black relative overflow-hidden transition-colors duration-300">
          {/* Subtle metallic silver ambient sheen */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.75)_0%,_transparent_65%)] dark:bg-none pointer-events-none" />

          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">Ready to Get Started?</h2>
            <p className="text-slate-600 dark:text-neutral-400 text-lg mb-10">Let's talk about your project. No commitment, no pressure.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleBookConsultation(null)}
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold tracking-wide hover:bg-slate-800 dark:hover:bg-neutral-200 hover:scale-105 transition-all duration-300 shadow-[0_4px_24px_rgba(15,23,42,0.18)] dark:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <Rocket className="w-4 h-4 text-[#5D72CC]" />
                <span>Book a Free Consultation</span>
              </button>
              <Link
                to={`/contact?service=${slug}`}
                className="px-10 py-4 rounded-full border border-slate-300/80 dark:border-white/20 text-slate-800 dark:text-white text-sm font-bold bg-white/50 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Go to Contact Form →
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* ── Space Contact Modal ── */}
      <ContactModal
        isOpen={showContact}
        onClose={() => { setShowContact(false); setSelectedPlan(null); }}
        preselectedService={slug}
        preselectedPlan={selectedPlan}
      />
    </motion.div>
  );
}
