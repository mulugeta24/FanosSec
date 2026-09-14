import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Flag, Target, Award, CheckCircle, AlertCircle, HelpCircle, Shield, Terminal, Send, ExternalLink, Sparkles, Play } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FALLBACK_CHALLENGES = {
  'sqli-vault-infiltration': {
    _id: 'sqli-vault-infiltration',
    title: 'SQLi Vault Infiltration',
    category: 'Web Security',
    difficulty: 'Easy',
    points: 50,
    description: 'Bypass a legacy authentication portal by exploiting an unsanitized SQL query in the backend authorization handler.',
    scenario: 'A target financial firm uses an outdated parameter query to verify administrative credentials on their internal portal: SELECT * FROM users WHERE username = "$user" AND password = "$pass".',
    instructions: '1. Access the mock form parameter.\n2. Craft an authentication bypass payload using boolean tautologies like: admin\' OR 1=1 --\n3. Extract the secret flag from the admin dashboard response.',
    hints: [
      { text: 'Think about commenting out the remainder of the SQL query with -- or #.', cost: 0 },
      { text: 'The flag format follows: FANOS{...}', cost: 0 }
    ],
    expectedFlag: 'FANOS{sql1_auth_byp4ss_m4st3r}'
  },
  'xss-cookie-heist': {
    _id: 'xss-cookie-heist',
    title: 'XSS Cookie Heist & Session Steal',
    category: 'Web Security',
    difficulty: 'Medium',
    points: 100,
    description: 'Identify a stored Cross-Site Scripting vulnerability in a user feedback board to extract administrator session tokens.',
    scenario: 'The internal admin review dashboard renders user comments without HTML sanitization or CSP headers.',
    instructions: '1. Inject an SVG or Image payload with an embedded Javascript execution handler.\n2. Exfiltrate the simulated cookie payload to capture the admin session flag.',
    hints: [
      { text: 'Try using <img src=x onerror=...> or <svg onload=...>', cost: 0 }
    ],
    expectedFlag: 'FANOS{xss_s3ss10n_st0l3n_pr0t0c0l}'
  },
  'pcap-traffic-interception': {
    _id: 'pcap-traffic-interception',
    title: 'PCAP Traffic Interception & Decoding',
    category: 'Network Security',
    difficulty: 'Easy',
    points: 60,
    description: 'Analyze an encrypted network packet capture to reconstruct an unencrypted FTP session and recover intercepted credentials.',
    scenario: 'An attacker exfiltrated proprietary firmware over a legacy FTP protocol inside the enterprise DMZ.',
    instructions: '1. Inspect the packet stream filter in Wireshark for ftp or tcp.port == 21.\n2. Follow the TCP stream to inspect cleartext USER and PASS commands.',
    hints: [
      { text: 'Use Wireshark filter: ftp.request.command == "PASS"', cost: 0 }
    ],
    expectedFlag: 'FANOS{n3tw0rk_p4ck3t_sn1ff3d_cl34r}'
  },
  'memory-dump-malware-hunt': {
    _id: 'memory-dump-malware-hunt',
    title: 'Memory Dump Malware Hunt (Volatility)',
    category: 'Digital Forensics',
    difficulty: 'Hard',
    points: 150,
    description: 'Examine a volatility memory image to identify injected DLLs, anomalous process trees, and hidden persistence handles.',
    scenario: 'A workstation in accounting exhibited anomalous outbound beaconing to a known C2 server.',
    instructions: '1. Run volatility3 -f dump.raw windows.pslist.\n2. Identify injected code pages using windows.malfind.',
    hints: [
      { text: 'Look for PAGE_EXECUTE_READWRITE memory pages with MZ header strings.', cost: 0 }
    ],
    expectedFlag: 'FANOS{m3m0ry_f0r3ns1cs_v0l4t1l1ty_pr0}'
  },
  'rsa-weak-key-cryptanalysis': {
    _id: 'rsa-weak-key-cryptanalysis',
    title: 'RSA Weak Key Cryptanalysis',
    category: 'Cryptography',
    difficulty: 'Medium',
    points: 120,
    description: 'Factorize a vulnerable RSA public modulus generated with small prime factors and decrypt the secret ciphertext.',
    scenario: 'An outdated IoT gateway implemented custom key generation with predictable prime entropy.',
    instructions: '1. Apply Fermat factorization or Wiener attack to compute private key exponent d.\n2. Decrypt the ASCII ciphertext to recover the flag.',
    hints: [
      { text: 'Since primes p and q are close, calculate a = ceil(sqrt(n)) and test a^2 - n.', cost: 0 }
    ],
    expectedFlag: 'FANOS{crypt0_rs4_f3rm4t_f4ct0r_br0k3n}',
    sandboxUrl: 'http://localhost:8080'
  },
  'linux-suid-binary-exploitation': {
    _id: 'linux-suid-binary-exploitation',
    title: 'Linux SUID Binary Exploitation',
    category: 'Privilege Escalation',
    difficulty: 'Medium',
    points: 110,
    description: 'Discover misconfigured SUID binaries on a hardened Linux distribution and escalate privileges to root.',
    scenario: 'A custom backup helper binary runs with root SUID permissions and invokes system binaries without absolute paths.',
    instructions: '1. Identify SUID binaries using find / -perm -4000.\n2. Hijack the PATH variable to execute a malicious payload with root privileges.',
    hints: [
      { text: 'Prepend /tmp to your PATH environment variable.', cost: 0 }
    ],
    expectedFlag: 'FANOS{su1d_p4th_h1j4ck_r00t_0wn3d}',
    sandboxUrl: 'http://localhost:8080'
  },
  'osint-rogue-domain': {
    _id: 'osint-rogue-domain',
    title: 'OSINT Footprinting: Rogue Domain Discovery',
    category: 'OSINT',
    difficulty: 'Easy',
    points: 50,
    description: 'Track down threat actor infrastructure using certificate transparency logs, WHOIS history, and passive DNS records.',
    scenario: 'A phishing syndicate registered lookalike domains mimicking enterprise portals.',
    instructions: '1. Inspect the certificate transparency log for domain mutations: certstream or crt.sh.\n2. Identify the exfiltration endpoint IP address.',
    hints: [
      { text: 'Query crt.sh with %fanos-sec%.com to discover rogue subdomains.', cost: 0 }
    ],
    expectedFlag: 'FANOS{0s1nt_c3rt_tr4nsp4r3ncy_f0und}',
    sandboxUrl: 'http://localhost:8080'
  }
};

