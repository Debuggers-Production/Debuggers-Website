import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName?.toLowerCase() === 'button' ||
        e.target.tagName?.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-10000"
      style={{
        translateX: mousePosition.x - 4,
        translateY: mousePosition.y - 4,
      }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
    >
      <div className={`transition-all duration-300 transform ${isHovering ? 'scale-80' : isDark ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]'}`}>
        <img
          src="/rocket2.svg"
          alt="Cursor"
          className="w-7 h-7 object-contain pointer-events-none rotate-[-68deg]"
          style={{ filter: isDark ? 'none' : 'invert(1)' }}
        />
      </div>
    </motion.div>
  );
}
