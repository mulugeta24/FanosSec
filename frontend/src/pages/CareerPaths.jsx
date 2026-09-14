import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Map, GitBranch, Layers, BookOpen, Network, ChevronRight, Award, BarChart2 } from 'lucide-react';

// ── Tab nav data ──────────────────────────────────────────
const TABS = [
  { id: 'roadmap',       label: 'Roadmap',       icon: <Map className="w-4 h-4" /> },
  { id: 'paths',         label: 'Paths',          icon: <GitBranch className="w-4 h-4" /> },
  { id: 'modules',       label: 'Modules',        icon: <Layers className="w-4 h-4" /> },
  { id: 'walkthroughs',  label: 'Walkthroughs',   icon: <BookOpen className="w-4 h-4" /> },
  { id: 'networks',      label: 'Networks',       icon: <Network className="w-4 h-4" /> },
];

// ── Roadmap stages ────────────────────────────────────────
const ROADMAP = [
  {
    type: 'stage',
    title: 'Computer Science Basics',
    desc: 'Acquire the basic computer science skills required to get started in cyber security.',
    paths: [],
  },
  {
    type: 'path',
    title: 'Pre Security',
    tag: 'Path',
    icon: '🛡️',
    color: '#00FF41',
    progress: 10,
  },
  {
    type: 'path',
    title: 'Pre Security (SEC0)',
    tag: 'Professional Certification',
    icon: '🏅',
    color: '#3498DB',
    progress: 0,
  },
  {
    type: 'stage',
    title: 'Cyber Security Foundations',
    desc: 'Develop cyber security skills needed to enter any career in the industry.',
    paths: [],
    highlight: true,
  },
  {
    type: 'path',
    title: 'Cyber Security 101',
    tag: 'Path',
    icon: '💻',
    color: '#00FF41',
    progress: 11,
    latest: true,
  },
  {
    type: 'path',
    title: 'Cyber Security 101 (SEC1)',
    tag: 'Professional Certification',
    icon: '🏆',
    color: '#3498DB',
    progress: 0,
  },
  {
    type: 'stage',
    title: 'Cyber Security Career Skills',
    desc: 'Master the specific skills necessary for your career of interest.',
    paths: [],
  },
  {
    type: 'branches',
    branches: [
      {
        title: 'Security Analyst',
        desc: 'Get on the fast track to becoming a successful Security Analyst.',
        color: '#3498DB',
        items: [
          { title: 'SOC Level 1', tag: 'Path', icon: '🔵', progress: 0 },
          { title: 'Security Analyst Level 1 (SAL1)', tag: 'Professional Certification', icon: '🏅', progress: 0 },
          { title: 'SOC Level 2', tag: 'Path', icon: '🔵', progress: 0 },
        ],
      },
      {
        title: 'Penetration Tester',
        desc: 'Level up and forge your path to victory as a Penetration Tester.',
        color: '#FF003C',
        items: [
          { title: 'Jr Penetration Tester', tag: 'Path', icon: '🎯', progress: 12 },
          { title: 'Jr. Penetration Tester (PT1)', tag: 'Professional Certification', icon: '🏅', progress: 0 },
          { title: 'Web Fundamentals', tag: 'Path', icon: '🌐', progress: 0 },
        ],
      },
      {
        title: 'Security Engineer',
        desc: 'Navigate your journey to becoming a world-class Security Engineer.',
        color: '#FF6B00',
        items: [
          { title: 'Security Engineer', tag: 'Path', icon: '⚙️', progress: 0 },
          { title: 'DevSecOps', tag: 'Path', icon: '🔧', progress: 0 },
          { title: 'Attacking and Defending AWS', tag: 'Path', icon: '☁️', progress: 0, addon: true },
        ],
      },
      {
        title: 'AI Security',
        desc: 'Evolve your skillset and explore the world of AI Security.',
        color: '#9B59B6',
        items: [
          { title: 'AI Security', tag: 'Path', icon: '🤖', progress: 0 },
        ],
      },
    ],
  },
];

