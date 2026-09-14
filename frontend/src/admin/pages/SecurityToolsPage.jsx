import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Wrench } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader, StatusBadge, STATUS_COLORS } from '../adminUtils';

const SecurityToolsPage = () => {
    const [tools, setTools] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '', description: '', category: '', type: 'Open Source',
        officialWebsite: '', githubUrl: '', installation: '', usage: '',
        tags: '', isPublished: true
    });

    useEffect(() => { fetchTools(); }, []);
    useEffect(() => {
        setFiltered(tools.filter(t => t.name?.toLowerCase().includes(searchTerm.toLowerCase()) || t.category?.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, tools]);

    const fetchTools = async () => {
        try {
            setLoading(true); setError(null);
            const res = await fetch(`${API}/security-tools`, { headers: getAuthHeader() });
            const data = await res.json();
            setTools(Array.isArray(data) ? data : (data.tools || []));
            setFiltered(Array.isArray(data) ? data : (data.tools || []));
        } catch { setError('Failed to load security tools.'); }
        finally { setLoading(false); }
    };

    const openCreate = () => {
        setEditingItem(null);
        setFormData({ name: '', description: '', category: '', type: 'Open Source', officialWebsite: '', githubUrl: '', installation: '', usage: '', tags: '', isPublished: true });
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditingItem(item);
        setFormData({ name: item.name || '', description: item.description || '', category: item.category || '', type: item.type || 'Open Source', officialWebsite: item.officialWebsite || '', githubUrl: item.githubUrl || '', installation: item.installation || '', usage: item.usage || '', tags: (item.tags || []).join(', '), isPublished: item.isPublished !== false });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); setSubmitting(true);
        const payload = { ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) };
        try {
            const url = editingItem ? `${API}/security-tools/${editingItem._id}` : `${API}/security-tools`;
            const method = editingItem ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(payload) });
            if (!res.ok) throw new Error((await res.json()).message || 'Save failed');
            setModalOpen(false); fetchTools();
        } catch (err) { alert(err.message); }
        finally { setSubmitting(false); }
    };

    const handleDelete = async (item) => {
        if (!confirm(`Hide tool "${item.name}"?`)) return;
        try {
            await fetch(`${API}/security-tools/${item._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify({ isPublished: false }) });
            fetchTools();
        } catch { alert('Failed to update.'); }
    };

    const CATEGORIES = ['Network Scanner', 'Vulnerability Scanner', 'Exploitation', 'Password Cracking', 'Web Application', 'Forensics', 'Reverse Engineering', 'Malware Analysis', 'OSINT', 'Cryptography', 'Wireless', 'Other'];

    const columns = [
        { key: 'name', label: 'Tool Name', sortable: true, render: (v) => <span className="font-bold text-cyber-text font-mono">{v}</span> },
        { key: 'category', label: 'Category', render: (v) => <span className="text-cyan-400 text-xs">{v}</span> },
        { key: 'type', label: 'Type', render: (v) => <span className="px-2 py-0.5 rounded text-xs bg-blue-500 bg-opacity-20 text-blue-400">{v}</span> },
        { key: 'isPublished', label: 'Status', render: (v) => <StatusBadge value={v ? 'published' : 'draft'} colorMap={STATUS_COLORS} /> },
    ];

    return (
        <AdminLayout activeSection="tools">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3"><Wrench className="text-cyber-neon" size={28} />Security Tools</h1>
                        <p className="text-cyber-muted text-sm mt-1">Manage the FANOS SEC security tool directory</p>
                    </div>
                    <button onClick={openCreate} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold text-sm">
                        <Plus size={16} /> Add Tool
                    </button>
                </div>

                {error && <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm">{error}</div>}

                <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search tools..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" />
                    </div>
                </div>

                {loading ? <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading tools...</div> : filtered.length === 0 ? (
                    <div className="text-center py-16 text-cyber-muted"><Wrench size={40} className="mx-auto mb-3 opacity-30" /><p>No security tools found. Build your tool directory.</p></div>
                ) : <DataTable data={filtered} columns={columns} onEdit={openEdit} onDelete={handleDelete} actions={['edit', 'delete']} />}

                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Tool' : 'Add Security Tool'} size="xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Tool Name *</label>
                                <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Nmap" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm font-mono" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Category</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    <option value="">Select category</option>
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Description *</label>
                                <textarea required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Type</label>
                                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {['Open Source', 'Commercial', 'Freemium'].map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Official Website</label>
                                <input type="url" value={formData.officialWebsite} onChange={e => setFormData({ ...formData, officialWebsite: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">GitHub URL</label>
                                <input type="url" value={formData.githubUrl} onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Installation</label>
                                <input value={formData.installation} onChange={e => setFormData({ ...formData, installation: e.target.value })} placeholder="e.g., apt install nmap" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm font-mono" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="toolPublished" checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} className="w-4 h-4 accent-cyber-neon" />
                            <label htmlFor="toolPublished" className="text-sm text-cyber-text">Published (visible to learners)</label>
                        </div>
                        <div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon border-opacity-10">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 text-cyber-text rounded-lg hover:bg-opacity-50 transition-all text-sm">Cancel</button>
                            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all font-semibold text-sm disabled:opacity-50">
                                {submitting ? 'Saving...' : editingItem ? 'Update' : 'Add Tool'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </motion.div>
        </AdminLayout>
    );
};

export default SecurityToolsPage;
