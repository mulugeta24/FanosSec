import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Terminal, Users, CheckCircle2, Lock } from 'lucide-react';

const reasons = [
  {
    icon: Terminal,
    title: 'Controlled Virtual Sandboxes',
    desc: 'Practice on realistic browser-accessible target machines and active enterprise networks without configuring complex virtual machines locally.',
    color: '#00FF41'
  },
  {
    icon: ShieldCheck,
    title: 'Verifiable Credentials',
    desc: 'Each certificate issued is uniquely registered and can be verified by recruiters and organizations globally via our cryptographic registry.',
    color: '#00FFFF'
  },
  {
    icon: Lock,
    title: 'Dual Offensive & Defensive Focus',
    desc: 'Gain a complete 360-degree security perspective by understanding both how adversaries break in and how defenders detect and neutralize attacks.',
    color: '#FF3333'
  },
  {
    icon: Users,
    title: 'Mentorship from Active Operators',
    desc: 'Curriculum designed and guided by seasoned penetration testers, threat intelligence analysts, and certified cybersecurity instructors.',
    color: '#FFA500'
  }
];

export default function WhyFanosSection() {
  return (
    <section className="w-full py-24 bg-[#06080c] relative z-20 border-t border-b border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyber-neon/10 border border-cyber-neon/30 text-cyber-neon text-xs font-mono tracking-widest uppercase mb-4">
            <span>PLATFORM ADVANTAGES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-white mb-4 uppercase tracking-wider">
            WHY <span className="text-cyber-neon drop-shadow-[0_0_20px_rgba(0,255,65,0.5)]">FANOS SEC?</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
            Engineered to deliver high-impact cybersecurity education with immediate real-world applicability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#090d13] border border-white/10 hover:border-cyber-neon/40 rounded-2xl p-8 flex items-start space-x-5 transition-all shadow-xl"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 p-3"
                  style={{ backgroundColor: `${r.color}15`, border: `1px solid ${r.color}40` }}
                >
                  <Icon className="w-7 h-7" style={{ color: r.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{r.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">{r.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