// ── Modules data ─────────────────────────────────────────
const MODULES = [
  { title: 'Attacking and Defending Serverless', desc: 'Serverless functions heavily utilise event-driven architecture for various use cases, including data processing, automation, and more.', bg: '#E67E22', icon: '💀', difficulty: 'Hard', labs: 8 },
  { title: 'IAM Privilege Escalation', desc: 'IAM underpins the entire permission and access model across various AWS services and identities. Attackers heavily target IAM-based components.', bg: '#8E44AD', icon: '🔐', difficulty: 'Intermediate', labs: 6 },
  { title: 'Attacking and Defending Core Services', desc: 'The most common use cases for AWS revolve around using compute capacity, storage and virtual networking infrastructure.', bg: '#8E44AD', icon: '☁️', difficulty: 'Intermediate', labs: 7 },
  { title: 'Introduction to IAM', desc: 'AWS Identity and Access Management is a critical part of AWS that allows users to manage how services, resources and other users are accessed.', bg: '#E74C3C', icon: '🔑', difficulty: 'Easy', labs: 5 },
  { title: 'Introduction to Defensive Security', desc: 'This module will introduce you to defensive security topics. Get started with digital forensics to solve a case by analyzing digital evidence.', bg: '#2C3E50', icon: '🛡️', difficulty: 'Easy', labs: 6 },
  { title: 'Microsoft 365 for SOC', desc: 'This module covers the core concepts and security relevance of Microsoft Entra ID and Microsoft 365 in enterprise environments.', bg: '#2980B9', icon: '📋', difficulty: 'Intermediate', labs: 7 },
  { title: 'Introduction to AWS', desc: 'AWS provides businesses with an on-demand, scalable, and cost-effective infrastructure to easily access the computing resources they need.', bg: '#3498DB', icon: '☁️', difficulty: 'Easy', labs: 5 },
  { title: 'Wonderland', desc: 'This module is designed to test your CTF problem-solving skills. It presents fictional, themed challenges inspired by Alice in Wonderland.', bg: '#1ABC9C', icon: '🐇', difficulty: 'Intermediate', labs: 4 },
  { title: 'Network Security Evasion', desc: 'Learn how different security solutions work and get hands-on experience bypassing intrusion detection systems (IDS), intrusion prevention systems.', bg: '#E74C3C', icon: '🌐', difficulty: 'Hard', labs: 9 },
  { title: 'New Year', desc: 'The New Year module is a set of standalone challenges that don\'t follow a common theme. Each room varies in difficulty and style.', bg: '#27AE60', icon: '🎆', difficulty: 'Easy', labs: 5 },
  { title: 'Microsoft Defender XDR', desc: 'Microsoft Defender XDR is built to correlate threat signals across endpoints, identities, email, and cloud apps. This module walks you through.', bg: '#2980B9', icon: '🔵', difficulty: 'Intermediate', labs: 6 },
  { title: 'Threat and Vulnerability Management', desc: 'As defenders, the objective is to stop an adversary from achieving their goal. These adversaries are using both the latest and well-known techniques.', bg: '#2C3E50', icon: '📡', difficulty: 'Intermediate', labs: 8 },
  { title: 'Linux Privilege Escalation', desc: 'Learn the fundamentals of Linux privilege escalation. Explore common techniques and tools used to escalate privileges on Linux systems.', bg: '#E67E22', icon: '🐧', difficulty: 'Intermediate', labs: 7 },
  { title: 'Windows Privilege Escalation', desc: 'Learn the fundamentals of Windows privilege escalation techniques. Explore common misconfigurations and vulnerabilities.', bg: '#3498DB', icon: '🪟', difficulty: 'Intermediate', labs: 7 },
  { title: 'Active Directory Basics', desc: 'Learn the basics of Active Directory and how it is used in enterprise environments. Understand how attackers target AD.', bg: '#8E44AD', icon: '🏢', difficulty: 'Easy', labs: 6 },
  { title: 'Metasploit', desc: 'A detailed look at the Metasploit Framework, the world\'s most used penetration testing tool. Learn to use it effectively.', bg: '#E74C3C', icon: '💻', difficulty: 'Intermediate', labs: 8 },
  { title: 'Burp Suite', desc: 'Burp Suite is the industry standard tool for web application hacking. Learn to use it for intercepting, scanning and exploiting web apps.', bg: '#E67E22', icon: '🕷️', difficulty: 'Intermediate', labs: 9 },
  { title: 'OWASP Top 10 - 2021', desc: 'Learn about and exploit each of the OWASP Top 10 vulnerabilities; the 10 most critical web security risks.', bg: '#27AE60', icon: '🌐', difficulty: 'Easy', labs: 10 },
  { title: 'Phishing', desc: 'Learn how to analyze and defend against phishing emails. Understand the techniques used by attackers to craft convincing phishing campaigns.', bg: '#E74C3C', icon: '🎣', difficulty: 'Easy', labs: 5 },
  { title: 'Malware Analysis', desc: 'Analyze malware samples using static and dynamic analysis techniques. Understand how malware works and how to detect it.', bg: '#2C3E50', icon: '🦠', difficulty: 'Hard', labs: 8 },
];

