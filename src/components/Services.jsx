import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, BrainCircuit, CloudCog, ArrowUpRight, ShieldCheck, Smartphone, PenTool } from 'lucide-react';

const bentoItems = [
  {
    id: 1,
    title: 'Web Development',
    slug: 'web-development',
    desc: 'We build fast, secure, and beautiful websites that work perfectly on any device.',
    icon: Layers,
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    desc: 'Creating easy-to-use and stunning designs that your customers will love.',
    icon: PenTool,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 3,
    title: 'Cloud & DevOps',
    slug: 'cloud-devops',
    desc: 'Keeping your apps running smoothly 24/7 with secure cloud servers and automated updates.',
    icon: CloudCog,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-2',
  },
  {
    id: 4,
    title: 'Mobile Apps',
    slug: 'mobile-apps',
    desc: 'Custom iOS and Android applications to help you reach customers anywhere.',
    icon: Smartphone,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 5,
    title: 'Cyber Security',
    slug: 'cyber-security',
    desc: 'Protecting your business data with the highest level of digital security.',
    icon: ShieldCheck,
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
  },
  {
    id: 6,
    title: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    desc: 'Smart tools that learn and automate your daily business tasks to save you time.',
    icon: BrainCircuit,
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
  },
];

export default function Services() {
  return (
    <section className="w-full min-h-screen bg-black py-25 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">Our IT Services.</h2>
            <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed">
              We provide everything your business needs to succeed in the digital world. From design to security, we have you covered.
            </p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white text-sm font-semibold hover:bg-white hover:text-black transition-all"
          >
            View All Services <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {bentoItems.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                className={`block ${service.colSpan} ${service.rowSpan}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 0.98 }}
                  className="relative group p-8 md:p-10 rounded-4xl bg-white/3 hover:bg-white/5 border border-white/10 backdrop-blur-2xl overflow-hidden flex flex-col justify-between transition-all duration-500 cursor-pointer h-full"
                >
                  {/* Subtle gradient hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/7 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10 w-14 h-14 rounded-full bg-black border border-white/20 flex items-center justify-center mb-6 group-hover:border-white/50 transition-colors duration-500">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-neutral-400 font-light leading-relaxed max-w-md">
                      {service.desc}
                    </p>
                  </div>

                  <div className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