FALLBACK_CHALLENGES['sqli-vault-infiltration'].sandboxUrl = 'http://localhost:8080/sqli.html';
FALLBACK_CHALLENGES['xss-cookie-heist'].sandboxUrl = 'http://localhost:8080/xss.html';

// Map numeric IDs to slugs
FALLBACK_CHALLENGES['1'] = FALLBACK_CHALLENGES['sqli-vault-infiltration'];
FALLBACK_CHALLENGES['2'] = FALLBACK_CHALLENGES['xss-cookie-heist'];
FALLBACK_CHALLENGES['3'] = FALLBACK_CHALLENGES['pcap-traffic-interception'];
FALLBACK_CHALLENGES['4'] = FALLBACK_CHALLENGES['memory-dump-malware-hunt'];
FALLBACK_CHALLENGES['5'] = FALLBACK_CHALLENGES['rsa-weak-key-cryptanalysis'];
FALLBACK_CHALLENGES['6'] = FALLBACK_CHALLENGES['linux-suid-binary-exploitation'];
FALLBACK_CHALLENGES['7'] = FALLBACK_CHALLENGES['osint-rogue-domain'];

export default function ChallengeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flagInput, setFlagInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    fetchChallenge();
  }, [id]);

  const fetchChallenge = async () => {
    setLoading(true);
    try {
      const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};
      const { data } = await axios.get(`${API}/challenges/${id}`, { headers });
      setChallenge(data);
    } catch (e) {
      // Use fallback
      const found = FALLBACK_CHALLENGES[id] || 
                    Object.values(FALLBACK_CHALLENGES).find(c => c._id === id || c.slug === id) || 
                    Object.values(FALLBACK_CHALLENGES)[0];
      setChallenge(found);
    }
    setLoading(false);
  };

  const handleFlagSubmit = async (e) => {
    e.preventDefault();
    if (!flagInput.trim()) return;

    setSubmitting(true);
    setFeedback(null);

    const cleanInput = flagInput.trim();

    try {
      if (user?.token && challenge._id && !challenge._id.startsWith('sqli-') && challenge._id.length > 5) {
        const { data } = await axios.post(
          `${API}/challenges/${challenge._id}/submit`,
          { flag: cleanInput },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setFeedback({ success: true, message: data.message || '🎉 Flag Verified! Points awarded.' });
      } else {
        // Local verification fallback (works for logged in and guest users)
        const target = challenge.expectedFlag || 'FANOS{sql1_auth_byp4ss_m4st3r}';
        const isMatch = cleanInput.toLowerCase() === target.toLowerCase() ||
                        (challenge.title?.includes('SQL') && cleanInput.toLowerCase() === 'flag{fanos_sec_sql_master}') ||
                        (challenge.title?.includes('XSS') && cleanInput.toLowerCase() === 'flag{fanos_sec_xss_captured}');

        if (isMatch) {
          // Save guest/local score in localStorage
          const solvedIds = JSON.parse(localStorage.getItem('fanos_guest_solved') || '[]');
          const chKey = challenge.slug || challenge._id || id;
          if (!solvedIds.includes(chKey)) {
            solvedIds.push(chKey);
            localStorage.setItem('fanos_guest_solved', JSON.stringify(solvedIds));
            const currentScore = parseInt(localStorage.getItem('fanos_guest_score') || '0', 10);
            localStorage.setItem('fanos_guest_score', String(currentScore + (challenge.points || 50)));
          }

          setFeedback({
            success: true,
            message: `🎉 Correct flag! You solved "${challenge.title}" and earned +${challenge.points || 50} points!`
          });
        } else {
          setFeedback({
            success: false,
            message: '❌ Incorrect flag. Review the challenge scenario and test your payload.'
          });
        }
      }
    } catch (err) {
      setFeedback({
        success: false,
        message: err.response?.data?.message || '❌ Incorrect flag submission. Try again!'
      });
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center text-white font-mono">
        [ INITIALIZING TACTICAL CHALLENGE ARENA... ]
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Challenge Not Found</h2>
        <Link to="/challenges" className="text-orange-400 hover:underline">
          Return to Challenge List
        </Link>
      </div>
    );
  }

  // Require Authentication to access the Challenge Room & Sandbox
  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-cyber-dark text-white flex items-center justify-center px-6 selection:bg-orange-500 selection:text-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-[#0b101b] border border-orange-500/40 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mx-auto mb-6 shadow-[0_0_20px_rgba(255,165,0,0.3)]">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white font-sans mb-3">
            Authentication Required
          </h2>
          <p className="text-gray-300 text-sm font-light leading-relaxed mb-8">
            Please sign in to your <strong className="text-white">FANOS SEC</strong> account to access <strong>"{challenge.title}"</strong>, launch the live vulnerability sandbox, and submit flags.
          </p>

          <div className="space-y-3">
            <Link
              to={`/login?redirect=${encodeURIComponent(`/challenges/${id}`)}`}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,165,0,0.4)]"
            >
              <span>Sign In to Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={`/signup?redirect=${encodeURIComponent(`/challenges/${id}`)}`}
              className="w-full py-3.5 px-6 rounded-xl bg-black/60 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/20 flex items-center justify-center"
            >
              <span>Create Free Account</span>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <Link to="/challenges" className="text-xs font-mono text-gray-400 hover:text-orange-400 transition-colors inline-flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Challenges list</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-cyber-dark text-white selection:bg-cyber-neon selection:text-black">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/challenges')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Challenges</span>
        </button>

        {/* Challenge Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#090d14] border border-white/10 rounded-3xl p-8 sm:p-10 mb-8 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold bg-orange-500/10 px-3 py-1 rounded border border-orange-500/30">
                  {challenge.category}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  Difficulty: <strong className="text-white">{challenge.difficulty}</strong>
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-wide">
                {challenge.title}
              </h1>
            </div>

            <div className="px-5 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-center shrink-0">
              <span className="text-xs font-mono text-gray-400 block uppercase">Reward</span>
              <span className="text-2xl font-mono font-black text-orange-400">+{challenge.points} PTS</span>
            </div>
          </div>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light mb-8">
            {challenge.description}
          </p>

          {/* Scenario & Instructions */}
          <div className="space-y-6 pt-6 border-t border-white/10">
            {challenge.sandboxUrl && (
              <div className="bg-gradient-to-r from-orange-500/20 via-orange-500/10 to-transparent border border-orange-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-orange-400 font-mono text-xs uppercase font-bold mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Live Target Environment Ready</span>
                  </div>
                  <p className="text-white text-sm font-semibold">
                    Launch the dedicated security sandbox on Port 8080 to test your exploits live and extract the flag.
                  </p>
                </div>
                <a
                  href={challenge.sandboxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-[0_0_20px_rgba(255,165,0,0.5)] shrink-0 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Launch Live Sandbox</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {challenge.scenario && (
              <div>
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-orange-400 mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2" /> Tactical Scenario
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5">
                  {challenge.scenario}
                </p>
              </div>
            )}

            {challenge.instructions && (
              <div>
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-cyber-cyan mb-2 flex items-center">
                  <Terminal className="w-4 h-4 mr-2" /> Mission Instructions
                </h3>
                <div className="text-gray-300 text-sm leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5 whitespace-pre-line font-mono">
                  {challenge.instructions}
                </div>
              </div>
            )}
          </div>

        </motion.div>

        {/* Flag Submission Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#090d14] border-2 border-orange-500/40 rounded-3xl p-8 shadow-2xl mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
            <div className="flex items-center space-x-3">
              <Flag className="w-6 h-6 text-orange-400" />
              <h2 className="text-xl font-bold text-white font-mono">SUBMIT CAPTURED FLAG</h2>
            </div>
            
            {!user ? (
              <div className="text-xs font-mono text-gray-400 flex items-center space-x-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                <span>Guest Mode • </span>
                <Link to={`/login?redirect=/challenges/${id}`} className="text-orange-400 hover:underline font-bold">
                  Sign in to sync score
                </Link>
              </div>
            ) : (
              <div className="text-xs font-mono text-green-400 flex items-center space-x-1.5 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/30">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Playing as <strong>{user.name || 'Agent'}</strong></span>
              </div>
            )}
          </div>

          <form onSubmit={handleFlagSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={flagInput}
              onChange={(e) => setFlagInput(e.target.value)}
              placeholder="FANOS{your_captured_flag_here}"
              className="flex-1 bg-black/60 border border-white/20 rounded-xl px-5 py-3.5 text-white font-mono text-base focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 bg-orange-500 text-black font-extrabold uppercase tracking-wider rounded-xl hover:bg-white hover:shadow-[0_0_20px_rgba(255,165,0,0.6)] transition-all flex items-center justify-center space-x-2 shrink-0 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Verifying...' : 'Submit Flag'}</span>
            </button>
          </form>

          {feedback && (
            <div
              className={`mt-4 p-4 rounded-xl border flex items-center space-x-3 text-sm font-mono ${
                feedback.success
                  ? 'bg-green-500/15 border-green-500/40 text-green-300'
                  : 'bg-red-500/15 border-red-500/40 text-red-300'
              }`}
            >
              {feedback.success ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Hints Accordion */}
          {challenge.hints && challenge.hints.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-xs font-mono text-gray-400 hover:text-orange-400 flex items-center space-x-1.5 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{showHints ? 'Hide Mission Hints' : 'Need a hint? (Free)'}</span>
              </button>

              {showHints && (
                <div className="mt-3 space-y-2">
                  {challenge.hints.map((hint, hi) => (
                    <div key={hi} className="p-3 bg-black/40 rounded-lg border border-white/5 text-xs text-gray-300 font-mono">
                      💡 <strong>Hint {hi + 1}:</strong> {hint.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
