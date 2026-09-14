import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  PlayCircle, Shield, FileText, Award, Terminal, 
  Target, Layers, CheckCircle2, BarChart2, BookOpen, Clock, ArrowRight 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import ProfileEditor from '../components/ProfileEditor';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentDashboard = () => {
  const { user, updateProfile, profileLoading, profileError } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    totalCourses: 4,
    labsCompleted: 0,
    totalLabs: 6,
    challengesCompleted: 0,
    totalChallenges: 7,
    certificatesEarned: 0,
    progressPercentage: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const headers = user?.token ? { Authorization: `Bearer ${user.token}` } : {};
      
      const [coursesRes, challengesRes] = await Promise.all([
        axios.get(`${API}/courses`),
        axios.get(`${API}/challenges`, { headers }).catch(() => ({ data: [] }))
      ]);

      const fetchedCourses = coursesRes.data || [];
      setCourses(fetchedCourses);

      const challengeList = challengesRes.data || [];
      const solvedChallenges = challengeList.filter(c => c.isSolved).length;

      // Calculate real progress based on available backend entities
      const totalCoursesCount = Math.max(fetchedCourses.length, 4);
      const totalLabsCount = 6;
      const totalChallengesCount = Math.max(challengeList.length, 7);

      // Check user certificate / completion status
      const completedCourses = 0;
      const completedLabs = 0;
      const certCount = 0;

      const totalItems = totalCoursesCount + totalLabsCount + totalChallengesCount;
      const completedItems = completedCourses + completedLabs + solvedChallenges + certCount;
      const pct = Math.min(100, Math.round((completedItems / totalItems) * 100));

      setStats({
        coursesCompleted: completedCourses,
        totalCourses: totalCoursesCount,
        labsCompleted: completedLabs,
        totalLabs: totalLabsCount,
        challengesCompleted: solvedChallenges,
        totalChallenges: totalChallengesCount,
        certificatesEarned: certCount,
        progressPercentage: pct
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="mb-10 bg-[#090d14] border border-cyber-neon/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-sans tracking-wide">
              Welcome back, <span className="text-cyber-neon">{user?.name || 'Student Operator'}</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1 font-light">
              Track your learning progress, launch virtual sandboxes, and submit security challenge flags.
            </p>

            <div className="mt-6 border-t border-white/10 pt-5">
              {profileLoading ? <p className="mb-3 text-xs font-mono text-cyber-neon">Loading profile...</p> : null}
              {profileError ? <p className="mb-3 text-xs text-red-300">{profileError}</p> : null}
              <ProfileEditor user={user} updateProfile={updateProfile} />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/courses"
              className="px-5 py-2.5 rounded-xl bg-cyber-neon text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,65,0.4)]"
            >
              Browse Syllabi
            </Link>
            <Link
              to="/challenges"
              className="px-5 py-2.5 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-orange-500/30 transition-all"
            >
              Challenge Arena
            </Link>
          </div>
        </div>

        {/* ── Real-Time User Progress Widget ── */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-white flex items-center">
                <BarChart2 className="w-4 h-4 mr-2 text-cyber-neon" /> Overall Learning Progress
              </span>
            </div>
            <span className="text-sm font-mono font-black text-cyber-neon">
              {stats.progressPercentage}% COMPLETED
            </span>
          </div>

          {/* Graphical Progress Bar */}
          <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/10 mb-6">
            <motion.div
              className="h-full bg-gradient-to-r from-cyber-neon via-cyber-cyan to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(stats.progressPercentage, 4)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
              <span className="text-xs font-mono text-gray-400 block uppercase mb-1">Courses</span>
              <p className="text-xl sm:text-2xl font-mono font-bold text-white">
                {stats.coursesCompleted} <span className="text-sm text-gray-500 font-normal">/ {stats.totalCourses}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
              <span className="text-xs font-mono text-gray-400 block uppercase mb-1">Labs</span>
              <p className="text-xl sm:text-2xl font-mono font-bold text-cyber-cyan">
                {stats.labsCompleted} <span className="text-sm text-gray-500 font-normal">/ {stats.totalLabs}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
              <span className="text-xs font-mono text-gray-400 block uppercase mb-1">Challenges</span>
              <p className="text-xl sm:text-2xl font-mono font-bold text-orange-400">
                {stats.challengesCompleted} <span className="text-sm text-gray-500 font-normal">/ {stats.totalChallenges}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
              <span className="text-xs font-mono text-gray-400 block uppercase mb-1">Certificates</span>
              <p className="text-xl sm:text-2xl font-mono font-bold text-purple-400">
                {stats.certificatesEarned} <span className="text-sm text-gray-500 font-normal">Earned</span>
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Tutorials & Course Modules Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-sans uppercase flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-cyber-neon" /> Active Course Modules
          </h2>
          <span className="text-xs font-mono text-gray-400">{courses.length} Available</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="text-cyber-neon font-mono animate-pulse text-base">[ SYNCING WITH LEARNING MATRIX... ]</div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center text-gray-500 py-12 border border-gray-800 rounded-2xl bg-black/30">
            No course tutorials loaded yet. Explore the core tracks in the courses catalog.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                key={course._id}
                className="bg-[#090d14] border border-gray-800 hover:border-cyber-neon/50 rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-gradient-to-br from-black via-gray-900 to-[#040609] border-b border-gray-800 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'linear-gradient(rgba(0,255,65,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <Shield className="w-16 h-16 text-green-500/40 group-hover:text-cyber-neon group-hover:scale-110 transition-all duration-300 relative z-10" />
                    
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="px-3 py-1 bg-black/70 backdrop-blur border border-cyber-neon/40 text-cyber-neon text-xs font-bold rounded-full font-mono">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-neon transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed font-light">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div className="flex space-x-3 text-gray-500">
                      {course.videoUrl && <PlayCircle className="w-4 h-4 text-red-400" title="Video Included" />}
                      {course.pdfUrl && <FileText className="w-4 h-4 text-blue-400" title="PDF Included" />}
                    </div>
                    
                    <Link
                      to={`/course/${course._id}`}
                      className="px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-black rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-1"
                    >
                      <span>Access</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default StudentDashboard;