// ── Walkthroughs data ─────────────────────────────────────
const WALKTHROUGHS = [
  { title: 'Lambda - Data Exfiltration', desc: 'Try your hand at compromising Lambda functions to access secret AWS data.', bg: 'linear-gradient(135deg,#E67E22,#D35400)', icon: '💀', difficulty: 'Medium', mins: 60, tag: 'Walkthrough' },
  { title: 'Registry Persistence Detection', desc: 'Learn to detect and analyze registry-based persistence mechanisms used by attackers.', bg: 'linear-gradient(135deg,#2980B9,#1A5276)', icon: '🔍', difficulty: 'Easy', mins: 60, tag: 'Walkthrough' },
  { title: 'HTTP Request Smuggling', desc: 'Understand and exploit HTTP request smuggling vulnerabilities in web servers.', bg: 'linear-gradient(135deg,#1A1A2E,#16213E)', icon: '🌐', difficulty: 'Easy', mins: 60, tag: 'Walkthrough' },
  { title: 'Burp Suite: Extensions', desc: 'Learn how to extend Burp Suite functionality using extensions and the BApp Store.', bg: 'linear-gradient(135deg,#E67E22,#CA6F1E)', icon: '🕷️', difficulty: 'Easy', mins: 30, tag: 'Walkthrough' },
  { title: 'Threat Hunting: Pivoting', desc: 'Learn advanced threat hunting techniques focusing on lateral movement and pivoting.', bg: 'linear-gradient(135deg,#922B21,#641E16)', icon: '🎯', difficulty: 'Medium', mins: 120, tag: 'Walkthrough' },
  { title: 'Anti-Reverse Engineering', desc: 'Explore techniques used by malware authors to hinder reverse engineering efforts.', bg: 'linear-gradient(135deg,#1E8449,#145A32)', icon: '🔒', difficulty: 'Medium', mins: 60, tag: 'Walkthrough' },
  { title: 'CORS & SOP', desc: 'Understand Cross-Origin Resource Sharing and Same-Origin Policy security mechanisms.', bg: 'linear-gradient(135deg,#1A5276,#154360)', icon: '🛡️', difficulty: 'Easy', mins: 60, tag: 'Walkthrough' },
  { title: 'Moniker Link (CVE-2024-21413)', desc: 'Explore the Moniker Link vulnerability and how it can be exploited in Microsoft Outlook.', bg: 'linear-gradient(135deg,#1A1A2E,#0D0D1A)', icon: '🔐', difficulty: 'Easy', mins: 30, tag: 'Walkthrough' },
  { title: 'SQL Injection Fundamentals', desc: 'Master SQL injection from basic to advanced techniques including blind and time-based attacks.', bg: 'linear-gradient(135deg,#922B21,#7B241C)', icon: '💉', difficulty: 'Easy', mins: 60, tag: 'Walkthrough' },
  { title: 'XSS Attacks', desc: 'Learn about Cross-Site Scripting vulnerabilities and how to exploit and prevent them.', bg: 'linear-gradient(135deg,#E67E22,#D35400)', icon: '⚡', difficulty: 'Easy', mins: 45, tag: 'Walkthrough' },
  { title: 'Buffer Overflow Prep', desc: 'Practice stack-based buffer overflows to prepare for OSCP and other certifications.', bg: 'linear-gradient(135deg,#1E8449,#196F3D)', icon: '💻', difficulty: 'Medium', mins: 90, tag: 'Walkthrough' },
  { title: 'Wireshark: The Basics', desc: 'Learn the basics of Wireshark and how to analyze network traffic captures.', bg: 'linear-gradient(135deg,#2980B9,#2471A3)', icon: '📡', difficulty: 'Easy', mins: 60, tag: 'Walkthrough' },
];

