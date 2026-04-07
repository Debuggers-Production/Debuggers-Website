import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Rocket, User, Target, Radio, Clock, FileText,
  BrainCircuit, CloudCog, ShieldCheck, Smartphone, PenTool, Layers,
  MessageCircle, Mail, Phone, CheckCircle, ChevronRight, Star,
  Wrench, Zap, PlusCircle, Sunrise, Sun, Sunset, Shuffle,
  SendHorizonal,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/* ─── Services ──────────────────────────────────────────────────────────────── */
const SERVICES = [
  { id: 'web-development',         label: 'Web Development',       icon: Layers,       color: '#60a5fa' },
  { id: 'ui-ux-design',            label: 'UI/UX Design',          icon: PenTool,      color: '#e879f9' },
  { id: 'mobile-apps',             label: 'Mobile Apps',           icon: Smartphone,   color: '#34d399' },
  { id: 'cloud-devops',            label: 'Cloud & DevOps',        icon: CloudCog,     color: '#38bdf8' },
  { id: 'cyber-security',          label: 'Cyber Security',        icon: ShieldCheck,  color: '#f87171' },
  { id: 'artificial-intelligence', label: 'AI & ML',               icon: BrainCircuit, color: '#a78bfa' },
];

const PROJECT_TYPES = [
  { id: 'new',        label: 'Brand New',    icon: PlusCircle, desc: 'Build from scratch'     },
  { id: 'renovation', label: 'Renovation',   icon: Wrench,     desc: 'Redesign existing app'  },
  { id: 'existing',   label: 'Add Features', icon: Zap,        desc: 'Upgrade existing app'   },
];

const CONTACT_MODES = [
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: '#25d366', desc: 'Fastest reply'   },
  { id: 'email',    label: 'Email',    icon: Mail,          color: '#60a5fa', desc: 'Detailed thread' },
  { id: 'call',     label: 'Call',     icon: Phone,         color: '#f59e0b', desc: 'Direct talk'     },
];

const TIMESLOTS = [
  { label: 'Morning',   sub: '9 AM – 12 PM',  icon: Sunrise },
  { label: 'Afternoon', sub: '12 PM – 4 PM',  icon: Sun     },
  { label: 'Evening',   sub: '4 PM – 7 PM',   icon: Sunset  },
  { label: 'Flexible',  sub: 'Anytime works', icon: Shuffle },
];

const STEPS = [
  { Icon: User,      title: "What's your name, Commander?",  sub: "Every great mission starts with knowing who's leading it."     },
  { Icon: Target,    title: 'Choose Your Mission',            sub: "Tell us what you need and what kind of project you're launching." },
  { Icon: Radio,     title: 'Beam Us Your Coordinates',       sub: "How should we reach you? We'll prioritise your preferred channel." },
  { Icon: Clock,     title: 'Pick Your Launch Window',        sub: "When are you free? We'll schedule around your orbit."              },
  { Icon: FileText,  title: 'Mission Brief',                  sub: 'Any extra context for mission control? (Optional)'                 },
];

/* ─── Static star field (25 stars, no per-star animation) ──────────────────── */
const STARS = Array.from({ length: 25 }, (_, i) => {
  const s = n => { const v = Math.sin(n * 9301 + 49297) * 233280; return v - Math.floor(v); };
  return { id: i, cx: s(i) * 100, cy: s(i + 50) * 100, r: 0.5 + s(i + 100) * 1.2, op: 0.08 + s(i + 200) * 0.22 };
});

/* ─── Step dots ─────────────────────────────────────────────────────────────── */
function StepDots({ current, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      {Array.from({ length: total }, (_, i) => (
        <motion.div key={i}
          animate={{ width: i === current ? 22 : 6, opacity: i <= current ? 1 : 0.2 }}
          transition={{ duration: 0.3 }}
          style={{ height: 5, borderRadius: 99, background: i === current ? '#7c3aed' : '#6b7280' }}
        />
      ))}
    </div>
  );
}

/* ─── Scroll lock ───────────────────────────────────────────────────────────── */
function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [active]);
}

