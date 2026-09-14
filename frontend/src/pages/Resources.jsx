import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, FileCode, Cpu, Flame, Shield, 
  ExternalLink, Download, Search, Terminal, AlertTriangle, CheckCircle 
} from 'lucide-react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TABS = [
  { id: 'guides', label: 'Security Guides', icon: FileCode },
  { id: 'tools', label: 'Security Tools', icon: Cpu },
  { id: 'vulns', label: 'Vulnerabilities (OWASP)', icon: Flame },
  { id: 'threats', label: 'Threat Intelligence', icon: Shield },
  { id: 'blog', label: 'Intelligence Blog', icon: BookOpen }
];

const GUIDES_DATA = [
  {
    title: 'Linux Privilege Escalation Methodology & Cheatsheet',
    category: 'Privilege Escalation',
    author: 'FANOS SEC Offensive Ops',
    updated: '2026',
    desc: 'Comprehensive step-by-step checklist for identifying Linux misconfigurations: SUID/SGID abuse, sudo privilege checks, capability enumeration, NFS exports, and kernel exploits.',
    link: 'https://gtfobins.github.io/'
  },
  {
    title: 'SQL Injection: From Manual Exploitation to Automated Remediation',
    category: 'Web Security',
    author: 'FANOS SEC Web Research',
    updated: '2026',
    desc: 'Deep-dive guide into Union-based, Error-based, Blind, and Time-based SQL injections, parameterized queries, and defensive ORM best practices.',
    link: 'https://owasp.org/www-community/attacks/SQL_Injection'
  },
  {
    title: 'Active Directory Attack Playbook: Kerberoasting & DCSync',
    category: 'Red Teaming',
    author: 'FANOS SEC Red Team',
    updated: '2026',
    desc: 'Tactical reference for extracting service account Kerberos tickets, offline hash cracking, Pass-the-Ticket, and performing DCSync user account replication.',
    link: 'https://adsecurity.org/'
  },
  {
    title: 'Wireshark Network Forensics & Protocol Anomaly Detection',
    category: 'Network Forensics',
    author: 'FANOS SEC Blue Team',
    updated: '2026',
    desc: 'Practical filter cheat sheet for isolating suspicious beaconing, unencrypted credentials, DNS tunneling, and HTTP payload reconstructions.',
    link: 'https://www.wireshark.org/docs/'
  }
];

const TOOLS_DATA = [
  {
    name: 'Nmap (Network Mapper)',
    category: 'Reconnaissance & Port Scanning',
    desc: 'The industry-standard open source utility for network discovery, OS detection, and vulnerability scanning using NSE scripts.',
    link: 'https://nmap.org/'
  },
  {
    name: 'Burp Suite Community / Pro',
    category: 'Web Application Pentesting',
    desc: 'The leading toolkit for web application penetration testing, HTTP intercept proxy, repeater, and intruder automation.',
    link: 'https://portswigger.net/burp'
  },
  {
    name: 'Metasploit Framework',
    category: 'Exploitation & Staging',
    desc: 'World’s most used penetration testing framework for discovering, validating, and exploiting system vulnerabilities.',
    link: 'https://www.metasploit.com/'
  },
  {
    name: 'Wireshark',
    category: 'Packet Capture & Forensics',
    desc: 'World’s foremost network protocol analyzer for deep inspection of live traffic and recorded PCAP files.',
    link: 'https://www.wireshark.org/'
  },
  {
    name: 'Volatility 3',
    category: 'Memory Forensics',
    desc: 'The advanced volatile memory extraction framework for incident response and malware artifact discovery.',
    link: 'https://www.volatilityfoundation.org/'
  },
  {
    name: 'Ghidra & Radare2',
    category: 'Reverse Engineering',
    desc: 'Software reverse engineering suites developed for analyzing compiled binary files and deobfuscating malicious code.',
    link: 'https://ghidra-sre.org/'
  }
];

const VULNS_DATA = [
  {
    code: 'A01:2021',
    name: 'Broken Access Control',
    severity: 'Critical',
    desc: 'Failures in enforcing policy such that users cannot act outside their intended permissions. Leads to unauthorized information disclosure and data modification.',
    mitigation: 'Enforce principle of least privilege, deny by default, disable client-side access control bypasses.'
  },
  {
    code: 'A02:2021',
    name: 'Cryptographic Failures',
    severity: 'High',
    desc: 'Failures related to cryptography (previously known as Sensitive Data Exposure), leading to sensitive data exposure or system compromise.',
    mitigation: 'Encrypt all sensitive data in transit (TLS 1.3) and at rest with robust algorithms (AES-256, Argon2).'
  },
  {
    code: 'A03:2021',
    name: 'Injection (SQL, NoSQL, OS Command)',
    severity: 'Critical',
    desc: 'Hostile data sent to an interpreter as part of a command or query, tricking the interpreter into executing unintended commands.',
    mitigation: 'Use safe APIs, parameterized queries, and input validation with strict allow-lists.'
  },
  {
    code: 'A04:2021',
    name: 'Insecure Design',
    severity: 'High',
    desc: 'A broad category representing weaknesses in architectural design and lack of threat modeling during software development.',
    mitigation: 'Establish secure development lifecycles, threat modeling, and robust access-control architecture.'
  },
  {
    code: 'A05:2021',
    name: 'Security Misconfiguration',
    severity: 'Medium',
    desc: 'Default configurations, open cloud storage buckets, unpatched flaws, verbose error messages, and missing security headers.',
    mitigation: 'Automated hardening processes, disabling unused features, and continuous config verification.'
  },
  {
    code: 'A07:2021',
    name: 'Identification and Authentication Failures',
    severity: 'High',
    desc: 'Weak session management, lack of multi-factor authentication, credential stuffing susceptibility, and brute-force vulnerabilities.',
    mitigation: 'Implement multi-factor authentication (MFA), secure password policies, and strict rate-limiting.'
  }
];