// ── Networks data ─────────────────────────────────────────
const NETWORKS = [
  { title: 'Lateral Movement and Pivoting', desc: 'Learn about common techniques used to move laterally across a Windows network.', bg: 'linear-gradient(135deg,#1A3A1A,#0D1F0D)', icon: '🗺️', difficulty: 'Easy', premium: true, rooms: 8 },
  { title: 'Breaching Active Directory', desc: 'This network covers techniques and tools that can be used to acquire that first set of AD credentials that can then be used to enumerate AD.', bg: 'linear-gradient(135deg,#1A1A3A,#0D0D1F)', icon: '🏢', difficulty: 'Medium', premium: true, rooms: 6 },
  { title: 'Red Team Capstone Challenge', desc: 'This room is the capstone challenge for the red team learning pathway.', bg: 'linear-gradient(135deg,#3A1A1A,#1F0D0D)', icon: '🎯', difficulty: 'Hard', premium: true, rooms: 5 },
  { title: 'Bandit', desc: "You've been asked to exploit all the vulnerabilities on multiple systems.", bg: 'linear-gradient(135deg,#2A1A3A,#150D1F)', icon: '🏴‍☠️', difficulty: 'Hard', premium: true, rooms: 7 },
  { title: 'CI/CD and Build Security', desc: 'Learn about CI/CD and build principles to safeguard your pipelines.', bg: 'linear-gradient(135deg,#1A2A3A,#0D151F)', icon: '⚙️', difficulty: 'Medium', premium: false, rooms: 5 },
  { title: 'Wreath', desc: "Learn how to pivot through a network by compromising a public facing web machine and tunnelling your traffic to access other machines in Wreath's network.", bg: 'linear-gradient(135deg,#1A3A2A,#0D1F15)', icon: '🌿', difficulty: 'Medium', premium: false, rooms: 9 },
  { title: 'Persisting Active Directory', desc: 'Learn about common Active Directory persistence techniques that can be used post-compromise to ensure the blue team will not be able to kick you out during a red team exercise.', bg: 'linear-gradient(135deg,#3A2A1A,#1F150D)', icon: '🔗', difficulty: 'Medium', premium: false, rooms: 6 },
  { title: 'Attacking Active Directory', desc: 'Learn the most common Active Directory attack techniques used by red teamers and penetration testers.', bg: 'linear-gradient(135deg,#3A1A1A,#1F0D0D)', icon: '⚔️', difficulty: 'Hard', premium: true, rooms: 8 },
  { title: 'Post-Exploitation Basics', desc: 'Learn the basics of post-exploitation and maintaining access to compromised systems.', bg: 'linear-gradient(135deg,#1A1A3A,#0D0D1F)', icon: '🕵️', difficulty: 'Easy', premium: false, rooms: 5 },
  { title: 'Network Services', desc: 'Learn about and exploit a variety of network services and protocols including SMB, Telnet, FTP, and NFS.', bg: 'linear-gradient(135deg,#1A3A3A,#0D1F1F)', icon: '🌐', difficulty: 'Easy', premium: false, rooms: 7 },
  { title: 'Holo Network', desc: 'A red team-focused network that simulates a real-world corporate environment for advanced attack practice.', bg: 'linear-gradient(135deg,#2A1A3A,#150D1F)', icon: '🔮', difficulty: 'Hard', premium: true, rooms: 12 },
  { title: 'Throwback', desc: 'A network simulating a corporate Active Directory environment for practicing red team operations.', bg: 'linear-gradient(135deg,#3A3A1A,#1F1F0D)', icon: '🏗️', difficulty: 'Hard', premium: true, rooms: 10 },
];

