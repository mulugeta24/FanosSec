import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, Target, Award, Search, Filter, CheckCircle2, ChevronRight, AlertCircle, HelpCircle, Lock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const DEFAULT_CHALLENGES = [
  {
    _id: '1',
    title: 'SQLi Vault Infiltration',
    slug: 'sqli-vault-infiltration',
    category: 'Web Security',
    difficulty: 'Easy',
    points: 50,
    description: 'Bypass a legacy login form by exploiting an unsanitized SQL query in the backend authentication logic.',
    scenario: 'A target financial firm uses an outdated query to verify administrative credentials.',
    tags: ['SQLi', 'Web', 'Authentication'],
    solvedCount: 142
  },
  {
    _id: '2',
    title: 'XSS Cookie Heist & Session Steal',
    slug: 'xss-cookie-heist',
    category: 'Web Security',
    difficulty: 'Medium',
    points: 100,
    description: 'Identify a stored Cross-Site Scripting vulnerability in a user feedback board to extract administrator session tokens.',
    scenario: 'The internal admin review dashboard renders user comments without HTML sanitization or CSP headers.',
    tags: ['XSS', 'Web', 'DOM'],
    solvedCount: 89
  },
  {
    _id: '3',
    title: 'PCAP Traffic Interception & Decoding',
    slug: 'pcap-traffic-interception',
    category: 'Network Security',
    difficulty: 'Easy',
    points: 60,
    description: 'Analyze an encrypted network packet capture to reconstruct an unencrypted FTP session and recover intercepted credentials.',
    scenario: 'An attacker exfiltrated proprietary firmware over a legacy FTP protocol inside the enterprise DMZ.',
    tags: ['PCAP', 'Wireshark', 'FTP'],
    solvedCount: 115
  },
  {
    _id: '4',
    title: 'Memory Dump Malware Hunt (Volatility)',
    slug: 'memory-dump-malware-hunt',
    category: 'Digital Forensics',
    difficulty: 'Hard',
    points: 150,
    description: 'Examine a volatility memory image to identify injected DLLs, anomalous process trees, and hidden persistence handles.',
    scenario: 'A workstation in accounting exhibited anomalous outbound beaconing to a known C2 server.',
    tags: ['Forensics', 'Memory', 'Volatility'],
    solvedCount: 41
  },
  {
    _id: '5',
    title: 'RSA Weak Key Cryptanalysis',
    slug: 'rsa-weak-key-cryptanalysis',
    category: 'Cryptography',
    difficulty: 'Medium',
    points: 120,
    description: 'Factorize a vulnerable RSA public modulus generated with small prime factors and decrypt the secret ciphertext.',
    scenario: 'An outdated IoT gateway implemented custom key generation with predictable prime entropy.',
    tags: ['Crypto', 'RSA', 'Math'],
    solvedCount: 67
  },
  {
    _id: '6',
    title: 'Linux SUID Binary Exploitation',
    slug: 'linux-suid-binary-exploitation',
    category: 'Privilege Escalation',
    difficulty: 'Medium',
    points: 110,
    description: 'Discover misconfigured SUID binaries on a hardened Linux distribution and escalate privileges to root.',
    scenario: 'A custom backup helper binary runs with root SUID permissions and invokes system binaries without absolute paths.',
    tags: ['Linux', 'PrivEsc', 'SUID'],
    solvedCount: 78
  },
  {
    _id: '7',
    title: 'OSINT Footprinting: Rogue Domain Discovery',
    slug: 'osint-rogue-domain',
    category: 'OSINT',
    difficulty: 'Easy',
    points: 50,
    description: 'Track down threat actor infrastructure using certificate transparency logs, WHOIS history, and passive DNS records.',
    scenario: 'A phishing syndicate registered lookalike domains mimicking enterprise portals.',
    tags: ['OSINT', 'DNS', 'Recon'],
    solvedCount: 95
  }
];

const CATEGORIES = [
  'All',
  'Web Security',
  'Network Security',
  'Digital Forensics',
  'Cryptography',
  'OSINT',
  'Privilege Escalation'
];

