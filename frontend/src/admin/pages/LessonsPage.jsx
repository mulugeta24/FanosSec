import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FileText } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader, StatusBadge, STATUS_COLORS } from '../adminUtils';

const LESSON_TYPES = ['theory', 'video', 'lab', 'quiz', 'document'];

const LessonsPage = () => {
    const [lessons, setLessons] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modules, setModules] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', module: '', order: 0,
        type: 'theory', content: '', videoUrl: '', fileUrl: '', fileType: 'PDF', duration: '', isPublished: false
    });

    useEffect(() => { fetchLessons(); fetchModules(); }, []);
    useEffect(() => {
        setFiltered(lessons.filter(l => l.title?.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, lessons]);

    const fetchModules = async () => {
        try {
            const res = await fetch(`${API}/modules`, { headers: getAuthHeader() });
            const data = await res.json();
            setModules(Array.isArray(data) ? data : []);
        } catch { /* ignore for now */ }
    };

    const fetchLessons = async () => {
        try {
            setLoading(true); setError(null);
            const res = await fetch(`${API}/lessons`, { headers: getAuthHeader() });
            const data = await res.json();
            setLessons(Array.isArray(data) ? data : []);
            setFiltered(Array.isArray(data) ? data : []);
        } catch { setError('Failed to load lessons.'); }
        finally { setLoading(false); }
    };

    const openCreate = () => {
        setEditingLesson(null);
        setFormData({ title: '', description: '', module: modules[0]?._id || '', order: 0, type: 'theory', content: '', videoUrl: '', fileUrl: '', fileType: 'PDF', duration: '', isPublished: false });
        setModalOpen(true);
    };

    const openEdit = (lesson) => {
        setEditingLesson(lesson);
        setFormData({ title: lesson.title || '', description: lesson.description || '', module: lesson.module?._id || lesson.module || '', order: lesson.order || 0, type: lesson.type || 'theory', content: lesson.content || '', videoUrl: lesson.videoUrl || '', fileUrl: lesson.fileUrl || '', fileType: lesson.fileType || 'PDF', duration: lesson.duration || '', isPublished: lesson.isPublished || false });
        setModalOpen(true);
    };

    const handleFileSelect = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setFormData((current) => ({
            ...current,
            fileUrl: URL.createObjectURL(file),
            fileType: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Document'
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); setSubmitting(true);
        try {
            const url = editingLesson ? `${API}/lessons/${editingLesson._id}` : `${API}/lessons`;
            const method = editingLesson ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(formData) });
            if (!res.ok) throw new Error((await res.json()).message || 'Save failed');
            setModalOpen(false); fetchLessons();
        } catch (err) { alert(err.message); }
        finally { setSubmitting(false); }
    };

    const handleDelete = async (lesson) => {
        if (!confirm(`Delete lesson "${lesson.title}"?`)) return;
        try {
            await fetch(`${API}/lessons/${lesson._id}`, { method: 'DELETE', headers: getAuthHeader() });
            fetchLessons();
        } catch { alert('Failed to delete lesson.'); }
    };

    const TYPE_COLORS = { theory: 'bg-cyan-500 bg-opacity-20 text-cyan-400', video: 'bg-red-500 bg-opacity-20 text-red-400', lab: 'bg-purple-500 bg-opacity-20 text-purple-400', quiz: 'bg-green-500 bg-opacity-20 text-green-400', document: 'bg-blue-500 bg-opacity-20 text-blue-400' };

    const columns = [
        { key: 'title', label: 'Title', sortable: true, render: (v) => <span className="font-semibold text-cyber-text">{v}</span> },
        { key: 'type', label: 'Type', render: (v) => <span className={`px-2 py-1 rounded text-xs font-semibold ${TYPE_COLORS[v] || 'bg-gray-500 bg-opacity-20 text-gray-400'}`}>{v}</span> },
        { key: 'module', label: 'Module', render: (v) => <span className="text-gray-400 text-xs">{v?.title || (typeof v === 'string' ? v : '—')}</span> },
        { key: 'order', label: 'Order', sortable: true, render: (v) => <span className="text-cyan-400">#{v}</span> },
        { key: 'duration', label: 'Duration', render: (v) => <span className="text-gray-400 text-xs">{v || '—'}</span> },
        { key: 'isPublished', label: 'Status', render: (v) => <StatusBadge value={v ? 'published' : 'draft'} colorMap={STATUS_COLORS} /> },
    ];

    return (
        <AdminLayout activeSection="lessons">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3"><FileText className="text-cyber-neon" size={28} />Lessons</h1>
                        <p className="text-cyber-muted text-sm mt-1">Manage course lessons and content</p>
                    </div>
                    <button onClick={openCreate} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold text-sm">
                        <Plus size={16} /> New Lesson
                    </button>
                </div>

                {error && <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm">{error}</div>}

                <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search lessons..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" />
                    </div>
                </div>

                {loading ? <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading lessons...</div> : filtered.length === 0 ? (
                    <div className="text-center py-16 text-cyber-muted"><FileText size={40} className="mx-auto mb-3 opacity-30" /><p>No lessons found. Add lessons to your modules.</p></div>
                ) : <DataTable data={filtered} columns={columns} onEdit={openEdit} onDelete={handleDelete} actions={['edit', 'delete']} />}

                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingLesson ? 'Edit Lesson' : 'Create Lesson'} size="lg">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Title *</label>
                            <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Description</label>
                            <textarea rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Module *</label>
                                <select required value={formData.module} onChange={e => setFormData({ ...formData, module: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    <option value="">Select module</option>
                                    {modules.map(module => <option key={module._id} value={module._id}>{module.title}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Type</label>
                                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {LESSON_TYPES.map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Order</label>
                                <input type="number" min="0" value={formData.order} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">File Type</label>
                                <select value={formData.fileType} onChange={e => setFormData({ ...formData, fileType: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {['PDF', 'Document', 'Image', 'Slide', 'Link'].map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Duration</label>
                                <input value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g., 15 minutes" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Video URL</label>
                                <input type="url" value={formData.videoUrl} onChange={e => setFormData({ ...formData, videoUrl: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Lesson file / PDF</label>
                            <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.ppt,.pptx,.txt" onChange={handleFileSelect} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-cyber-neon file:text-black file:font-semibold" />
                            {formData.fileUrl && <a href={formData.fileUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-cyber-neon underline">Open selected file</a>}
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="lessonPublished" checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} className="w-4 h-4 accent-cyber-neon" />
                            <label htmlFor="lessonPublished" className="text-sm text-cyber-text">Publish lesson</label>
                        </div>
                        <div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon border-opacity-10">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 text-cyber-text rounded-lg hover:bg-opacity-50 transition-all text-sm">Cancel</button>
                            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all font-semibold text-sm disabled:opacity-50">
                                {submitting ? 'Saving...' : editingLesson ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </motion.div>
        </AdminLayout>
    );
};

export default LessonsPage;
