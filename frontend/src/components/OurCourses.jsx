import { motion } from 'framer-motion';
import { Shield, Zap, Target, Lock, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const courses = [
  {
    id: 'dmcst',
    title: 'FANOS SEC Security Tester',
    subtitle: 'FSST CERTIFICATION',
    abbrev: 'FSST',
    version: 'v2',
    level: 'Beginner',
    isFree: true,
    description: 'A foundational cybersecurity training program for complete beginners, covering basic programming, networking, and advanced security concepts in both offensive and defensive cybersecurity.',
    colorPrimary: '#00FF41',
    colorSecondary: '#004d13',
    Icon: Shield,
    iconBg: 'bg-green-500/15',
    iconColor: 'text-[#00FF41]',
    badgeStyle: 'bg-green-500/20 text-[#00FF41] border-green-500/40',
    glowStyle: 'shadow-[0_0_30px_rgba(0,255,65,0.15)]',
    features: [
      'Basic Programming', 'Networking & Protocols', 
      'Security Fundamentals', 'Penetration Testing', 
      'Blue Teaming Basics', 'Report Writing'
    ],
    duration: '4 months',
    students: '1000+',
    rating: '4.9'
  },
  {
    id: 'dmcwss',
    title: 'FANOS SEC Web Security Specialist',
    subtitle: 'FSWSS CERTIFICATION',
    abbrev: 'FSWSS',
    version: 'v1',
    level: 'Intermediate',
    isFree: false,
    description: 'An intermediate course on web security for developers and aspiring security professionals, covering everything from web fundamentals to advanced exploitation techniques.',
    colorPrimary: '#FFA500',
    colorSecondary: '#4d3300',
    Icon: Zap,
    iconBg: 'bg-orange-500/15',
    iconColor: 'text-[#FFA500]',
    badgeStyle: 'bg-orange-500/20 text-[#FFA500] border-orange-500/40',
    glowStyle: 'shadow-[0_0_30px_rgba(255,165,0,0.15)]',
    features: [
      'Live Website Pentest', 'Bug Bounty Case Studies',
      '24-Hour Hands-On Exam', 'API Security Testing',
      'WAF Bypass Techniques', 'Professional Reporting'
    ],
    duration: '3 Months',
    students: '60+',
    rating: '4.9'
  },
  {
    id: 'dmccrt',
    title: 'FANOS SEC Certified Red Teamer',
    subtitle: 'FSCRT CERTIFICATION',
    abbrev: 'FSCRT',
    version: 'v1',
    level: 'Intermediate',
    isFree: false,
    description: 'An intermediate Red Teaming course for IT Admins and Security Researchers, covering everything from breaching the DMZ to compromising the entire enterprise network.',
    colorPrimary: '#FF3333',
    colorSecondary: '#4d0000',
    Icon: Target,
    iconBg: 'bg-red-500/15',
    iconColor: 'text-[#FF3333]',
    badgeStyle: 'bg-red-500/20 text-[#FF3333] border-red-500/40',
    glowStyle: 'shadow-[0_0_30px_rgba(255,51,51,0.15)]',
    features: [
      'Enterprise Security', 'Red Team Operations',
      'OpSec & Evasion', 'Pivoting & Tunneling',
      'Abusing MSSQL Services', 'Executive Reporting'
    ],
    duration: '5 Months',
    students: '50+',
    rating: '4.9'
  },
  {
    id: 'dmccbt',
    title: 'FANOS SEC Certified Blue Teamer',
    subtitle: 'FSCBT CERTIFICATION',
    abbrev: 'FSCBT',
    version: 'v1',
    level: 'Advanced',
    isFree: true,
    description: 'An advanced Blue Teaming course focusing on threat hunting, incident response, SIEM engineering, and proactively defending enterprise infrastructure from advanced persistent threats.',
    colorPrimary: '#00BFFF',
    colorSecondary: '#00334d',
    Icon: Lock,
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-[#00BFFF]',
    badgeStyle: 'bg-blue-500/20 text-[#00BFFF] border-blue-500/40',
    glowStyle: 'shadow-[0_0_30px_rgba(0,191,255,0.15)]',
    features: [
      'Threat Hunting', 'Incident Response',
      'SIEM Engineering', 'Malware Analysis',
      'Network Forensics', 'Infrastructure Defense'
    ],
    duration: '6 Months',
    students: 'New Track',
    rating: '5.0'
  }
];

export default function OurCourses() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEnroll = (courseId) => {
    navigate(`/enroll/${courseId}`);
  };

  return (
    <section className="w-full py-24 bg-black relative top-0 z-20">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FF41]/40 bg-[#00FF41]/5 text-[#00FF41] text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.28em] mb-6"
          >
            Career-ready cyber training
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-black font-sans text-white mb-6 tracking-[-0.06em] leading-[0.9] drop-shadow-lg"
          >
            OUR <span className="text-[#00FF41] drop-shadow-[0_0_25px_rgba(0,255,65,0.7)]">COURSES</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-4xl mx-auto"
          >
            From foundational security skills to advanced red team and blue team capability, FANOS SEC delivers hands-on cybersecurity training, practical labs, and verified learning paths built for real-world impact.
          </motion.p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {courses.map((course, index) => {
             const Icon = course.Icon;
             return (
               <motion.div 
                 key={course.id}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ delay: index * 0.12, duration: 0.5 }}
                 className={`flex flex-col bg-[#090d12] rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-[${course.colorPrimary}] hover:-translate-y-2 ${course.glowStyle} group`}
               >
                 
                 {/* Top Graphic Area */}
                 <div className="h-44 relative overflow-hidden flex items-center justify-center p-6 border-b border-white/10" style={{ background: `radial-gradient(circle at center, ${course.colorSecondary} 0%, #05080c 100%)` }}>
                    <Icon className="absolute w-32 h-32 opacity-[0.06] text-white" />
                    
                    <div className="flex flex-col items-center relative z-10">
                       <h3 className="text-3xl sm:text-4xl font-black tracking-tight flex items-end drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]" style={{ color: course.colorPrimary }}>
                         {course.abbrev}
                         <span className="text-xl ml-1.5 text-white/60">{course.version}</span>
                       </h3>
                       <p className="text-white/60 text-xs font-mono tracking-[0.25em] uppercase mt-2 drop-shadow-md">
                         FANOS SEC
                       </p>
                    </div>
                 </div>

                 {/* Card Content body */}
                 <div className="p-6 sm:p-7 flex flex-col flex-grow relative">
                    
                    {/* Header Row: Icon + Level + (Free status) */}
                    <div className="flex justify-between items-center mb-5 relative z-10">
                       <div className="flex items-center space-x-3">
                         <div className={`p-2.5 rounded-xl ${course.iconBg}`}>
                            <Icon className={`w-5 h-5 ${course.iconColor}`} />
                         </div>
                         <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md border ${course.badgeStyle}`}>
                            {course.level}
                         </span>
                       </div>
                       
                       {/* Free Badge */}
                       {course.isFree ? (
                         <div className="text-sm font-black tracking-widest text-[#00FF41] bg-green-500/10 px-2.5 py-1 rounded border border-green-500/30">
                            FREE
                         </div>
                       ) : (
                         <div className="text-sm font-bold tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded border border-orange-500/30">
                            PREMIUM
                         </div>
                       )}
                    </div>

                    {/* Course Title and Abbrev */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                       {course.title}
                    </h3>
                    <div className="text-xs sm:text-sm font-mono font-bold tracking-wider uppercase mb-4" style={{ color: course.colorPrimary }}>
                       {course.subtitle}
                    </div>

                    {/* Course Description */}
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                       {course.description}
                    </p>

                    {/* Feature Bullets */}
                    <div className="pt-4 border-t border-white/10 flex-grow">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2.5">
                         {course.features.map((feature, i) => (
                           <div key={i} className="flex items-start text-xs sm:text-sm text-gray-200">
                             <div className="mt-1.5 w-2 h-2 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: course.colorPrimary }}></div>
                             <span>{feature}</span>
                           </div>
                         ))}
                      </div>
                    </div>

                 </div>

                 {/* Bottom Section (Metadata + Enroll Button) */}
                 <div className="px-6 pb-6 pt-3 bg-[#05070a] border-t border-white/5">
                    {/* Metadata Row */}
                    <div className="flex justify-between items-center text-gray-300 text-xs sm:text-sm mb-5 font-mono">
                       <div className="flex items-center space-x-1.5">
                          <Clock className="w-4 h-4" style={{ color: course.colorPrimary }} />
                          <span>{course.duration}</span>
                       </div>
                       <div className="flex items-center space-x-1.5">
                          <Users className="w-4 h-4" style={{ color: course.colorPrimary }} />
                          <span>{course.students}</span>
                       </div>
                       <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-current" style={{ color: course.colorPrimary }} />
                          <span className="font-bold text-white">{course.rating}</span>
                       </div>
                    </div>

                    {/* Solid Enroll Button */}
                    <motion.button 
                       onClick={() => handleEnroll(course.id)}
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       className="w-full py-4 rounded-xl font-extrabold text-sm sm:text-base tracking-widest uppercase transition-all shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                       style={{ 
                         backgroundColor: course.colorPrimary, 
                         color: '#000',
                         boxShadow: `0 4px 15px ${course.colorSecondary}`
                       }}
                    >
                       <span>ENROLL NOW</span>
                       <ArrowRight className="w-4 h-4" />
                    </motion.button>
                 </div>

               </motion.div>
             );
          })}
        </div>
      </div>
    </section>
  );
}
