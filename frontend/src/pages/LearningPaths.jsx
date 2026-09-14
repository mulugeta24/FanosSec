import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Lock, Eye, Zap, ArrowRight, Clock, Layers, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const LEARNING_PATHS_DATA = [
  {
    id: 'fundamentals',
    title: 'Cybersecurity Fundamentals',
    level: 'Beginner',
    duration: '25 Hours',
    modulesCount: 8,
    labsCount: 14,
    color: '#00FF41',
    icon: Shield,
    shortDesc: 'Foundational training covering computer networks, Linux systems administration, and fundamental security mechanisms.',
    fullDesc: 'The Cybersecurity Fundamentals path provides a complete foundation for anyone starting their cybersecurity journey. You will understand how modern operating systems work, dissect networking packets with Wireshark, navigate Linux terminals comfortably, and learn basic defensive and offensive security principles.',
    connectedCourse: 'dmcst',
    curriculum: [
      {
        module: 'Module 1: Introduction to Computing & Security',
        duration: '3h',
        topics: ['History of Cybersecurity & Career Tracks', 'Virtual Lab Environment Setup', 'Basic Computer Architecture', 'Security Terminology & CIA Triad']
      },
      {
        module: 'Module 2: Network Protocols & Architecture',
        duration: '4h',
        topics: ['OSI 7-Layer & TCP/IP Stack', 'IP Addressing, Subnetting & Routing', 'DNS, DHCP, ARP Internals', 'Wireshark Packet Capture & Protocol Analysis']
      },
      {
        module: 'Module 3: Linux Command Line Mastery',
        duration: '4h',
        topics: ['File Hierarchy & Navigation', 'Permissions & User Management', 'Package Management & Services', 'Bash Scripting for Automation']
      },
      {
        module: 'Module 4: Windows Security Fundamentals',
        duration: '3.5h',
        topics: ['Windows Architecture & NTFS', 'Registry & User Account Control (UAC)', 'Event Viewer & Security Logs', 'Built-in Security Utilities']
      },
      {
        module: 'Module 5: Web & Cryptography Basics',
        duration: '3.5h',
        topics: ['HTTP vs HTTPS & SSL/TLS Handshake', 'Symmetric vs Asymmetric Encryption', 'Hashing & Digital Signatures', 'Basic Password Security & Salting']
      },
      {
        module: 'Module 6: Security Defense & Offensive Intro',
        duration: '4h',
        topics: ['Reconnaissance & Footprinting', 'Vulnerability Assessment with Nmap', 'Antivirus & Firewall Concepts', 'Writing Basic Security Reports']
      }
    ]
  },
  {
    id: 'red-team',
    title: 'Red Team Operator',
    level: 'Intermediate',
    duration: '45 Hours',
    modulesCount: 12,
    labsCount: 22,
    color: '#FF3333',
    icon: Target,
    shortDesc: 'Offensive cybersecurity path covering active reconnaissance, Active Directory compromise, lateral movement, and evasion.',
    fullDesc: 'Simulate sophisticated adversary operations against enterprise environments. Learn how red teamers plan engagements, achieve initial foothold through spear phishing or public application exploits, compromise Active Directory domains, pivot across internal subnets, and maintain persistent access while bypassing detection systems.',
    connectedCourse: 'dmccrt',
    curriculum: [
      {
        module: 'Module 1: Engagement Planning & Red Team Ops',
        duration: '4h',
        topics: ['Red Teaming vs Penetration Testing', 'MITRE ATT&CK Framework Mapping', 'C2 Infrastructure (Sliver/Havoc) Setup', 'Operational Security (OpSec) Discipline']
      },
      {
        module: 'Module 2: External Reconnaissance & Initial Access',
        duration: '5h',
        topics: ['OSINT & Asset Discovery', 'Phishing Infrastructure & Payloads', 'Exploiting Perimeter Services', 'Establishing Reverse C2 Beacons']
      },
      {
        module: 'Module 3: Active Directory Enumeration & Exploitation',
        duration: '8h',
        topics: ['AD Architecture & Domain Trusts', 'Kerberoasting & AS-REP Roasting', 'BloodHound Graph Analysis', 'Pass-the-Hash & Pass-the-Ticket Attacks']
      },
      {
        module: 'Module 4: Lateral Movement & Network Pivoting',
        duration: '6h',
        topics: ['WMI, WinRM & PSExec Lateral Moves', 'SSH Tunneling & Dynamic SOCKS Proxies', 'Pivoting Multi-Subnet Corporate Networks', 'Abusing MSSQL Linked Servers']
      },
      {
        module: 'Module 5: Defense Evasion & Persistence',
        duration: '6h',
        topics: ['AMSI & PowerShell Execution Policy Bypass', 'Process Injection & Hollowing Concepts', 'Scheduled Task & Service Persistence', 'Clearing Event Logs & Obfuscation']
      },
      {
        module: 'Module 6: Domain Dominance & Reporting',
        duration: '6h',
        topics: ['DCSync & Golden/Silver Ticket Creation', 'Enterprise Data Exfiltration Techniques', 'Executive Red Team Reporting', 'Remediation Debriefing with Blue Team']
      }
    ]
  },
  {
    id: 'blue-team',
    title: 'Blue Team Defender',
    level: 'Advanced',
    duration: '40 Hours',
    modulesCount: 10,
    labsCount: 18,
    color: '#00BFFF',
    icon: Lock,
    shortDesc: 'Proactive defense training focusing on threat hunting, incident response, digital forensics, and infrastructure hardening.',
    fullDesc: 'Become a formidable cyber defender. This path equips you to investigate active cyber breaches, hunt for advanced persistent threats (APTs) across endpoints and networks, analyze suspicious binaries, extract volatile memory artifacts, and engineer automated detection pipelines.',
    connectedCourse: 'dmccbt',
    curriculum: [
      {
        module: 'Module 1: Defensive Architecture & Threat Landscape',
        duration: '4h',
        topics: ['Zero Trust Architecture Principles', 'Threat Intelligence Integration', 'Cyber Kill Chain & Diamond Model', 'Enterprise Log Pipeline Architecture']
      },
      {
        module: 'Module 2: Threat Hunting Methodology',
        duration: '6h',
        topics: ['Hypothesis-Driven Threat Hunting', 'Sigma Rule Creation & Deployment', 'Windows Event Log Deep-Dive (Sysmon)', 'Hunting Living-off-the-Land Binaries (LOLBins)']
      },
      {
        module: 'Module 3: Digital Forensics & Incident Response (DFIR)',
        duration: '8h',
        topics: ['IR Lifecycle (NIST SP 800-61)', 'Evidence Preservation & Chain of Custody', 'Disk Forensics with Autopsy/FTK', 'Timeline Reconstruction of Breaches']
      },
      {
        module: 'Module 4: Memory Forensics with Volatility',
        duration: '6h',
        topics: ['Volatile RAM Acquisition', 'Volatility 3 Plugin Analysis', 'Identifying Injected Code & Hooked DLLs', 'Extracting In-Memory Malware Artifacts']
      },
      {
        module: 'Module 5: Malware Analysis Foundations',
        duration: '6h',
        topics: ['Static Analysis (PE Headers, Strings, Hashes)', 'Dynamic Sandbox Behavioral Profiling', 'YARA Rule Authoring for Detection', 'Deobfuscating Malicious Scripts']
      }
    ]
  },
  {
    id: 'soc-analyst',
    title: 'SOC Analyst',
    level: 'Intermediate',
    duration: '35 Hours',
    modulesCount: 9,
    labsCount: 16,
    color: '#3498DB',
    icon: Eye,
    shortDesc: 'Master security operations center workflows: SIEM rule tuning, real-time alert triage, and log correlation.',
    fullDesc: 'Prepare for frontline security operations. You will learn to monitor real-time security alerts, correlate telemetry across firewalls, endpoints, and identity providers, prioritize incident tickets, and execute standard operating triage playbooks.',
    connectedCourse: 'dmccbt',
    curriculum: [
      {
        module: 'Module 1: SOC Fundamentals & Alert Lifecycle',
        duration: '3.5h',
        topics: ['SOC Roles: Tier 1, 2, 3 & Incident Commanders', 'Ticket Management & Triage SLA Protocols', 'False Positive vs True Positive Discrimination', 'Escalation Playbooks']
      },
      {
        module: 'Module 2: SIEM Engineering & Querying',
        duration: '8h',
        topics: ['Splunk Search Processing Language (SPL)', 'ELK Stack / Elastic Security Querying', 'Correlation Rule Tuning & Thresholds', 'Creating Tactical SOC Dashboards']
      },
      {
        module: 'Module 3: Endpoint Detection and Response (EDR)',
        duration: '6h',
        topics: ['EDR Telemetry & Process Tree Tracing', 'Isolating Compromised Hosts', 'Remote Live Response & Containment', 'Mitigating Active Lateral Movement']
      },
      {
        module: 'Module 4: Network Intrusion Detection (NIDS)',
        duration: '5h',
        topics: ['Snort & Suricata Rule Syntax', 'Zeek Network Security Monitor Logs', 'Analyzing C2 Beaconing Patterns', 'DNS Tunneling & Data Exfiltration Detection']
      }
    ]
  },
  {
    id: 'web-security',
    title: 'Web Security Specialist',
    level: 'Intermediate',
    duration: '30 Hours',
    modulesCount: 8,
    labsCount: 20,
    color: '#FFA500',
    icon: Zap,
    shortDesc: 'Deep dive into web application vulnerabilities, OWASP Top 10 exploitation, API security auditing, and WAF bypass.',
    fullDesc: 'Master modern application security. From SQL injection and stored XSS to SSRF, IDOR, and GraphQL flaws, this pathway teaches developers and penetration testers how to find, exploit, and remediate critical web vulnerabilities.',
    connectedCourse: 'dmcwss',
    curriculum: [
      {
        module: 'Module 1: Web Application Internals & Burp Suite',
        duration: '4h',
        topics: ['HTTP/2 Protocol & Request Headers', 'Session Management & JWT Architecture', 'Burp Suite Pro Features & Match/Replace', 'Automating Scans & Custom Extensions']
      },
      {
        module: 'Module 2: Server-Side Vulnerabilities',
        duration: '7h',
        topics: ['SQL Injection (Union, Blind, Time-based)', 'Server-Side Request Forgery (SSRF)', 'XML External Entity (XXE) Injection', 'Command Injection & Insecure Deserialization']
      },
      {
        module: 'Module 3: Client-Side Exploitation',
        duration: '5h',
        topics: ['Cross-Site Scripting (Stored, Reflected, DOM)', 'Cross-Site Request Forgery (CSRF)', 'Cross-Origin Resource Sharing (CORS) Misconfigurations', 'Clickjacking & UI Redressing']
      },
      {
        module: 'Module 4: API & Modern Framework Security',
        duration: '5h',
        topics: ['REST API Authentication Flaws', 'GraphQL Introspection & Batching Attacks', 'Mass Assignment & Broken Object Level Auth (BOLA)', 'WAF Fingerprinting & Filter Evasion']
      }
    ]
  }
];

