import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Lock, Clock, Users, Star, CheckCircle, ArrowLeft, Play } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const COURSE_DETAILS = {
  dmcst: {
    title: 'FANOS SEC Security Tester',
    abbrev: 'FSST',
    subtitle: 'FOUNDATIONAL CYBERSECURITY CERTIFICATION',
    level: 'Beginner',
    isFree: true,
    colorPrimary: '#00FF41',
    colorSecondary: '#004d13',
    Icon: Shield,
    duration: '4 months',
    students: '1000+',
    rating: '4.9',
    description: 'A foundational cybersecurity training program for complete beginners. You will start from zero — learning basic programming, networking fundamentals, and then advance into real-world offensive and defensive security concepts. By the end, you will be able to perform basic penetration tests and write professional security reports.',
    whatYouLearn: [
      'Understand how computers and networks communicate',
      'Write basic Python scripts for security automation',
      'Perform reconnaissance and information gathering',
      'Exploit common vulnerabilities in controlled environments',
      'Understand blue team fundamentals and log analysis',
      'Write professional penetration testing reports',
      'Use tools like Nmap, Metasploit, Burp Suite basics',
      'Earn the FSST certification upon completion',
    ],
    curriculum: [
      { module: 'Module 1', title: 'Introduction to Cybersecurity', topics: ['What is cybersecurity?', 'Career paths overview', 'Setting up your lab environment', 'Linux fundamentals'] },
      { module: 'Module 2', title: 'Networking Fundamentals', topics: ['OSI model', 'TCP/IP protocols', 'DNS, HTTP, HTTPS', 'Wireshark basics'] },
      { module: 'Module 3', title: 'Basic Programming for Hackers', topics: ['Python basics', 'Writing port scanners', 'Automating tasks', 'Bash scripting'] },
      { module: 'Module 4', title: 'Penetration Testing Basics', topics: ['Reconnaissance techniques', 'Scanning with Nmap', 'Exploitation with Metasploit', 'Post-exploitation basics'] },
      { module: 'Module 5', title: 'Blue Team Fundamentals', topics: ['Log analysis', 'Intrusion detection', 'Incident response basics', 'SIEM introduction'] },
      { module: 'Module 6', title: 'Report Writing & Certification', topics: ['Professional report structure', 'CVSS scoring', 'Mock exam', 'FSST certification exam'] },
    ],
    requirements: ['No prior experience needed', 'A computer with at least 8GB RAM', 'Willingness to learn and practice daily'],
    bg: 'from-green-900/20 to-black',
  },
  dmcwss: {
    title: 'FANOS SEC Web Security Specialist',
    abbrev: 'FSWSS',
    subtitle: 'INTERMEDIATE WEB SECURITY SPECIALIST',
    level: 'Intermediate',
    isFree: false,
    colorPrimary: '#FFA500',
    colorSecondary: '#4d3300',
    Icon: Zap,
    duration: '3 months',
    students: '60+',
    rating: '4.9',
    description: 'An intermediate course focused entirely on web application security. You will learn to find and exploit vulnerabilities in real websites, perform bug bounty hunting, bypass WAFs, and test APIs. The course ends with a 24-hour hands-on exam on a live target environment.',
    whatYouLearn: [
      'Perform full web application penetration tests',
      'Exploit OWASP Top 10 vulnerabilities hands-on',
      'Hunt for bugs on real bug bounty programs',
      'Test REST and GraphQL APIs for security flaws',
      'Bypass Web Application Firewalls (WAF)',
      'Perform advanced SQL injection and XSS attacks',
      'Write professional bug bounty reports',
      'Pass the 24-hour FSWSS certification exam',
    ],
    curriculum: [
      { module: 'Module 1', title: 'Web Fundamentals Deep Dive', topics: ['HTTP/HTTPS internals', 'Cookies, sessions, tokens', 'Same-origin policy', 'Browser security model'] },
      { module: 'Module 2', title: 'OWASP Top 10 Exploitation', topics: ['SQL Injection (all types)', 'XSS (stored, reflected, DOM)', 'CSRF attacks', 'IDOR and broken access control'] },
      { module: 'Module 3', title: 'Advanced Web Attacks', topics: ['SSRF exploitation', 'XXE injection', 'Deserialization attacks', 'Business logic flaws'] },
      { module: 'Module 4', title: 'API Security Testing', topics: ['REST API testing', 'GraphQL security', 'JWT attacks', 'OAuth misconfigurations'] },
      { module: 'Module 5', title: 'WAF Bypass & Evasion', topics: ['WAF fingerprinting', 'Encoding bypass techniques', 'Filter evasion', 'Real-world bypass case studies'] },
      { module: 'Module 6', title: 'Bug Bounty & Certification Exam', topics: ['Bug bounty methodology', 'Report writing case study', '24-hour live exam', 'FSWSS certification'] },
    ],
    requirements: ['Completion of FSST or equivalent knowledge', 'Basic understanding of HTML/JavaScript', 'Familiarity with Burp Suite'],
    bg: 'from-orange-900/20 to-black',
  },
  dmccrt: {
    title: 'FANOS SEC Certified Red Teamer',
    abbrev: 'FSCRT',
    subtitle: 'INTERMEDIATE RED TEAM OPERATIONS',
    level: 'Intermediate',
    isFree: false,
    colorPrimary: '#FF3333',
    colorSecondary: '#4d0000',
    Icon: Target,
    duration: '5 months',
    students: '50+',
    rating: '4.9',
    description: 'A comprehensive Red Teaming course designed for IT administrators and security researchers. You will simulate real-world adversary operations — from breaching the DMZ to compromising the entire enterprise network including Active Directory. Learn OpSec, evasion, pivoting, and advanced persistence techniques.',
    whatYouLearn: [
      'Plan and execute full red team operations',
      'Breach enterprise DMZ environments',
      'Compromise Active Directory from scratch',
      'Perform lateral movement and pivoting',
      'Abuse MSSQL services for privilege escalation',
      'Evade EDR, AV, and SIEM detection',
      'Maintain persistent access with OpSec',
      'Write professional red team operation reports',
    ],
    curriculum: [
      { module: 'Module 1', title: 'Red Team Fundamentals', topics: ['Red team vs pentest', 'MITRE ATT&CK framework', 'C2 infrastructure setup', 'OpSec principles'] },
      { module: 'Module 2', title: 'Initial Access & DMZ Breach', topics: ['Phishing campaigns', 'Exploiting public-facing apps', 'VPN and firewall bypass', 'Establishing foothold'] },
      { module: 'Module 3', title: 'Active Directory Attacks', topics: ['AD enumeration', 'Kerberoasting & AS-REP roasting', 'Pass-the-hash / Pass-the-ticket', 'DCSync attack'] },
      { module: 'Module 4', title: 'Lateral Movement & Pivoting', topics: ['WMI and PSExec', 'SSH tunneling', 'Proxychains and SOCKS', 'Pivoting through networks'] },
      { module: 'Module 5', title: 'Evasion & Persistence', topics: ['AV/EDR evasion', 'AMSI bypass', 'Registry persistence', 'Scheduled tasks and services'] },
      { module: 'Module 6', title: 'MSSQL Abuse & Reporting', topics: ['MSSQL enumeration', 'xp_cmdshell abuse', 'Linked server attacks', 'Red team report writing'] },
    ],
    requirements: ['Completion of FSST or equivalent', 'Basic Active Directory knowledge', 'Familiarity with Windows and Linux command line'],
    bg: 'from-red-900/20 to-black',
  },
  dmccbt: {
    title: 'FANOS SEC Certified Blue Teamer',
    abbrev: 'FSCBT',
    subtitle: 'ADVANCED DEFENSE & THREAT HUNTING',
    level: 'Advanced',
    isFree: true,
    colorPrimary: '#00BFFF',
    colorSecondary: '#00334d',
    Icon: Lock,
    duration: '6 months',
    students: 'New',
    rating: '5.0',
    description: 'An advanced Blue Teaming course focused on proactively defending enterprise infrastructure. You will master threat hunting, incident response, SIEM engineering, malware analysis, and network forensics. Learn to detect and respond to Advanced Persistent Threats (APTs) before they cause damage.',
    whatYouLearn: [
      'Build and tune SIEM rules for threat detection',
      'Perform proactive threat hunting across endpoints',
      'Analyze malware samples statically and dynamically',
      'Conduct full incident response investigations',
      'Perform network forensics and packet analysis',
      'Detect lateral movement and persistence techniques',
      'Harden enterprise infrastructure against APTs',
      'Earn the FSCBT certification upon completion',
    ],
    curriculum: [
      { module: 'Module 1', title: 'Blue Team Foundations', topics: ['SOC structure and roles', 'Threat intelligence basics', 'Kill chain and ATT&CK', 'Log sources overview'] },
      { module: 'Module 2', title: 'SIEM Engineering', topics: ['Splunk/ELK setup', 'Writing detection rules', 'Alert tuning', 'Dashboard creation'] },
      { module: 'Module 3', title: 'Threat Hunting', topics: ['Hypothesis-based hunting', 'Hunting with Sigma rules', 'Endpoint telemetry analysis', 'Hunting APT techniques'] },
      { module: 'Module 4', title: 'Malware Analysis', topics: ['Static analysis with PE tools', 'Dynamic analysis in sandbox', 'Behavioral indicators', 'YARA rule writing'] },
      { module: 'Module 5', title: 'Incident Response', topics: ['IR lifecycle', 'Evidence collection', 'Memory forensics with Volatility', 'Containment and eradication'] },
      { module: 'Module 6', title: 'Network Forensics & Certification', topics: ['Wireshark deep dive', 'Network anomaly detection', 'Full IR simulation', 'FSCBT certification exam'] },
    ],
    requirements: ['Strong understanding of networking', 'Basic knowledge of Windows/Linux administration', 'Familiarity with security concepts'],
    bg: 'from-blue-900/20 to-black',
  },
};

