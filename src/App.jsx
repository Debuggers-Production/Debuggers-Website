import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Github } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import LandingAnimation from './components/LandingAnimation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ProblemSolution from './components/ProblemSolution';
import Team from './components/Team';
import Customers from './components/Customers';
import ServiceDetailPage from './pages/ServiceDetailPage';

// ── Home Page ──────────────────────────────────────────────────────────────
function HomePage() {
  // Only show the landing animation on the very first load of the session
  const [showLanding, setShowLanding] = useState(
    () => !sessionStorage.getItem('landingPlayed')
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLandingComplete = () => {
    sessionStorage.setItem('landingPlayed', 'true');
    setShowLanding(false);
  };


  return (
    <div className="bg-black min-h-screen w-full relative">
      <AnimatePresence>
        {showLanding && (
          <LandingAnimation onComplete={handleLandingComplete} />
        )}
      </AnimatePresence>

      {!showLanding && <Navbar />}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: showLanding ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`w-full ${showLanding ? 'h-screen overflow-hidden' : ''}`}
      >
        <div id="hero"><Hero /></div>
        <div id="services"><Services /></div>
        <div id="problem"><ProblemSolution /></div>
        <div id="customers"><Customers /></div>
        <div id="team"><Team /></div>

        <footer className="w-full py-16 lg:py-20 border-t border-white/10 bg-black text-center relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <div className="flex items-center gap-6 mb-12">
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                <Instagram className="w-5 h-5 text-neutral-400 group-hover:text-fuchsia-400 transition-colors duration-300" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                <Youtube className="w-5 h-5 text-neutral-400 group-hover:text-red-500 transition-colors duration-300" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                <Linkedin className="w-5 h-5 text-neutral-400 group-hover:text-blue-400 transition-colors duration-300" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                <Github className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
              <div
                className="flex flex-col items-center cursor-pointer group rounded-full  text-white border-white/20 font-bold tracking-wide mb-4"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl rounded-full scale-150 group-hover:bg-fuchsia-500/40 transition-colors duration-500" />
                  <img src="/logo.png" alt="Logo" className="relative w-auto h-7 md:h-8 object-contain group-hover:scale-110 transition-transform duration-300" />
                </div>
                <img src="/buggers_text.png" alt="Buggers" className="w-auto h-5 md:h-[22px] object-contain mt-1" />
              </div>

            <p className="text-neutral-500 text-sm font-medium tracking-wide">© {new Date().getFullYear()} Debuggers Inc. High-Performance Architecture.</p>
          </div>
        </footer>
      </motion.main>
    </div>
  );
}

// ── Service Page (with always-visible navbar) ────────────────────────────
function ServicePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen w-full relative">
      <ServiceDetailPage />
    </div>
  );
}

// ── Root App with Router ─────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
