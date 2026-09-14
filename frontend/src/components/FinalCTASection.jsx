import { motion } from 'framer-motion';
import { Shield, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FinalCTASection() {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-[#06080c] to-black relative z-20 overflow-hidden">
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyber-neon/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        
        <div className="bg-gradient-to-r from-cyber-neon/10 via-[#0a0f16] to-cyber-cyan/10 border-2 border-cyber-neon/30 rounded-3xl p-10 sm:p-16 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyber-neon/10 border border-cyber-neon/40 text-cyber-neon text-xs font-mono tracking-widest uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            <span>START YOUR TRAINING TODAY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wide mb-6 font-sans">
            READY TO LEVEL UP YOUR <span className="text-cyber-neon drop-shadow-[0_0_20px_rgba(0,255,65,0.6)]">CYBERSECURITY CAREER?</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Join students and cybersecurity professionals training on FANOS SEC. Access interactive courses, virtual sandboxes, and verifiable certificates.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-cyber-neon text-black font-extrabold uppercase tracking-wider text-base rounded-xl hover:bg-white hover:shadow-[0_0_25px_rgba(0,255,65,0.8)] transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(0,255,65,0.4)]"
            >
              <Shield className="w-5 h-5" />
              <span>Get Started for Free</span>
            </Link>
            <Link
              to="/learning-paths"
              className="w-full sm:w-auto px-8 py-4 bg-black/60 border border-white/20 hover:border-cyber-cyan text-white hover:text-cyber-cyan font-bold uppercase tracking-wider text-base rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore Learning Paths</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="mt-8 text-xs font-mono text-gray-500 uppercase tracking-widest">
            FANOS SEC — Learn. Practice. Challenge. Certify.
          </p>

        </div>

      </div>
    </section>
  );
}
