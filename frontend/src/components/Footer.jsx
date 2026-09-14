import { Youtube, Send, Instagram, Terminal, Phone, Mail, Shield, BookOpen, Info, HelpCircle, Layers, Target, Award, Cpu, Flame, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-[#040609] border-t border-cyber-neon/25 pt-16 pb-10 overflow-hidden z-10 w-full text-white">
      {/* Decorative Glow elements */}
      <div className="absolute top-0 left-1/4 w-96 h-1 bg-cyber-neon shadow-[0_0_30px_rgba(0,255,65,1)]"></div>
      <div className="absolute top-1/2 left-0 w-48 h-48 bg-cyber-neon/10 rounded-full blur-[90px]"></div>
      
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
        
        {/* Col 1: Brand & Bio */}
        <div className="col-span-1 lg:col-span-1 space-y-5">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src="/logo.png" alt="FANOS SEC Logo" className="w-12 h-12 object-contain drop-shadow-[0_0_12px_rgba(0,255,65,0.8)]" />
            <span className="text-2xl font-black tracking-widest text-white font-mono">
              FANOS <span className="text-cyber-neon">SEC</span>
            </span>
          </Link>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
            A professional cybersecurity learning and practical security training platform. Build real-world skills through structured courses, learning paths, hands-on labs, security challenges, and verifiable certifications.
          </p>
          <p className="text-xs font-mono text-cyber-neon tracking-widest uppercase">
            Learn. Practice. Challenge. Certify.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="https://www.youtube.com/@ApexTechEthiopia" target="_blank" rel="noreferrer" className="h-10 w-10 glass-panel rounded-xl flex items-center justify-center text-red-500 hover:text-white hover:border-red-500 hover:bg-red-500/20 transition-all shadow-lg shadow-red-500/10">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://t.me/InfoSecureTech" target="_blank" rel="noreferrer" className="h-10 w-10 glass-panel rounded-xl flex items-center justify-center text-blue-400 hover:text-white hover:border-blue-400 hover:bg-blue-400/20 transition-all shadow-lg shadow-blue-400/10">
              <Send className="w-5 h-5" />
            </a>
            <a href="https://instagram.com/darkmodecyber" target="_blank" rel="noreferrer" className="h-10 w-10 glass-panel rounded-xl flex items-center justify-center text-pink-500 hover:text-white hover:border-pink-500 hover:bg-pink-500/20 transition-all shadow-lg shadow-pink-500/10">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation / Platform */}
        <div>
          <h3 className="font-mono text-white text-base sm:text-lg font-bold tracking-wider mb-5 flex items-center">
            <Terminal className="w-5 h-5 mr-2 text-cyber-neon" /> PLATFORM
          </h3>
          <ul className="space-y-3 font-medium text-sm sm:text-base text-gray-300">
            <li><Link to="/" className="hover:text-cyber-neon transition-colors flex items-center group"><span className="text-cyber-neon mr-2 opacity-60 group-hover:opacity-100">&gt;</span> Home</Link></li>
            <li><Link to="/courses" className="hover:text-cyber-neon transition-colors flex items-center group"><span className="text-cyber-neon mr-2 opacity-60 group-hover:opacity-100">&gt;</span> Courses</Link></li>
            <li><Link to="/learning-paths" className="hover:text-cyber-neon transition-colors flex items-center group"><span className="text-cyber-neon mr-2 opacity-60 group-hover:opacity-100">&gt;</span> Learning Paths</Link></li>
            <li><Link to="/labs" className="hover:text-cyber-neon transition-colors flex items-center group"><span className="text-cyber-neon mr-2 opacity-60 group-hover:opacity-100">&gt;</span> Hands-on Labs</Link></li>
            <li><Link to="/challenges" className="hover:text-cyber-neon transition-colors flex items-center group"><span className="text-cyber-neon mr-2 opacity-60 group-hover:opacity-100">&gt;</span> Security Challenges</Link></li>
            <li><Link to="/certifications" className="hover:text-cyber-neon transition-colors flex items-center group"><span className="text-cyber-neon mr-2 opacity-60 group-hover:opacity-100">&gt;</span> Certifications</Link></li>
            <li><Link to="/verify" className="hover:text-cyber-neon transition-colors flex items-center group"><span className="text-cyber-neon mr-2 opacity-60 group-hover:opacity-100">&gt;</span> Verify Certificate</Link></li>
          </ul>
        </div>

        {/* Col 3: Resources & Knowledge */}
        <div>
          <h3 className="font-mono text-white text-base sm:text-lg font-bold tracking-wider mb-5 flex items-center">
            <Terminal className="w-5 h-5 mr-2 text-cyber-cyan" /> RESOURCES
          </h3>
          <ul className="space-y-3 font-medium text-sm sm:text-base text-gray-300">
            <li><Link to="/blog" className="hover:text-cyber-cyan transition-colors flex items-center group"><span className="text-cyber-cyan mr-2 opacity-60 group-hover:opacity-100">&gt;</span> Intelligence Blog</Link></li>
            <li><Link to="/resources?tab=guides" className="hover:text-cyber-cyan transition-colors flex items-center group"><span className="text-cyber-cyan mr-2 opacity-60 group-hover:opacity-100">&gt;</span> Security Guides</Link></li>
            <li><Link to="/resources?tab=tools" className="hover:text-cyber-cyan transition-colors flex items-center group"><span className="text-cyber-cyan mr-2 opacity-60 group-hover:opacity-100">&gt;</span> Security Tools</Link></li>
            <li><Link to="/resources?tab=vulns" className="hover:text-cyber-cyan transition-colors flex items-center group"><span className="text-cyber-cyan mr-2 opacity-60 group-hover:opacity-100">&gt;</span> Vulnerability Knowledge</Link></li>
            <li><Link to="/resources?tab=threats" className="hover:text-cyber-cyan transition-colors flex items-center group"><span className="text-cyber-cyan mr-2 opacity-60 group-hover:opacity-100">&gt;</span> Threat Intelligence</Link></li>
            <li><Link to="/career-paths" className="hover:text-cyber-cyan transition-colors flex items-center group"><span className="text-cyber-cyan mr-2 opacity-60 group-hover:opacity-100">&gt;</span> Career Roadmaps</Link></li>
          </ul>
        </div>

        {/* Col 4: Company & Contact */}
        <div>
          <h3 className="font-mono text-white text-base sm:text-lg font-bold tracking-wider mb-5 flex items-center">
            <Terminal className="w-5 h-5 mr-2 text-cyber-red" /> COMPANY
          </h3>
          <ul className="space-y-3 font-mono text-sm sm:text-base text-gray-300 mb-6">
            <li><Link to="/about" className="hover:text-cyber-neon transition-colors flex items-center font-sans font-medium"><span className="text-cyber-red mr-2 font-mono opacity-60">&gt;</span> About FANOS SEC</Link></li>
            <li><Link to="/contact" className="hover:text-cyber-neon transition-colors flex items-center font-sans font-medium"><span className="text-cyber-red mr-2 font-mono opacity-60">&gt;</span> Contact & Support</Link></li>
            <li><Link to="/about" className="hover:text-cyber-neon transition-colors flex items-center font-sans font-medium"><span className="text-cyber-red mr-2 font-mono opacity-60">&gt;</span> Ethics & Governance</Link></li>
            <li className="flex items-center pt-2">
              <Phone className="w-4 h-4 mr-2.5 text-cyber-neon shrink-0" /> 
              <span className="text-sm">0945616440</span>
            </li>
            <li className="flex items-start">
              <Mail className="w-4 h-4 mr-2.5 text-cyber-neon shrink-0 mt-0.5" /> 
              <span className="text-sm break-all">mulugetaababi237@gmail.com</span>
            </li>
          </ul>
          <div>
            <Link to="/contact" className="inline-block px-4 py-2 bg-cyber-neon/15 border border-cyber-neon/40 text-cyber-neon font-bold text-sm rounded-lg hover:bg-cyber-neon hover:text-black transition-all shadow-[0_0_10px_rgba(0,255,65,0.2)]">
              Send Transmission ↗
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 font-mono">
        <p>&copy; {new Date().getFullYear()} FANOS SEC. ALL RIGHTS RESERVED.</p>
        <p className="mt-2 md:mt-0 flex items-center space-x-2">
          <span>SYSTEM_STATUS:</span>
          <span className="text-cyber-neon font-bold flex items-center">
            <span className="w-2 h-2 rounded-full bg-cyber-neon inline-block mr-1.5 animate-pulse"></span>
            OPERATIONAL
          </span>
        </p>
      </div>
    </footer>
  );
}
