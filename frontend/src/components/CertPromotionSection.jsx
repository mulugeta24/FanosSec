import { motion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const certHighlights = [
  { id: 'dmcst', title: 'FANOS SEC Security Tester (FSST)', level: 'Foundational', color: '#00FF41' },
  { id: 'dmcwss', title: 'FANOS SEC Web Security Specialist (FSWSS)', level: 'Intermediate', color: '#FFA500' },
  { id: 'dmccrt', title: 'FANOS SEC Certified Red Teamer (FSCRT)', level: 'Intermediate', color: '#FF3333' },
  { id: 'dmccbt', title: 'FANOS SEC Certified Blue Teamer (FSCBT)', level: 'Advanced', color: '#00BFFF' },
];

export default function CertPromotionSection() {
  return (
    <section className="w-full py-24 bg-black relative z-20 border-t border-b border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Information & Value */}
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyber-neon/10 border border-cyber-neon/30 text-cyber-neon text-xs font-mono tracking-widest uppercase mb-4">
              <Award className="w-4 h-4" />
              <span>INDUSTRY RECOGNITION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-wide uppercase mb-6 leading-tight">
              PROVE YOUR <span className="text-cyber-neon drop-shadow-[0_0_20px_rgba(0,255,65,0.5)]">CYBERSECURITY SKILLS</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed mb-8">
              Complete rigorous curriculum checkpoints, solve live practical labs, and earn tamper-proof verifiable digital certificates to advance your cybersecurity career.
            </p>

            <div className="space-y-4 mb-8">
              {[
                'Instant online credential verification by Certificate ID',
                'High-resolution tamper-proof PDF generation upon completion',
                'Directly shareable to LinkedIn, resumes, and portfolios',
                'Recognized practical skills in offensive & defensive operations'
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-cyber-neon shrink-0 mt-0.5" />
                  <span className="text-gray-200 text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/certifications"
                className="px-6 py-3.5 bg-cyber-neon text-black font-extrabold uppercase tracking-wider text-sm rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,65,0.4)] flex items-center space-x-2"
              >
                <span>Certification Center</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/verify"
                className="px-6 py-3.5 bg-black/60 border border-white/20 text-gray-200 hover:text-white hover:border-cyber-neon rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-cyber-neon" />
                <span>Verify a Credential</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Certificate Preview Card */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyber-neon/30 via-cyber-cyan/20 to-purple-500/20 rounded-3xl blur-xl opacity-50"></div>
            <div className="relative bg-[#0b0e14] border-2 border-cyber-neon/40 rounded-2xl p-8 sm:p-10 shadow-2xl">
              
              <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-6">
                <div>
                  <h3 className="text-xl font-mono font-bold text-white tracking-wider">FANOS SEC</h3>
                  <p className="text-xs font-mono text-cyber-neon uppercase tracking-widest">OFFICIAL CREDENTIAL</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-cyber-neon/15 border border-cyber-neon/40 flex items-center justify-center text-cyber-neon">
                  <Award className="w-7 h-7" />
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">ACTIVE CERTIFICATION TRACKS</p>
                {certHighlights.map((c) => (
                  <div key={c.id} className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{c.title}</p>
                      <span className="text-xs font-mono" style={{ color: c.color }}>{c.level}</span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }}></div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono text-gray-400">
                <span>ISSUER: FANOS SEC ACADEMY</span>
                <span className="text-cyber-neon">TAMPER-PROOF VERIFIED</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
