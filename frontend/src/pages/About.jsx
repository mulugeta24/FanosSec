import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Terminal, 
  Award, 
  BookOpen, 
  Target, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  FileCheck, 
  Cpu, 
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  Key
} from 'lucide-react';

export default function About() {
  const functionalities = [
    {
      icon: Layers,
      title: 'Structured Learning Paths',
      desc: 'Modular roadmaps designed to take learners from foundational IT and networking to advanced Offensive and Defensive cyber operations.',
      color: '#00FF41',
      badge: 'PATHWAYS'
    },
    {
      icon: Terminal,
      title: 'Hands-On Labs & Scenarios',
      desc: 'Simulated real-world attack environments and defensive challenges covering OWASP Top 10, privilege escalation, and network pivoting.',
      color: '#00FFFF',
      badge: 'PRACTICE'
    },
    {
      icon: HelpCircle,
      title: 'Topic-by-Topic Quizzes',
      desc: 'Reinforce learning with instant feedback quizzes after every concept, accompanied by detailed technical explanations and takeaways.',
      color: '#FFA500',
      badge: 'ASSESSMENT'
    },
    {
      icon: FileCheck,
      title: 'Verifiable PDF Certificates',
      desc: 'Generate official, tamper-proof certificates complete with unique verification identifiers upon fulfilling all course modules and assessments.',
      color: '#00BFFF',
      badge: 'CREDENTIALS'
    },
    {
      icon: Cpu,
      title: 'Cyber Threat Intelligence',
      desc: 'Stay informed with in-depth technical blogs, real-world breach analyses, zero-day research, and ethical hacking methodology breakdowns.',
      color: '#FF003C',
      badge: 'INSIGHTS'
    },
    {
      icon: Users,
      title: 'Expert Mentorship & Guidance',
      desc: 'Learn directly from certified penetration testers, threat intelligence analysts, and industry veterans with real combat experience.',
      color: '#B026FF',
      badge: 'COMMUNITY'
    }
  ];

  const rules = [
    {
      number: '01',
      title: 'Strictly Ethical & Authorized Use',
      desc: 'All security testing, exploit concepts, and hacking tools learned on FANOS SEC must only be used against systems and sandboxes you own or have explicit, documented authorization to test. Unauthorized attacks against external networks are strictly prohibited.',
      tag: 'ETHICS FIRST'
    },
    {
      number: '02',
      title: 'Academic & Assessment Integrity',
      desc: 'All quizzes, lab flags, and course completion milestones must reflect your genuine personal work. Sharing answers or manipulating platform scores compromises the integrity of our certifications and will result in revocation.',
      tag: 'HONESTY'
    },
    {
      number: '03',
      title: 'Responsible Vulnerability Disclosure',
      desc: 'If you identify a security flaw or system vulnerability within the FANOS SEC platform, report it immediately through our official Contact channel. Do not exploit or disclose vulnerabilities publicly without coordinated authorization.',
      tag: 'COORDINATION'
    },
    {
      number: '04',
      title: 'Safe & Respectful Community',
      desc: 'Our platform is a cooperative environment for students and professionals. Harassment, unauthorized data distribution, malicious payloads, and hate speech are met with immediate, permanent account termination.',
      tag: 'RESPECT'
    }
  ];

  const coursesSummary = [
    { id: 'dmcst', title: 'FANOS SEC Security Tester (FSST)', level: 'Beginner', cost: 'Free', color: '#00FF41' },
    { id: 'dmcwss', title: 'FANOS SEC Web Security Specialist (FSWSS)', level: 'Intermediate', cost: 'Paid', color: '#FFA500' },
    { id: 'dmccrt', title: 'FANOS SEC Certified Red Teamer (FSCRT)', level: 'Intermediate', cost: 'Paid', color: '#FF3333' },
    { id: 'dmccbt', title: 'FANOS SEC Certified Blue Teamer (FSCBT)', level: 'Advanced', cost: 'Free', color: '#00BFFF' },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark text-white pt-24 pb-20 selection:bg-cyber-neon selection:text-black">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-cyber-neon/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.08)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:35px_35px] pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyber-neon/10 border border-cyber-neon/30 text-cyber-neon text-sm font-mono tracking-widest uppercase mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>PLATFORM OVERVIEW & GOVERNANCE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-sans tracking-wide text-white mb-6"
          >
            ABOUT <span className="text-cyber-neon drop-shadow-[0_0_25px_rgba(0,255,65,0.6)]">FANOS SEC</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            FANOS SEC is a cybersecurity learning and practical training platform focused on helping learners develop real-world security skills through structured education, hands-on practice, security challenges, and professional learning paths.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4 text-base font-semibold"
          >
            <Link
              to="/courses"
              className="px-8 py-3.5 bg-cyber-neon text-black font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,65,0.8)] transition-all flex items-center space-x-2"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3.5 border-2 border-cyber-neon text-cyber-neon font-bold uppercase tracking-wider rounded-lg hover:bg-cyber-neon hover:text-black hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all"
            >
              Join the Platform
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Platform Functionalities */}
      <section className="py-20 container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-white mb-4 uppercase tracking-wider">
            PLATFORM <span className="text-cyber-cyan drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">FUNCTIONALITY</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
            Everything you need to transform from an aspiring enthusiast into an industry-ready security engineer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {functionalities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#0b0f14] border border-white/10 rounded-2xl p-8 hover:border-cyber-neon/60 hover:shadow-[0_0_25px_rgba(0,255,65,0.15)] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}40` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: item.color }} />
                    </div>
                    <span 
                      className="px-3 py-1 rounded-md text-xs font-mono font-bold tracking-widest uppercase border"
                      style={{ color: item.color, borderColor: `${item.color}40`, backgroundColor: `${item.color}10` }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyber-neon transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center text-sm font-mono text-gray-400 group-hover:text-cyber-cyan transition-colors">
                  <span>SYSTEM_ENABLED</span>
                  <div className="w-2 h-2 rounded-full bg-cyber-neon ml-2 animate-pulse"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Certification & Learning Flow */}
      <section className="py-20 bg-[#06080b] border-y border-white/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-white mb-4 uppercase tracking-wider">
              HOW IT <span className="text-cyber-neon">WORKS</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl font-light">
              Your 4-step execution path to becoming certified
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              { step: '01', title: 'Enroll & Access', desc: 'Select a course or career roadmap and access interactive modules, videos, and study notes.' },
              { step: '02', title: 'Hands-on Practice', desc: 'Execute real exercises, understand protocol internals, and dissect simulated attack surfaces.' },
              { step: '03', title: 'Complete Assessments', desc: 'Pass conceptual quizzes and practical module checkpoints to prove mastery.' },
              { step: '04', title: 'Verify & Certify', desc: 'Unlock your official, digitally verifiable PDF certificate with instant ID verification.' },
            ].map((stepItem, index) => (
              <div key={index} className="bg-cyber-dark/80 border border-cyber-neon/20 rounded-xl p-6 relative flex flex-col">
                <div className="text-4xl font-black text-cyber-neon/40 font-mono mb-3">
                  {stepItem.step}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{stepItem.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{stepItem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Rules & Governance */}
      <section className="py-20 container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-cyber-red font-mono text-sm uppercase tracking-widest mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>OPERATIONAL CODE OF CONDUCT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-white mb-4 uppercase tracking-wider">
            PLATFORM <span className="text-cyber-red drop-shadow-[0_0_15px_rgba(255,0,60,0.5)]">RULES</span> & POLICY
          </h2>
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
            FANOS SEC maintains zero tolerance for unethical behavior. All users are bound by the following platform rules:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rules.map((rule, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#0b0e14] border border-cyber-red/20 hover:border-cyber-red/60 rounded-xl p-8 transition-all shadow-lg shadow-black/60 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black font-mono text-cyber-red">
                  RULE // {rule.number}
                </span>
                <span className="px-3 py-1 bg-cyber-red/10 border border-cyber-red/30 text-cyber-red text-xs font-mono font-bold rounded">
                  {rule.tag}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{rule.title}</h3>
              <p className="text-gray-300 text-base leading-relaxed font-light">
                {rule.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Course Catalog Summary */}
      <section className="py-16 bg-[#070a0f] border-t border-white/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">
                Active Certification Tracks
              </h3>
              <p className="text-gray-400 text-base mt-1">Four professional tracks available for immediate enrollment</p>
            </div>
            <Link
              to="/courses"
              className="mt-4 md:mt-0 text-cyber-neon hover:text-white font-mono text-base font-bold flex items-center space-x-2 transition-colors"
            >
              <span>View Full Syllabi</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coursesSummary.map((c) => (
              <Link
                key={c.id}
                to={`/enroll/${c.id}`}
                className="p-5 rounded-xl bg-black/60 border border-white/10 hover:border-cyber-neon/60 transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-cyber-neon transition-colors">
                    {c.title}
                  </h4>
                  <div className="flex items-center space-x-3 mt-2 text-xs font-mono">
                    <span className="text-gray-400">Level: <strong className="text-white">{c.level}</strong></span>
                    <span className="text-gray-400">|</span>
                    <span className="text-cyber-neon">Price: {c.cost}</span>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-500 group-hover:text-cyber-neon group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="py-20 container mx-auto px-6 max-w-4xl text-center">
        <div className="bg-gradient-to-r from-cyber-neon/10 via-cyber-cyan/10 to-transparent border border-cyber-neon/30 rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-wide">
            Ready to Begin Your Cybersecurity Journey?
          </h2>
          <p className="text-gray-300 text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            Create your profile today, access beginner and advanced pathways, and build verified hands-on skills.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/signup"
              className="px-8 py-4 bg-cyber-neon text-black text-lg font-extrabold uppercase tracking-wider rounded-xl hover:bg-white hover:shadow-[0_0_25px_rgba(0,255,65,0.8)] transition-all"
            >
              Sign Up Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-white/30 hover:border-cyber-cyan text-white hover:text-cyber-cyan text-lg font-extrabold uppercase tracking-wider rounded-xl transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
