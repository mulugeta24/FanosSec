import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Newspaper } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader, StatusBadge, SEVERITY_COLORS, STATUS_COLORS } from '../adminUtils';

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '', summary: '', content: '', category: '', source: '',
        imageUrl: '', tags: '', severity: 'Info', isPublished: false,
    });

    useEffect(() => { fetchNews(); }, []);
    useEffect(() => {
        setFiltered(news.filter(n => n.title?.toLowerCase().includes(searchTerm.toLowerCase()) || n.category?.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, news]);

    const fetchNews = async () => {
        try {
            setLoading(true); setError(null);
            const res = await fetch(`${API}/news`, { headers: getAuthHeader() });
            const data = await res.json();
            setNews(Array.isArray(data) ? data : (data.news || []));
            setFiltered(Array.isArray(data) ? data : (data.news || []));
        } catch { setError('Failed to load news.'); }
        finally { setLoading(false); }
    };

    const openCreate = () => {
        setEditingItem(null);
        setFormData({ title: '', summary: '', content: '', category: '', source: '', imageUrl: '', tags: '', severity: 'Info', isPublished: false });
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditingItem(item);
        setFormData({ title: item.title || '', summary: item.summary || '', content: item.content || '', category: item.category || '', source: item.source || '', imageUrl: item.imageUrl || '', tags: (item.tags || []).join(', '), severity: item.severity || 'Info', isPublished: item.isPublished || false });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); setSubmitting(true);
        const payload = { ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) };
        try {
            const url = editingItem ? `${API}/news/${editingItem._id}` : `${API}/news`;
            const method = editingItem ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(payload) });
            if (!res.ok) throw new Error((await res.json()).message || 'Save failed');
            setModalOpen(false); fetchNews();
        } catch (err) { alert(err.message); }
        finally { setSubmitting(false); }
    };

    const handleDelete = async (item) => {
        if (!confirm(`Archive news "${item.title}"?`)) return;
        try {
            await fetch(`${API}/news/${item._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify({ isPublished: false }) });
            fetchNews();
        } catch { alert('Failed to update.'); }
    };

    const columns = [
        { key: 'title', label: 'Title', sortable: true, render: (v) => <span className="font-semibold text-cyber-text line-clamp-1">{v}</span> },
        { key: 'category', label: 'Category', render: (v) => <span className="text-cyan-400 text-xs">{v}</span> },
        { key: 'severity', label: 'Severity', render: (v) => <StatusBadge value={v} colorMap={SEVERITY_COLORS} /> },
        { key: 'source', label: 'Source', render: (v) => <span className="text-gray-400 text-xs">{v || '—'}</span> },
        { key: 'isPublished', label: 'Status', render: (v) => <StatusBadge value={v ? 'published' : 'draft'} colorMap={STATUS_COLORS} /> },
        { key: 'createdAt', label: 'Date', sortable: true, render: (v) => <span className="text-gray-500 text-xs">{v ? new Date(v).toLocaleDateString() : '—'}</span> },
    ];

    const CATEGORIES = ['Threat Intelligence', 'Vulnerability', 'Breach', 'Malware', 'Industry', 'Technology', 'Research', 'General'];

    return (
        <AdminLayout activeSection="news">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3"><Newspaper className="text-cyber-neon" size={28} />Cyber News</h1>
                        <p className="text-cyber-muted text-sm mt-1">Manage cybersecurity news and intelligence articles</p>
                    </div>
                    <button onClick={openCreate} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold text-sm">
                        <Plus size={16} /> New Article
                    </button>
                </div>

                {error && <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm">{error}</div>}

                <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search news..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" />
                    </div>
                </div>

                {loading ? <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading news...</div> : filtered.length === 0 ? (
                    <div className="text-center py-16 text-cyber-muted"><Newspaper size={40} className="mx-auto mb-3 opacity-30" /><p>No news articles. Publish your first cybersecurity update.</p></div>
                ) : <DataTable data={filtered} columns={columns} onEdit={openEdit} onDelete={handleDelete} actions={['edit', 'delete']} />}

                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Article' : 'New News Article'} size="xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Title *</label>
                            <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Summary</label>
                            <textarea rows={2} value={formData.summary} onChange={e => setFormData({ ...formData, summary: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Full Content</label>
                            <textarea rows={5} value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Category</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    <option value="">Select...</option>
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Severity</label>
                                <select value={formData.severity} onChange={e => setFormData({ ...formData, severity: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {['Critical', 'High', 'Medium', 'Low', 'Info'].map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Source</label>
                                <input value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} placeholder="e.g., CISA, The Hacker News" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Image URL</label>
                                <input type="url" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Tags (comma-separated)</label>
                            <input value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="newsPublished" checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} className="w-4 h-4 accent-cyber-neon" />
                            <label htmlFor="newsPublished" className="text-sm text-cyber-text">Publish article</label>
                        </div>
                        <div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon border-opacity-10">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 text-cyber-text rounded-lg hover:bg-opacity-50 transition-all text-sm">Cancel</button>
                            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all font-semibold text-sm disabled:opacity-50">
                                {submitting ? 'Saving...' : editingItem ? 'Update' : 'Publish'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </motion.div>
        </AdminLayout>
    );
};

export default NewsPage;