/* ─── Theme tokens ──────────────────────────────────────────────────────────── */
function tk(isDark) {
  return {
    backdropBg:    isDark ? 'rgba(0,0,0,0.80)'    : 'rgba(8,5,28,0.55)',
    cardBg:        isDark ? 'rgba(0,0,0,0.82)'    : 'rgba(255,255,255,0.72)',
    cardBorder:    isDark ? 'rgba(255,255,255,0.08)': 'rgba(124,58,237,0.15)',
    cardShadow:    isDark
      ? '0 0 0 1px rgba(255,255,255,0.04), 0 40px 100px rgba(0,0,0,0.95), 0 0 0 0.5px rgba(255,255,255,0.03) inset'
      : '0 0 0 1px rgba(124,58,237,0.06), 0 28px 70px rgba(0,0,0,0.16), 0 0 30px rgba(124,58,237,0.04)',
    textPrimary:   isDark ? '#f3f0ff' : '#1c1433',
    textSecondary: isDark ? '#9ca3af' : '#6b7280',
    textMuted:     isDark ? '#6b7280' : '#9ca3af',
    inputBg:       isDark ? 'rgba(255,255,255,0.05)' : 'rgba(124,58,237,0.05)',
    inputBorder:   isDark ? 'rgba(255,255,255,0.09)' : 'rgba(124,58,237,0.15)',
    inputActive:   isDark ? 'rgba(167,139,250,0.55)' : 'rgba(124,58,237,0.45)',
    chipBg:        isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.55)',
    chipBorder:    isDark ? 'rgba(255,255,255,0.10)' : 'rgba(124,58,237,0.12)',
    divider:       isDark ? 'rgba(255,255,255,0.08)' : 'rgba(124,58,237,0.1)',
    closeBg:       isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
    closeBorder:   isDark ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.1)',
    closeColor:    isDark ? '#9ca3af'                : '#6b7280',
    summaryBg:     isDark ? 'rgba(255,255,255,0.05)' : 'rgba(124,58,237,0.05)',
    summaryBorder: isDark ? 'rgba(255,255,255,0.09)' : 'rgba(124,58,237,0.12)',
    summaryVal:    isDark ? '#ffffff'                : '#3b1fa8',
    starsColor:    isDark ? 'rgba(255,255,255,0.9)'  : '#7c3aed',
    starsBase:     isDark ? 1                        : 0.35,
    nebula1:       isDark ? 'rgba(255,255,255,0.025)': 'rgba(124,58,237,0.06)',
    nebula2:       isDark ? 'rgba(255,255,255,0.015)': 'rgba(99,102,241,0.05)',
    backBg:        isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
    backBorder:    isDark ? 'rgba(255,255,255,0.11)' : 'rgba(0,0,0,0.09)',
    backColor:     isDark ? '#9ca3af'                : '#6b7280',
  };
}

