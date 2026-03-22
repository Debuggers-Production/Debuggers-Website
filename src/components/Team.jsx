import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, PenTool, Server, ArrowUpRight } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Siva',
    role: 'Lead UI/UX Designer',
    desc: 'Specializes in creating beautiful, easy-to-use interfaces that deliver a premium experience to users.',
    icon: PenTool,
    portfolioUrl: '#portfolio-siva' // Replace with actual URL
  },
  {
    id: 2,
    name: 'Alex',
    role: 'Senior Web Developer',
    desc: 'Expert in building fast and secure websites using the latest technologies.',
    icon: Code,
    portfolioUrl: '#portfolio-alex'
  },
  {
    id: 3,
    name: 'Jordan',
    role: 'DevOps Engineer',
    desc: 'Ensures our servers run 24/7 without any interruptions and manages smooth updates.',
    icon: Server,
    portfolioUrl: '#portfolio-jordan'
  }
];

export default function Team() {
  return (
    <section className="w-full py-25 bg-black px-6 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Our Top Developers.</h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Meet the experts who build your tools. Click on any profile to see their amazing portfolio of work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => {
            const Icon = member.icon;
            return (
              <motion.a
                href={member.portfolioUrl}
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-neutral-900/40 border border-neutral-800 rounded-3xl p-8 flex flex-col items-center text-center overflow-hidden cursor-pointer"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-linear-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-24 h-24 mb-6 rounded-full bg-black border border-neutral-700 flex items-center justify-center relative overflow-hidden group-hover:border-white/50 transition-colors duration-500 z-10">
                  <User className="w-10 h-10 text-neutral-500 group-hover:text-white transition-colors duration-500" />

                  {/* Subtle specialty icon badge */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-neutral-800 rounded-tl-xl flex items-center justify-center border-t border-l border-neutral-700">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="relative z-10 w-full">
                  <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{member.name}</h3>
                  <p className="text-white/60 font-medium mb-4">{member.role}</p>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed mb-8">
                    {member.desc}
                  </p>

                  <div className="w-full py-3 rounded-full border border-neutral-700 group-hover:bg-white group-hover:text-black text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                    View Portfolio <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
