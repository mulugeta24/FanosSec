import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  'All',
  'Web Security',
  'Network Security',
  'Linux Security',
  'Penetration Testing',
  'SOC & Detection',
  'Digital Forensics'
];

const labsData = [
  {
    id: 'lab-1',
    title: 'SQL Injection Authentication Bypass',
    category: 'Web Security',
    difficulty: 'Beginner',
    time: '30 mins',
    desc: 'Bypass modern form validation by exploiting classic and blind SQL injection vulnerabilities in a mock enterprise database.',
    skills: ['SQL Injection', 'Burp Suite', 'Payload Crafting']
  },
  {
    id: 'lab-2',
    title: 'Wireshark Packet Analysis & Credential Sniffing',
    category: 'Network Security',
    difficulty: 'Beginner',
    time: '45 mins',
    desc: 'Capture, filter, and reconstruct plaintext authentication protocols (HTTP, Telnet, FTP) from network packet captures.',
    skills: ['Wireshark', 'PCAP Analysis', 'Protocol Decoding']
  },
  {
    id: 'lab-3',
    title: 'Linux Privilege Escalation via SUID Binaries',
    category: 'Linux Security',
    difficulty: 'Intermediate',
    time: '60 mins',
    desc: 'Enumerate misconfigured SUID binaries, hijack execution paths, and escalate standard user privileges to root.',
    skills: ['Linux Enumeration', 'SUID Abuse', 'PATH Hijacking']
  },
  {
    id: 'lab-4',
    title: 'Metasploit Multi-Handler & DMZ Breach',
    category: 'Penetration Testing',
    difficulty: 'Intermediate',
    time: '60 mins',
    desc: 'Configure listener payloads, generate encoded stagers, and simulate an enterprise DMZ server compromise.',
    skills: ['Metasploit', 'Payload Generation', 'Shell Pivoting']
  },
  {
    id: 'lab-5',
    title: 'Splunk SIEM Alert Investigation & Triage',
    category: 'SOC & Detection',
    difficulty: 'Intermediate',
    time: '50 mins',
    desc: 'Investigate realistic brute-force authentication alerts, write Splunk search processing queries, and document findings.',
    skills: ['SIEM', 'Splunk SPL', 'Alert Triage']
  },
  {
    id: 'lab-6',
    title: 'Volatility Memory Forensics: Ransomware Hunt',
    category: 'Digital Forensics',
    difficulty: 'Advanced',
    time: '90 mins',
    desc: 'Analyze a memory dump from an infected workstation to isolate the ransomware injection process and recover encryption keys.',
    skills: ['Memory Forensics', 'Volatility 3', 'Malware Triage']
  }
];

export default function HandsOnLabsSection() {
  const [selectedCat, setSelectedCat] = useState('All');

  const filteredLabs = selectedCat === 'All'
    ? labsData
    : labsData.filter(l => l.category === selectedCat);

  return (
    <section className="w-full py-24 bg-[#05070a] relative z-20 border-t border-b border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono tracking-widest uppercase mb-4">
            <Terminal className="w-4 h-4" />
            <span>VIRTUAL PRACTICE ENVIRONMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-wide uppercase">
            LEARN BY <span className="text-cyber-cyan drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]">DOING</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed mt-3">
            Put cybersecurity knowledge into practice through controlled environments and practical security exercises.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                selectedCat === cat
                  ? 'bg-cyber-cyan text-black shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                  : 'bg-black/60 border border-white/10 text-gray-400 hover:text-white hover:border-cyber-cyan/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredLabs.map((lab, index) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-[#090d14] rounded-2xl p-7 border border-white/10 hover:border-cyber-cyan/60 transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 rounded-xl bg-cyber-darkest border border-cyber-cyan/40 text-cyber-cyan">
                    <Terminal size={20} />
                  </div>
                  <span className="text-xs font-mono font-bold text-cyber-cyan bg-cyber-cyan/10 py-1 px-2.5 rounded-md border border-cyber-cyan/30 uppercase tracking-wider">
                    {lab.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-cyber-cyan transition-colors">
                  {lab.title}
                </h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
                  {lab.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {lab.skills.map((s, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">⏱ {lab.time}</span>
                <Link
                  to="/labs"
                  className="px-4 py-2 rounded-lg bg-cyber-cyan/15 hover:bg-cyber-cyan text-cyber-cyan hover:text-black font-bold text-xs font-mono tracking-wider uppercase transition-all flex items-center space-x-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Launch Sandbox</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Labs CTA */}
        <div className="text-center">
          <Link
            to="/labs"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black font-bold uppercase tracking-wider text-sm transition-all shadow-[0_0_20px_rgba(0,255,255,0.2)]"
          >
            <span>Explore All Virtual Labs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