export default function Challenges() {
  const { user } = useContext(AuthContext);
  const [challenges, setChallenges] = useState(DEFAULT_CHALLENGES);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [userStats, setUserStats] = useState({ solvedCount: 0, totalPoints: 0 });

  useEffect(() => {
    fetchChallenges();
    loadScore();
  }, [category, difficulty, user]);

  const loadScore = async () => {
    if (user?.token) {
      try {
        const { data } = await axios.get(`${API}/challenges/stats/user`, {
          headers: { Authorization: `Bearer ${user.token}` },
          timeout: 1500
        });
        if (data && data.totalPoints !== undefined) {
          setUserStats(data);
          return;
        }
      } catch (e) {
        // Fallback to local storage tracking
      }
    }
    const guestScore = parseInt(localStorage.getItem('fanos_guest_score') || '0', 10);
    const guestSolved = JSON.parse(localStorage.getItem('fanos_guest_solved') || '[]');
    setUserStats({ totalPoints: guestScore, solvedCount: guestSolved.length });
  };

  const fetchChallenges = async () => {
    try {
      const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};
      const { data } = await axios.get(`${API}/challenges?category=${category}&difficulty=${difficulty}`, { 
        headers,
        timeout: 1200 
      });
      if (Array.isArray(data) && data.length > 0) {
        setChallenges(data);
      }
    } catch (e) {
      // Keep DEFAULT_CHALLENGES
    }
  };

  const filteredChallenges = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || c.category === category;
    const matchesDifficulty = difficulty === 'All' || c.difficulty === difficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'Hard':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'Insane':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      default:
        return 'text-gray-400 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-cyber-dark text-white selection:bg-cyber-neon selection:text-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Flag className="w-4 h-4" />
            <span>PRACTICAL SECURITY CHALLENGES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-wide font-sans">
            TEST YOUR <span className="text-orange-400 drop-shadow-[0_0_20px_rgba(255,165,0,0.6)]">SECURITY SKILLS</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Solve realistic security puzzles across Web Security, Forensics, Cryptography, OSINT, and Privilege Escalation. Submit the flag to earn points.
          </p>
        </motion.div>

        {/* Stats & Search Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-3 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search challenges by title, keyword, or tag..."
                className="w-full bg-[#090d14] border border-white/15 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-[#090d14] border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="bg-[#090d14] border border-orange-500/40 rounded-xl px-5 py-3 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2.5">
              <Trophy className="w-5 h-5 text-orange-400 shrink-0" />
              <div>
                <span className="text-[11px] font-mono text-gray-400 uppercase font-semibold block leading-tight">
                  Your Arena Score
                </span>
                {user ? (
                  <span className="text-lg font-mono font-black text-orange-400 leading-tight">
                    {userStats.totalPoints} PTS
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-orange-400 leading-tight block">
                    Sign in to track
                  </span>
                )}
              </div>
            </div>
            {!user ? (
              <Link
                to="/login?redirect=/challenges"
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500 text-orange-300 hover:text-black font-bold transition-all border border-orange-500/40 shrink-0"
              >
                Sign In
              </Link>
            ) : (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/40">
                Synced
              </span>
            )}
          </div>
        </div>

        {/* Sign-In Info Banner */}
        {!user && (
          <div className="mb-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
            <div className="flex items-center space-x-2.5 text-orange-300">
              <Lock className="w-4 h-4 text-orange-400 shrink-0" />
              <span>
                <strong>Trainer Authentication:</strong> Sign in or create a free account to enter challenge rooms, launch sandboxes, and submit flags.
              </span>
            </div>
            <Link
              to="/signup?redirect=/challenges"
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-orange-500 text-black font-extrabold hover:bg-white transition-all shrink-0"
            >
              Sign Up Free &rarr;
            </Link>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                category === cat
                  ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(255,165,0,0.4)]'
                  : 'bg-[#090d14] border border-white/10 text-gray-400 hover:text-white hover:border-orange-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((ch, idx) => (
            <motion.div
              key={ch._id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-[#090d14] border border-white/10 hover:border-orange-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    {ch.category}
                  </span>
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${getDifficultyBadge(ch.difficulty)}`}>
                    {ch.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {ch.title}
                </h3>

                <p className="text-gray-300 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                  {ch.description}
                </p>

                {ch.tags && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {ch.tags.map((t, ti) => (
                      <span key={ti} className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10 text-gray-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="text-orange-400 font-bold">+{ch.points} PTS</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{ch.solvedCount || 0} Solves</span>
                </div>

                <Link
                  to={user ? `/challenges/${ch._id || ch.slug}` : `/login?redirect=${encodeURIComponent(`/challenges/${ch._id || ch.slug}`)}`}
                  className="px-4 py-2 rounded-lg bg-orange-500/15 hover:bg-orange-500 text-orange-300 hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <span>Solve</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
