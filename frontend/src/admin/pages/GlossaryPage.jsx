import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, BookOpen } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader, StatusBadge, STATUS_COLORS } from '../adminUtils';

const GlossaryPage = () => {
    const [terms, setTerms] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        term: '', definition: '', detailedExplanation: '', category: 'General',
        aliases: '', isPublished: true
    });

    useEffect(() => { fetchTerms(); }, []);
    useEffect(() => {
        setFiltered(terms.filter(t => t.term?.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, terms]);

    const fetchTerms = async () => {
        try {
            setLoading(true); setError(null);
            const res = await fetch(`${API}/glossary`, { headers: getAuthHeader() });
            const data = await res.json();
            setTerms(Array.isArray(data) ? data : (data.terms || []));
            setFiltered(Array.isArray(data) ? data : (data.terms || []));
        } catch { setError('Failed to load glossary.'); }
        finally { setLoading(false); }
    };

    const openCreate = () => {
        setEditingItem(null);
        setFormData({ term: '', definition: '', detailedExplanation: '', category: 'General', aliases: '', isPublished: true });
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditingItem(item);
        setFormData({ term: item.term || '', definition: item.definition || '', detailedExplanation: item.detailedExplanation || '', category: item.category || 'General', aliases: (item.aliases || []).join(', '), isPublished: item.isPublished !== false });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); setSubmitting(true);
        const slug = formData.term.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const payload = { ...formData, slug, aliases: formData.aliases.split(',').map(a => a.trim()).filter(Boolean) };
        try {
            const url = editingItem ? `${API}/glossary/${editingItem._id}` : `${API}/glossary`;
            const method = editingItem ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(payload) });
            if (!res.ok) throw new Error((await res.json()).message || 'Save failed');
            setModalOpen(false); fetchTerms();
        } catch (err) { alert(err.message); }
        finally { setSubmitting(false); }
    };

    const handleDelete = async (item) => {
        if (!confirm(`Hide glossary term "${item.term}"?`)) return;
        try {
            await fetch(`${API}/glossary/${item._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify({ isPublished: false }) });
            fetchTerms();
        } catch { alert('Failed.'); }
    };

    const CATEGORIES = ['Network Security', 'Application Security', 'Cryptography', 'Threat Intelligence', 'Compliance', 'Identity & Access', 'Incident Response', 'General', 'Other'];

    const columns = [
        { key: 'term', label: 'Term', sortable: true, render: (v) => <span className="font-bold text-cyber-neon font-mono">{v}</span> },
        { key: 'definition', label: 'Definition', render: (v) => <span className="text-cyber-text text-xs line-clamp-2">{v}</span> },
        { key: 'category', label: 'Category', render: (v) => <span className="text-cyan-400 text-xs">{v}</span> },
        { key: 'isPublished', label: 'Status', render: (v) => <StatusBadge value={v ? 'published' : 'draft'} colorMap={STATUS_COLORS} /> },
    ];

    return (
        <AdminLayout activeSection="glossary">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3"><BookOpen className="text-cyber-neon" size={28} />Glossary</h1>
                        <p className="text-cyber-muted text-sm mt-1">Manage the FANOS SEC cybersecurity glossary</p>
                    </div>
                    <button onClick={openCreate} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold text-sm">
                        <Plus size={16} /> Add Term
                    </button>
                </div>
                {error && <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm">{error}</div>}
                <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search glossary terms..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" />
                    </div>
                </div>
                {loading ? <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading glossary...</div> : filtered.length === 0 ? (
                    <div className="text-center py-16 text-cyber-muted"><BookOpen size={40} className="mx-auto mb-3 opacity-30" /><p>No glossary terms. Start building the cyber dictionary.</p></div>
                ) : <DataTable data={filtered} columns={columns} onEdit={openEdit} onDelete={handleDelete} actions={['edit', 'delete']} />}
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Term' : 'Add Glossary Term'} size="lg">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Term *</label>
                            <input required value={formData.term} onChange={e => setFormData({ ...formData, term: e.target.value })} placeholder="e.g., SQL Injection" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Definition *</label>
                            <textarea required rows={3} value={formData.definition} onChange={e => setFormData({ ...formData, definition: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Detailed Explanation</label>
                            <textarea rows={3} value={formData.detailedExplanation} onChange={e => setFormData({ ...formData, detailedExplanation: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Category</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Aliases (comma-separated)</label>
                                <input value={formData.aliases} onChange={e => setFormData({ ...formData, aliases: e.target.value })} placeholder="SQLi, SQL attack" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="glossaryPublished" checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} className="w-4 h-4 accent-cyber-neon" />
                            <label htmlFor="glossaryPublished" className="text-sm text-cyber-text">Published</label>
                        </div>
                        <div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon border-opacity-10">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 text-cyber-text rounded-lg hover:bg-opacity-50 transition-all text-sm">Cancel</button>
                            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all font-semibold text-sm disabled:opacity-50">
                                {submitting ? 'Saving...' : editingItem ? 'Update' : 'Add Term'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </motion.div>
        </AdminLayout>
    );
};

export default GlossaryPage;
