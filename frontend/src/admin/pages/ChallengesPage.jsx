import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Flag, AlertTriangle } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader, StatusBadge, DIFFICULTY_COLORS, STATUS_COLORS } from '../adminUtils';

// SECURITY: Flag is WRITE-ONLY. It is sent to the server but NEVER displayed in the table, preview, or any readable field.
const ChallengesPage = () => {
    const [challenges, setChallenges] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingChallenge, setEditingChallenge] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', category: '', difficulty: 'Easy',
        points: 100, isPublished: false, tags: '',
        scenario: '', instructions: '',
        // flag: write-only — never shown after save
        flag: '',
    });

    useEffect(() => { fetchChallenges(); }, []);
    useEffect(() => {
        setFiltered(challenges.filter(c =>
            c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.category?.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [searchTerm, challenges]);

    const fetchChallenges = async () => {
        try {
            setLoading(true); setError(null);
            const res = await fetch(`${API}/challenges`, { headers: getAuthHeader() });
            const data = await res.json();
            // data should NEVER include the flag field — this is enforced by the backend
            const list = (Array.isArray(data) ? data : (data.challenges || []));
            setChallenges(list);
            setFiltered(list);
        } catch { setError('Failed to load challenges.'); }
        finally { setLoading(false); }
    };

    const openCreate = () => {
        setEditingChallenge(null);
        setFormData({ title: '', description: '', category: '', difficulty: 'Easy', points: 100, isPublished: false, tags: '', scenario: '', instructions: '', flag: '' });
        setModalOpen(true);
    };

    const openEdit = (challenge) => {
        setEditingChallenge(challenge);
        // IMPORTANT: Do NOT populate the flag field — it is write-only
        setFormData({
            title: challenge.title || '', description: challenge.description || '',
            category: challenge.category || '', difficulty: challenge.difficulty || 'Easy',
            points: challenge.points || 100, isPublished: challenge.isPublished || false,
            tags: (challenge.tags || []).join(', '),
            scenario: challenge.scenario || '', instructions: challenge.instructions || '',
            flag: '', // Always blank on edit — admin must re-enter flag to change it
        });
        setModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); setSubmitting(true);
        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            points: Number(formData.points) || 100,
        };
        // Only include flag if it was provided (non-empty)
        if (!payload.flag) delete payload.flag;

        try {
            const url = editingChallenge ? `${API}/challenges/${editingChallenge._id}` : `${API}/challenges`;
            const method = editingChallenge ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(payload) });
            if (!res.ok) throw new Error((await res.json()).message || 'Save failed');
            setModalOpen(false);
            // Clear any flag from form state immediately
            setFormData(prev => ({ ...prev, flag: '' }));
            fetchChallenges();
        } catch (err) { alert(err.message); }
        finally { setSubmitting(false); }
    };

    const handleDelete = async (challenge) => {
        if (!confirm(`Archive challenge "${challenge.title}"? It will be hidden from learners.`)) return;
        try {
            await fetch(`${API}/challenges/${challenge._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify({ isPublished: false }) });
            fetchChallenges();
        } catch { alert('Failed to archive challenge.'); }
    };

    const columns = [
        { key: 'title', label: 'Title', sortable: true, render: (v) => <span className="font-semibold text-cyber-text">{v}</span> },
        { key: 'category', label: 'Category', render: (v) => <span className="text-cyan-400 text-xs font-mono">{v}</span> },
        { key: 'difficulty', label: 'Difficulty', render: (v) => <StatusBadge value={v} colorMap={DIFFICULTY_COLORS} /> },
        { key: 'points', label: 'Points', sortable: true, render: (v) => <span className="text-yellow-400 font-mono">{v} pts</span> },
        { key: 'solvedCount', label: 'Solves', render: (v) => <span className="text-green-400">{v || 0}</span> },
        { key: 'isPublished', label: 'Status', render: (v) => <StatusBadge value={v ? 'published' : 'draft'} colorMap={STATUS_COLORS} /> },
    ];

    const CATEGORIES = ['Web', 'Network', 'Crypto', 'Forensics', 'Reverse Engineering', 'OSINT', 'Steganography', 'Binary Exploitation', 'Miscellaneous'];

    return (
        <AdminLayout activeSection="challenges">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3"><Flag className="text-red-400" size={28} />CTF Challenges</h1>
                        <p className="text-cyber-muted text-sm mt-1">Manage Capture The Flag challenges — flags are server-side only</p>
                    </div>
                    <button onClick={openCreate} className="px-5 py-2.5 bg-red-500 bg-opacity-20 border border-red-500 text-red-400 rounded-lg hover:bg-opacity-30 transition-all flex items-center gap-2 font-semibold text-sm">
                        <Plus size={16} /> New Challenge
                    </button>
                </div>

                <div className="mb-5 p-3 bg-amber-500 bg-opacity-10 border border-amber-500 border-opacity-30 rounded-lg flex items-center gap-3 text-amber-400 text-xs">
                    <AlertTriangle size={16} className="flex-shrink-0" />
                    <span>Flags are <strong>write-only</strong>. They are never displayed in this dashboard or sent to the client. When editing, leave the flag field blank to preserve the existing flag.</span>
                </div>

                {error && <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm">{error}</div>}

                <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search challenges..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" />
                    </div>
                </div>

                {loading ? <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading challenges...</div> : filtered.length === 0 ? (
                    <div className="text-center py-16 text-cyber-muted"><Flag size={40} className="mx-auto mb-3 opacity-30" /><p>No CTF challenges found. Create your first challenge.</p></div>
                ) : <DataTable data={filtered} columns={columns} onEdit={openEdit} onDelete={handleDelete} actions={['edit', 'delete']} />}

                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingChallenge ? 'Edit Challenge' : 'Create CTF Challenge'} size="xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Title *</label>
                                <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Description *</label>
                                <textarea required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Category</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    <option value="">Select category</option>
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Difficulty</label>
                                <select value={formData.difficulty} onChange={e => setFormData({ ...formData, difficulty: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {['Easy', 'Medium', 'Hard', 'Expert', 'Insane'].map(d => <option key={d}>{d}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Points</label>
                                <input type="number" min="10" step="10" value={formData.points} onChange={e => setFormData({ ...formData, points: parseInt(e.target.value) })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Tags (comma-separated)</label>
                                <input value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                            <div className="md:col-span-2 p-3 bg-red-500 bg-opacity-5 border border-red-500 border-opacity-30 rounded-lg">
                                <label className="block text-xs font-semibold text-red-400 mb-1.5 uppercase tracking-wide flex items-center gap-2">
                                    <AlertTriangle size={14} />
                                    Flag (Write-Only — Stored Encrypted Server-Side)
                                </label>
                                <input
                                    type="password"
                                    value={formData.flag}
                                    onChange={e => setFormData({ ...formData, flag: e.target.value })}
                                    placeholder={editingChallenge ? 'Leave blank to keep existing flag' : 'Enter flag (e.g., FS{example_flag})'}
                                    className="w-full px-4 py-2.5 bg-black bg-opacity-50 border border-red-500 border-opacity-30 rounded-lg text-red-300 focus:outline-none focus:border-opacity-50 text-sm font-mono"
                                    autoComplete="off"
                                />
                                <p className="text-xs text-red-400 opacity-70 mt-1">This field is never displayed again after saving. It is never sent to the client.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="challengePublished" checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} className="w-4 h-4 accent-cyber-neon" />
                            <label htmlFor="challengePublished" className="text-sm text-cyber-text">Publish challenge (visible to learners)</label>
                        </div>
                        <div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon border-opacity-10">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 text-cyber-text rounded-lg hover:bg-opacity-50 transition-all text-sm">Cancel</button>
                            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-red-500 bg-opacity-20 border border-red-500 text-red-400 rounded-lg hover:bg-opacity-30 transition-all font-semibold text-sm disabled:opacity-50">
                                {submitting ? 'Saving...' : editingChallenge ? 'Update Challenge' : 'Create Challenge'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </motion.div>
        </AdminLayout>
    );
};

export default ChallengesPage;
