import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, BookOpen, RefreshCw } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader, StatusBadge, DIFFICULTY_COLORS, STATUS_COLORS } from '../adminUtils';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', category: '', difficulty: 'Beginner',
        status: 'draft', instructor: '', estimatedHours: '', tags: '',
        videoUrl: '', pdfUrl: '', theoryContent: '',
    });

    useEffect(() => { fetchCourses(); }, []);

    useEffect(() => {
        let filtered = courses;
        if (searchTerm) filtered = filtered.filter(c =>
            c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.category?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filterStatus !== 'all') filtered = filtered.filter(c => (c.status || 'published') === filterStatus);
        setFilteredCourses(filtered);
    }, [searchTerm, filterStatus, courses]);

    const fetchCourses = async () => {
        try {
            setLoading(true); setError(null);
            const res = await fetch(`${API}/courses`, { headers: getAuthHeader() });
            const data = await res.json();
            setCourses(Array.isArray(data) ? data : []);
            setFilteredCourses(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Failed to load courses.');
        } finally { setLoading(false); }
    };

    const openCreate = () => {
        setEditingCourse(null);
        setFormData({ title: '', description: '', category: '', difficulty: 'Beginner', status: 'draft', instructor: '', estimatedHours: '', tags: '', videoUrl: '', pdfUrl: '', theoryContent: '' });
        setModalOpen(true);
    };

    const openEdit = (course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title || '', description: course.description || '',
            category: course.category || '', difficulty: course.difficulty || 'Beginner',
            status: course.status || 'published', instructor: course.instructor || '',
            estimatedHours: course.estimatedHours || '', tags: (course.tags || []).join(', '),
            videoUrl: course.videoUrl || '', pdfUrl: course.pdfUrl || '',
            theoryContent: course.theoryContent || '',
        });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const payload = { ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean), estimatedHours: Number(formData.estimatedHours) || 0 };
        try {
            const url = editingCourse ? `${API}/courses/${editingCourse._id}` : `${API}/courses`;
            const method = editingCourse ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(payload) });
            if (!res.ok) throw new Error((await res.json()).message || 'Save failed');
            setModalOpen(false);
            fetchCourses();
        } catch (err) {
            alert(err.message);
        } finally { setSubmitting(false); }
    };

    const handleDelete = async (course) => {
        if (!confirm(`Archive "${course.title}"? It will be hidden from learners.`)) return;
        try {
            await fetch(`${API}/courses/${course._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify({ status: 'archived' }) });
            fetchCourses();
        } catch (err) { alert('Failed to archive course.'); }
    };

    const togglePublish = async (course) => {
        const newStatus = (course.status === 'published') ? 'draft' : 'published';
        try {
            await fetch(`${API}/courses/${course._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify({ status: newStatus }) });
            fetchCourses();
        } catch (err) { alert('Failed to update status.'); }
    };

    const columns = [
        { key: 'title', label: 'Title', sortable: true, render: (v) => <span className="font-semibold text-cyber-text">{v}</span> },
        { key: 'category', label: 'Category', render: (v) => <span className="text-cyan-400 text-xs">{v}</span> },
        { key: 'difficulty', label: 'Difficulty', render: (v) => <StatusBadge value={v} colorMap={DIFFICULTY_COLORS} /> },
        { key: 'status', label: 'Status', render: (v) => <StatusBadge value={v || 'published'} colorMap={STATUS_COLORS} /> },
        { key: 'instructor', label: 'Instructor', render: (v) => <span className="text-gray-400 text-xs">{v || '—'}</span> },
        { key: 'createdAt', label: 'Created', sortable: true, render: (v) => <span className="text-gray-500 text-xs">{v ? new Date(v).toLocaleDateString() : '—'}</span> },
    ];

    return (
        <AdminLayout activeSection="courses">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3">
                            <BookOpen className="text-cyber-neon" size={28} /> Courses
                        </h1>
                        <p className="text-cyber-muted text-sm mt-1">Manage FANOS SEC learning courses</p>
                    </div>
                    <button onClick={openCreate} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold text-sm">
                        <Plus size={16} /> New Course
                    </button>
                </div>

                {error && <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm flex items-center justify-between">{error}<button onClick={fetchCourses} className="ml-2"><RefreshCw size={14} /></button></div>}

                <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search courses..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none focus:border-opacity-40 text-sm" />
                    </div>
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                        <option value="all">All Statuses</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                {loading ? (
                    <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading courses...</div>
                ) : filteredCourses.length === 0 ? (
                    <div className="text-center py-16 text-cyber-muted">
                        <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                        <p className="text-lg font-semibold mb-1">No courses found</p>
                        <p className="text-sm">Create your first FANOS SEC course to get started.</p>
                    </div>
                ) : (
                    <DataTable data={filteredCourses} columns={columns} onEdit={openEdit} onDelete={handleDelete} actions={['edit', 'delete']} />
                )}

                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCourse ? 'Edit Course' : 'Create New Course'} size="xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Title *</label>
                                <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none focus:border-opacity-40 text-sm" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Description *</label>
                                <textarea required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none focus:border-opacity-40 text-sm resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Category *</label>
                                <input required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="e.g., Web Security" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Difficulty</label>
                                <select value={formData.difficulty} onChange={e => setFormData({ ...formData, difficulty: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(d => <option key={d}>{d}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Status</label>
                                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Instructor</label>
                                <input value={formData.instructor} onChange={e => setFormData({ ...formData, instructor: e.target.value })} placeholder="Instructor name" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Estimated Hours</label>
                                <input type="number" min="0" value={formData.estimatedHours} onChange={e => setFormData({ ...formData, estimatedHours: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Tags (comma-separated)</label>
                                <input value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} placeholder="e.g., security, web, beginner" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Video URL</label>
                                <input type="url" value={formData.videoUrl} onChange={e => setFormData({ ...formData, videoUrl: e.target.value })} placeholder="https://youtube.com/..." className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">PDF URL</label>
                                <input type="url" value={formData.pdfUrl} onChange={e => setFormData({ ...formData, pdfUrl: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon border-opacity-10">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 text-cyber-text rounded-lg hover:bg-opacity-50 transition-all text-sm">Cancel</button>
                            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all font-semibold text-sm disabled:opacity-50">
                                {submitting ? 'Saving...' : editingCourse ? 'Update Course' : 'Create Course'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </motion.div>
        </AdminLayout>
    );
};

export default CoursesPage;
