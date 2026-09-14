import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Lock, Clock, Users, Star, ArrowRight, Code, Globe, Server, Database, Terminal, Network } from 'lucide-react';

const courses = [
  {
    id: 'dmcst',
    title: 'FANOS SEC Security Tester',
    subtitle: 'FSST CERTIFICATION',
    abbrev: 'FSST',
    version: 'v2',
    level: 'Beginner',
    isFree: true,
    description: 'Master the fundamentals of cybersecurity with hands-on training in network security, ethical hacking, and defensive strategies. Build a solid foundation for your security career.',
    colorPrimary: '#00FF41',
    colorSecondary: '#004d13',
    Icon: Shield,
    heroImage: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200',
    iconBg: 'bg-green-500/15',
    iconColor: 'text-[#00FF41]',
    badgeStyle: 'bg-green-500/20 text-[#00FF41] border-green-500/40',
    glowStyle: 'hover:shadow-[0_0_30px_rgba(0,255,65,0.25)]',
    features: ['Network Fundamentals', 'Linux Security', 'Penetration Testing', 'Security Tools', 'Threat Detection', 'Report Writing'],
    duration: '4 months', students: '1000+', rating: '4.9',
    tagline: 'Start Your Cybersecurity Journey',
    skills: ['Python', 'Linux', 'Networking', 'Wireshark', 'Metasploit', 'Nmap']
  },
  {
    id: 'dmcwss',
    title: 'FANOS SEC Web Security Specialist',
    subtitle: 'FSWSS CERTIFICATION',
    abbrev: 'FSWSS',
    version: 'v1',
    level: 'Intermediate',
    isFree: false,
    description: 'Become a web application security expert. Learn to identify and exploit OWASP Top 10 vulnerabilities, perform API security testing, and master bug bounty hunting techniques.',
    colorPrimary: '#FFA500',
    colorSecondary: '#4d3300',
    Icon: Zap,
    heroImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200',
    iconBg: 'bg-orange-500/15',
    iconColor: 'text-[#FFA500]',
    badgeStyle: 'bg-orange-500/20 text-[#FFA500] border-orange-500/40',
    glowStyle: 'hover:shadow-[0_0_30px_rgba(255,165,0,0.25)]',
    features: ['OWASP Top 10', 'Bug Bounty', 'API Security', 'WAF Bypass', 'SQL Injection', 'XSS & CSRF'],
    duration: '3 months', students: '60+', rating: '4.9',
    tagline: 'Master Web Application Security',
    skills: ['Burp Suite', 'OWASP ZAP', 'SQLMap', 'JavaScript', 'PHP', 'REST APIs']
  },
  {
    id: 'dmccrt',
    title: 'FANOS SEC Certified Red Teamer',
    subtitle: 'FSCRT CERTIFICATION',
    abbrev: 'FSCRT',
    version: 'v1',
    level: 'Intermediate',
    isFree: false,
    description: 'Simulate advanced adversary tactics in enterprise environments. Master Active Directory exploitation, lateral movement, privilege escalation, and covert operations.',
    colorPrimary: '#FF3333',
    colorSecondary: '#4d0000',
    Icon: Target,
    heroImage: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1200',
    iconBg: 'bg-red-500/15',
    iconColor: 'text-[#FF3333]',
    badgeStyle: 'bg-red-500/20 text-[#FF3333] border-red-500/40',
    glowStyle: 'hover:shadow-[0_0_30px_rgba(255,51,51,0.25)]',
    features: ['Active Directory', 'Lateral Movement', 'EDR Evasion', 'C2 Frameworks', 'Pivoting', 'Post-Exploitation'],
    duration: '5 months', students: '50+', rating: '4.9',
    tagline: 'Think Like an Attacker',
    skills: ['Cobalt Strike', 'PowerShell', 'BloodHound', 'Mimikatz', 'Empire', 'Covenant']
  },
  {
    id: 'dmccbt',
    title: 'FANOS SEC Certified Blue Teamer',
    subtitle: 'FSCBT CERTIFICATION',
    abbrev: 'FSCBT',
    version: 'v1',
    level: 'Advanced',
    isFree: true,
    description: 'Defend enterprise networks like a pro. Master threat hunting, incident response, SIEM engineering, and malware analysis to protect organizations from advanced threats.',
    colorPrimary: '#00BFFF',
    colorSecondary: '#00334d',
    Icon: Lock,
    heroImage: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-[#00BFFF]',
    badgeStyle: 'bg-blue-500/20 text-[#00BFFF] border-blue-500/40',
    glowStyle: 'hover:shadow-[0_0_30px_rgba(0,191,255,0.25)]',
    features: ['Threat Hunting', 'Incident Response', 'SIEM Engineering', 'Malware Analysis', 'Digital Forensics', 'SOC Operations'],
    duration: '6 months', students: 'New Track', rating: '5.0',
    tagline: 'Defend the Digital Frontier',
    skills: ['Splunk', 'ELK Stack', 'Wireshark', 'Volatility', 'YARA', 'IDA Pro']
  },
];

export default function Courses() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-to-br from-[#000000] via-[#0a0e13] to-[#000000] text-white">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] pointer-events-none animate-pulse" style={{ backgroundSize: '50px 50px' }} />
      
      {/* Radial gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 pt-12"
        >
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2.5 bg-gradient-to-r from-[#00FF41]/10 to-[#00BFFF]/10 border border-[#00FF41]/30 rounded-full text-[#00FF41] text-sm font-bold tracking-[0.2em] uppercase">
              🎓 Professional Certification Tracks
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-none">
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">ELITE</span>
            <br />
            <span className="bg-gradient-to-r from-[#00FF41] via-[#00BFFF] to-[#FF3333] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,255,65,0.5)]">
              CYBERSECURITY
            </span>
            <br />
            <span className="text-white/90 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">TRAINING</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto font-light leading-relaxed mb-8">
            Industry-recognized certifications designed by <span className="text-[#00FF41] font-semibold">battle-tested professionals</span>.<br />
            Master real-world skills. Earn verified credentials. Launch your career.
          </p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#00FF41] mb-1">1000+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#FFA500] mb-1">4</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Expert Tracks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#00BFFF] mb-1">98%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#FF3333] mb-1">24/7</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Lab Access</div>
            </div>
          </motion.div>
        </motion.div>

        {/* COURSES GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {courses.map((course, index) => {
            const Icon = course.Icon;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onClick={() => navigate(`/enroll/${course.id}`)}
                className={`group relative bg-gradient-to-br from-[#0a0e13] to-[#000000] rounded-3xl overflow-hidden border border-white/10 hover:border-[${course.colorPrimary}]/50 transition-all duration-500 ${course.glowStyle} cursor-pointer shadow-2xl`}
              >
                {/* Hero Image Section */}
                <div className="relative h-72 overflow-hidden">
                  {/* Gradient Background instead of image */}
                  <div 
                    className="absolute inset-0 transform group-hover:scale-105 transition-transform duration-700"
                    style={{ 
                      background: `radial-gradient(circle at 30% 50%, ${course.colorPrimary}20 0%, ${course.colorSecondary} 40%, #000000 100%)`
                    }}
                  />
                  
                  {/* Animated pattern overlay */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${course.colorPrimary} 2px, ${course.colorPrimary} 4px),
                                       repeating-linear-gradient(90deg, transparent, transparent 2px, ${course.colorPrimary} 2px, ${course.colorPrimary} 4px)`,
                      backgroundSize: '50px 50px'
                    }}
                  />
                  
                  {/* Large decorative icon background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <Icon className="w-64 h-64" />
                  </div>
                  
                  {/* Secondary smaller icons pattern */}
                  <div className="absolute top-10 left-10 opacity-10">
                    <Icon className="w-20 h-20" />
                  </div>
                  <div className="absolute bottom-10 right-10 opacity-10">
                    <Icon className="w-24 h-24" />
                  </div>
                  <div className="absolute top-1/2 right-20 opacity-5">
                    <Icon className="w-16 h-16" />
                  </div>
                  
                  {/* Additional gradient overlay for depth */}
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${course.colorPrimary}15 0%, transparent 50%, ${course.colorSecondary}30 100%)`
                    }}
                  />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-6 right-6">
                    <div 
                      className="p-4 rounded-2xl backdrop-blur-md border group-hover:scale-110 transition-transform duration-300"
                      style={{ 
                        backgroundColor: `${course.colorPrimary}15`,
                        borderColor: `${course.colorPrimary}40`
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: course.colorPrimary }} />
                    </div>
                  </div>

                  {/* Course Badge & Level */}
                  <div className="absolute top-6 left-6 flex flex-col gap-3">
                    <span 
                      className="px-4 py-2 text-xs font-black uppercase tracking-[0.15em] rounded-xl backdrop-blur-md border"
                      style={{ 
                        backgroundColor: `${course.colorPrimary}20`,
                        borderColor: `${course.colorPrimary}50`,
                        color: course.colorPrimary
                      }}
                    >
                      {course.level}
                    </span>
                    {course.isFree ? (
                      <span className="px-4 py-2 text-xs font-black text-[#00FF41] bg-green-500/20 backdrop-blur-md rounded-xl border border-green-500/40">
                        FREE TRACK
                      </span>
                    ) : (
                      <span className="px-4 py-2 text-xs font-black text-[#FFA500] bg-orange-500/20 backdrop-blur-md rounded-xl border border-orange-500/40">
                        PREMIUM
                      </span>
                    )}
                  </div>

                  {/* Course Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                    >
                      <h2 className="text-4xl sm:text-5xl font-black mb-2 leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]" style={{ color: course.colorPrimary }}>
                        {course.abbrev}
                        <span className="text-2xl text-white/50 ml-2">{course.version}</span>
                      </h2>
                      <p className="text-white/80 text-sm font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        {course.tagline}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  {/* Course Title & Subtitle */}
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                      {course.title}
                    </h3>
                    <p 
                      className="text-sm font-mono font-bold tracking-[0.15em] uppercase" 
                      style={{ color: course.colorPrimary }}
                    >
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-base leading-relaxed mb-8">
                    {course.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="mb-8">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      TOOLS & TECHNOLOGIES
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-gray-300 hover:border-white/30 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {course.features.map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-start text-sm text-gray-200 group/feature"
                      >
                        <div 
                          className="mt-1 w-2 h-2 rounded-full mr-2.5 flex-shrink-0 group-hover/feature:scale-125 transition-transform" 
                          style={{ backgroundColor: course.colorPrimary }}
                        />
                        <span className="group-hover/feature:text-white transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stats Bar */}
                  <div className="flex items-center justify-between text-sm text-gray-400 font-mono mb-6 pb-6 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: course.colorPrimary }} />
                      <strong className="text-white">{course.duration}</strong>
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" style={{ color: course.colorPrimary }} />
                      <strong className="text-white">{course.students}</strong>
                    </span>
                    <span className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" style={{ color: course.colorPrimary }} />
                      <strong className="text-white">{course.rating}</strong>
                    </span>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-5 rounded-2xl font-black text-base tracking-[0.1em] uppercase transition-all shadow-xl flex items-center justify-center gap-3 group/btn"
                    style={{ 
                      backgroundColor: course.colorPrimary, 
                      color: '#000',
                      boxShadow: `0 8px 30px ${course.colorPrimary}40`
                    }}
                  >
                    <span>ENROLL NOW</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-[#00FF41]/10 via-transparent to-[#00BFFF]/10 border border-[#00FF41]/20">
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Not Sure Where to Start?
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              Talk to our career advisors and get personalized course recommendations based on your background and goals.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-[#00FF41] text-black font-black rounded-xl hover:bg-[#00FF41]/90 transition-all uppercase tracking-wider shadow-[0_0_30px_rgba(0,255,65,0.3)]"
            >
              Get Free Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
