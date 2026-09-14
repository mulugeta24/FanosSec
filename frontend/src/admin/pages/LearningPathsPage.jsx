import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Map } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader, StatusBadge, DIFFICULTY_COLORS, STATUS_COLORS } from '../adminUtils';

const LearningPathsPage = () => {
    const [paths, setPaths] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPath, setEditingPath] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', difficulty: 'Beginner', icon: '🛡️',
        estimatedHours: '', status: 'draft', tags: '',
    });

    useEffect(() => { fetchPaths(); }, []);
    useEffect(() => {
        setFiltered(paths.filter(p => p.title?.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, paths]);

    const fetchPaths = async () => {
        try {
            setLoading(true); setError(null);
            const res = await fetch(`${API}/paths`, { headers: getAuthHeader() });
            const data = await res.json();
            setPaths(Array.isArray(data) ? data : []);
            setFiltered(Array.isArray(data) ? data : []);
        } catch { setError('Failed to load learning paths.'); }
        finally { setLoading(false); }
    };

    const openCreate = () => {
        setEditingPath(null);
        setFormData({ title: '', description: '', difficulty: 'Beginner', icon: '🛡️', estimatedHours: '', status: 'draft', tags: '' });
        setModalOpen(true);
    };

    const openEdit = (path) => {
        setEditingPath(path);
        setFormData({ title: path.title || '', description: path.description || '', difficulty: path.difficulty || 'Beginner', icon: path.icon || '🛡️', estimatedHours: path.estimatedHours || '', status: path.status || 'published', tags: (path.tags || []).join(', ') });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); setSubmitting(true);
        const payload = { ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean), estimatedHours: Number(formData.estimatedHours) || 0 };
        try {
            const url = editingPath ? `${API}/paths/${editingPath._id}` : `${API}/paths`;
            const method = editingPath ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(payload) });
            if (!res.ok) throw new Error((await res.json()).message || 'Save failed');
            setModalOpen(false); fetchPaths();
        } catch (err) { alert(err.message); }
        finally { setSubmitting(false); }
    };

    const handleDelete = async (path) => {
        if (!confirm(`Delete learning path "${path.title}"?`)) return;
        try {
            await fetch(`${API}/paths/${path._id}`, { method: 'DELETE', headers: getAuthHeader() });
            fetchPaths();
        } catch { alert('Failed to delete path.'); }
    };

    const columns = [
        { key: 'icon', label: '', render: (v) => <span className="text-2xl">{v || '🛡️'}</span> },
        { key: 'title', label: 'Title', sortable: true, render: (v) => <span className="font-semibold text-cyber-text">{v}</span> },
        { key: 'difficulty', label: 'Difficulty', render: (v) => <StatusBadge value={v} colorMap={DIFFICULTY_COLORS} /> },
        { key: 'status', label: 'Status', render: (v) => <StatusBadge value={v || 'published'} colorMap={STATUS_COLORS} /> },
        { key: 'courses', label: 'Courses', render: (v) => <span className="text-cyan-400">{v?.length || 0} courses</span> },
        { key: 'estimatedHours', label: 'Est. Hours', render: (v) => <span className="text-gray-400 text-xs">{v || '—'}h</span> },
    ];

    return (
        <AdminLayout activeSection="paths">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3"><Map className="text-cyber-neon" size={28} />Learning Paths</h1>
                        <p className="text-cyber-muted text-sm mt-1">Manage FANOS SEC learning paths and tracks</p>
                    </div>
                    <button onClick={openCreate} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold text-sm">
                        <Plus size={16} /> New Path
                    </button>
                </div>

                {error && <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm">{error}</div>}

                <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search learning paths..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" />
                    </div>
                </div>

                {loading ? <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading paths...</div> : filtered.length === 0 ? (
                    <div className="text-center py-16 text-cyber-muted"><Map size={40} className="mx-auto mb-3 opacity-30" /><p>No learning paths found. Create one to structure the learner journey.</p></div>
                ) : <DataTable data={filtered} columns={columns} onEdit={openEdit} onDelete={handleDelete} actions={['edit', 'delete']} />}

                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingPath ? 'Edit Learning Path' : 'Create Learning Path'} size="lg">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Title *</label>
                            <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Description *</label>
                            <textarea required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Icon (emoji)</label>
                                <input value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Difficulty</label>
                                <select value={formData.difficulty} onChange={e => setFormData({ ...formData, difficulty: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {['Beginner', 'Intermediate', 'Advanced'].map(d => <option key={d}>{d}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Status</label>
                                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Estimated Hours</label>
                                <input type="number" min="0" value={formData.estimatedHours} onChange={e => setFormData({ ...formData, estimatedHours: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Tags (comma-separated)</label>
                            <input value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                        </div>
                        <div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon border-opacity-10">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 text-cyber-text rounded-lg hover:bg-opacity-50 transition-all text-sm">Cancel</button>
                            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all font-semibold text-sm disabled:opacity-50">
                                {submitting ? 'Saving...' : editingPath ? 'Update Path' : 'Create Path'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </motion.div>
        </AdminLayout>
    );
};

export default LearningPathsPage;