// ── Paths tab data ────────────────────────────────────────
const PATHS = [
  { title: 'Penetration Tester', desc: 'Find and exploit vulnerabilities before attackers do.', icon: '🎯', color: '#FF003C', difficulty: 'Intermediate', hours: 40 },
  { title: 'Web Security Specialist', desc: 'Master OWASP Top 10 and modern web defense.', icon: '🌐', color: '#00FFFF', difficulty: 'Beginner', hours: 25 },
  { title: 'Malware Analyst', desc: 'Dissect and reverse engineer malicious software.', icon: '🦠', color: '#FF6B00', difficulty: 'Advanced', hours: 50 },
  { title: 'Digital Forensics Investigator', desc: 'Investigate incidents and collect digital evidence.', icon: '🔍', color: '#9B59B6', difficulty: 'Intermediate', hours: 35 },
  { title: 'SOC Analyst', desc: 'Monitor, detect and respond to security threats.', icon: '🔵', color: '#3498DB', difficulty: 'Beginner', hours: 30 },
  { title: 'Cloud Security Engineer', desc: 'Secure cloud infrastructure on AWS, Azure and GCP.', icon: '☁️', color: '#00FF41', difficulty: 'Advanced', hours: 45 },
];

// ── Helper: circular progress ─────────────────────────────
const CircleProgress = ({ pct, color }) => {
  const r = 16, c = 2 * Math.PI * r;
  return (
    <svg width="40" height="40" className="rotate-[-90deg]">
      <circle cx="20" cy="20" r={r} fill="none" stroke="#1a1a2e" strokeWidth="3" />
      <circle cx="20" cy="20" r={r} fill="none" stroke={color || '#00FF41'} strokeWidth="3"
        strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} strokeLinecap="round" />
      <text x="20" y="20" textAnchor="middle" dominantBaseline="central"
        className="rotate-90" style={{ fontSize: 9, fill: '#fff', transform: 'rotate(90deg)', transformOrigin: '20px 20px' }}>
        {pct}%
      </text>
    </svg>
  );
};

// ── Path card (roadmap) ───────────────────────────────────
const PathCard = ({ item, highlight }) => (
  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
    className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:-translate-y-0.5 ${
      highlight ? 'border-cyber-neon bg-cyber-neon/5 shadow-[0_0_15px_rgba(0,255,65,0.2)]' : 'border-gray-700 bg-black/40 hover:border-gray-500'
    }`}>
    <div className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl bg-black/60 border border-gray-700 flex-shrink-0">
      {item.icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-white font-semibold text-sm">{item.title}</p>
      <div className="flex items-center gap-2 mt-1">
        <BarChart2 className="w-3 h-3 text-gray-400" />
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          item.tag === 'Path' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
          item.tag === 'Professional Certification' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
          'bg-green-500/20 text-green-300 border border-green-500/30'
        }`}>{item.tag}</span>
        {item.addon && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">Add-on</span>}
      </div>
    </div>
    {item.progress > 0 && <CircleProgress pct={item.progress} color={item.color || '#00FF41'} />}
  </motion.div>
);

