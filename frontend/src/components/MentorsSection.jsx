import { motion } from 'framer-motion';
import { Target, Award, BookOpen } from 'lucide-react';

const mentors = [
  {
    id: 1,
    name: 'Mulugeta Ababi',
    badge: 'OFFENSIVE SECURITY',
    role: 'Penetration testing Specialist',
    overlayDesc: 'Master web vulnerabilities, bypass modern firewalls, and secure the application layer from advanced threats.',
    detailedDesc: 'Senior penetration testing specialist with 2+ years of experience in Penetration testing, Cyber Incident Response and training, and Proactive Defense.',
    specialties: ['Penetration Testing', 'Cyber Incident Response', 'Training'],
    achievements: ['HackTheBox Top 5%', 'Certified Penetration testing Specialist ( CPTS )', 'Content Creator'],
    stats: { courses: '4', students: '350', rating: '3.3' },
    image: '/mulugeta.jpg',
    color: '#00FF41',
    bgPosition: 'center 30%'
  },
  {
    id: 2,
    name: 'Nardos Shumete',
    badge: 'RED TEAMING',
    role: 'Jr Penetration tester',
    overlayDesc: 'Execute full-scope red team engagements to simulate real-world cyber attacks against corporate infrastructure.',
    detailedDesc: 'Experienced red teamer specializing in web application security and over 1+ year Training Experience.',
    specialties: ['Web Application Security', 'Red Team Operations', 'Training'],
    achievements: ['THM Jr. Penetest', 'Bug Bounty Hunter'],
    stats: { courses: '5', students: '300+', rating: '2.5' },
    image: '/nardos.png',
    color: '#FF3333',
    bgPosition: 'center 10%'
  },
  {
    id: 3,
    name: 'Nahom Teshome',
    badge: 'ADVANCED THREATS',
    role: 'Threat Intelligence Analyst',
    overlayDesc: 'Analyze emerging threats, deconstruct malicious behavior, and build resilient modern defenses.',
    detailedDesc: 'Security professional specializing in hunting advanced persistent threats and conducting in-depth malware analysis.',
    specialties: ['Threat Intel', 'Malware Analysis', 'OSINT'],
    achievements: ['GIAC Certified', 'CTF Winner', 'Security Architect'],
    stats: { courses: '3', students: '200+', rating: '4.8' },
    image: '/gray_hat_hacker.png',
    color: '#FFA500',
    bgPosition: 'center 20%'
  },
  {
    id: 4,
    name: 'Henok',
    badge: 'ANONYMOUS EXPERT',
    role: 'Elite Cyber Operator',
    overlayDesc: 'Deep dive into zero-day research, exploit development, and the darkest corners of the cyber landscape.',
    detailedDesc: 'Veteran exploit researcher and offensive operator with an unyielding passion for unearthing critical vulnerabilities.',
    specialties: ['Reverse Engineering', 'Exploit Dev', 'Kernel Debugging'],
    achievements: ['0-Day Discoverer', 'BlackHat Speaker', 'Security Researcher'],
    stats: { courses: '3', students: '150+', rating: '4.7' },
    image: '/elite_hacker.png',
    color: '#9D00FF',
    bgPosition: 'center 20%'
  }
];

export default function MentorsSection() {
  return (
    <section className="w-full py-24 bg-black relative z-20 border-t border-[#111]">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black font-sans text-white mb-6 tracking-wide drop-shadow-lg uppercase"
          >
            MEET THE <span className="text-[#00FF41] drop-shadow-[0_0_20px_rgba(0,255,65,0.5)]">MENTORS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Learn from battle-tested cybersecurity professionals who have defended against real-world threats.
          </motion.p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {mentors.map((mentor, index) => (
            <motion.div 
              key={mentor.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-[#050505] rounded-xl overflow-hidden border border-[#1a1a1a] flex flex-col hover:border-[#00FF41]/30 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.8)] group"
            >
              
              {/* TOP HALF: Image Profile with Overlay */}
              <div className="relative h-[500px] w-full overflow-hidden bg-[#050505]">
                {/* Full-bleed crisp profile photo tailored to each face */}
                <div 
                  className="absolute inset-0 bg-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${mentor.image})`, backgroundPosition: mentor.bgPosition || 'center 20%' }}
                />
                
                {/* Dark Gradient Overlay - Lightened for better face clarity */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                {/* Top Badge Overlay */}
                <div className="absolute top-6 left-6 border border-white/30 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full z-10 flex items-center shadow-lg">
                  <span className="text-sm font-mono tracking-widest uppercase text-white font-bold">{mentor.badge}</span>
                </div>
                {/* Top Right Green Dot Indicator */}
                <div className="absolute top-8 right-8 w-3.5 h-3.5 rounded-full bg-[#00FF41] shadow-[0_0_15px_#00FF41]" />

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-2 drop-shadow-xl">{mentor.role}</h3>
                  <p className="text-gray-200 font-normal text-base leading-relaxed max-w-md drop-shadow-md">
                    {mentor.overlayDesc}
                  </p>
                </div>
              </div>

              {/* BOTTOM HALF: Detailed Description, Specialties, Achievements & Stats */}
              <div className="p-8 flex flex-col flex-grow relative bg-[#070a0f]">
                
                {/* Mentor Name Head */}
                <h4 className="text-2xl font-bold mb-3 tracking-wide" style={{ color: mentor.color }}>{mentor.name}</h4>
                
                {/* Detailed Description */}
                <p className="text-gray-300 text-base font-light leading-relaxed mb-8 border-b border-white/10 pb-6">
                  {mentor.detailedDesc}
                </p>

                {/* Specialties */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                     <Target className="w-5 h-5" style={{ color: mentor.color }} />
                     <h5 className="text-base font-bold tracking-wider text-white uppercase font-mono">Specialties</h5>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {mentor.specialties.map((spec, i) => (
                      <span key={i} className="px-4 py-2 rounded-xl text-sm font-semibold border" style={{ borderColor: `${mentor.color}50`, color: mentor.color, backgroundColor: `${mentor.color}15` }}>
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="flex-grow mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                     <Award className="w-5 h-5" style={{ color: mentor.color }} />
                     <h5 className="text-base font-bold tracking-wider text-white uppercase font-mono">Achievements</h5>
                  </div>
                  <ul className="space-y-3">
                    {mentor.achievements.map((achieve, i) => (
                      <li key={i} className="flex items-center text-base text-gray-200 font-light">
                        <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: mentor.color }} />
                        {achieve}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Stats Footer */}
                <div className="border-t border-white/10 pt-6 flex justify-between items-center text-center">
                   <div>
                      <div className="text-2xl md:text-3xl font-black mb-1 font-mono" style={{ color: mentor.color }}>{mentor.stats.courses}</div>
                      <div className="text-xs sm:text-sm text-gray-300 tracking-wider uppercase font-bold font-mono">Courses</div>
                   </div>
                   <div>
                      <div className="text-2xl md:text-3xl font-black mb-1 font-mono" style={{ color: mentor.color }}>{mentor.stats.students}</div>
                      <div className="text-xs sm:text-sm text-gray-300 tracking-wider uppercase font-bold font-mono">Students</div>
                   </div>
                   <div>
                      <div className="text-2xl md:text-3xl font-black mb-1 font-mono" style={{ color: mentor.color }}>{mentor.stats.rating}</div>
                      <div className="text-xs sm:text-sm text-gray-300 tracking-wider uppercase font-bold font-mono">Rating</div>
                   </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