export default function CourseEnroll() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const course = COURSE_DETAILS[id];

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center text-red-400 pt-20">
      Course not found. <button onClick={() => navigate('/')} className="ml-2 text-cyber-neon underline">Go Home</button>
    </div>
  );

  const Icon = course.Icon;

  const handleStart = () => {
    if (user) navigate('/dashboard');
    else navigate('/signup');
  };

  return (
    <div className={`min-h-screen pt-24 pb-20 bg-gradient-to-b ${course.bg} bg-[#0d1117]`}>
      <div className="max-w-5xl mx-auto px-4">

        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#161b22] border border-gray-800 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${course.colorPrimary}15`, border: `1px solid ${course.colorPrimary}40` }}>
              <Icon className="w-10 h-10" style={{ color: course.colorPrimary }} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-1 rounded-full border"
                  style={{ color: course.colorPrimary, borderColor: `${course.colorPrimary}40`, background: `${course.colorPrimary}15` }}>
                  {course.level}
                </span>
                {course.isFree && <span className="text-xs font-black text-cyber-neon px-2 py-1 bg-cyber-neon/10 border border-cyber-neon/30 rounded-full">FREE</span>}
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-1">{course.title}</h1>
              <p className="text-xs font-bold tracking-widest mb-4" style={{ color: course.colorPrimary }}>{course.subtitle}</p>
              <p className="text-gray-300 leading-relaxed text-sm mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" style={{ color: course.colorPrimary }} /> {course.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" style={{ color: course.colorPrimary }} /> {course.students} students</span>
                <span className="flex items-center gap-1"><Star className="w-4 h-4" style={{ color: course.colorPrimary }} /> {course.rating} rating</span>
              </div>
              <motion.button onClick={handleStart} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-black text-sm tracking-widest uppercase transition-all"
                style={{ backgroundColor: course.colorPrimary, color: '#000', boxShadow: `0 0 20px ${course.colorPrimary}40` }}>
                <Play className="w-4 h-4" /> {user ? 'Start Learning' : 'Enroll Now — Free'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Curriculum */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Course Curriculum</h2>
            {course.curriculum.map((mod, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${course.colorPrimary}20`, color: course.colorPrimary }}>{mod.module}</span>
                  <h3 className="text-white font-bold text-sm">{mod.title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {mod.topics.map((t, ti) => (
                    <li key={ti} className="flex items-center gap-2 text-gray-400 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: course.colorPrimary }}></div>
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* What you'll learn */}
            <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
              <h3 className="text-white font-bold mb-4">What You'll Learn</h3>
              <ul className="space-y-2">
                {course.whatYouLearn.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-xs">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: course.colorPrimary }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-[#161b22] border border-gray-800 rounded-xl p-5">
              <h3 className="text-white font-bold mb-4">Requirements</h3>
              <ul className="space-y-2">
                {course.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: course.colorPrimary }}></div>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-[#161b22] border rounded-xl p-5 text-center" style={{ borderColor: `${course.colorPrimary}40` }}>
              <p className="text-white font-bold mb-1">{course.isFree ? 'This course is FREE' : 'Premium Course'}</p>
              <p className="text-gray-400 text-xs mb-4">{course.isFree ? 'No payment required. Start immediately.' : 'Contact us to enroll.'}</p>
              <button onClick={handleStart}
                className="w-full py-3 rounded-xl font-black text-xs tracking-widest uppercase transition-all"
                style={{ backgroundColor: course.colorPrimary, color: '#000' }}>
                {user ? 'Go to Dashboard' : 'Get Started'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
