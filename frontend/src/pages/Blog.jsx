import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, BookOpen, Clock, Calendar, User, Tag, ArrowRight, 
  ExternalLink, Play, Sparkles, Shield, Lock, Terminal, Flame,
  Share2, ChevronRight, Bookmark
} from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Understanding the Modern OWASP Top 10 Structure & Real-World Exploits',
    category: 'Exploit Analysis',
    readTime: '8 min read',
    date: 'Sep 10, 2026',
    author: 'Mulugeta Ababi',
    role: 'Lead Security Instructor',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000',
    summary: 'An in-depth breakdown of how web vulnerabilities have evolved. We explore Server-Side Request Forgery (SSRF), Insecure Design, and Broken Access Control with practical exploitation and remediation patterns.',
    tags: ['OWASP', 'Web Security', 'SSRF', 'AppSec'],
    featured: true,
    badgeColor: 'text-cyber-neon border-cyber-neon/40 bg-cyber-neon/10'
  },
  {
    id: 2,
    title: 'Building a Defensive Keylogger Detection & Memory Forensics Tool in Python',
    category: 'Defense & Forensics',
    readTime: '12 min read',
    date: 'Sep 05, 2026',
    author: 'FANOS SEC Research Team',
    role: 'SOC & Malware Analysts',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    summary: 'Learn how low-level Windows API hooks work, dissect how malicious actors monitor keystrokes, and write a proactive Python daemon that inspects DLL injections and anomalous thread creations.',
    tags: ['Python', 'Malware Analysis', 'Forensics', 'Windows Internals'],
    featured: false,
    isVideo: true,
    videoUrl: 'https://www.youtube.com/watch?v=sample',
    badgeColor: 'text-cyber-cyan border-cyber-cyan/40 bg-cyber-cyan/10'
  },
  {
    id: 3,
    title: 'Active Directory Domain Dominance: Kerberoasting & DCSync Deep Dive',
    category: 'Red Teaming',
    readTime: '15 min read',
    date: 'Aug 28, 2026',
    author: 'Mulugeta Ababi',
    role: 'Red Team Specialist',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
    summary: 'Simulating enterprise Active Directory compromise from zero foothold to Domain Admin. Covers Service Principal Names (SPN) extraction, offline hash cracking, and DRS replication abuse.',
    tags: ['Active Directory', 'Kerberos', 'Red Team', 'Privilege Escalation'],
    featured: false,
    badgeColor: 'text-red-400 border-red-500/40 bg-red-500/10'
  },
  {
    id: 4,
    title: 'SIEM Engineering: Writing High-Fidelity Sigma Detection Rules for Splunk',
    category: 'Blue Team & SOC',
    readTime: '10 min read',
    date: 'Aug 20, 2026',
    author: 'FANOS SEC Research Team',
    role: 'Threat Intelligence Unit',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000',
    summary: 'Avoid alert fatigue in your Security Operations Center. Learn how to convert hypothesis-driven threat intelligence into reusable Sigma rules that pinpoint lateral movement.',
    tags: ['SIEM', 'Splunk', 'Sigma Rules', 'Threat Hunting'],
    featured: false,
    badgeColor: 'text-blue-400 border-blue-500/40 bg-blue-500/10'
  },
  {
    id: 5,
    title: 'Zero to Bug Bounty Hunter: Methodical Recon & Subdomain Takeover Strategies',
    category: 'Tutorials',
    readTime: '11 min read',
    date: 'Aug 14, 2026',
    author: 'Alex Vance',
    role: 'Guest Pentesting Fellow',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1000',
    summary: 'A structured blueprint for bug bounty hunting in 2026. Setting up automated asset discovery pipelines with Amass, Sublist3r, Nuclei templates, and GitHub dorking workflows.',
    tags: ['Bug Bounty', 'Recon', 'Automation', 'OSINT'],
    featured: false,
    badgeColor: 'text-amber-400 border-amber-500/40 bg-amber-500/10'
  },
  {
    id: 6,
    title: 'Reverse Engineering Firmware with Ghidra & Hardware Debugging Interfaces',
    category: 'Exploit Analysis',
    readTime: '14 min read',
    date: 'Aug 02, 2026',
    author: 'Mulugeta Ababi',
    role: 'Lead Security Instructor',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    summary: 'Extracting flash memory dumps from IoT devices via UART and JTAG headers. Decompiling binary firmware images with Ghidra to discover hardcoded private keys and buffer overflows.',
    tags: ['Ghidra', 'Hardware Hacking', 'Firmware', 'Reverse Engineering'],
    featured: false,
    badgeColor: 'text-purple-400 border-purple-500/40 bg-purple-500/10'
  }
];

