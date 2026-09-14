import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LabCard from '../components/LabCard';
import { Terminal, Shield, Play, ExternalLink, Sparkles, Filter, CheckCircle2, ArrowRight, Lock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const mockLabs = [
    { 
      _id: '1', 
      title: 'SQL Injection Lab', 
      category: 'Web Security',
      difficulty: 'Beginner',
      sandboxUrl: 'http://localhost:8080/sqli.html',
      flag: 'FLAG{fanos_sec_sql_master}',
      description: 'Exploit direct string concatenation in SQLite queries to bypass authentication and capture the root administrator flag.' 
    },
    { 
      _id: '2', 
      title: 'Cross-Site Scripting (XSS)', 
      category: 'Web Security',
      difficulty: 'Intermediate',
      sandboxUrl: 'http://localhost:8080/xss.html',
      description: 'Inject and execute stored JavaScript payloads on a live community message board and test session cookie extraction.' 
    },
    { 
      _id: '3', 
      title: 'Linux Privilege Escalation', 
      category: 'Host Security',
      difficulty: 'Intermediate',
      challengeId: '6',
      description: 'Enumerate SUID binaries, misconfigured sudo rules, and kernel exploits to escalate from a low-privileged user to root.' 
    },
    { 
      _id: '4', 
      title: 'PCAP Traffic Interception & Decoding', 
      category: 'Host Security',
      difficulty: 'Easy',
      challengeId: '3',
      description: 'Analyze network packet captures to reconstruct unencrypted FTP sessions and recover credentials.' 
    },
    { 
      _id: '5', 
      title: 'RSA Weak Key Cryptanalysis', 
      category: 'Binary Exploitation',
      difficulty: 'Intermediate',
      challengeId: '5',
      description: 'Factorize a vulnerable RSA public modulus generated with small prime factors and decrypt the secret ciphertext.' 
    },
    { 
      _id: '6', 
      title: 'Memory Dump Malware Hunt (Volatility)', 
      category: 'Malware Analysis',
      difficulty: 'Advanced',
      challengeId: '4',
      description: 'Examine a volatility memory image to identify injected DLLs, anomalous process trees, and hidden persistence handles.' 
    },
];

const CATEGORIES = ['All Labs', 'Web Security', 'Host Security', 'Binary Exploitation', 'Malware Analysis'];

const Labs = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedCat, setSelectedCat] = useState('All Labs');

    const filteredLabs = selectedCat === 'All Labs' 
      ? mockLabs 
      : mockLabs.filter(l => l.category === selectedCat);

    const handleLaunchLab = (lab) => {
      if (!user) {
        navigate(`/login?redirect=${encodeURIComponent('/labs')}`);
        return;
      }
      if (lab.sandboxUrl) {
        window.open(lab.sandboxUrl, '_blank');
      } else if (lab.challengeId) {
        navigate(`/challenges/${lab.challengeId}`);
      }
    };

    const handleBannerLaunch = (e) => {
      if (!user) {
        e.preventDefault();
        navigate(`/login?redirect=${encodeURIComponent('/labs')}`);
        return;
      }
    };

    return (
        <div className="min-h-screen bg-cyber-dark text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-cyber-neon selection:text-black">
            <div className="container mx-auto max-w-7xl">
                
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyber-neon/10 border border-cyber-neon/30 text-cyber-neon text-sm font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,255,65,0.15)]">
                        <Terminal className="w-4 h-4" />
                        <span>ISOLATED VIRTUAL SANDBOXES</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-sans tracking-wide text-white mb-5 uppercase leading-tight">
                        INTERACTIVE <span className="text-cyber-neon drop-shadow-[0_0_25px_rgba(0,255,65,0.7)]">HANDS-ON LABS</span>
                    </h1>

                    <p className="text-gray-300 text-base sm:text-xl max-w-3xl mx-auto font-light leading-relaxed">
                        Put offensive and defensive theory into practice. Our dynamic, browser-based sandboxes give you isolated target environments to test exploits, hunt vulnerabilities, and earn CTF flags.
                    </p>
                </motion.div>

                {/* Top Featured Sandbox Dispatch Banner */}
                <div className="mb-14 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyber-neon/30 via-cyber-cyan/30 to-purple-600/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-[#090d14] border-2 border-cyber-neon/40 rounded-2xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
                        <div className="flex items-start space-x-4">
                            <div className="w-14 h-14 rounded-2xl bg-cyber-neon/20 border border-cyber-neon/50 flex items-center justify-center text-cyber-neon shrink-0 shadow-[0_0_20px_rgba(0,255,65,0.4)]">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="px-2.5 py-0.5 rounded bg-cyber-neon text-black font-extrabold text-xs uppercase font-mono">PORT 8080 ACTIVE</span>
                                    <span className="text-xs font-mono text-gray-400">IN-MEMORY SQLITE ENGINE</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                                    FANOS SEC — Security Training Sandbox
                                </h2>
                                <p className="text-gray-300 text-sm sm:text-base font-light max-w-2xl">
                                    Access dedicated training modules for <strong>SQL Injection Authentication Bypass</strong> and <strong>Stored Cross-Site Scripting (XSS)</strong> running in an isolated RAM-based environment.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 shrink-0">
                            {user ? (
                                <a
                                    href="http://localhost:8080"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3.5 rounded-xl bg-cyber-neon text-black font-extrabold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,65,0.6)] flex items-center space-x-2 cursor-pointer"
                                >
                                    <Play className="w-4 h-4 fill-black" />
                                    <span>Launch Full Sandbox</span>
                                    <ExternalLink className="w-4 h-4 ml-1" />
                                </a>
                            ) : (
                                <Link
                                    to="/login?redirect=/labs"
                                    className="px-6 py-3.5 rounded-xl bg-cyber-neon text-black font-extrabold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,65,0.6)] flex items-center space-x-2 cursor-pointer"
                                >
                                    <Lock className="w-4 h-4 text-black" />
                                    <span>Sign In to Launch</span>
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filter Toolbar */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCat(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                                selectedCat === cat
                                    ? 'bg-cyber-neon text-black shadow-[0_0_15px_rgba(0,255,65,0.4)]'
                                    : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Lab Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredLabs.map((lab, index) => (
                        <LabCard 
                            key={lab._id} 
                            lab={lab} 
                            delay={index * 0.08} 
                            onLaunch={handleLaunchLab}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Labs;