const THREATS_DATA = [
  {
    title: 'Active Adversary Trends & Ransomware Evolution',
    threatActor: 'FIN7 / BlackCat Variants',
    date: 'Current Advisory',
    severity: 'High',
    summary: 'Observed surge in initial access broker sales targeting VPN credentials, followed by rapid domain privilege escalation within 4 hours.'
  },
  {
    title: 'Zero-Day Vulnerability Advisory in Public Web Frameworks',
    threatActor: 'Various APT Groups',
    date: 'Threat Bulletin',
    severity: 'Critical',
    summary: 'Unauthenticated remote code execution flaws identified in legacy serialization libraries. Immediate patch coordination recommended.'
  },
  {
    title: 'Cloud Identity & Token Theft via Infostealers',
    threatActor: 'Lumma / RedLine Syndicates',
    date: 'Intelligence Brief',
    severity: 'Medium',
    summary: 'Infostealer malware actively targeting browser session tokens to bypass multi-factor authentication on developer cloud dashboards.'
  }
];

const DEFAULT_BLOGS = [
  {
    _id: '1',
    title: 'Understanding the Modern OWASP Top 10 Structure & Real-World Exploits',
    content: 'An in-depth breakdown of how web vulnerabilities have shifted over the years, from SSRF to Insecure Design and Broken Access Control.',
    author: 'Mulugeta Ababi',
    createdAt: new Date('2026-09-10'),
    category: 'Exploit Analysis'
  },
  {
    _id: '2',
    title: 'Building a Defensive Keylogger Detection & Memory Forensics Tool in Python',
    content: 'Learn how low-level Windows API hooks work, dissect keystroke surveillance, and create automated forensics detection daemons in Python.',
    author: 'FANOS SEC Research Team',
    createdAt: new Date('2026-09-05'),
    category: 'Defense & Forensics'
  },
  {
    _id: '3',
    title: 'Active Directory Domain Dominance: Kerberoasting & DCSync Deep Dive',
    content: 'Simulating enterprise Active Directory compromise from initial foothold to Domain Admin with Kerberos ticket extraction.',
    author: 'Mulugeta Ababi',
    createdAt: new Date('2026-08-28'),
    category: 'Red Teaming'
  },
  {
    _id: '4',
    title: 'SIEM Engineering: Writing High-Fidelity Sigma Detection Rules for Splunk',
    content: 'Eliminate SOC alert fatigue by writing hypothesis-driven threat hunting rules that isolate adversary lateral movement.',
    author: 'FANOS SEC Research Team',
    createdAt: new Date('2026-08-20'),
    category: 'Blue Team & SOC'
  }
];