const CATEGORIES = [
  'All Articles',
  'Exploit Analysis',
  'Red Teaming',
  'Defense & Forensics',
  'Blue Team & SOC',
  'Tutorials'
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticleModal, setActiveArticleModal] = useState(null);

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All Articles' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-cyber-dark text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-cyber-neon selection:text-black">
      <div className="container mx-auto max-w-7xl">
        
        {/* Page Header Section with ample clear padding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyber-neon/10 border border-cyber-neon/30 text-cyber-neon text-sm font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,255,65,0.15)]">
            <BookOpen className="w-4 h-4" />
            <span>FANOS SEC INTELLIGENCE & RESEARCH</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-sans tracking-wide text-white mb-5 uppercase leading-tight">
            CYBER <span className="text-cyber-neon drop-shadow-[0_0_25px_rgba(0,255,65,0.7)]">BLOG & NEWS</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Stay updated with cutting-edge cybersecurity research, exploit analysis, blue team detection engineering, interactive video tutorials, and technical deep-dives.
          </p>
        </motion.div>

        {/* Featured Top Story Banner */}
        {featuredPost && selectedCategory === 'All Articles' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-16 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyber-neon/30 via-cyber-cyan/20 to-purple-600/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity"></div>
            
            <div className="relative bg-[#0b0f16] border-2 border-cyber-neon/40 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Image Column */}
              <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-auto overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f16] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0b0f16]"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-lg bg-cyber-neon text-black font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,65,0.6)] flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    FEATURED INTEL
                  </span>
                </div>
              </div>

              {/* Content Column */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-400 mb-4">
                    <span className={`px-2.5 py-1 rounded-md border text-xs font-bold uppercase tracking-wider ${featuredPost.badgeColor}`}>
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center text-gray-300">
                      <Clock className="w-3.5 h-3.5 mr-1 text-cyber-neon" />
                      {featuredPost.readTime}
                    </span>
                    <span className="flex items-center text-gray-300">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-cyber-cyan" />
                      {featuredPost.date}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight group-hover:text-cyber-neon transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                    {featuredPost.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-cyber-neon/20 border border-cyber-neon/50 flex items-center justify-center text-cyber-neon font-bold font-mono">
                      MA
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{featuredPost.author}</p>
                      <p className="text-xs text-gray-400 font-mono">{featuredPost.role}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveArticleModal(featuredPost)}
                    className="px-5 py-2.5 bg-cyber-neon text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,65,0.4)] flex items-center space-x-2 cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* Filter and Search Bar Toolbar */}
        <div className="bg-[#0b0e14] border border-white/10 rounded-2xl p-4 sm:p-6 mb-12 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyber-neon text-black shadow-[0_0_15px_rgba(0,255,65,0.4)]'
                    : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tutorials, CVEs..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon transition-all"
            />
          </div>

        </div>

        {/* Blog Post Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-black/30 border border-white/10 rounded-2xl">
            <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">No Articles Found</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              No matching intelligence posts found for "{searchQuery}". Try a different keyword or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="bg-[#0b0e14] border border-white/10 hover:border-cyber-neon/50 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,65,0.15)] hover:-translate-y-1"
              >
                {/* Card Thumbnail */}
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent"></div>
                  
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-md border text-xs font-bold uppercase tracking-wider backdrop-blur-md ${post.badgeColor}`}>
                      {post.category}
                    </span>
                  </div>

                  {post.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-cyber-neon/90 text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,255,65,0.8)] group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5 fill-black" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center space-x-3 text-xs font-mono text-gray-400 mb-3">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-cyber-neon" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-cyber-cyan" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-cyber-neon transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {post.tags.slice(0, 3).map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-gray-400 border border-white/5">
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Author & Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-cyber-neon" />
                        <span className="text-xs font-mono text-gray-300">{post.author}</span>
                      </div>

                      <button
                        onClick={() => setActiveArticleModal(post)}
                        className="text-xs font-extrabold uppercase tracking-wider text-cyber-neon group-hover:text-white flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        <span>{post.isVideo ? 'Watch Video' : 'Read Intel'}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>
                </div>

              </motion.article>
            ))}
          </div>
        )}

        {/* Newsletter & Dispatch Subscription Box */}
        <div className="mt-20 bg-gradient-to-r from-[#0b0f16] via-[#101826] to-[#0b0f16] border border-cyber-neon/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.08)_0%,transparent_70%)] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-cyber-neon/20 border border-cyber-neon/50 flex items-center justify-center text-cyber-neon mx-auto mb-4">
              <Shield className="w-6 h-6" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white font-sans uppercase tracking-wide mb-3">
              SUBSCRIBE TO <span className="text-cyber-neon">FANOS SEC DISPATCH</span>
            </h2>
            
            <p className="text-gray-300 text-sm sm:text-base font-light mb-6">
              Get weekly zero-day vulnerability alerts, exploit walk-throughs, and CTF strategy breakdowns delivered directly to your inbox.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to FANOS SEC Dispatch!'); }} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="px-5 py-3.5 rounded-xl bg-black/60 border border-white/20 text-white text-sm focus:outline-none focus:border-cyber-neon sm:w-80"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-cyber-neon text-black font-extrabold uppercase tracking-wider text-sm rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,65,0.5)] cursor-pointer"
              >
                Join Dispatch
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Article Detail Reading Modal */}
      <AnimatePresence>
        {activeArticleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            onClick={() => setActiveArticleModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0b0e14] border-2 border-cyber-neon/50 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.9)] relative"
            >
              <button
                onClick={() => setActiveArticleModal(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all text-sm font-bold cursor-pointer"
              >
                ✕ Close
              </button>

              <span className={`inline-block px-3 py-1 rounded-md border text-xs font-bold uppercase tracking-wider mb-4 ${activeArticleModal.badgeColor}`}>
                {activeArticleModal.category}
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                {activeArticleModal.title}
              </h2>

              <div className="flex items-center space-x-4 text-xs font-mono text-gray-400 mb-6 pb-4 border-b border-white/10">
                <span>By {activeArticleModal.author}</span>
                <span>•</span>
                <span>{activeArticleModal.date}</span>
                <span>•</span>
                <span>{activeArticleModal.readTime}</span>
              </div>

              <div className="rounded-xl overflow-hidden mb-6 max-h-72">
                <img 
                  src={activeArticleModal.image} 
                  alt={activeArticleModal.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4 text-base font-light">
                <p>{activeArticleModal.summary}</p>
                <p>
                  In cybersecurity operations, understanding both offensive adversary methodologies and defense-in-depth telemetry is paramount. This deep-dive tutorial demonstrates how vulnerabilities manifest in code and provides defensive countermeasures to safeguard enterprise infrastructure.
                </p>
                <div className="p-4 rounded-xl bg-black/60 border border-cyber-neon/30 font-mono text-xs text-cyber-neon">
                  <code># Key Remediation Takeaway: Always validate inputs with strict allow-lists and enforce least-privilege RBAC.</code>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {activeArticleModal.tags.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded bg-white/5 text-xs font-mono text-gray-300">
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveArticleModal(null)}
                  className="px-6 py-2.5 bg-cyber-neon text-black font-extrabold text-sm uppercase tracking-wider rounded-xl hover:bg-white transition-all cursor-pointer"
                >
                  Done Reading
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