export default function LearningPaths() {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const navigate = useNavigate();

  const filteredPaths = LEARNING_PATHS_DATA.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || p.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 bg-cyber-dark text-white selection:bg-cyber-neon selection:text-black">
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] pointer-events-none" style={{ backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Layers className="w-4 h-4" />
            <span>STRUCTURED CAREER PATHWAYS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-wide font-sans">
            CYBERSECURITY <span className="text-purple-400 drop-shadow-[0_0_20px_rgba(155,89,182,0.6)]">LEARNING PATHS</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Follow comprehensive, guided roadmaps designed to take you from core fundamentals to specialized professional roles.
          </p>
        </motion.div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 bg-[#090d14] p-4 rounded-2xl border border-white/10">
          <div className="w-full sm:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search learning paths..."
              className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 font-mono"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedLevel === lvl
                    ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(155,89,182,0.4)]'
                    : 'bg-black/40 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Learning Paths List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPaths.map((path, idx) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-[#090d13] border border-white/10 hover:border-purple-500/50 rounded-2xl p-7 flex flex-col justify-between transition-all group hover:-translate-y-1.5 shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div
                      className="w-13 h-13 rounded-xl flex items-center justify-center p-3"
                      style={{ backgroundColor: `${path.color}15`, border: `1px solid ${path.color}40` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: path.color }} />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-md border border-white/10 text-gray-300 bg-white/5 uppercase">
                      {path.level}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyber-neon transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                    {path.shortDesc}
                  </p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    <p className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">Included Modules ({path.modulesCount}):</p>
                    <div className="space-y-1.5">
                      {path.curriculum.slice(0, 3).map((mod, i) => (
                        <div key={i} className="flex items-center text-xs text-gray-300 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-2 shrink-0" style={{ color: path.color }} />
                          <span className="truncate">{mod.module}</span>
                        </div>
                      ))}
                      {path.curriculum.length > 3 && (
                        <p className="text-xs text-gray-500 font-mono pl-5.5">+ {path.curriculum.length - 3} more modules</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-400 font-mono">
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {path.duration}</span>
                    <span>•</span>
                    <span>{path.labsCount} Labs</span>
                  </div>
                  <Link
                    to={`/learning-paths/${path.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md"
                    style={{ backgroundColor: `${path.color}20`, color: path.color, border: `1px solid ${path.color}40` }}
                  >
                    <span>Explore Path</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
