import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, User, LogOut, Menu, X, Info, Mail, BookOpen, 
  Home as HomeIcon, ChevronDown, Award, Terminal, Target,
  Layers, Cpu, FileCode, Flame, Compass
} from 'lucide-react';
import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileSectionOpen, setMobileSectionOpen] = useState({
    learn: false,
    practice: false,
    resources: false,
  });
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (name) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const learnLinks = [
    { name: 'Courses', path: '/courses', desc: '4 Core Certification Tracks', icon: BookOpen },
    { name: 'Learning Paths', path: '/learning-paths', desc: 'Structured Career Curricula', icon: Layers },
    { name: 'Certifications', path: '/certifications', desc: 'Official Verifiable Badges', icon: Award },
  ];

  const practiceLinks = [
    { name: 'Virtual Labs', path: '/labs', desc: 'Hands-on Browser Sandboxes', icon: Terminal },
    { name: 'Security Challenges', path: '/challenges', desc: 'Interactive CTF Problem Sets', icon: Target },
    { name: 'CTF Roadmap', path: '/career-paths', desc: 'Multi-Room Attack Networks', icon: Compass },
  ];

  const resourceLinks = [
    { name: 'Security Guides', path: '/resources?tab=guides', desc: 'Cheatsheets & Methodology', icon: FileCode },
    { name: 'Security Tools', path: '/resources?tab=tools', desc: 'Essential Ethical Toolkits', icon: Cpu },
    { name: 'Vulnerabilities (OWASP)', path: '/resources?tab=vulns', desc: 'Deep-dive CVE & CWE Reference', icon: Flame },
    { name: 'Threat Intelligence', path: '/resources?tab=threats', desc: 'Advisories & APT Breakdown', icon: Shield },
    { name: 'Intelligence Blog', path: '/blog', desc: 'Tutorials & Community Articles', icon: BookOpen },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isGroupActive = (links) => {
    return links.some(link => location.pathname === link.path || location.pathname.startsWith(link.path));
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-xl border-b border-cyber-neon/30 py-2 shadow-[0_4px_25px_rgba(0,0,0,0.85)]' 
        : 'bg-black/80 backdrop-blur-md border-b border-white/10 py-2.5 shadow-lg'
    }`}>
      <div className="w-full px-3 sm:px-4 lg:px-6 flex justify-between items-center gap-4">
        
        {/* Brand Logo Area - Far Left Corner, LARGE and CLEAR */}
        <Link to="/" className="flex items-center shrink-0 group py-1">
          <img 
            src={`/logo.png?v=${Date.now()}`}
            alt="FANOS SEC - Cybersecurity Education Platform" 
            className="h-11 sm:h-12 md:h-14 lg:h-14 xl:h-15 w-auto max-w-none object-contain transition-all duration-300 group-hover:scale-105"
            style={{
              filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.1) drop-shadow(0 0 8px rgba(0, 255, 65, 0.6))',
            }}
          />
        </Link>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1.5 xl:space-x-2.5">
          <Link
            to="/"
            className={`flex items-center px-4 py-2.5 rounded-xl text-[15px] font-semibold tracking-wide transition-all ${
              location.pathname === '/'
                ? 'text-cyber-neon bg-cyber-neon/15 border border-cyber-neon/40 shadow-[0_0_15px_rgba(0,255,65,0.25)] font-bold'
                : 'text-gray-100 hover:text-white hover:bg-white/10'
            }`}
          >
            <HomeIcon className="w-4 h-4 mr-1.5 text-cyber-neon" />
            <span>Home</span>
          </Link>

          {/* Learn Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('learn')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center px-4 py-2.5 rounded-xl text-[15px] font-semibold tracking-wide transition-all cursor-pointer ${
                isGroupActive(learnLinks) || activeDropdown === 'learn'
                  ? 'text-cyber-neon bg-cyber-neon/15 border border-cyber-neon/40 font-bold'
                  : 'text-gray-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>Learn</span>
              <ChevronDown className={`w-4 h-4 ml-1.5 transition-transform duration-200 ${activeDropdown === 'learn' ? 'rotate-180 text-cyber-neon' : 'text-gray-300'}`} />
            </button>

            {activeDropdown === 'learn' && (
              <div className="absolute top-full left-0 w-80 mt-2 bg-[#090d12] border-2 border-cyber-neon/40 rounded-2xl p-3 shadow-[0_15px_40px_rgba(0,0,0,0.95)] backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="space-y-1.5">
                  {learnLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-start p-3 rounded-xl hover:bg-cyber-neon/15 group transition-all"
                      >
                        <div className="p-2.5 rounded-xl bg-black border border-white/15 group-hover:border-cyber-neon/60 text-cyber-neon mr-3 shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-white group-hover:text-cyber-neon transition-colors">{item.name}</p>
                          <p className="text-xs text-gray-300 font-light mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Practice Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('practice')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center px-4 py-2.5 rounded-xl text-[15px] font-semibold tracking-wide transition-all cursor-pointer ${
                isGroupActive(practiceLinks) || activeDropdown === 'practice'
                  ? 'text-cyber-neon bg-cyber-neon/15 border border-cyber-neon/40 font-bold'
                  : 'text-gray-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>Practice</span>
              <ChevronDown className={`w-4 h-4 ml-1.5 transition-transform duration-200 ${activeDropdown === 'practice' ? 'rotate-180 text-cyber-cyan' : 'text-gray-300'}`} />
            </button>

            {activeDropdown === 'practice' && (
              <div className="absolute top-full left-0 w-80 mt-2 bg-[#090d12] border-2 border-cyber-neon/40 rounded-2xl p-3 shadow-[0_15px_40px_rgba(0,0,0,0.95)] backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="space-y-1.5">
                  {practiceLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-start p-3 rounded-xl hover:bg-cyber-neon/15 group transition-all"
                      >
                        <div className="p-2.5 rounded-xl bg-black border border-white/15 group-hover:border-cyber-cyan/60 text-cyber-cyan mr-3 shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-white group-hover:text-cyber-cyan transition-colors">{item.name}</p>
                          <p className="text-xs text-gray-300 font-light mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center px-4 py-2.5 rounded-xl text-[15px] font-semibold tracking-wide transition-all cursor-pointer ${
                isGroupActive(resourceLinks) || activeDropdown === 'resources'
                  ? 'text-cyber-neon bg-cyber-neon/15 border border-cyber-neon/40 font-bold'
                  : 'text-gray-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>Resources</span>
              <ChevronDown className={`w-4 h-4 ml-1.5 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180 text-cyber-neon' : 'text-gray-300'}`} />
            </button>

            {activeDropdown === 'resources' && (
              <div className="absolute top-full left-0 w-88 mt-2 bg-[#090d12] border-2 border-cyber-neon/40 rounded-2xl p-3 shadow-[0_15px_40px_rgba(0,0,0,0.95)] backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="space-y-1.5">
                  {resourceLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-start p-3 rounded-xl hover:bg-cyber-neon/15 group transition-all"
                      >
                        <div className="p-2.5 rounded-xl bg-black border border-white/15 group-hover:border-cyber-neon/60 text-cyber-neon mr-3 shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-white group-hover:text-cyber-neon transition-colors">{item.name}</p>
                          <p className="text-xs text-gray-300 font-light mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className={`flex items-center px-4 py-2.5 rounded-xl text-[15px] font-semibold tracking-wide transition-all ${
              isActive('/about')
                ? 'text-cyber-neon bg-cyber-neon/15 border border-cyber-neon/40 font-bold'
                : 'text-gray-100 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>About</span>
          </Link>

          <Link
            to="/contact"
            className={`flex items-center px-4 py-2.5 rounded-xl text-[15px] font-semibold tracking-wide transition-all ${
              isActive('/contact')
                ? 'text-cyber-neon bg-cyber-neon/15 border border-cyber-neon/40 font-bold'
                : 'text-gray-100 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>Contact</span>
          </Link>

          <Link
            to="/verify"
            className={`flex items-center px-4 py-2.5 rounded-xl text-[15px] font-semibold tracking-wide transition-all ${
              isActive('/verify')
                ? 'text-cyber-neon bg-cyber-neon/15 border border-cyber-neon/40 shadow-[0_0_15px_rgba(0,255,65,0.25)] font-bold'
                : 'text-gray-100 hover:text-white hover:bg-white/10'
            }`}
          >
            <Shield className="w-4 h-4 mr-1.5 text-cyber-neon" />
            <span>Verify</span>
          </Link>
        </nav>

        {/* Auth Action Buttons (Desktop) */}
        <div className="hidden lg:flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <Link 
                to={user.isAdmin ? '/admin' : '/dashboard'} 
                className="flex items-center px-5 py-2.5 bg-cyber-neon/15 border border-cyber-neon/50 text-cyber-neon font-bold text-sm sm:text-[15px] rounded-xl hover:bg-cyber-neon hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,65,0.2)]"
              >
                <User className="w-4 h-4 mr-2" />
                <span>{user.isAdmin ? 'Admin Panel' : 'Dashboard'}</span>
              </Link>
              <button 
                onClick={logout}
                className="flex items-center px-4 py-2.5 text-red-400 hover:text-white hover:bg-red-500/20 border border-red-500/30 font-bold text-sm sm:text-[15px] rounded-xl transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link 
                to="/login" 
                className="px-5 py-2.5 border-2 border-cyber-neon/50 text-cyber-neon hover:bg-cyber-neon/15 text-sm sm:text-[15px] font-bold rounded-xl transition-all"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="px-5 py-2.5 bg-cyber-neon text-black font-black text-sm sm:text-[15px] rounded-xl hover:bg-white hover:shadow-[0_0_25px_rgba(0,255,65,0.9)] transition-all shadow-[0_0_20px_rgba(0,255,65,0.5)]"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg bg-cyber-darkest border border-cyber-neon/30 text-cyber-neon hover:bg-cyber-neon/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-2xl border-b border-cyber-neon/40 px-5 py-6 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col space-y-2 mb-6">
            <Link
              to="/"
              className={`flex items-center px-4 py-2.5 rounded-xl text-base font-semibold ${
                location.pathname === '/' ? 'text-cyber-neon bg-cyber-neon/15 border border-cyber-neon/40' : 'text-gray-200'
              }`}
            >
              <HomeIcon className="w-5 h-5 mr-3 text-cyber-neon" />
              <span>Home</span>
            </Link>

            {/* Mobile Learn Group */}
            <div className="border border-white/10 rounded-xl overflow-hidden bg-black/40">
              <button 
                onClick={() => setMobileSectionOpen(p => ({ ...p, learn: !p.learn }))}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-bold text-gray-200"
              >
                <span className="flex items-center"><BookOpen className="w-4 h-4 mr-2 text-cyber-neon" /> Learn</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSectionOpen.learn ? 'rotate-180 text-cyber-neon' : 'text-gray-400'}`} />
              </button>
              {mobileSectionOpen.learn && (
                <div className="px-3 pb-3 space-y-1 border-t border-white/5 pt-2">
                  {learnLinks.map(l => (
                    <Link key={l.name} to={l.path} className="block px-3 py-2 text-sm text-gray-300 hover:text-cyber-neon rounded-lg hover:bg-white/5">
                      {l.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Practice Group */}
            <div className="border border-white/10 rounded-xl overflow-hidden bg-black/40">
              <button 
                onClick={() => setMobileSectionOpen(p => ({ ...p, practice: !p.practice }))}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-bold text-gray-200"
              >
                <span className="flex items-center"><Terminal className="w-4 h-4 mr-2 text-cyber-cyan" /> Practice</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSectionOpen.practice ? 'rotate-180 text-cyber-cyan' : 'text-gray-400'}`} />
              </button>
              {mobileSectionOpen.practice && (
                <div className="px-3 pb-3 space-y-1 border-t border-white/5 pt-2">
                  {practiceLinks.map(l => (
                    <Link key={l.name} to={l.path} className="block px-3 py-2 text-sm text-gray-300 hover:text-cyber-cyan rounded-lg hover:bg-white/5">
                      {l.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Resources Group */}
            <div className="border border-white/10 rounded-xl overflow-hidden bg-black/40">
              <button 
                onClick={() => setMobileSectionOpen(p => ({ ...p, resources: !p.resources }))}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-bold text-gray-200"
              >
                <span className="flex items-center"><Layers className="w-4 h-4 mr-2 text-purple-400" /> Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSectionOpen.resources ? 'rotate-180 text-purple-400' : 'text-gray-400'}`} />
              </button>
              {mobileSectionOpen.resources && (
                <div className="px-3 pb-3 space-y-1 border-t border-white/5 pt-2">
                  {resourceLinks.map(l => (
                    <Link key={l.name} to={l.path} className="block px-3 py-2 text-sm text-gray-300 hover:text-cyber-neon rounded-lg hover:bg-white/5">
                      {l.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`flex items-center px-4 py-2.5 rounded-xl text-base font-semibold ${
                location.pathname === '/about' ? 'text-cyber-neon bg-cyber-neon/15 border border-cyber-neon/40' : 'text-gray-200'
              }`}
            >
              <Info className="w-5 h-5 mr-3 text-cyber-neon" />
              <span>About</span>
            </Link>

            <Link
              to="/contact"
              className={`flex items-center px-4 py-2.5 rounded-xl text-base font-semibold ${
                location.pathname === '/contact' ? 'text-cyber-neon bg-cyber-neon/15 border border-cyber-neon/40' : 'text-gray-200'
              }`}
            >
              <Mail className="w-5 h-5 mr-3 text-cyber-neon" />
              <span>Contact</span>
            </Link>

            <Link
              to="/verify"
              className={`flex items-center px-4 py-2.5 rounded-xl text-base font-semibold ${
                location.pathname === '/verify' ? 'text-cyber-neon bg-cyber-neon/15 border border-cyber-neon/40' : 'text-gray-200'
              }`}
            >
              <Shield className="w-5 h-5 mr-3 text-cyber-neon" />
              <span>Verify Certificate</span>
            </Link>
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
            {user ? (
              <>
                <Link 
                  to={user.isAdmin ? '/admin' : '/dashboard'} 
                  className="w-full flex items-center justify-center py-3 bg-cyber-neon/20 border border-cyber-neon text-cyber-neon font-bold text-base rounded-xl"
                >
                  <User className="w-5 h-5 mr-2" />
                  <span>{user.isAdmin ? 'Admin Panel' : 'Student Dashboard'}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center py-3 bg-red-500/20 border border-red-500/40 text-red-300 font-bold text-base rounded-xl"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/login" 
                  className="w-full py-3 text-center border border-cyber-neon/60 text-cyber-neon font-bold text-base rounded-xl bg-black/50"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="w-full py-3 text-center bg-cyber-neon text-black font-extrabold text-base rounded-xl shadow-[0_0_15px_rgba(0,255,65,0.4)]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
