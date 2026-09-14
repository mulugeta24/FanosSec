import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Shield } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader, StatusBadge, SEVERITY_COLORS, STATUS_COLORS } from '../adminUtils';

const VulnerabilitiesPage = () => {
    const [vulns, setVulns] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        cveId: '', title: '', description: '', severity: 'Medium',
        cvssScore: '', affectedSoftware: '', category: '',
        exploit: '', mitigation: '', isPublished: false
    });

    useEffect(() => { fetchVulns(); }, []);
    useEffect(() => {
        setFiltered(vulns.filter(v =>
            v.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.cveId?.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [searchTerm, vulns]);

    const fetchVulns = async () => {
        try {
            setLoading(true); setError(null);
            const res = await fetch(`${API}/vulnerabilities`, { headers: getAuthHeader() });
            const data = await res.json();
            setVulns(Array.isArray(data) ? data : (data.vulnerabilities || []));
            setFiltered(Array.isArray(data) ? data : (data.vulnerabilities || []));
        } catch { setError('Failed to load vulnerabilities.'); }
        finally { setLoading(false); }
    };

    const openCreate = () => {
        setEditingItem(null);
        setFormData({ cveId: '', title: '', description: '', severity: 'Medium', cvssScore: '', affectedSoftware: '', category: '', exploit: '', mitigation: '', isPublished: false });
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditingItem(item);
        setFormData({ cveId: item.cveId || '', title: item.title || '', description: item.description || '', severity: item.severity || 'Medium', cvssScore: item.cvssScore || '', affectedSoftware: item.affectedSoftware || '', category: item.category || '', exploit: item.exploit || '', mitigation: item.mitigation || '', isPublished: item.isPublished || false });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); setSubmitting(true);
        const payload = { ...formData, cvssScore: Number(formData.cvssScore) || undefined };
        try {
            const url = editingItem ? `${API}/vulnerabilities/${editingItem._id}` : `${API}/vulnerabilities`;
            const method = editingItem ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(payload) });
            if (!res.ok) throw new Error((await res.json()).message || 'Save failed');
            setModalOpen(false); fetchVulns();
        } catch (err) { alert(err.message); }
        finally { setSubmitting(false); }
    };

    const handleDelete = async (item) => {
        if (!confirm(`Archive vulnerability "${item.title}"?`)) return;
        try {
            await fetch(`${API}/vulnerabilities/${item._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify({ isPublished: false }) });
            fetchVulns();
        } catch { alert('Failed to archive.'); }
    };

    const CVSS_COLOR = (score) => {
        if (score >= 9) return 'text-red-400';
        if (score >= 7) return 'text-orange-400';
        if (score >= 4) return 'text-yellow-400';
        return 'text-green-400';
    };

    const columns = [
        { key: 'cveId', label: 'CVE ID', render: (v) => <span className="font-mono text-cyan-400 text-xs font-bold">{v || '—'}</span> },
        { key: 'title', label: 'Title', sortable: true, render: (v) => <span className="font-semibold text-cyber-text">{v}</span> },
        { key: 'severity', label: 'Severity', render: (v) => <StatusBadge value={v} colorMap={SEVERITY_COLORS} /> },
        { key: 'cvssScore', label: 'CVSS', render: (v) => <span className={`font-mono font-bold ${CVSS_COLOR(v)}`}>{v || '—'}</span> },
        { key: 'category', label: 'Category', render: (v) => <span className="text-gray-400 text-xs">{v || '—'}</span> },
        { key: 'isPublished', label: 'Status', render: (v) => <StatusBadge value={v ? 'published' : 'draft'} colorMap={STATUS_COLORS} /> },
    ];

    return (
        <AdminLayout activeSection="vulnerabilities">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3"><Shield className="text-cyber-neon" size={28} />Vulnerabilities</h1>
                        <p className="text-cyber-muted text-sm mt-1">Manage CVE database and vulnerability intelligence</p>
                    </div>
                    <button onClick={openCreate} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold text-sm">
                        <Plus size={16} /> New CVE
                    </button>
                </div>

                {error && <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm">{error}</div>}

                <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by title or CVE ID..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" />
                    </div>
                </div>

                {loading ? <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading vulnerabilities...</div> : filtered.length === 0 ? (
                    <div className="text-center py-16 text-cyber-muted"><Shield size={40} className="mx-auto mb-3 opacity-30" /><p>No vulnerabilities found. Add your first CVE entry.</p></div>
                ) : <DataTable data={filtered} columns={columns} onEdit={openEdit} onDelete={handleDelete} actions={['edit', 'delete']} />}

                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Vulnerability' : 'New Vulnerability'} size="xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">CVE ID</label>
                                <input value={formData.cveId} onChange={e => setFormData({ ...formData, cveId: e.target.value })} placeholder="e.g., CVE-2024-12345" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm font-mono" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">CVSS Score (0-10)</label>
                                <input type="number" min="0" max="10" step="0.1" value={formData.cvssScore} onChange={e => setFormData({ ...formData, cvssScore: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Title *</label>
                                <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Description *</label>
                                <textarea required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Severity</label>
                                <select value={formData.severity} onChange={e => setFormData({ ...formData, severity: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {['Critical', 'High', 'Medium', 'Low', 'Info'].map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Category</label>
                                <input value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="e.g., Buffer Overflow, SQL Injection" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Affected Software</label>
                                <input value={formData.affectedSoftware} onChange={e => setFormData({ ...formData, affectedSoftware: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Mitigation</label>
                                <input value={formData.mitigation} onChange={e => setFormData({ ...formData, mitigation: e.target.value })} placeholder="Patch version, workaround..." className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="vulnPublished" checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} className="w-4 h-4 accent-cyber-neon" />
                            <label htmlFor="vulnPublished" className="text-sm text-cyber-text">Publish vulnerability entry</label>
                        </div>
                        <div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon border-opacity-10">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 text-cyber-text rounded-lg hover:bg-opacity-50 transition-all text-sm">Cancel</button>
                            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all font-semibold text-sm disabled:opacity-50">
                                {submitting ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </motion.div>
        </AdminLayout>
    );
};

export default VulnerabilitiesPage;
