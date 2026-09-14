import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, Circle, ChevronDown, ChevronUp, Play } from 'lucide-react';

const LEVELS = [
  {
    level: 'Level 1 - Getting Started',
    desc: 'Before getting started with challenges and CTFs (Capture the Flags), we recommend easing in with the following training:',
    rooms: [
      { title: 'Intro to Offensive Security', desc: 'Hack your first website (in a legal and safe environment) and experience an ethical hacker\'s job.', mins: 40, done: false },
      { title: 'Intro to Defensive Security', desc: 'Become a defender and stop a live attack.', mins: 30, done: false },
      { title: 'Experience Cyber Security', desc: 'Experience three different careers in cyber security.', mins: 60, done: false },
      { title: 'Search Skills', desc: 'Learn how to use the internet to your advantage.', mins: 30, done: false },
      { title: 'Linux Fundamentals Part 1', desc: 'Learn how to use the Linux operating system, a critical skill in cyber security.', mins: 60, done: false },
    ],
  },
  {
    level: 'Level 2 - Networking',
    desc: 'Understanding networking is fundamental to cyber security. Learn how data travels across the internet.',
    rooms: [
      { title: 'What is Networking?', desc: 'Begin learning the fundamentals of computer networking.', mins: 30, done: false },
      { title: 'Intro to LAN', desc: 'Learn about the key networking concepts that form a Local Area Network (LAN).', mins: 45, done: false },
      { title: 'OSI Model', desc: 'Learn about the critical networking framework that determines how data is sent and received.', mins: 60, done: false },
      { title: 'Packets & Frames', desc: 'Understand how data is divided into packets and frames for transmission.', mins: 45, done: false },
      { title: 'Extending Your Network', desc: 'Learn about technologies used to extend networks and their security implications.', mins: 30, done: false },
    ],
  },
  {
    level: 'Level 3 - How The Web Works',
    desc: 'To become a better hacker it\'s vital that you understand the underlying functions of the world wide web.',
    rooms: [
      { title: 'DNS in Detail', desc: 'Learn how DNS works and how it can be exploited.', mins: 30, done: false },
      { title: 'HTTP in Detail', desc: 'Learn about how you request content from a web server using the HTTP protocol.', mins: 30, done: false },
      { title: 'How Websites Work', desc: 'To exploit a website, you first need to know how they are created.', mins: 30, done: false },
      { title: 'Putting It All Together', desc: 'Learn how all the individual components of the web work together to bring you access to your favourite web sites.', mins: 30, done: false },
    ],
  },
  {
    level: 'Level 4 - Linux Fundamentals',
    desc: 'Many servers and security tools run on Linux. Get comfortable with the Linux command line.',
    rooms: [
      { title: 'Linux Fundamentals Part 1', desc: 'Embark on the journey of learning the fundamentals of Linux. Learn to run some of the first essential commands on an interactive terminal.', mins: 60, done: false },
      { title: 'Linux Fundamentals Part 2', desc: 'Continue your learning Linux journey with part two. You will be learning how to log in to a Linux machine using SSH, how to advance your commands, file system interaction.', mins: 60, done: false },
      { title: 'Linux Fundamentals Part 3', desc: 'Power-up your Linux skills and get hands-on with some common utilities that you are likely to use day-to-day!', mins: 60, done: false },
    ],
  },
  {
    level: 'Level 5 - Windows Fundamentals',
    desc: 'Get hands-on access to Windows and its security controls. This is the most widely used OS in enterprise environments.',
    rooms: [
      { title: 'Windows Fundamentals 1', desc: 'In part 1 of the Windows Fundamentals module, we\'ll start our journey learning about the Windows desktop, the NTFS file system, UAC, the Control Panel, and more.', mins: 60, done: false },
      { title: 'Windows Fundamentals 2', desc: 'In part 2 of the Windows Fundamentals module, discover more about System Configuration, UAC Settings, Resource Monitoring, the Windows Registry and more.', mins: 60, done: false },
      { title: 'Windows Fundamentals 3', desc: 'In part 3 of the Windows Fundamentals module, learn about the built-in Microsoft tools that help keep the device secure.', mins: 60, done: false },
    ],
  },
];