export default function Resources() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'guides';
  const [search, setSearch] = useState('');
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  useEffect(() => {
    if (currentTab === 'blog') {
      fetchBlogs();
    }
  }, [currentTab]);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${API}/blogs`, { timeout: 1200 });
      if (Array.isArray(data) && data.length > 0) {
        setBlogs(data);
      }
    } catch (e) {
      // Keep DEFAULT_BLOGS
    }
  };

  const handleTabChange = (id) => {
    setSearchParams({ tab: id });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-cyber-dark text-white selection:bg-cyber-neon selection:text-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono tracking-widest uppercase mb-4">
            <Cpu className="w-4 h-4" />
            <span>KNOWLEDGE & RESEARCH REPOSITORY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-wide font-sans">
            CYBERSECURITY <span className="text-cyber-cyan drop-shadow-[0_0_20px_rgba(0,255,255,0.6)]">RESOURCES</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Curated methodology guides, ethical hacking tool references, OWASP vulnerability knowledge, and live threat intelligence.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="flex gap-2 bg-[#090d14] p-1.5 rounded-2xl border border-white/10">
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = currentTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleTabChange(t.id)}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-cyber-cyan text-black shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── TAB 1: SECURITY GUIDES ── */}
        {currentTab === 'guides' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GUIDES_DATA.map((g, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="bg-[#090d13] border border-white/10 hover:border-cyber-cyan/50 rounded-2xl p-7 flex flex-col justify-between transition-all group shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono text-cyber-cyan bg-cyber-cyan/10 px-2.5 py-1 rounded border border-cyber-cyan/30 uppercase">
                      {g.category}
                    </span>
                    <span className="text-xs font-mono text-gray-500">Updated {g.updated}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-cyan transition-colors">
                    {g.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-light mb-6">
                    {g.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">By {g.author}</span>
                  <a
                    href={g.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 text-xs font-mono font-bold text-cyber-cyan hover:underline"
                  >
                    <span>Read Guide</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── TAB 2: SECURITY TOOLS ── */}
        {currentTab === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS_DATA.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                className="bg-[#090d13] border border-white/10 hover:border-cyber-neon/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-xl"
              >
                <div>
                  <span className="text-xs font-mono text-gray-400 uppercase block mb-2">{tool.category}</span>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyber-neon transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
                    {tool.desc}
                  </p>
                </div>

                <a
                  href={tool.link}
                  target="_blank"
                  rel="noreferrer"
                  className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-cyber-neon hover:underline"
                >
                  <span>Official Download & Docs</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── TAB 3: VULNERABILITIES (OWASP) ── */}
        {currentTab === 'vulns' && (
          <div className="space-y-6">
            <div className="bg-[#090d14] border border-white/10 rounded-2xl p-6 mb-8 text-center max-w-3xl mx-auto">
              <h3 className="text-lg font-bold text-white mb-2">OWASP Top 10 Reference Library</h3>
              <p className="text-gray-400 text-sm font-light">The definitive knowledge base for critical web application security risks and remediation playbooks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VULNS_DATA.map((v, idx) => (
                <div key={idx} className="bg-[#090d13] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono font-bold text-cyber-neon bg-cyber-neon/10 px-2.5 py-1 rounded border border-cyber-neon/30">
                      {v.code}
                    </span>
                    <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
                      {v.severity}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{v.name}</h3>
                  <p className="text-gray-300 text-sm font-light leading-relaxed mb-4">{v.desc}</p>
                  
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-xs font-mono text-cyber-cyan font-bold uppercase mb-1">Recommended Defense:</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{v.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: THREAT INTELLIGENCE ── */}
        {currentTab === 'threats' && (
          <div className="space-y-6">
            {THREATS_DATA.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-[#090d13] border border-white/10 hover:border-red-500/50 rounded-2xl p-6 transition-all shadow-xl"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                  <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2.5 py-1 rounded border border-red-500/30 uppercase font-bold">
                    {t.severity} Severity
                  </span>
                  <span className="text-xs font-mono text-gray-400">{t.date} • Monitored Actor: {t.threatActor}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed">{t.summary}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── TAB 5: BLOG INTEGRATION ── */}
        {currentTab === 'blog' && (
          <div>
            <div className="text-center mb-8">
              <Link
                to="/blog"
                className="inline-flex items-center space-x-2 text-cyber-neon font-mono text-sm hover:underline font-bold"
              >
                <span>View Dedicated Intelligence Blog Page →</span>
              </Link>
            </div>

            {loadingBlogs ? (
              <div className="text-center py-16 text-cyber-neon font-mono animate-pulse">
                [ RETRIEVING RECENT TRANSMISSIONS... ]
              </div>
            ) : blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogs.map((b) => (
                  <div key={b._id} className="bg-[#090d13] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
                    <p className="text-xs font-mono text-gray-400 mb-4">By {b.author} • {new Date(b.createdAt).toLocaleDateString()}</p>
                    <p className="text-gray-300 text-sm font-light leading-relaxed mb-4 line-clamp-3">{b.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#090d13] border border-white/10 rounded-2xl p-6">
                  <span className="text-xs font-mono text-cyber-purple uppercase mb-2 block">Tutorial</span>
                  <h3 className="text-xl font-bold text-white mb-2">Understanding the new OWASP Top 10 Structure</h3>
                  <p className="text-gray-300 text-sm font-light leading-relaxed mb-4">
                    An in-depth guide on how web vulnerabilities have shifted over the years and what you need to focus on today.
                  </p>
                  <Link to="/blog" className="text-xs font-mono text-cyber-neon hover:underline font-bold">
                    Read in Intelligence Blog →
                  </Link>
                </div>

                <div className="bg-[#090d13] border border-white/10 rounded-2xl p-6">
                  <span className="text-xs font-mono text-cyber-purple uppercase mb-2 block">Video Resource</span>
                  <h3 className="text-xl font-bold text-white mb-2">Creating a basic Keylogger in Python</h3>
                  <p className="text-gray-300 text-sm font-light leading-relaxed mb-4">
                    Learn how keystrokes are captured. Purely for educational and defensive purposes to understand malware operations.
                  </p>
                  <Link to="/blog" className="text-xs font-mono text-cyber-neon hover:underline font-bold">
                    Watch in Intelligence Blog →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
