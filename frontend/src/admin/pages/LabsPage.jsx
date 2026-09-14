import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Server } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader, StatusBadge, DIFFICULTY_COLORS, STATUS_COLORS } from '../adminUtils';

const LabsPage = () => {
    const [labs, setLabs] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingLab, setEditingLab] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', instructions: '', difficulty: 'Medium',
        category: '', estimatedTime: '30 minutes', videoDemoUrl: '', status: 'draft',
        course: '', environment: '', safetyNotice: ''
    });

    useEffect(() => { fetchLabs(); }, []);
    useEffect(() => {
        setFiltered(labs.filter(l => l.title?.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, labs]);

    const fetchLabs = async () => {
        try {
            setLoading(true); setError(null);
            const res = await fetch(`${API}/labs`, { headers: getAuthHeader() });
            const data = await res.json();
            setLabs(Array.isArray(data) ? data : []);
            setFiltered(Array.isArray(data) ? data : []);
        } catch { setError('Failed to load labs.'); }
        finally { setLoading(false); }
    };

    const openCreate = () => {
        setEditingLab(null);
        setFormData({ title: '', description: '', instructions: '', difficulty: 'Medium', category: '', estimatedTime: '30 minutes', videoDemoUrl: '', status: 'draft', course: '', environment: '', safetyNotice: '' });
        setModalOpen(true);
    };

    const openEdit = (lab) => {
        setEditingLab(lab);
        setFormData({ title: lab.title || '', description: lab.description || '', instructions: lab.instructions || '', difficulty: lab.difficulty || 'Medium', category: lab.category || '', estimatedTime: lab.estimatedTime || '30 minutes', videoDemoUrl: lab.videoDemoUrl || '', status: lab.status || 'published', course: lab.course?._id || lab.course || '', environment: lab.environment || '', safetyNotice: lab.safetyNotice || '' });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); setSubmitting(true);
        try {
            const url = editingLab ? `${API}/labs/${editingLab._id}` : `${API}/labs`;
            const method = editingLab ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(formData) });
            if (!res.ok) throw new Error((await res.json()).message || 'Save failed');
            setModalOpen(false); fetchLabs();
        } catch (err) { alert(err.message); }
        finally { setSubmitting(false); }
    };

    const handleDelete = async (lab) => {
        if (!confirm(`Archive lab "${lab.title}"?`)) return;
        try {
            await fetch(`${API}/labs/${lab._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify({ status: 'archived' }) });
            fetchLabs();
        } catch { alert('Failed to archive lab.'); }
    };

    const columns = [
        { key: 'title', label: 'Title', sortable: true, render: (v) => <span className="font-semibold text-cyber-text">{v}</span> },
        { key: 'category', label: 'Category', render: (v) => <span className="text-cyan-400 text-xs">{v || '—'}</span> },
        { key: 'difficulty', label: 'Difficulty', render: (v) => <StatusBadge value={v} colorMap={DIFFICULTY_COLORS} /> },
        { key: 'estimatedTime', label: 'Duration', render: (v) => <span className="text-gray-400 text-xs">{v || '—'}</span> },
        { key: 'status', label: 'Status', render: (v) => <StatusBadge value={v || 'published'} colorMap={STATUS_COLORS} /> },
    ];

    return (
        <AdminLayout activeSection="labs">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3"><Server className="text-cyber-neon" size={28} />Labs</h1>
                        <p className="text-cyber-muted text-sm mt-1">Manage FANOS SEC practical security labs</p>
                    </div>
                    <button onClick={openCreate} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold text-sm">
                        <Plus size={16} /> New Lab
                    </button>
                </div>

                {error && <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm">{error}</div>}

                <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search labs..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" />
                    </div>
                </div>

                {loading ? <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading labs...</div> : filtered.length === 0 ? (
                    <div className="text-center py-16 text-cyber-muted"><Server size={40} className="mx-auto mb-3 opacity-30" /><p>No labs found. Create your first security lab.</p></div>
                ) : <DataTable data={filtered} columns={columns} onEdit={openEdit} onDelete={handleDelete} actions={['edit', 'delete']} />}

                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingLab ? 'Edit Lab' : 'Create Lab'} size="xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Title *</label>
                            <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Description *</label>
                            <textarea required rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Instructions *</label>
                            <textarea required rows={4} value={formData.instructions} onChange={e => setFormData({ ...formData, instructions: e.target.value })} placeholder="Step-by-step lab instructions..." className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Difficulty</label>
                                <select value={formData.difficulty} onChange={e => setFormData({ ...formData, difficulty: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {['Easy', 'Medium', 'Hard', 'Expert'].map(d => <option key={d}>{d}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Category</label>
                                <input value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="e.g., Web Security" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Estimated Time</label>
                                <input value={formData.estimatedTime} onChange={e => setFormData({ ...formData, estimatedTime: e.target.value })} placeholder="e.g., 45 minutes" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Status</label>
                                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Demo Video URL</label>
                            <input type="url" value={formData.videoDemoUrl} onChange={e => setFormData({ ...formData, videoDemoUrl: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Safety Notice</label>
                            <input value={formData.safetyNotice} onChange={e => setFormData({ ...formData, safetyNotice: e.target.value })} placeholder="For authorized training environments only." className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                        </div>
                        <div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon border-opacity-10">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 text-cyber-text rounded-lg hover:bg-opacity-50 transition-all text-sm">Cancel</button>
                            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all font-semibold text-sm disabled:opacity-50">
                                {submitting ? 'Saving...' : editingLab ? 'Update Lab' : 'Create Lab'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </motion.div>
        </AdminLayout>
    );
};

export default LabsPage;
