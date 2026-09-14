import { motion } from 'framer-motion';
import { Target, Flag, Award, ArrowRight, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const sampleChallenges = [
  {
    id: 'sqli-vault-infiltration',
    title: 'SQLi Vault Infiltration',
    category: 'Web Security',
    difficulty: 'Easy',
    points: 50,
    solved: '142 Solves',
    badgeColor: 'text-green-400 border-green-500/30 bg-green-500/10'
  },
  {
    id: 'xss-cookie-heist',
    title: 'XSS Cookie Heist & Session Steal',
    category: 'Web Security',
    difficulty: 'Medium',
    points: 100,
    solved: '89 Solves',
    badgeColor: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
  },
  {
    id: 'pcap-traffic-interception',
    title: 'PCAP Traffic Interception & Decoding',
    category: 'Network Security',
    difficulty: 'Easy',
    points: 60,
    solved: '115 Solves',
    badgeColor: 'text-green-400 border-green-500/30 bg-green-500/10'
  },
  {
    id: 'memory-dump-malware-hunt',
    title: 'Memory Dump Malware Hunt (Volatility)',
    category: 'Digital Forensics',
    difficulty: 'Hard',
    points: 150,
    solved: '41 Solves',
    badgeColor: 'text-red-400 border-red-500/30 bg-red-500/10'
  },
  {
    id: 'rsa-weak-key-cryptanalysis',
    title: 'RSA Weak Key Cryptanalysis',
    category: 'Cryptography',
    difficulty: 'Medium',
    points: 120,
    solved: '67 Solves',
    badgeColor: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
  },
  {
    id: 'linux-suid-binary-exploitation',
    title: 'Linux SUID Binary Exploitation',
    category: 'Privilege Escalation',
    difficulty: 'Medium',
    points: 110,
    solved: '78 Solves',
    badgeColor: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
  }
];

export default function ChallengesSection() {
  return (
    <section className="w-full py-24 bg-black relative z-20 border-t border-b border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono tracking-widest uppercase mb-4">
              <Flag className="w-4 h-4" />
              <span>CTF & CHALLENGE ARENA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-sans tracking-wide uppercase">
              TEST YOUR <span className="text-orange-400 drop-shadow-[0_0_20px_rgba(255,165,0,0.5)]">SECURITY SKILLS</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mt-3 font-light">
              Solve realistic cybersecurity problems, capture elusive flags, climb the scoreboard, and earn tactical experience points.
            </p>
          </div>
          <Link
            to="/challenges"
            className="mt-6 md:mt-0 flex items-center space-x-2 px-6 py-3 rounded-xl bg-orange-500/20 border border-orange-500/50 text-orange-300 hover:bg-orange-500/30 text-sm font-bold transition-all shadow-[0_0_15px_rgba(255,165,0,0.2)]"
          >
            <span>Enter CTF Arena</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sampleChallenges.map((ch, idx) => (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-[#090d14] rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    {ch.category}
                  </span>
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${ch.badgeColor}`}>
                    {ch.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                  {ch.title}
                </h3>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs font-mono">
                  <span className="text-orange-400 font-bold">+{ch.points} PTS</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{ch.solved}</span>
                </div>
                <Link
                  to={`/challenges`}
                  className="p-2 rounded-lg bg-white/5 group-hover:bg-orange-500/20 text-gray-400 group-hover:text-orange-400 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-orange-500/10 via-black to-cyber-neon/10 border border-orange-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">Continuous CTF Challenges</h4>
              <p className="text-gray-400 text-sm font-light">New vulnerability challenges and forensic cases added weekly by the FANOS SEC Elite Team.</p>
            </div>
          </div>
          <Link
            to="/challenges"
            className="px-6 py-3 rounded-xl bg-orange-500 text-black font-extrabold text-sm uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(255,165,0,0.4)] shrink-0"
          >
            Solve Challenges
          </Link>
        </div>

      </div>
    </section>
  );
}
