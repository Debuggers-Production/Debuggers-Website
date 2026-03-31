import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Pre-generated stable star positions
const STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: `${(i * 137.508 + 10) % 95 + 2.5}%`,
  y: `${(i * 97.311 + 5) % 85 + 5}%`,
  r: (i % 3) * 0.6 + 0.4,
}));

// Pre-generated stable spark offsets
const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  angle: (i / 10) * 360,
  dist: 12 + (i % 3) * 8,
  dur: 0.2 + (i % 4) * 0.08,
}));

export default function LandingAnimation({ onComplete }) {
  const containerControls = useAnimation();
  const earthControls = useAnimation();
  const rocketControls = useAnimation();
  const flameControls = useAnimation();
  const smokeControls = useAnimation();

  const [launched, setLaunched] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [starsVisible, setStarsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sequence = async () => {
      // 1. Short dramatic pause
      await new Promise(r => setTimeout(r, 600));

      // 2. Pre-launch rumble
      await rocketControls.start({
        x: [-3, 3, -2, 2, -1, 1, 0],
        transition: { duration: 0.6, ease: 'easeInOut' }
      });

      // 3. Smoke billows out
      smokeControls.start({
        scale: [1, 6],
        opacity: [0.5, 0],
        transition: { duration: 1.4, ease: 'easeOut' }
      });

      // 4. Mark as launched (shows flame)
      setLaunched(true);

      // 5. Rocket launches upward
      rocketControls.start({
        y: -1400,
        x: 0,
        transition: { duration: 2.2, ease: [0.4, 0, 0.1, 1] }
      });

      // 6. Earth pushes down
      earthControls.start({
        y: 500,
        scale: 0.75,
        opacity: 0,
        transition: { duration: 2.2, ease: [0.4, 0, 0.1, 1] }
      });

      // 7. Stars fade in as we go up
      await new Promise(r => setTimeout(r, 400));
      setStarsVisible(true);

      // 8. Flash transition
      await new Promise(r => setTimeout(r, 1000));

      await containerControls.start({
        backgroundColor: '#ffffff',
        transition: { duration: 0.2 }
      });

      await containerControls.start({
        opacity: 0,
        transition: { duration: 0.5 }
      });

      onComplete();
    };

    sequence();
  }, [containerControls, earthControls, rocketControls, flameControls, smokeControls, onComplete]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 1, backgroundColor: '#000000' }}
      animate={containerControls}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Stars fading in */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: starsVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {STARS.map(star => (
          <circle key={star.id} cx={star.x} cy={star.y} r={star.r} fill="white" opacity="0.7" />
        ))}
      </motion.svg>

      {/* Earth */}
      <motion.div
        initial={{ y: 150, scale: 1, opacity: 1 }}
        animate={earthControls}
        className="absolute bottom-[-100px] md:bottom-[-180px] w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] rounded-full border border-white/10"
        style={{
          background: 'radial-gradient(100% 100% at 50% 0%, #1a1a2e 0%, #0d0d0d 60%, #000 100%)',
          boxShadow: 'inset 0 80px 120px -40px rgba(100,120,255,0.12), 0 -20px 100px rgba(100,120,255,0.06)'
        }}
      >
        {/* Continent hints */}
        <div className="absolute top-[8%] left-[18%] w-[38%] h-[28%] border-[0.5px] border-white/5 rounded-full" />
        <div className="absolute top-[28%] right-[12%] w-[28%] h-[35%] border-[0.5px] border-white/5 rounded-[40%]" />
        <div className="absolute top-[55%] left-[30%] w-[22%] h-[18%] border-[0.5px] border-white/4 rounded-full" />
        {/* Atmosphere glow ring */}
        <div className="absolute inset-[-4px] rounded-full" style={{ boxShadow: '0 0 30px 6px rgba(80,120,255,0.08)' }} />
      </motion.div>

      {/* Rocket + Flame assembly */}
      <motion.div
        initial={{ y: 0, x: 0 }}
        animate={rocketControls}
        className="absolute z-20 flex flex-col items-center"
        style={{ top: '58%' }}
      >
        {/* Exhaust trail (always shown, grows on launch) */}
        <motion.div
          className="absolute"
          style={{ top: '218px', left: '50%', transform: 'translateX(-50%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: launched ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Primary trail */}
          <div className="w-[3px] h-[500px] bg-gradient-to-b from-white via-white/30 to-transparent blur-[1px]" style={{ marginLeft: '-1.5px' }} />
          {/* Secondary blurred trail */}
          <div className="absolute top-0 w-[10px] h-[300px] bg-gradient-to-b from-orange-300/40 via-yellow-200/20 to-transparent blur-[4px]" style={{ marginLeft: '-5px' }} />
        </motion.div>

        {/* Smoke puffs */}
        <motion.div
          animate={smokeControls}
          initial={{ scale: 0, opacity: 0 }}
          className="absolute rounded-full bg-white/20 blur-xl w-8 h-8"
          style={{ top: '200px', left: '50%', transform: 'translateX(-50%)' }}
        />

        {/* Spark particles */}
        {launched && SPARKS.map(spark => {
          const rad = (spark.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * spark.dist;
          const ty = Math.sin(rad) * spark.dist;
          return (
            <motion.div
              key={spark.id}
              className="absolute w-1 h-1 rounded-full bg-orange-300"
              style={{ top: '210px', left: '50%', marginLeft: '-2px' }}
              animate={{
                x: [0, tx],
                y: [0, ty + 20],
                opacity: [1, 0],
                scale: [1, 0.3],
              }}
              transition={{
                duration: spark.dur,
                repeat: Infinity,
                ease: 'easeOut',
                repeatDelay: spark.dur * 0.5,
              }}
            />
          );
        })}

        {/* Flame layers */}
        {launched && (
          <div className="absolute flex flex-col items-center" style={{ top: '192px', left: '50%', transform: 'translateX(-50%)' }}>
            {/* Outer flame — orange */}
            <motion.div
              className="rounded-b-full rounded-t-sm bg-gradient-to-b from-orange-400 via-orange-500 to-transparent blur-[2px] opacity-80"
              style={{ width: '20px', height: '40px', marginLeft: '-10px' }}
              animate={{ scaleY: [1, 1.4, 0.9, 1.3, 1], scaleX: [1, 0.85, 1.1, 0.9, 1], opacity: [0.8, 1, 0.7, 1, 0.8] }}
              transition={{ duration: 0.25, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Mid flame — yellow */}
            <motion.div
              className="absolute rounded-b-full bg-gradient-to-b from-yellow-200 via-yellow-400 to-transparent blur-[1px]"
              style={{ width: '12px', height: '28px', top: '2px', marginLeft: '-6px' }}
              animate={{ scaleY: [1, 1.3, 0.85, 1.2, 1], opacity: [0.9, 1, 0.8, 1, 0.9] }}
              transition={{ duration: 0.2, repeat: Infinity, ease: 'easeInOut', delay: 0.05 }}
            />
            {/* Core — white hot */}
            <motion.div
              className="absolute rounded-full bg-white blur-[0.5px]"
              style={{ width: '5px', height: '14px', top: '4px', marginLeft: '-2.5px' }}
              animate={{ scaleY: [1, 1.2, 0.9, 1], opacity: [1, 0.8, 1, 0.9] }}
              transition={{ duration: 0.15, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        )}

        {/* Rocket SVG */}
        <svg width="44" height="200" viewBox="0 0 44 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d4d4d4" />
              <stop offset="40%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#b0b0b0" />
            </linearGradient>
            <linearGradient id="noseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cccccc" />
            </linearGradient>
            <linearGradient id="nozzleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#888888" />
              <stop offset="100%" stopColor="#444444" />
            </linearGradient>
          </defs>

          {/* Nosecone */}
          <path d="M22 0 L32 50 L12 50 Z" fill="url(#noseGrad)" />
          {/* Nose cap accent line */}
          <line x1="14" y1="42" x2="30" y2="42" stroke="#aaaaaa" strokeWidth="0.8" />

          {/* Main body */}
          <rect x="12" y="50" width="20" height="110" rx="2" fill="url(#bodyGrad)" />

          {/* Body panel lines */}
          <line x1="12" y1="80" x2="32" y2="80" stroke="#cccccc" strokeWidth="0.6" />
          <line x1="12" y1="110" x2="32" y2="110" stroke="#cccccc" strokeWidth="0.6" />
          <line x1="12" y1="138" x2="32" y2="138" stroke="#cccccc" strokeWidth="0.6" />

          {/* Cockpit window */}
          <ellipse cx="22" cy="68" rx="5" ry="7" fill="#1a3a5c" stroke="#888888" strokeWidth="0.8" />
          <ellipse cx="21" cy="66" rx="2" ry="3" fill="#4a9eda" opacity="0.6" />

          {/* Side fins — left */}
          <path d="M12 120 L2 165 L12 158 Z" fill="#a0a0a0" />
          <path d="M12 120 L12 158 L2 165 Z" fill="#cccccc" />

          {/* Side fins — right */}
          <path d="M32 120 L42 165 L32 158 Z" fill="#a0a0a0" />
          <path d="M32 120 L32 158 L42 165 Z" fill="#cccccc" />

          {/* Engine band */}
          <rect x="11" y="155" width="22" height="6" rx="1" fill="#888888" />

          {/* Nozzle bell */}
          <path d="M15 161 L10 180 L34 180 L29 161 Z" fill="url(#nozzleGrad)" />
          {/* Nozzle inner */}
          <ellipse cx="22" cy="180" rx="10" ry="3" fill="#222222" />

          {/* Rivets */}
          <circle cx="15" cy="55" r="1" fill="#aaaaaa" />
          <circle cx="29" cy="55" r="1" fill="#aaaaaa" />
          <circle cx="15" cy="145" r="1" fill="#aaaaaa" />
          <circle cx="29" cy="145" r="1" fill="#aaaaaa" />

          {/* Small side thrusters */}
          <rect x="7" y="148" width="5" height="12" rx="2" fill="#999999" />
          <rect x="32" y="148" width="5" height="12" rx="2" fill="#999999" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
