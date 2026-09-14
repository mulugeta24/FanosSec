import { motion } from 'framer-motion';
import { BookOpen, Terminal, Target, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const pillars = [
  {
    id: 'learn',
    title: 'LEARN',
    subtitle: 'Structured Courses',
    description: 'Master cybersecurity foundations through structured, in-depth curriculums taught by industry certified professionals.',
    icon: BookOpen,
    color: '#00FF41',
    link: '/courses',
    badge: 'KNOWLEDGE'
  },
  {
    id: 'practice',
    title: 'PRACTICE',
    subtitle: 'Hands-on Labs',
    description: 'Execute live attack and defense scenarios in controlled, browser-based sandboxes and multi-machine network environments.',
    icon: Terminal,
    color: '#00FFFF',
    link: '/labs',
    badge: 'EXECUTION'
  },
  {
    id: 'challenge',
    title: 'CHALLENGE',
    subtitle: 'Security Challenges',
    description: 'Test your problem solving across Web Security, Forensics, Cryptography, OSINT, and Privilege Escalation CTFs.',
    icon: Target,
    color: '#FFA500',
    link: '/challenges',
    badge: 'COMPETITION'
  },
  {
    id: 'certify',
    title: 'CERTIFY',
    subtitle: 'Verifiable Certifications',
    description: 'Earn cryptographic, verifiable credentials to showcase proven hands-on proficiency to top cybersecurity employers.',
    icon: Award,
    color: '#9D00FF',
    link: '/certifications',
    badge: 'RECOGNITION'
  }
];

export default function PlatformOverviewSection() {
  return (
    <section className="w-full py-20 bg-[#06080c] relative z-20 border-t border-b border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyber-neon/10 border border-cyber-neon/30 text-cyber-neon text-xs font-mono tracking-widest uppercase mb-4">
            <span>CORE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-white mb-4 uppercase tracking-wider">
            ONE PLATFORM. <span className="text-cyber-neon drop-shadow-[0_0_20px_rgba(0,255,65,0.5)]">COMPLETE CYBERSECURITY LEARNING.</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
            From complete beginner to seasoned security operator, FANOS SEC delivers an integrated path to real-world capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, index) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#090d13] rounded-2xl p-7 border border-white/10 hover:border-cyber-neon/50 transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div 
                      className="w-13 h-13 rounded-xl flex items-center justify-center p-3"
                      style={{ backgroundColor: `${p.color}15`, border: `1px solid ${p.color}40` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: p.color }} />
                    </div>
                    <span 
                      className="px-2.5 py-1 rounded text-xs font-mono font-bold tracking-widest uppercase border"
                      style={{ color: p.color, borderColor: `${p.color}40`, backgroundColor: `${p.color}10` }}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black tracking-wider text-white mb-1 font-mono group-hover:text-cyber-neon transition-colors">
                    {p.title}
                  </h3>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4" style={{ color: p.color }}>
                    {p.subtitle}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed font-light mb-6">
                    {p.description}
                  </p>
                </div>

                <Link
                  to={p.link}
                  className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase text-gray-300 group-hover:text-cyber-neon transition-colors"
                >
                  <span>Explore {p.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
