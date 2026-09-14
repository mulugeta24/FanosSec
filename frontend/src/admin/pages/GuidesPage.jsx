import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, BookMarked } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader, StatusBadge, DIFFICULTY_COLORS, STATUS_COLORS } from '../adminUtils';

const GuidesPage = () => {
    const [guides, setGuides] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', content: '', category: '',
        difficulty: 'Beginner', tags: '', isPublished: false,
    });

    useEffect(() => { fetchGuides(); }, []);
    useEffect(() => {
        setFiltered(guides.filter(g => g.title?.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, guides]);

    const fetchGuides = async () => {
        try {
            setLoading(true); setError(null);
            const res = await fetch(`${API}/guides`, { headers: getAuthHeader() });
            const data = await res.json();
            setGuides(Array.isArray(data) ? data : (data.guides || []));
            setFiltered(Array.isArray(data) ? data : (data.guides || []));
        } catch { setError('Failed to load guides.'); }
        finally { setLoading(false); }
    };

    const openCreate = () => {
        setEditingItem(null);
        setFormData({ title: '', description: '', content: '', category: '', difficulty: 'Beginner', tags: '', isPublished: false });
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditingItem(item);
        setFormData({ title: item.title || '', description: item.description || '', content: item.content || '', category: item.category || '', difficulty: item.difficulty || 'Beginner', tags: (item.tags || []).join(', '), isPublished: item.isPublished || false });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); setSubmitting(true);
        const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const payload = { ...formData, slug, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) };
        try {
            const url = editingItem ? `${API}/guides/${editingItem._id}` : `${API}/guides`;
            const method = editingItem ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(payload) });
            if (!res.ok) throw new Error((await res.json()).message || 'Save failed');
            setModalOpen(false); fetchGuides();
        } catch (err) { alert(err.message); }
        finally { setSubmitting(false); }
    };

    const handleDelete = async (item) => {
        if (!confirm(`Archive guide "${item.title}"?`)) return;
        try {
            await fetch(`${API}/guides/${item._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify({ isPublished: false }) });
            fetchGuides();
        } catch { alert('Failed.'); }
    };

    const columns = [
        { key: 'title', label: 'Title', sortable: true, render: (v) => <span className="font-semibold text-cyber-text">{v}</span> },
        { key: 'category', label: 'Category', render: (v) => <span className="text-cyan-400 text-xs">{v || '—'}</span> },
        { key: 'difficulty', label: 'Level', render: (v) => <StatusBadge value={v} colorMap={DIFFICULTY_COLORS} /> },
        { key: 'isPublished', label: 'Status', render: (v) => <StatusBadge value={v ? 'published' : 'draft'} colorMap={STATUS_COLORS} /> },
        { key: 'createdAt', label: 'Created', sortable: true, render: (v) => <span className="text-gray-500 text-xs">{v ? new Date(v).toLocaleDateString() : '—'}</span> },
    ];

    return (
        <AdminLayout activeSection="guides">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3"><BookMarked className="text-cyber-neon" size={28} />Guides</h1>
                        <p className="text-cyber-muted text-sm mt-1">Manage FANOS SEC security guides and tutorials</p>
                    </div>
                    <button onClick={openCreate} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold text-sm">
                        <Plus size={16} /> New Guide
                    </button>
                </div>
                {error && <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm">{error}</div>}
                <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search guides..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" />
                    </div>
                </div>
                {loading ? <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading guides...</div> : filtered.length === 0 ? (
                    <div className="text-center py-16 text-cyber-muted"><BookMarked size={40} className="mx-auto mb-3 opacity-30" /><p>No guides yet. Create tutorials for FANOS SEC learners.</p></div>
                ) : <DataTable data={filtered} columns={columns} onEdit={openEdit} onDelete={handleDelete} actions={['edit', 'delete']} />}
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Guide' : 'New Guide'} size="xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Title *</label>
                            <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Description</label>
                            <textarea rows={2} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Content</label>
                            <textarea rows={6} value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} placeholder="Guide content (markdown supported)..." className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none font-mono" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Category</label>
                                <input value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="e.g., Penetration Testing" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Difficulty</label>
                                <select value={formData.difficulty} onChange={e => setFormData({ ...formData, difficulty: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {['Beginner', 'Intermediate', 'Advanced'].map(d => <option key={d}>{d}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="guidePublished" checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} className="w-4 h-4 accent-cyber-neon" />
                            <label htmlFor="guidePublished" className="text-sm text-cyber-text">Publish guide</label>
                        </div>
                        <div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon border-opacity-10">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 text-cyber-text rounded-lg hover:bg-opacity-50 transition-all text-sm">Cancel</button>
                            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all font-semibold text-sm disabled:opacity-50">
                                {submitting ? 'Saving...' : editingItem ? 'Update' : 'Create Guide'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </motion.div>
        </AdminLayout>
    );
};

export default GuidesPage;
