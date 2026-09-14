import { motion } from 'framer-motion';
import { Shield, Target, Lock, Eye, Zap, ArrowRight, Clock, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const paths = [
  {
    id: 'fundamentals',
    title: 'Cybersecurity Fundamentals',
    level: 'Beginner',
    duration: '25 Hours',
    modules: '8 Modules',
    color: '#00FF41',
    icon: Shield,
    desc: 'Foundational training covering computer networks, Linux systems administration, and fundamental security mechanisms.',
    topics: ['Networking & Protocols', 'Linux Command Line', 'Security Fundamentals', 'Basic Cryptography'],
    linkedCourse: 'dmcst'
  },
  {
    id: 'red-team',
    title: 'Red Team Operator',
    level: 'Intermediate',
    duration: '45 Hours',
    modules: '12 Modules',
    color: '#FF3333',
    icon: Target,
    desc: 'Offensive cybersecurity path covering active reconnaissance, Active Directory compromise, lateral movement, and evasion.',
    topics: ['Adversary Simulation', 'Active Directory', 'Pivoting & Tunneling', 'EDR & AV Evasion'],
    linkedCourse: 'dmccrt'
  },
  {
    id: 'blue-team',
    title: 'Blue Team Defender',
    level: 'Advanced',
    duration: '40 Hours',
    modules: '10 Modules',
    color: '#00BFFF',
    icon: Lock,
    desc: 'Proactive defense training focusing on threat hunting, incident response, digital forensics, and infrastructure hardening.',
    topics: ['Threat Hunting', 'Incident Response', 'Malware Analysis', 'Memory Forensics'],
    linkedCourse: 'dmccbt'
  },
  {
    id: 'soc-analyst',
    title: 'SOC Analyst',
    level: 'Intermediate',
    duration: '35 Hours',
    modules: '9 Modules',
    color: '#3498DB',
    icon: Eye,
    desc: 'Master security operations center workflows: SIEM rule tuning, real-time alert triage, and log correlation.',
    topics: ['SIEM Engineering (Splunk/ELK)', 'Alert Investigation', 'Log Analysis', 'Incident Handling'],
    linkedCourse: 'dmccbt'
  },
  {
    id: 'web-security',
    title: 'Web Security Specialist',
    level: 'Intermediate',
    duration: '30 Hours',
    modules: '8 Modules',
    color: '#FFA500',
    icon: Zap,
    desc: 'Deep dive into web application vulnerabilities, OWASP Top 10 exploitation, API security auditing, and WAF bypass.',
    topics: ['OWASP Top 10', 'API Security Testing', 'WAF Bypass', 'Bug Bounty Methodology'],
    linkedCourse: 'dmcwss'
  }
];

export default function LearningPathsSection() {
  return (
    <section className="w-full py-24 bg-black relative z-20 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono tracking-widest uppercase mb-4">
              <Layers className="w-4 h-4" />
              <span>CAREER ROADMAPS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-wide uppercase">
              CYBERSECURITY <span className="text-purple-400 drop-shadow-[0_0_20px_rgba(155,89,182,0.5)]">LEARNING PATHS</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mt-3 font-light">
              Structured step-by-step career roadmaps connecting fundamental concepts to advanced hands-on operations.
            </p>
          </div>
          <Link
            to="/learning-paths"
            className="mt-6 md:mt-0 flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-purple-500/40 text-purple-300 hover:bg-purple-500/20 text-sm font-bold transition-all"
          >
            <span>View All Paths</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paths.map((path, idx) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#090d13] border border-white/10 hover:border-purple-500/50 rounded-2xl p-7 flex flex-col justify-between transition-all group hover:-translate-y-1.5 shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center p-2.5"
                      style={{ backgroundColor: `${path.color}15`, border: `1px solid ${path.color}40` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: path.color }} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-md border border-white/10 text-gray-300 bg-white/5 uppercase">
                      {path.level}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyber-neon transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                    {path.desc}
                  </p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    <p className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">Key Topics:</p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {path.topics.map((t, i) => (
                        <div key={i} className="flex items-center text-xs text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: path.color }}></div>
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-400 font-mono">
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {path.duration}</span>
                    <span>•</span>
                    <span>{path.modules}</span>
                  </div>
                  <Link
                    to={`/learning-paths/${path.id}`}
                    className="flex items-center space-x-1 text-xs font-mono font-bold uppercase hover:underline"
                    style={{ color: path.color }}
                  >
                    <span>Start Path</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