/* ─── Main ──────────────────────────────────────────────────────────────────── */
export default function ContactModal({ isOpen, onClose, preselectedService = null }) {
  const { isDark } = useTheme();
  const t = tk(isDark);
  useScrollLock(isOpen);

  const TOTAL = STEPS.length;
  const [step, setStep]     = useState(0);
  const [submitting, setSub] = useState(false);
  const [submitted, setDone] = useState(false);
  const [error, setError]    = useState('');
  const [form, setForm]      = useState({ name:'', service:'', projectType:'', email:'', mobile:'', contactMode:'', timing:'', description:'' });
  const nameRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setForm(f => ({ ...f, service: preselectedService || f.service }));
      setStep(0); setDone(false); setError('');
    }
  }, [isOpen, preselectedService]);

  useEffect(() => {
    if (isOpen && step === 0) setTimeout(() => nameRef.current?.focus(), 380);
  }, [isOpen, step]);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const canNext = () => {
    if (step === 0) return form.name.trim().length >= 2;
    if (step === 1) return form.service !== '' && form.projectType !== '';
    if (step === 2) return form.email.includes('@') && form.mobile.trim().length >= 7 && form.contactMode !== '';
    if (step === 3) return form.timing !== '';
    return true;
  };

  const handleSubmit = async () => {
    setSub(true); setError('');
    try {
      const res = await fetch('https://formspree.io/f/xyzgpgwj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          service: SERVICES.find(s => s.id === form.service)?.label || form.service,
          projectType: PROJECT_TYPES.find(p => p.id === form.projectType)?.label || form.projectType,
          email: form.email, mobile: form.mobile,
          preferredContact: form.contactMode,
          availableTiming: form.timing,
          description: form.description,
        }),
      });
      if (res.ok) setDone(true);
      else setError('Houston, we had a problem. Please try again.');
    } catch { setError('Network error — please check your connection.'); }
    finally { setSub(false); }
  };

  const selectedSvc = SERVICES.find(s => s.id === form.service);
  const selectedProj = PROJECT_TYPES.find(p => p.id === form.projectType);
  const selectedTiming = TIMESLOTS.find(ts => `${ts.label} (${ts.sub})` === form.timing);

  const input = (active) => ({
    width: '100%', boxSizing: 'border-box',
    paddingTop: 14, paddingBottom: 14, paddingRight: 14,
    borderRadius: 13, fontSize: 14, fontWeight: 500,
    background: t.inputBg,
    border: `1.5px solid ${active ? t.inputActive : t.inputBorder}`,
    color: t.textPrimary, outline: 'none', transition: 'border 0.22s',
    fontFamily: 'inherit',
  });

  if (!isOpen) return null;

  const CurStep = STEPS[step];

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* NO injected keyframes — removed starBlink animation */}

          {/* ── Backdrop ── */}
          <motion.div
            key="cm-bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 99990,
              background: t.backdropBg,
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 16,
            }}
          >
            {/* ── Card ── */}
            <motion.div
              key="cm-card"
              initial={{ opacity: 0, scale: 0.88, y: 36 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 36 }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%', maxWidth: 520,
                maxHeight: '90vh', overflowY: 'auto',
                borderRadius: 28,
                background: t.cardBg,
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: `1px solid ${t.cardBorder}`,
                boxShadow: t.cardShadow,
                zIndex: 99999,
              }}
            >
              {/* Stars — static, no CSS animation */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, borderRadius: 28, overflow: 'hidden' }}>
                {STARS.map(s => (
                  <circle key={s.id} cx={`${s.cx}%`} cy={`${s.cy}%`} r={s.r} fill={t.starsColor} opacity={s.op * t.starsBase} />
                ))}
              </svg>

              {/* Nebula glows */}
              <div style={{ position: 'absolute', top: -28, right: -28, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle,${t.nebula1},transparent)`, filter: 'blur(32px)', pointerEvents: 'none', zIndex: 0 }} />
              <div style={{ position: 'absolute', bottom: -28, left: -28, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle,${t.nebula2},transparent)`, filter: 'blur(32px)', pointerEvents: 'none', zIndex: 0 }} />

              {/* ── Content ── */}
              <div style={{ position: 'relative', zIndex: 1, padding: '26px 24px 22px' }}>

                {/* Close */}
                <button onClick={onClose} style={{
                  position: 'absolute', top: 14, right: 14,
                  width: 30, height: 30, borderRadius: '50%',
                  background: t.closeBg, border: `1px solid ${t.closeBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: t.closeColor, zIndex: 10, transition: 'all 0.2s',
                }}>
                  <X size={13} />
                </button>

                <AnimatePresence mode="wait">

                  {/* ─ SUCCESS ─ */}
                  {submitted ? (
                    <motion.div key="success"
                      initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '22px 0 10px', gap: 16 }}>

                      <motion.div
                        animate={{ rotate: [0, -12, 12, -8, 8, 0], scale: [1,1.2,1] }}
                        transition={{ duration: 0.7 }}
                        style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg,#7c3aed22,#4f46e522)', border: '1px solid rgba(124,58,237,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Rocket size={32} style={{ color: '#7c3aed' }} />
                      </motion.div>

                      <div>
                        <h2 style={{ fontSize: 23, fontWeight: 900, color: t.textPrimary, margin: '0 0 8px', letterSpacing: '-0.03em' }}>Mission Launched!</h2>
                        <p style={{ color: t.textSecondary, fontSize: 13.5, lineHeight: 1.65, maxWidth: 280, margin: '0 auto' }}>
                          We've received your signal, <strong style={{ color: '#7c3aed' }}>{form.name}</strong>! Our team will reach you via{' '}
                          <strong style={{ color: '#7c3aed', textTransform: 'capitalize' }}>{form.contactMode}</strong> soon.
                        </p>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                        {['Received', form.contactMode && `Via ${form.contactMode}`, selectedTiming?.label].filter(Boolean).map((tag, i) => (
                          <span key={i} style={{ padding: '4px 12px', borderRadius: 99, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.28)', color: '#7c3aed', fontSize: 11, fontWeight: 700 }}>
                            <CheckCircle size={10} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />{tag}
                          </span>
                        ))}
                      </div>

                      <button onClick={onClose} style={{
                        marginTop: 2, padding: '10px 28px', borderRadius: 99,
                        background: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
                        border: '1px solid rgba(124,58,237,0.4)',
                        color: '#fff', fontWeight: 800, fontSize: 13,
                        cursor: 'pointer', boxShadow: '0 0 24px rgba(124,58,237,0.35)',
                        display: 'flex', alignItems: 'center', gap: 7,
                      }}>
                        <Rocket size={14} /> Back to Base
                      </button>
                    </motion.div>

                  ) : (
                    /* ─ FORM ─ */
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                      {/* Header */}
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 11 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(124,58,237,0.13)', border: '1px solid rgba(124,58,237,0.24)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CurStep.Icon size={16} style={{ color: '#7c3aed' }} />
                          </div>
                          <div>
                            <p style={{ color: '#7c3aed', fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>
                              Mission Control · Step {step + 1} of {TOTAL}
                            </p>
                            <StepDots current={step} total={TOTAL} />
                          </div>
                        </div>
                        <h2 style={{ fontSize: 20, fontWeight: 900, color: t.textPrimary, margin: '0 0 4px', letterSpacing: '-0.025em', lineHeight: 1.2 }}>{CurStep.title}</h2>
                        <p style={{ color: t.textMuted, fontSize: 12.5, margin: 0, lineHeight: 1.5 }}>{CurStep.sub}</p>
                      </div>

                      <AnimatePresence mode="wait">

                        {/* ─ Step 0: Name ─ */}
                        {step === 0 && (
                          <motion.div key="s0" initial={{ opacity:0, x:18 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-18 }} transition={{ duration:0.18 }}>
                            <div style={{ position: 'relative' }}>
                              <User size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'#7c3aed', pointerEvents:'none' }} />
                              <input ref={nameRef} type="text" placeholder="Your full name..." value={form.name}
                                onChange={e => upd('name', e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && canNext() && setStep(1)}
                                style={{ ...input(form.name.length >= 2), paddingLeft: 42 }} />
                              <AnimatePresence>
                                {form.name.length >= 2 && (
                                  <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}
                                    style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)' }}>
                                    <CheckCircle size={16} style={{ color:'#7c3aed' }} />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            {form.name.trim().length > 0 && form.name.trim().length < 2 && (
                              <p style={{ color:'#ef4444', fontSize:11.5, marginTop:5, marginLeft:2 }}>Please enter your full name</p>
                            )}
                          </motion.div>
                        )}

                        {/* ─ Step 1: Service + Project Type ─ */}
                        {step === 1 && (
                          <motion.div key="s1" initial={{ opacity:0, x:18 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-18 }} transition={{ duration:0.18 }}>
                            <SectionLabel label="Service Needed" color={t.textMuted} />
                            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7, marginBottom:16 }}>
                              {SERVICES.map(s => {
                                const Icon = s.icon;
                                const active = form.service === s.id;
                                return (
                                  <motion.button key={s.id} whileTap={{ scale:0.95 }} onClick={() => upd('service', s.id)}
                                    style={{
                                      display:'flex', alignItems:'center', gap:8,
                                      padding:'9px 11px', borderRadius:12, cursor:'pointer',
                                      background: active ? `${s.color}18` : t.chipBg,
                                      border: `1.5px solid ${active ? s.color+'55' : t.chipBorder}`,
                                      boxShadow: active ? `0 0 16px ${s.color}22` : 'none',
                                      transition:'all 0.18s', position:'relative',
                                    }}>
                                    <div style={{ width:28, height:28, borderRadius:8, background: active ? `${s.color}22` : 'rgba(255,255,255,0.06)', border:`1px solid ${active ? s.color+'44' : 'rgba(255,255,255,0.08)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                                      <Icon size={14} style={{ color: active ? s.color : t.textMuted }} />
                                    </div>
                                    <span style={{ fontSize:11, fontWeight:700, color: active ? s.color : t.textSecondary, lineHeight:1.2 }}>{s.label}</span>
                                    {active && (
                                      <motion.div initial={{scale:0}} animate={{scale:1}}
                                        style={{ position:'absolute', top:-5, right:-5, width:14, height:14, borderRadius:'50%', background:s.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
                                        <CheckCircle size={8} style={{ color:'#fff' }} />
                                      </motion.div>
                                    )}
                                  </motion.button>
                                );
                              })}
                            </div>

                            <SectionLabel label="Project Type" color={t.textMuted} />
                            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:7 }}>
                              {PROJECT_TYPES.map(pt => {
                                const Icon = pt.icon;
                                const active = form.projectType === pt.id;
                                return (
                                  <motion.button key={pt.id} whileTap={{ scale:0.95 }} onClick={() => upd('projectType', pt.id)}
                                    style={{
                                      display:'flex', flexDirection:'column', alignItems:'center',
                                      gap:5, padding:'11px 6px', borderRadius:12, cursor:'pointer',
                                      background: active ? 'rgba(124,58,237,0.13)' : t.chipBg,
                                      border: `1.5px solid ${active ? 'rgba(124,58,237,0.48)' : t.chipBorder}`,
                                      boxShadow: active ? '0 0 16px rgba(124,58,237,0.15)' : 'none',
                                      transition:'all 0.18s',
                                    }}>
                                    <div style={{ width:30, height:30, borderRadius:9, background: active ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.06)', border:`1px solid ${active ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                                      <Icon size={15} style={{ color: active ? '#7c3aed' : t.textMuted }} />
                                    </div>
                                    <span style={{ fontSize:10, fontWeight:800, color: active ? '#7c3aed' : t.textSecondary, lineHeight:1.2, textAlign:'center' }}>{pt.label}</span>
                                    <span style={{ fontSize:9, color:t.textMuted, textAlign:'center' }}>{pt.desc}</span>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}

                        {/* ─ Step 2: Contact ─ */}
                        {step === 2 && (
                          <motion.div key="s2" initial={{ opacity:0, x:18 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-18 }} transition={{ duration:0.18 }}>
                            <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:16 }}>
                              <div style={{ position:'relative' }}>
                                <Mail size={14} style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', color:'#60a5fa', pointerEvents:'none' }} />
                                <input type="email" placeholder="Email address" value={form.email} onChange={e => upd('email', e.target.value)}
                                  style={{ ...input(form.email.includes('@')), paddingLeft:38 }} />
                              </div>
                              <div style={{ position:'relative' }}>
                                <Phone size={14} style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', color:'#f59e0b', pointerEvents:'none' }} />
                                <input type="tel" placeholder="Mobile number" value={form.mobile} onChange={e => upd('mobile', e.target.value)}
                                  style={{ ...input(form.mobile.trim().length >= 7), paddingLeft:38 }} />
                              </div>
                            </div>

                            <SectionLabel label="Preferred Contact Mode" color={t.textMuted} suffix="(we'll prioritise this channel)" />
                            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:7 }}>
                              {CONTACT_MODES.map(m => {
                                const Icon = m.icon;
                                const active = form.contactMode === m.id;
                                return (
                                  <motion.button key={m.id} whileTap={{ scale:0.95 }} onClick={() => upd('contactMode', m.id)}
                                    style={{
                                      display:'flex', flexDirection:'column', alignItems:'center',
                                      gap:5, padding:'12px 6px', borderRadius:13, cursor:'pointer',
                                      background: active ? `${m.color}16` : t.chipBg,
                                      border: `1.5px solid ${active ? m.color+'55' : t.chipBorder}`,
                                      boxShadow: active ? `0 0 18px ${m.color}22` : 'none',
                                      transition:'all 0.18s', position:'relative',
                                    }}>
                                    <div style={{ width:32, height:32, borderRadius:9, background: active ? `${m.color}22` : 'rgba(255,255,255,0.06)', border:`1px solid ${active ? m.color+'44' : 'rgba(255,255,255,0.08)'}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                                      <Icon size={16} style={{ color: active ? m.color : t.textMuted }} />
                                    </div>
                                    <span style={{ fontSize:11, fontWeight:700, color: active ? m.color : t.textSecondary }}>{m.label}</span>
                                    <span style={{ fontSize:9, color:t.textMuted }}>{m.desc}</span>
                                    {active && (
                                      <motion.div initial={{scale:0}} animate={{scale:1}}
                                        style={{ position:'absolute', top:-5, right:-5, width:15, height:15, borderRadius:'50%', background:m.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
                                        <Star size={8} style={{ color:'#fff', fill:'#fff' }} />
                                      </motion.div>
                                    )}
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}

                        {/* ─ Step 3: Timing ─ */}
                        {step === 3 && (
                          <motion.div key="s3" initial={{ opacity:0, x:18 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-18 }} transition={{ duration:0.18 }}>
                            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                              {TIMESLOTS.map(slot => {
                                const Icon = slot.icon;
                                const val = `${slot.label} (${slot.sub})`;
                                const active = form.timing === val;
                                return (
                                  <motion.button key={slot.label} whileTap={{ scale:0.97 }} onClick={() => upd('timing', val)}
                                    style={{
                                      display:'flex', alignItems:'center', gap:11,
                                      padding:'13px 12px', borderRadius:15, cursor:'pointer',
                                      background: active ? 'rgba(124,58,237,0.13)' : t.chipBg,
                                      border: `1.5px solid ${active ? 'rgba(124,58,237,0.48)' : t.chipBorder}`,
                                      boxShadow: active ? '0 0 20px rgba(124,58,237,0.14)' : 'none',
                                      transition:'all 0.2s',
                                    }}>
                                    <div style={{ width:34, height:34, borderRadius:10, background: active ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.06)', border:`1px solid ${active ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                                      <Icon size={17} style={{ color: active ? '#7c3aed' : t.textMuted }} />
                                    </div>
                                    <div>
                                      <p style={{ color:t.textPrimary, fontWeight:800, fontSize:12, margin:0, lineHeight:1.3 }}>{slot.label}</p>
                                      <p style={{ color:t.textMuted, fontSize:10, margin:0 }}>{slot.sub}</p>
                                    </div>
                                    {active && (
                                      <motion.div initial={{scale:0}} animate={{scale:1}}
                                        style={{ marginLeft:'auto', width:18, height:18, borderRadius:'50%', background:'#7c3aed', display:'flex', alignItems:'center', justifyContent:'center' }}>
                                        <CheckCircle size={11} style={{ color:'#fff' }} />
                                      </motion.div>
                                    )}
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}

                        {/* ─ Step 4: Description + Summary ─ */}
                        {step === 4 && (
                          <motion.div key="s4" initial={{ opacity:0, x:18 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-18 }} transition={{ duration:0.18 }}
                            style={{ display:'flex', flexDirection:'column', gap:11 }}>
                            <textarea
                              placeholder="Any specific requirements or goals? (Optional)"
                              value={form.description}
                              onChange={e => upd('description', e.target.value)}
                              rows={3}
                              style={{ ...input(!!form.description), paddingLeft:14, padding:'12px 14px', resize:'none' }}
                            />

                            {/* Summary */}
                            <div style={{ borderRadius:13, padding:'13px 14px', background:t.summaryBg, border:`1px solid ${t.summaryBorder}` }}>
                              <p style={{ fontSize:9, fontWeight:800, color:'#7c3aed', letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:10 }}>Mission Summary</p>
                              {[
                                { Icon: User,       label:'Commander',  val: form.name },
                                { Icon: Target,     label:'Service',    val: selectedSvc?.label },
                                { Icon: Rocket,     label:'Project',    val: selectedProj?.label },
                                { Icon: Radio,      label:'Contact via',val: form.contactMode },
                                { Icon: Clock,      label:'Window',     val: selectedTiming?.label },
                              ].map(row => (
                                <div key={row.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:7 }}>
                                  <span style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:t.textSecondary }}>
                                    <row.Icon size={12} style={{ color:'#7c3aed', flexShrink:0 }} />
                                    {row.label}
                                  </span>
                                  <span style={{ fontSize:12, fontWeight:700, color:t.summaryVal, textTransform:'capitalize' }}>{row.val || '—'}</span>
                                </div>
                              ))}
                            </div>

                            {error && <p style={{ color:'#ef4444', fontSize:12.5, textAlign:'center' }}>{error}</p>}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* ── Nav ── */}
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:18, paddingTop:14, borderTop:`1px solid ${t.divider}` }}>
                        {step > 0 ? (
                          <button onClick={() => setStep(s => s-1)}
                            style={{ padding:'9px 17px', borderRadius:11, background:t.backBg, border:`1px solid ${t.backBorder}`, color:t.backColor, fontSize:12.5, fontWeight:600, cursor:'pointer', transition:'all 0.2s' }}>
                            ← Back
                          </button>
                        ) : <div />}

                        {step < TOTAL - 1 ? (
                          <motion.button whileTap={{ scale:0.97 }} onClick={() => canNext() && setStep(s => s+1)}
                            style={{
                              display:'flex', alignItems:'center', gap:5,
                              padding:'10px 24px', borderRadius:11,
                              background: canNext() ? 'linear-gradient(135deg,#7c3aed,#4f46e5)' : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'),
                              border:`1px solid ${canNext() ? 'rgba(124,58,237,0.45)' : (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)')}`,
                              boxShadow: canNext() ? '0 0 22px rgba(124,58,237,0.32)' : 'none',
                              color: canNext() ? '#fff' : t.textMuted,
                              fontSize:13, fontWeight:800,
                              cursor: canNext() ? 'pointer' : 'not-allowed',
                              opacity: canNext() ? 1 : 0.42,
                              transition:'all 0.22s',
                            }}>
                            Continue <ChevronRight size={14} />
                          </motion.button>
                        ) : (
                          <motion.button whileTap={{ scale:0.97 }} onClick={handleSubmit} disabled={submitting}
                            style={{
                              display:'flex', alignItems:'center', gap:7,
                              padding:'10px 24px', borderRadius:11,
                              background:'linear-gradient(135deg,#7c3aed,#4f46e5)',
                              border:'1px solid rgba(124,58,237,0.45)',
                              boxShadow:'0 0 26px rgba(124,58,237,0.36)',
                              color:'#fff', fontSize:13, fontWeight:800,
                              cursor: submitting ? 'not-allowed' : 'pointer',
                              opacity: submitting ? 0.7 : 1,
                              transition:'all 0.22s',
                            }}>
                            {submitting ? (
                              <>
                                <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:'linear' }}
                                  style={{ width:13, height:13, borderRadius:'50%', border:'2px solid rgba(255,255,255,0.25)', borderTopColor:'#fff' }} />
                                Launching...
                              </>
                            ) : (
                              <><SendHorizonal size={14} /> Launch Mission</>
                            )}
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* tiny helper */
function SectionLabel({ label, color, suffix }) {
  return (
    <p style={{ fontSize:10, fontWeight:800, color, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
      {label}
      {suffix && <span style={{ color:'#7c3aed', fontWeight:600, textTransform:'none', letterSpacing:0, fontSize:11 }}>{suffix}</span>}
    </p>
  );
}
