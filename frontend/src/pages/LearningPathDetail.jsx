import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Layers, BookOpen, CheckCircle2, Play, Terminal, Award } from 'lucide-react';
import { LEARNING_PATHS_DATA } from './LearningPaths';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LearningPathDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const path = LEARNING_PATHS_DATA.find(p => p.id === id);

  if (!path) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Learning Path Not Found</h2>
        <Link to="/learning-paths" className="text-cyber-neon hover:underline">
          Return to Learning Paths
        </Link>
      </div>
    );
  }

  const Icon = path.icon;

  return (
    <div className="min-h-screen pt-28 pb-20 bg-cyber-dark text-white selection:bg-cyber-neon selection:text-black">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/learning-paths')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Learning Paths</span>
        </button>

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#090d14] border border-white/10 rounded-3xl p-8 sm:p-10 mb-10 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 p-4"
              style={{ backgroundColor: `${path.color}15`, border: `2px solid ${path.color}40` }}
            >
              <Icon className="w-12 h-12" style={{ color: path.color }} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-md border border-white/10 text-gray-300 bg-white/5 uppercase">
                  {path.level}
                </span>
                <span className="text-xs font-mono text-gray-400 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" /> Estimated: {path.duration}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  • {path.modulesCount} Modules
                </span>
                <span className="text-xs font-mono text-gray-400">
                  • {path.labsCount} Hands-on Labs
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-wide font-sans">
                {path.title}
              </h1>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light mb-8 max-w-3xl">
                {path.fullDesc}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to={user ? `/enroll/${path.connectedCourse}` : '/signup'}
                  className="px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center space-x-2 shadow-lg cursor-pointer"
                  style={{ backgroundColor: path.color, color: '#000' }}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{user ? 'Enroll & Begin Path' : 'Sign Up to Start Path'}</span>
                </Link>

                <Link
                  to="/labs"
                  className="px-6 py-3.5 rounded-xl border border-white/20 hover:border-cyber-cyan text-gray-200 hover:text-white font-bold text-sm uppercase tracking-wider transition-all flex items-center space-x-2 bg-black/40"
                >
                  <Terminal className="w-4 h-4 text-cyber-cyan" />
                  <span>Launch Connected Labs</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modules & Curriculum */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Curriculum Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-white tracking-wide">Path Curriculum</h2>
              <span className="text-xs font-mono text-gray-400">{path.curriculum.length} Core Modules</span>
            </div>

            {path.curriculum.map((mod, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-[#090d14] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-gray-300">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white">{mod.module}</h3>
                  </div>
                  <span className="text-xs font-mono text-gray-400 bg-black/40 px-2.5 py-1 rounded border border-white/5">
                    ⏱ {mod.duration}
                  </span>
                </div>

                <div className="space-y-2.5 pl-10 border-l border-white/10 ml-3.5 my-2">
                  {mod.topics.map((t, ti) => (
                    <div key={ti} className="flex items-start text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full mr-2.5 mt-2 shrink-0" style={{ backgroundColor: path.color }}></div>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Certification Badge Info */}
            <div className="bg-[#090d14] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Target Certification</h4>
                  <p className="text-xs text-gray-400 uppercase font-mono">Verifiable Credential</p>
                </div>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed mb-4">
                Completing this roadmap and all module assessments qualifies you to earn an official FANOS SEC certificate of completion.
              </p>
              <Link
                to={`/enroll/${path.connectedCourse}`}
                className="w-full py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500 hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center"
              >
                View Connected Exam
              </Link>
            </div>

            {/* Prerequisites */}
            <div className="bg-[#090d14] border border-white/10 rounded-2xl p-6">
              <h4 className="text-base font-bold text-white mb-3">Prerequisites</h4>
              <ul className="space-y-2 text-xs text-gray-400 leading-relaxed">
                <li>• Basic familiarity with web navigation and computer systems.</li>
                <li>• Recommended at least 8GB RAM for running browser sandboxes.</li>
                <li>• Passion for problem-solving and cyber defense.</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
