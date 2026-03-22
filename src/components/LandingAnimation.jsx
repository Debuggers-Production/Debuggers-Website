import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function LandingAnimation({ onComplete }) {
  const containerControls = useAnimation();
  const earthControls = useAnimation();
  const rocketControls = useAnimation();
  const blastControls = useAnimation();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sequence = async () => {
      // 1. Initial pause for dramatic effect
      await new Promise((resolve) => setTimeout(resolve, 800));

      // 2. Rocket launches straight up
      rocketControls.start({
        y: -1200,
        transition: { duration: 2, ease: [0.5, 0, 0.2, 1] } // Custom easing for acceleration
      });

      // Blast expansion
      blastControls.start({
        scale: [1, 20],
        opacity: [0.8, 0],
        transition: { duration: 1.5, ease: 'easeOut' }
      });

      // 3. Earth pushes down smoothly
      earthControls.start({
        y: 400,
        scale: 0.8,
        opacity: 0,
        transition: { duration: 2, ease: [0.5, 0, 0.2, 1] }
      });

      // 4. Wait for break effect
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Flash whole screen
      await containerControls.start({
        backgroundColor: '#ffffff',
        transition: { duration: 0.2 }
      });

      await containerControls.start({
        opacity: 0,
        transition: { duration: 0.6 }
      });

      onComplete();
    };

    sequence();
  }, [containerControls, earthControls, rocketControls, blastControls, onComplete]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 1, backgroundColor: '#000000' }}
      animate={containerControls}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Stark Geometric Earth */}
      <motion.div
        initial={{ y: 150, scale: 1, opacity: 1 }}
        animate={earthControls}
        className="absolute bottom-[-100px] md:bottom-[-200px] w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] rounded-full border border-white/10"
        style={{
          background: 'radial-gradient(100% 100% at 50% 0%, #111 0%, #000 100%)',
          boxShadow: 'inset 0 100px 100px -50px rgba(255,255,255,0.1), 0 -20px 100px rgba(255,255,255,0.05)'
        }}
      >
        {/* Minimal continent shapes just using borders */}
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[30%] border-[0.5px] border-white/5 rounded-full" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[40%] border-[0.5px] border-white/5 rounded-[40%]" />
      </motion.div>

      {/* Sleek Rocket Vector */}
      <motion.div
        initial={{ y: 0 }}
        animate={rocketControls}
        className="absolute z-20 flex flex-col items-center justify-end"
        style={{ top: '60%' }} // Starting exactly just above earth apex
      >
        <svg width="24" height="120" viewBox="0 0 24 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Body */}
          <path d="M12 0L20 40V120H4V40L12 0Z" fill="white" />
          {/* Cockpit Window */}
          <ellipse cx="12" cy="50" rx="3" ry="8" fill="black" />
          {/* Fins */}
          <path d="M4 80L0 120H4V80Z" fill="#555555" />
          <path d="M20 80L24 120H20V80Z" fill="#555555" />
        </svg>

        {/* Engine Blast */}
        <motion.div
          animate={blastControls}
          className="absolute top-[120px] w-4 h-4 bg-white rounded-full blur-md"
        />
        <div className="absolute top-[120px] w-[2px] h-[300px] bg-gradient-to-b from-white via-white/50 to-transparent blur-[1px]" />
      </motion.div>
    </motion.div>
  );
}