export default function PreSecurityPath() {
  const navigate = useNavigate();
  const [openLevel, setOpenLevel] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalRooms = LEVELS.reduce((a, l) => a + l.rooms.length, 0);
  const doneCount = Object.values(completed).filter(Boolean).length;
  const pct = Math.round((doneCount / totalRooms) * 100);

  const toggleRoom = (key) => setCompleted(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0d1117] px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <button onClick={() => navigate('/career-paths')}
          className="flex items-center gap-2 text-gray-400 hover:text-cyber-neon mb-8 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Career Paths
        </button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#161b22] border border-gray-800 rounded-2xl p-8 mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-mono">LEARNING PATH</p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🛡️</span>
            <h1 className="text-4xl font-black text-white">Pre Security</h1>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-5">
            <Clock className="w-4 h-4" />
            <span>Estimated time: 19h 10m</span>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl">
            To attack or defend any technology, you first need to understand what powers it. Explore computer basics, write your first lines of code, and discover how networking, the web, and real world cyber attacks all connect. Your cyber security journey starts here!
          </p>

          {/* Prerequisites */}
          <div className="bg-black/30 border border-gray-700 rounded-xl p-5 mb-6">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <span>📋</span> Prerequisites
            </h3>
            <p className="text-white text-sm font-semibold mb-2">No Prior Knowledge</p>
            <ul className="list-disc list-inside text-gray-400 text-sm">
              <li>You need no prerequisite to start this pathway! Just enthusiasm and excitement to learn!</li>
            </ul>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>{doneCount}/{totalRooms} rooms completed</span>
              <span>{pct}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div className="h-full bg-cyber-neon rounded-full"
                initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
            </div>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-cyber-neon text-black font-bold rounded-lg hover:bg-cyber-neon/80 transition-all shadow-[0_0_15px_rgba(0,255,65,0.3)] text-sm">
            <Play className="w-4 h-4" /> Resume Learning
          </button>
        </motion.div>

        {/* Levels */}
        <div className="space-y-3">
          {LEVELS.map((lvl, li) => {
            const lvlDone = lvl.rooms.filter((_, ri) => completed[`${li}-${ri}`]).length;
            const isOpen = openLevel === li;
            return (
              <motion.div key={li} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: li * 0.08 }}
                className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden">

                {/* Level header */}
                <button onClick={() => setOpenLevel(isOpen ? -1 : li)}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3 text-left">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      lvlDone === lvl.rooms.length ? 'bg-cyber-neon text-black' : 'bg-gray-800 text-gray-400'
                    }`}>{li + 1}</div>
                    <div>
                      <p className="text-white font-bold text-sm">{lvl.level}</p>
                      <p className="text-gray-500 text-xs">{lvlDone}/{lvl.rooms.length} completed</p>
                    </div>
                  </div>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>

                {/* Level content */}
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-gray-800">
                    <p className="text-gray-400 text-sm leading-relaxed my-4">{lvl.desc}</p>
                    <div className="space-y-2">
                      {lvl.rooms.map((room, ri) => {
                        const key = `${li}-${ri}`;
                        const done = !!completed[key];
                        return (
                          <div key={ri} onClick={() => toggleRoom(key)}
                            className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                              done ? 'border-cyber-neon/30 bg-cyber-neon/5' : 'border-gray-700 hover:border-gray-500 bg-black/20'
                            }`}>
                            {done
                              ? <CheckCircle className="w-5 h-5 text-cyber-neon flex-shrink-0 mt-0.5" />
                              : <Circle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                            }
                            <div className="flex-1 min-w-0">
                              <p className={`font-semibold text-sm ${done ? 'text-cyber-neon' : 'text-white'}`}>{room.title}</p>
                              <p className="text-gray-400 text-xs mt-1 leading-relaxed">{room.desc}</p>
                            </div>
                            <span className="text-gray-500 text-xs flex-shrink-0 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {room.mins}m
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
