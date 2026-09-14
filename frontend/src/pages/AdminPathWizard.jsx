import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, Map, Plus, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ICONS = ['🛡️','🎯','🌐','🦠','🔍','💻','🔐','⚡','🧠','🕵️','🔥','🚀'];
const COLORS = ['#00FF41','#00FFFF','#FF003C','#9B59B6','#FF6B00','#F1C40F','#3498DB','#E74C3C'];

export default function AdminPathWizard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', difficulty: 'Beginner',
    icon: '🛡️', color: '#00FF41', estimatedHours: 10, courses: [],
  });

  const authHeader = { headers: { Authorization: `Bearer ${user?.token}` } };

  useEffect(() => {
    axios.get(`${API}/courses`).then(r => setCourses(r.data));
  }, []);

  const toggleCourse = (id) => {
    setForm(f => ({
      ...f,
      courses: f.courses.includes(id) ? f.courses.filter(c => c !== id) : [...f.courses, id]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/paths`, form, authHeader);
      navigate('/admin');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating path');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
      <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-gray-400 hover:text-cyber-neon mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Admin
      </button>

      <div className="flex items-center gap-3 mb-8">
        <Map className="w-8 h-8 text-purple-400" />
        <div>
          <h1 className="text-3xl font-black text-white">Create Learning Path</h1>
          <p className="text-gray-400 text-sm">Group courses into a structured learning journey</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-black/40 border border-gray-800 rounded-xl p-6 space-y-5">
          <h2 className="text-white font-bold border-b border-gray-800 pb-3">Path Details</h2>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Path Title *</label>
            <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g., Penetration Tester" />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Description *</label>
            <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})}
              rows={3} className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500 resize-none"
              placeholder="What will students achieve by completing this path?" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Difficulty</label>
              <select value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Estimated Hours</label>
              <input type="number" value={form.estimatedHours} onChange={e => setForm({...form, estimatedHours: e.target.value})}
                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                min="1" />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Icon</label>
            <div className="flex flex-wrap gap-2">
              {ICONS.map(icon => (
                <button type="button" key={icon} onClick={() => setForm({...form, icon})}
                  className={`w-10 h-10 text-xl rounded-lg border transition-all ${form.icon === icon ? 'border-purple-500 bg-purple-500/20' : 'border-gray-700 bg-black/30 hover:border-gray-500'}`}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Color</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map(color => (
                <button type="button" key={color} onClick={() => setForm({...form, color})}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${form.color === color ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ background: color }} />
              ))}
            </div>
          </div>
        </div>

        {/* Course Selection */}
        <div className="bg-black/40 border border-gray-800 rounded-xl p-6">
          <h2 className="text-white font-bold border-b border-gray-800 pb-3 mb-4">
            Select Courses ({form.courses.length} selected)
          </h2>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {courses.map(c => (
              <label key={c._id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                form.courses.includes(c._id) ? 'border-purple-500/50 bg-purple-500/10' : 'border-gray-800 hover:border-gray-600'
              }`}>
                <input type="checkbox" checked={form.courses.includes(c._id)} onChange={() => toggleCourse(c._id)} className="accent-purple-500" />
                <div>
                  <p className="text-white text-sm font-medium">{c.title}</p>
                  <p className="text-gray-500 text-xs">{c.category}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-black/40 border border-gray-800 rounded-xl p-6">
          <h2 className="text-white font-bold border-b border-gray-800 pb-3 mb-4">Preview</h2>
          <div className="border rounded-xl p-5" style={{ borderColor: `${form.color}40` }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{form.icon}</span>
              <div>
                <h3 className="text-white font-bold">{form.title || 'Path Title'}</h3>
                <span className="text-xs" style={{ color: form.color }}>{form.difficulty} · {form.estimatedHours}h</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">{form.description || 'Path description...'}</p>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-400 transition-all shadow-[0_0_15px_rgba(155,89,182,0.4)] disabled:opacity-50">
          {loading ? 'Creating...' : 'Create Learning Path'}
        </button>
      </form>
    </div>
  );
}
