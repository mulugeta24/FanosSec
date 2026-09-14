import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Youtube, FileText, BookOpen, Info, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const steps = [
  { id: 1, title: 'Basic Info', desc: 'Title & Category', icon: <Info className="w-4 h-4" /> },
  { id: 2, title: 'Video', desc: 'YouTube Tutorial', icon: <Youtube className="w-4 h-4" /> },
  { id: 3, title: 'PDF', desc: 'Resource Link', icon: <FileText className="w-4 h-4" /> },
  { id: 4, title: 'Theory', desc: 'Written Content', icon: <BookOpen className="w-4 h-4" /> },
];

const CATEGORIES = [
  'Penetration Testing', 'Network Security', 'Web Security',
  'Malware Analysis', 'Forensics', 'Cryptography', 'OSINT', 'Social Engineering', 'Cloud Security', 'Other'
];

// Convert any YouTube URL to embed format
const toEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('embed/')) return url;
  const match = url.match(/(?:youtu\.be\/|watch\?v=|&v=)([^#&?]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

export default function ManageSkillWizard() {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '', category: '', description: '',
    videoUrl: '', pdfUrl: '', theoryContent: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const authHeader = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.token}` } };

  useEffect(() => {
    if (editId) {
      axios.get(`${API}/courses/${editId}`).then(r => setFormData({
        title: r.data.title || '',
        category: r.data.category || '',
        description: r.data.description || '',
        videoUrl: r.data.videoUrl || '',
        pdfUrl: r.data.pdfUrl || '',
        theoryContent: r.data.theoryContent || '',
      }));
    }
  }, [editId]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.description) {
      setError('Please fill in Title, Category and Description before publishing.');
      setCurrentStep(1);
      return;
    }
    setError('');
    setLoading(true);
    try {
      const payload = { ...formData, videoUrl: toEmbedUrl(formData.videoUrl) };
      if (editId) {
        await axios.put(`${API}/courses/${editId}`, payload, authHeader);
      } else {
        await axios.post(`${API}/courses`, payload, authHeader);
      }
      navigate('/admin');
    } catch (error) {
      setError(error.response?.data?.message || error.response?.data?.error || 'Failed to save course. Check the backend is running.');
    }
    setLoading(false);
  };

  const embedUrl = toEmbedUrl(formData.videoUrl);

  return (
    <div className="min-h-screen pt-28 pb-10 px-4 md:px-8 max-w-4xl mx-auto">
      <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-gray-400 hover:text-cyber-neon mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Admin
      </button>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-neon to-purple-500 mb-2">
          {editId ? 'Edit Course' : 'Add New Course'}
        </h1>
        <p className="text-gray-400 text-sm">Fill in all steps to publish a complete tutorial.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center mb-8 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            <button onClick={() => setCurrentStep(step.id)} className="flex items-center gap-2 flex-shrink-0">
              <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                currentStep === step.id ? 'border-cyber-neon bg-cyber-neon/20 text-cyber-neon' :
                currentStep > step.id ? 'border-green-500 bg-green-500/20 text-green-400' :
                'border-gray-600 text-gray-500'
              }`}>
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <div className="hidden sm:block text-left">
                <p className={`text-xs font-bold ${currentStep >= step.id ? 'text-white' : 'text-gray-500'}`}>{step.title}</p>
                <p className="text-xs text-gray-600">{step.desc}</p>
              </div>
            </button>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 min-w-[20px] ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-700'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-cyber-neon/20 p-6 md:p-8 min-h-[420px] flex flex-col">
        <AnimatePresence mode="wait">

          {/* Step 1 */}
          {currentStep === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5 flex-1">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Info className="w-5 h-5 text-cyber-neon" /> Basic Information</h2>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Course Title *</label>
                <input name="title" value={formData.title} onChange={handleChange} required
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyber-neon"
                  placeholder="e.g., Introduction to Malware Analysis" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Category *</label>
                <select name="category" value={formData.category} onChange={handleChange}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyber-neon">
                  <option value="">-- Select Category --</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Short Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={3}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyber-neon resize-none"
                  placeholder="What will students learn from this course?" />
              </div>
            </motion.div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5 flex-1">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Youtube className="w-5 h-5 text-red-400" /> YouTube Video Tutorial</h2>
              <p className="text-gray-400 text-sm">Paste any YouTube link — regular, short, or embed. We'll convert it automatically.</p>
              <div>
                <label className="block text-gray-300 text-sm mb-2">YouTube URL</label>
                <input name="videoUrl" value={formData.videoUrl} onChange={handleChange}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-red-500"
                  placeholder="https://www.youtube.com/watch?v=XXXXXXX" />
              </div>
              {embedUrl && (
                <div>
                  <p className="text-gray-400 text-xs mb-2">Preview:</p>
                  <div className="aspect-video rounded-xl overflow-hidden border border-gray-700">
                    <iframe className="w-full h-full" src={embedUrl} title="Preview" frameBorder="0" allowFullScreen />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5 flex-1">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-blue-400" /> PDF Resource</h2>
              <p className="text-gray-400 text-sm">Link to a PDF document (Google Drive, Dropbox, or any direct URL). Students can download it.</p>
              <div>
                <label className="block text-gray-300 text-sm mb-2">PDF URL</label>
                <input name="pdfUrl" value={formData.pdfUrl} onChange={handleChange}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="https://drive.google.com/file/d/..." />
              </div>
              {formData.pdfUrl && (
                <a href={formData.pdfUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-sm hover:bg-blue-500/20 transition-all">
                  <FileText className="w-4 h-4" /> Test PDF Link
                </a>
              )}
            </motion.div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><BookOpen className="w-5 h-5 text-green-400" /> Theory Content</h2>
                <button type="button" onClick={() => setPreview(!preview)}
                  className="text-xs px-3 py-1.5 border border-gray-700 text-gray-300 rounded-lg hover:border-cyber-neon hover:text-cyber-neon transition-all">
                  {preview ? 'Edit' : 'Preview'}
                </button>
              </div>
              <p className="text-gray-400 text-sm">Write the theory content using HTML tags for formatting.</p>
              {preview ? (
                <div className="flex-1 min-h-[300px] bg-black/30 border border-gray-700 rounded-xl p-5 prose prose-invert max-w-none overflow-auto"
                  dangerouslySetInnerHTML={{ __html: formData.theoryContent }} />
              ) : (
                <textarea name="theoryContent" value={formData.theoryContent} onChange={handleChange}
                  className="flex-1 min-h-[300px] bg-black/50 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-green-500 font-mono text-sm resize-none"
                  placeholder="<h2>Introduction</h2><p>Your theory content here...</p><ul><li>Point 1</li></ul>" />
              )}
            </motion.div>
          )}

        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex flex-col gap-3 pt-5 border-t border-gray-800">
          {error && (
            <div className="px-4 py-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-sm">
              ⚠ {error}
            </div>
          )}
          <div className="flex justify-between items-center">
          <button onClick={() => setCurrentStep(s => Math.max(s - 1, 1))} disabled={currentStep === 1}
            className="px-5 py-2.5 rounded-lg font-semibold bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            Back
          </button>
          {currentStep < steps.length ? (
            <button onClick={() => setCurrentStep(s => s + 1)}
              className="px-6 py-2.5 rounded-lg font-bold bg-cyber-neon text-black hover:bg-cyber-neon/80 transition-all shadow-[0_0_10px_rgba(0,255,65,0.3)]">
              Next Step →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading}
              className="px-8 py-2.5 rounded-lg font-bold bg-green-500 text-black hover:bg-green-400 transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] disabled:opacity-50">
              {loading ? 'Saving...' : editId ? '✓ Update Course' : '✓ Publish Course'}
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
