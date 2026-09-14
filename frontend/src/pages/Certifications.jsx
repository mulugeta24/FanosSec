import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle, Search, ExternalLink, ArrowRight, Download, BookOpen, Clock, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CERT_TRACKS = [
  {
    id: 'dmcst',
    title: 'FANOS SEC Security Tester (FSST)',
    subtitle: 'FOUNDATIONAL SECURITY CREDENTIAL',
    level: 'Beginner',
    examType: 'Practical Module Checkpoints + Final Capstone',
    color: '#00FF41',
    description: 'Validates core competencies in programming, network protocol dissection, Linux systems administration, and fundamental vulnerability assessment.',
    skills: ['Network Protocol Analysis', 'Linux System Administration', 'Basic Penetration Testing', 'Technical Report Writing'],
    duration: '4 Months Curriculum',
    price: 'Free Track'
  },
  {
    id: 'dmcwss',
    title: 'FANOS SEC Web Security Specialist (FSWSS)',
    subtitle: 'INTERMEDIATE APPLICATION SECURITY',
    level: 'Intermediate',
    examType: '24-Hour Practical Target Exploitation',
    color: '#FFA500',
    description: 'Certifies professional proficiency in auditing web applications, executing OWASP Top 10 exploits, assessing APIs, and bypassing Web Application Firewalls (WAFs).',
    skills: ['OWASP Top 10 Exploitation', 'API Security Auditing', 'WAF Filter Evasion', 'Bug Bounty Methodology'],
    duration: '3 Months Curriculum',
    price: 'Professional Track'
  },
  {
    id: 'dmccrt',
    title: 'FANOS SEC Certified Red Teamer (FSCRT)',
    subtitle: 'INTERMEDIATE OFFENSIVE ADVERSARY SIMULATION',
    level: 'Intermediate',
    examType: '48-Hour Enterprise Active Directory Compromise',
    color: '#FF3333',
    description: 'Proves tactical adversary simulation skills: initial foothold acquisition, Active Directory compromise, lateral movement, pivoting, and stealthy persistence.',
    skills: ['Active Directory Compromise', 'Kerberos Exploitation', 'Lateral Movement & Pivoting', 'Defense Evasion & OpSec'],
    duration: '5 Months Curriculum',
    price: 'Professional Track'
  },
  {
    id: 'dmccbt',
    title: 'FANOS SEC Certified Blue Teamer (FSCBT)',
    subtitle: 'ADVANCED THREAT HUNTING & INCIDENT RESPONSE',
    level: 'Advanced',
    examType: 'Practical Threat Investigation & Forensics Lab',
    color: '#00BFFF',
    description: 'Demonstrates expertise in enterprise security monitoring, hypothesis-driven threat hunting, volatile memory forensics with Volatility, and SIEM correlation.',
    skills: ['SIEM Engineering (Splunk/ELK)', 'Hypothesis Threat Hunting', 'Volatility Memory Forensics', 'Incident Response Playbooks'],
    duration: '6 Months Curriculum',
    price: 'Free Track'
  }
];

export default function Certifications() {
  const { user } = useContext(AuthContext);
  const [searchCertId, setSearchCertId] = useState('');
  const navigate = useNavigate();

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    if (searchCertId.trim()) {
      navigate(`/verify`);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-cyber-dark text-white selection:bg-cyber-neon selection:text-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyber-neon/10 border border-cyber-neon/30 text-cyber-neon text-xs font-mono tracking-widest uppercase mb-4">
            <Award className="w-4 h-4" />
            <span>CERTIFICATION CENTER</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-wide font-sans">
            PROVE YOUR <span className="text-cyber-neon drop-shadow-[0_0_20px_rgba(0,255,65,0.6)]">CYBERSECURITY SKILLS</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            FANOS SEC certifications validate practical hands-on capability through rigorous module checkpoints and realistic examination targets.
          </p>
        </motion.div>

        {/* Verification Fast Lookup Banner */}
        <div className="bg-[#090d14] border border-cyber-neon/40 rounded-3xl p-8 mb-16 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-cyber-neon/15 border border-cyber-neon/40 flex items-center justify-center text-cyber-neon shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Cryptographic Certificate Registry</h3>
                <p className="text-gray-400 text-sm font-light">Validate any student credential or badge generated by FANOS SEC.</p>
              </div>
            </div>

            <Link
              to="/verify"
              className="px-6 py-3.5 bg-cyber-neon text-black font-extrabold uppercase tracking-wider text-sm rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,65,0.4)] shrink-0 flex items-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Launch Verification Portal</span>
            </Link>
          </div>
        </div>

        {/* Certification Tracks Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white font-sans uppercase">
              Official Certification Pathways
            </h2>
            <p className="text-gray-400 text-sm mt-1">Four specialized tracks across foundational, offensive, and defensive security.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CERT_TRACKS.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#090d13] border border-white/10 hover:border-cyber-neon/50 rounded-2xl p-8 flex flex-col justify-between transition-all group shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-md border uppercase" style={{ color: cert.color, borderColor: `${cert.color}40`, backgroundColor: `${cert.color}15` }}>
                      {cert.level}
                    </span>
                    <span className="text-xs font-mono text-gray-400">{cert.price}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyber-neon transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono font-bold tracking-wider uppercase mb-4" style={{ color: cert.color }}>
                    {cert.subtitle}
                  </p>

                  <p className="text-gray-300 text-sm leading-relaxed font-light mb-6">
                    {cert.description}
                  </p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    <p className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">Validated Competencies:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cert.skills.map((s, i) => (
                        <div key={i} className="flex items-center text-xs text-gray-300">
                          <CheckCircle className="w-3.5 h-3.5 mr-2 shrink-0" style={{ color: cert.color }} />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="text-xs font-mono text-gray-400">
                    ⏱ {cert.duration}
                  </span>
                  <Link
                    to={`/enroll/${cert.id}`}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1 shadow-md"
                    style={{ backgroundColor: cert.color, color: '#000' }}
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How Certification Works */}
        <div className="bg-[#090d14] border border-white/10 rounded-3xl p-8 sm:p-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white font-sans uppercase">
              Certification Verification Workflow
            </h2>
            <p className="text-gray-400 text-sm mt-1">From course enrollment to global certificate verification.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Complete Modules', desc: 'Watch video tutorials, read theory materials, and fulfill module exercises.' },
              { step: '02', title: 'Pass Assessments', desc: 'Score passing marks on each topic-by-topic quiz checkpoint.' },
              { step: '03', title: 'Claim PDF Credential', desc: 'Generate your official cryptographically assigned PDF certificate.' },
              { step: '04', title: 'Verify Globally', desc: 'Recruiters can verify your authentic record anytime using /verify.' }
            ].map((st, i) => (
              <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-6 relative">
                <span className="text-3xl font-black font-mono text-cyber-neon/40 mb-2 block">{st.step}</span>
                <h4 className="text-base font-bold text-white mb-2">{st.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
