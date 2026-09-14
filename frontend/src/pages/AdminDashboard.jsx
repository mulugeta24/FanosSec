import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusCircle, Database, BookOpen, Users, Mail, Shield,
  Trash2, Edit, Eye, Youtube, FileText, Map, CheckCircle,
  XCircle, BarChart2, Terminal, Lock
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-black/40 border border-gray-800 rounded-xl p-5 flex items-center space-x-4">
    <div className={`p-3 rounded-lg`} style={{ background: `${color}15` }}>
      {React.cloneElement(icon, { className: 'w-7 h-7', style: { color } })}
    </div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
    </div>
  </div>
);

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [tab, setTab] = useState('overview');
  const [courses, setCourses] = useState([]);
  const [paths, setPaths] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const authHeader = { headers: { Authorization: `Bearer ${user?.token}` } };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [c, p, co, b] = await Promise.all([
        axios.get(`${API}/courses`),
        axios.get(`${API}/paths`),
        axios.get(`${API}/contacts`, authHeader),
        axios.get(`${API}/blogs`),
      ]);
      setCourses(c.data);
      setPaths(p.data);
      setContacts(co.data);
      setBlogs(b.data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    await axios.delete(`${API}/courses/${id}`, authHeader);
    setCourses(courses.filter(c => c._id !== id));
  };

  const deletePath = async (id) => {
    if (!window.confirm('Delete this path?')) return;
    await axios.delete(`${API}/paths/${id}`, authHeader);
    setPaths(paths.filter(p => p._id !== id));
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    await axios.delete(`${API}/blogs/${id}`, authHeader);
    setBlogs(blogs.filter(b => b._id !== id));
  };

  const markContactRead = async (id) => {
    await axios.put(`${API}/contacts/${id}`, { isRead: true }, authHeader);
    setContacts(contacts.map(c => c._id === id ? { ...c, isRead: true } : c));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'paths', label: 'Learning Paths', icon: <Map className="w-4 h-4" /> },
    { id: 'blogs', label: 'Blogs', icon: <FileText className="w-4 h-4" /> },
    { id: 'contacts', label: 'Messages', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">

      {/* ── Admin Bio Header ── */}
      <div className="relative mb-10 bg-gradient-to-r from-black via-gray-900 to-black border border-cyber-neon/20 rounded-2xl p-6 md:p-8 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(0,255,65,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.3) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-cyber-neon overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.5)]">
              <img src="/mulugeta.jpg" alt="Admin" className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML='<div class="w-full h-full bg-cyber-neon/20 flex items-center justify-center text-3xl">👤</div>'; }} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cyber-neon rounded-full flex items-center justify-center">
              <Lock className="w-3 h-3 text-black" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-black text-white font-mono">Mulugeta Ababi</h1>
              <span className="px-2 py-0.5 bg-cyber-neon/20 border border-cyber-neon/50 text-cyber-neon text-xs font-bold rounded-full">ADMIN</span>
            </div>
            <p className="text-gray-400 text-sm mb-3">Cybersecurity Instructor & Platform Administrator · FANOS SEC</p>
            <div className="flex flex-wrap gap-2">
              {['Ethical Hacking', 'Penetration Testing', 'Malware Analysis', 'Digital Forensics'].map(tag => (
                <span key={tag} className="px-2 py-1 bg-white/5 border border-gray-700 text-gray-300 text-xs rounded-full">{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 min-w-fit">
            <Link to="/admin/wizard" className="px-5 py-2.5 bg-cyber-neon text-black font-bold rounded-lg flex items-center gap-2 hover:bg-cyber-neon/80 transition-all shadow-[0_0_15px_rgba(0,255,65,0.3)] text-sm">
              <PlusCircle className="w-4 h-4" /> Add Course
            </Link>
            <Link to="/admin/path/new" className="px-5 py-2.5 bg-purple-500/20 border border-purple-500/50 text-purple-300 font-bold rounded-lg flex items-center gap-2 hover:bg-purple-500/30 transition-all text-sm">
              <Map className="w-4 h-4" /> Add Path
            </Link>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 mb-8 bg-black/40 border border-gray-800 rounded-xl p-1 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${tab === t.id ? 'bg-cyber-neon text-black' : 'text-gray-400 hover:text-white'}`}>
            {t.icon} {t.label}
            {t.id === 'contacts' && contacts.filter(c => !c.isRead).length > 0 && (
              <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {contacts.filter(c => !c.isRead).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-cyber-neon text-center py-20 animate-pulse font-mono">[ LOADING DATABASE... ]</div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {/* ── OVERVIEW ── */}
            {tab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard icon={<BookOpen />} label="Total Courses" value={courses.length} color="#00FF41" />
                  <StatCard icon={<Map />} label="Learning Paths" value={paths.length} color="#9B59B6" />
                  <StatCard icon={<FileText />} label="Blog Posts" value={blogs.length} color="#00FFFF" />
                  <StatCard icon={<Mail />} label="Messages" value={contacts.length} color="#FF003C" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Courses */}
                  <div className="bg-black/40 border border-gray-800 rounded-xl p-5">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-cyber-neon" /> Recent Courses</h3>
                    <div className="space-y-3">
                      {courses.slice(0, 4).map(c => (
                        <div key={c._id} className="flex items-center justify-between py-2 border-b border-gray-800/50">
                          <div>
                            <p className="text-white text-sm font-medium">{c.title}</p>
                            <p className="text-gray-500 text-xs">{c.category}</p>
                          </div>
                          <div className="flex gap-1">
                            {c.videoUrl && <Youtube className="w-4 h-4 text-red-400" />}
                            {c.pdfUrl && <FileText className="w-4 h-4 text-blue-400" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Unread Messages */}
                  <div className="bg-black/40 border border-gray-800 rounded-xl p-5">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Mail className="w-4 h-4 text-red-400" /> Unread Messages</h3>
                    <div className="space-y-3">
                      {contacts.filter(c => !c.isRead).slice(0, 4).map(c => (
                        <div key={c._id} className="py-2 border-b border-gray-800/50">
                          <p className="text-white text-sm font-medium">{c.name}</p>
                          <p className="text-gray-400 text-xs line-clamp-1">{c.message}</p>
                        </div>
                      ))}
                      {contacts.filter(c => !c.isRead).length === 0 && <p className="text-gray-500 text-sm">No unread messages</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── COURSES ── */}
            {tab === 'courses' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">{courses.length} Courses</h2>
                  <Link to="/admin/wizard" className="px-4 py-2 bg-cyber-neon text-black font-bold rounded-lg flex items-center gap-2 text-sm hover:bg-cyber-neon/80 transition-all">
                    <PlusCircle className="w-4 h-4" /> Add Course
                  </Link>
                </div>
                <div className="bg-black/40 rounded-xl border border-gray-800 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-900 border-b border-gray-800">
                        <th className="p-4 text-gray-400 text-sm">Title</th>
                        <th className="p-4 text-gray-400 text-sm">Category</th>
                        <th className="p-4 text-gray-400 text-sm">Resources</th>
                        <th className="p-4 text-gray-400 text-sm">Date</th>
                        <th className="p-4 text-gray-400 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map(c => (
                        <tr key={c._id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-white font-medium text-sm">{c.title}</td>
                          <td className="p-4">
                            <span className="px-2 py-1 text-xs rounded-full bg-cyber-neon/10 text-cyber-neon border border-cyber-neon/30">{c.category}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              {c.videoUrl && <span className="flex items-center gap-1 text-xs text-red-400"><Youtube className="w-3 h-3" /> Video</span>}
                              {c.pdfUrl && <span className="flex items-center gap-1 text-xs text-blue-400"><FileText className="w-3 h-3" /> PDF</span>}
                              {c.theoryContent && <span className="flex items-center gap-1 text-xs text-green-400"><Terminal className="w-3 h-3" /> Theory</span>}
                            </div>
                          </td>
                          <td className="p-4 text-gray-400 text-xs">{new Date(c.createdAt).toLocaleDateString()}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Link to={`/admin/wizard?edit=${c._id}`} className="p-1.5 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/20 transition-colors">
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button onClick={() => deleteCourse(c._id)} className="p-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {courses.length === 0 && <div className="p-8 text-center text-gray-500">No courses yet.</div>}
                </div>
              </div>
            )}

            {/* ── LEARNING PATHS ── */}
            {tab === 'paths' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">{paths.length} Learning Paths</h2>
                  <Link to="/admin/path/new" className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 font-bold rounded-lg flex items-center gap-2 text-sm hover:bg-purple-500/30 transition-all">
                    <PlusCircle className="w-4 h-4" /> Add Path
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paths.map(p => (
                    <div key={p._id} className="bg-black/40 border border-gray-800 rounded-xl p-5 hover:border-purple-500/40 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{p.icon}</span>
                          <div>
                            <h3 className="text-white font-bold">{p.title}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${
                              p.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                              p.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                              'bg-red-500/10 text-red-400 border-red-500/30'
                            }`}>{p.difficulty}</span>
                          </div>
                        </div>
                        <button onClick={() => deletePath(p._id)} className="p-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{p.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{p.courses?.length || 0} courses · {p.estimatedHours}h estimated</span>
                      </div>
                    </div>
                  ))}
                  {paths.length === 0 && <div className="col-span-2 p-8 text-center text-gray-500 border border-gray-800 rounded-xl">No paths yet.</div>}
                </div>
              </div>
            )}

            {/* ── BLOGS ── */}
            {tab === 'blogs' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">{blogs.length} Blog Posts</h2>
                  <Link to="/admin/blog/new" className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 font-bold rounded-lg flex items-center gap-2 text-sm hover:bg-cyan-500/30 transition-all">
                    <PlusCircle className="w-4 h-4" /> Add Blog
                  </Link>
                </div>
                <div className="space-y-3">
                  {blogs.map(b => (
                    <div key={b._id} className="bg-black/40 border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-cyan-500/30 transition-all">
                      <div>
                        <h3 className="text-white font-medium text-sm">{b.title}</h3>
                        <p className="text-gray-500 text-xs mt-1">By {b.author} · {new Date(b.createdAt).toLocaleDateString()}</p>
                      </div>
                      <button onClick={() => deleteBlog(b._id)} className="p-1.5 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {blogs.length === 0 && <div className="p-8 text-center text-gray-500 border border-gray-800 rounded-xl">No blogs yet.</div>}
                </div>
              </div>
            )}

            {/* ── CONTACTS / MESSAGES ── */}
            {tab === 'contacts' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">{contacts.length} Messages ({contacts.filter(c => !c.isRead).length} unread)</h2>
                <div className="space-y-3">
                  {contacts.map(c => (
                    <div key={c._id} className={`bg-black/40 border rounded-xl p-5 transition-all ${c.isRead ? 'border-gray-800' : 'border-red-500/40 shadow-[0_0_10px_rgba(255,0,60,0.1)]'}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-bold text-sm">{c.name}</span>
                            <span className="text-gray-500 text-xs">{c.email}</span>
                            {!c.isRead && <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">NEW</span>}
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">{c.message}</p>
                          <p className="text-gray-600 text-xs mt-2">{new Date(c.createdAt).toLocaleString()}</p>
                        </div>
                        {!c.isRead && (
                          <button onClick={() => markContactRead(c._id)} className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors flex-shrink-0" title="Mark as read">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {contacts.length === 0 && <div className="p-8 text-center text-gray-500 border border-gray-800 rounded-xl">No messages yet.</div>}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