// ── Stage box ─────────────────────────────────────────────
const StageBox = ({ title, desc }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className="bg-gray-800/60 border border-gray-600 rounded-xl p-6 text-center max-w-md mx-auto w-full">
    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

// ── Connector arrow ───────────────────────────────────────
const Connector = () => (
  <div className="flex justify-center my-1">
    <div className="w-0.5 h-8 bg-gray-600"></div>
  </div>
);

const Arrow = () => (
  <div className="flex justify-center my-1">
    <div className="flex flex-col items-center">
      <div className="w-0.5 h-6 bg-gray-500"></div>
      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-gray-500"></div>
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────
export default function CareerPaths() {
  const [tab, setTab] = useState('roadmap');
  const navigate = useNavigate();
  const [moduleSearch, setModuleSearch] = useState('');
  const [moduleDifficulty, setModuleDifficulty] = useState('All');
  const [pathSearch, setPathSearch] = useState('');
  const [pathDifficulty, setPathDifficulty] = useState('All');
  const [wtSearch, setWtSearch] = useState('');
  const [wtDifficulty, setWtDifficulty] = useState('All');
  const [netSearch, setNetSearch] = useState('');
  const [netDifficulty, setNetDifficulty] = useState('All');

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0d1117]">

      {/* Tab Nav */}
      <div className="border-b border-gray-800 sticky top-16 z-40 bg-[#0d1117]">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                tab === t.id ? 'border-cyber-neon text-cyber-neon' : 'border-transparent text-gray-400 hover:text-white'
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12">

        {/* ── ROADMAP TAB ── */}
        {tab === 'roadmap' && (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Cyber Security Learning Roadmap</h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
                From fundamental principles to advanced techniques, this roadmap provides clear steps and essential resources to help you build a robust skill set.
              </p>
            </div>

            <div className="flex flex-col items-center">
              {ROADMAP.map((item, i) => {
                if (item.type === 'stage') return (
                  <div key={i} className="w-full flex flex-col items-center">
                    {i > 0 && <Arrow />}
                    <StageBox title={item.title} desc={item.desc} />
                  </div>
                );

                if (item.type === 'path') return (
                  <div key={i} className="w-full max-w-md flex flex-col items-center">
                    <Connector />
                    {item.latest && (
                      <div className="mb-2 px-3 py-1 bg-cyber-neon text-black text-xs font-bold rounded-full">
                        Latest enrolled path
                      </div>
                    )}
                    <div onClick={() => item.title === 'Pre Security' && navigate('/path/pre-security')}
                      className={item.title === 'Pre Security' ? 'w-full cursor-pointer' : 'w-full'}>
                      <PathCard item={item} highlight={item.latest} />
                    </div>
                  </div>
                );

                if (item.type === 'branches') return (
                  <div key={i} className="w-full mt-4">
                    <Arrow />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      {item.branches.map((branch, bi) => (
                        <div key={bi} className="flex flex-col">
                          <div className="text-center mb-4 p-4 bg-gray-800/40 border border-gray-700 rounded-xl">
                            <h3 className="text-white font-bold text-sm mb-1" style={{ color: branch.color }}>{branch.title}</h3>
                            <p className="text-gray-400 text-xs leading-relaxed">{branch.desc}</p>
                          </div>
                          <div className="space-y-3">
                            {branch.items.map((bitem, bii) => (
                              <div key={bii}>
                                {bii > 0 && <div className="flex justify-center my-1"><div className="w-0.5 h-4 bg-gray-700"></div></div>}
                                <PathCard item={{ ...bitem, color: branch.color }} />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );

                return null;
              })}
            </div>
          </div>
        )}

        {/* ── PATHS TAB ── */}
        {tab === 'paths' && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-white mb-3">Learning Paths</h1>
              <p className="text-gray-400 text-sm">Structured journeys to master specific cybersecurity domains.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PATHS.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-black/40 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{p.icon}</span>
                    <div>
                      <h3 className="text-white font-bold text-sm">{p.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${
                        p.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                        p.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                        'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}>{p.difficulty}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mb-4 leading-relaxed">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">~{p.hours}h</span>
                    <button className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                      style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}40` }}>
                      Start Path <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── MODULES TAB ── */}
        {tab === 'modules' && (
          <div className="text-center py-20">
            <Layers className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Modules</h2>
            <p className="text-gray-400">Individual skill modules coming soon. Check back later.</p>
          </div>
        )}

        {/* ── WALKTHROUGHS TAB ── */}
        {tab === 'walkthroughs' && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-1">Walkthroughs</h1>
              <p className="text-gray-400 text-sm">Step-by-step guided rooms to sharpen your skills.</p>
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 flex items-center gap-2 bg-[#161b22] border border-gray-700 rounded-lg px-4 py-2.5">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <input value={wtSearch} onChange={e => setWtSearch(e.target.value)}
                  placeholder="Search walkthroughs..."
                  className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-500" />
              </div>
              <select value={wtDifficulty} onChange={e => setWtDifficulty(e.target.value)}
                className="bg-[#161b22] border border-gray-700 text-gray-300 text-sm rounded-lg px-4 py-2.5 outline-none">
                <option value="All">Difficulty</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WALKTHROUGHS
                .filter(w => w.title.toLowerCase().includes(wtSearch.toLowerCase()))
                .filter(w => wtDifficulty === 'All' || w.difficulty === wtDifficulty)
                .map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-all cursor-pointer group">
                  {/* Card image area */}
                  <div className="relative h-28 flex items-center justify-center overflow-hidden"
                    style={{ background: w.bg }}>
                    <span className="text-5xl">{w.icon}</span>
                    {w.tag && (
                      <span className="absolute top-2 left-2 text-xs px-2 py-0.5 bg-black/60 text-gray-300 rounded font-mono">
                        {w.tag}
                      </span>
                    )}
                  </div>
                  {/* Card body */}
                  <div className="p-4">
                    <h3 className="text-white font-bold text-sm mb-1 group-hover:text-cyber-neon transition-colors">{w.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <BarChart2 className="w-3 h-3" />
                        <span className={
                          w.difficulty === 'Easy' ? 'text-green-400' :
                          w.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                        }>{w.difficulty}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span>⏱</span> {w.mins} mins
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── NETWORKS TAB ── */}
        {tab === 'networks' && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-1">Networks</h1>
              <p className="text-gray-400 text-sm">Multi-machine networks simulating real-world environments for advanced practice.</p>
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1 flex items-center gap-2 bg-[#161b22] border border-gray-700 rounded-lg px-4 py-2.5">
                <Network className="w-4 h-4 text-gray-500" />
                <input value={netSearch} onChange={e => setNetSearch(e.target.value)}
                  placeholder="Search networks..."
                  className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-500" />
              </div>
              <select value={netDifficulty} onChange={e => setNetDifficulty(e.target.value)}
                className="bg-[#161b22] border border-gray-700 text-gray-300 text-sm rounded-lg px-4 py-2.5 outline-none">
                <option value="All">Difficulty</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {NETWORKS
                .filter(n => n.title.toLowerCase().includes(netSearch.toLowerCase()))
                .filter(n => netDifficulty === 'All' || n.difficulty === netDifficulty)
                .map((n, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-all cursor-pointer group">
                  {/* Card image area */}
                  <div className="relative h-28 flex items-center justify-center overflow-hidden"
                    style={{ background: n.bg }}>
                    <span className="text-5xl">{n.icon}</span>
                    {n.premium && (
                      <span className="absolute bottom-2 left-2 text-xs px-2 py-0.5 bg-black/70 text-yellow-400 border border-yellow-500/40 rounded font-mono">
                        Premium
                      </span>
                    )}
                  </div>
                  {/* Card body */}
                  <div className="p-4">
                    <h3 className="text-white font-bold text-sm mb-2 group-hover:text-cyber-neon transition-colors">{n.title}</h3>
                    <div className="flex items-center gap-3 text-xs mb-3">
                      <span className="flex items-center gap-1">
                        <BarChart2 className="w-3 h-3 text-gray-500" />
                        <span className={
                          n.difficulty === 'Easy' ? 'text-green-400' :
                          n.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                        }>{n.difficulty}</span>
                      </span>
                      <span className="text-gray-500">{n.rooms} rooms</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{n.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
