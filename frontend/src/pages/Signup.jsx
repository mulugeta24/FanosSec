import React, { useState, useContext } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Cpu, 
  Terminal, 
  Award, 
  Bot, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Lock,
  ArrowRight,
  Layers,
  HelpCircle
} from 'lucide-react';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await register(name, email, password);
      if (result.success) {
        const loginUrl = new URLSearchParams({
          registered: '1',
          ...(redirectUrl ? { redirect: redirectUrl } : {}),
        });
        navigate(`/login?${loginUrl.toString()}`);
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#050811] text-white flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-6">
        
        {/* Left Column: Platform & Fanos AI Value Proposition */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between space-y-8 pr-0 lg:pr-8"
        >
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FANOS SEC PORTAL</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-sans leading-[1.15] mb-5">
              One Free Account, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-cyber-neon">
                Access to Everything.
              </span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg font-light max-w-xl leading-relaxed mb-8">
              Create a free account for immediate access to FANOS SEC training modules, live vulnerability sandboxes, and competitive CTF challenges.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-6 max-w-xl">
              
              {/* Feature 1: Security Intelligence */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 shadow-[0_0_15px_rgba(255,165,0,0.2)]">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                    <span>FANOS SEC AI Intelligence</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40 uppercase">AI 2.0</span>
                  </h3>
                  <p className="text-gray-400 text-sm font-light mt-1 leading-relaxed">
                    Interactive exploit debugging, autonomous threat analysis, guided remediation roadmaps, and 24/7 cybersecurity assistance.
                  </p>
                </div>
              </div>

              {/* Feature 2: Frameworks & Live Sandboxes */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base sm:text-lg">
                    Tactical Sandboxes & Live CTF Arenas
                  </h3>
                  <p className="text-gray-400 text-sm font-light mt-1 leading-relaxed">
                    In-memory SQLite SQL injection labs, stored XSS DOM playgrounds, packet captures, and real-time score tracking.
                  </p>
                </div>
              </div>

              {/* Feature 3: Certifications */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base sm:text-lg">
                    Recognized Certifications & Career Tracks
                  </h3>
                  <p className="text-gray-400 text-sm font-light mt-1 leading-relaxed">
                    FSST, FSWSS, FSCRT & FSCBT verifiable credentials recognized by top global security operations centers.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Left Bottom Links */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <Link 
              to="/contact" 
              className="text-xs font-mono text-gray-400 hover:text-orange-400 transition-colors inline-flex items-center space-x-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Need help signing up or accessing your account?</span>
            </Link>
            <div>
              <Link 
                to="/about" 
                className="text-xs font-mono text-gray-400 hover:text-white transition-colors inline-flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Learn about the FANOS SEC Platform</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Clean, Modern Elevated Sign-Up Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-6 xl:col-span-5 w-full max-w-md mx-auto"
        >
          <div className="bg-[#0b101b] border border-white/15 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden">
            
            {/* Top Glow Accent */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Card Brand Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-black text-lg">
                F
              </div>
              <div>
                <span className="text-white font-black tracking-wider text-base block font-mono">
                  FANOS SEC
                </span>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                  Center for Cybersecurity & AI
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-wide">
                Welcome
              </h2>
              <p className="text-gray-400 text-sm mt-1 font-light">
                Sign Up to <strong className="text-white">FANOS SEC</strong> to continue to your Security Dashboard.
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/15 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center space-x-2"
              >
                <span>⚠️ {error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Username Input */}
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-300 mb-1.5">
                  Username / Agent Alias*
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="agent_alex"
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/20 text-white text-sm font-mono placeholder:text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-300 mb-1.5">
                  Email address*
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="analyst@fanossec.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/20 text-white text-sm font-mono placeholder:text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              {/* Password Input with Show/Hide toggle */}
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-300 mb-1.5">
                  Password*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-black/60 border border-white/20 text-white text-sm font-mono placeholder:text-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-[0_0_20px_rgba(255,165,0,0.4)] mt-6"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            <div className="mt-6 pt-5 border-t border-white/10 text-center">
              <p className="text-gray-400 text-xs font-mono">
                Already have an account?{' '}
                <Link 
                  to={redirectUrl !== '/dashboard' ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : '/login'} 
                  className="text-orange-400 hover:text-white hover:underline font-bold transition-colors ml-1"
                >
                  Log in
                </Link>
              </p>
            </div>

            {/* Footer privacy/terms */}
            <div className="mt-6 flex justify-center items-center space-x-4 text-[11px] font-mono text-gray-500">
              <Link to="/about" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link to="/about" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Signup;
