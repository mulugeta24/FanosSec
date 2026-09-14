import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Bell, RefreshCw } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader, StatusBadge, STATUS_COLORS } from '../adminUtils';

const emptyForm = { title: '', message: '', type: 'General', priority: 'Medium', targetAudience: 'All', startDate: '', endDate: '', dismissible: true };

const AnnouncementsPage = () => {
    const [items, setItems] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { loadAnnouncements(); }, []);
    useEffect(() => setFiltered(items.filter((item) => `${item.title} ${item.message}`.toLowerCase().includes(search.toLowerCase()))), [items, search]);

    const loadAnnouncements = async () => {
        try {
            setLoading(true); setError(null);
            const response = await fetch(`${API}/announcements`, { headers: getAuthHeader() });
            if (!response.ok) throw new Error('Failed to load announcements.');
            const data = await response.json(); setItems(Array.isArray(data) ? data : []);
        } catch (requestError) { setError(requestError.message || 'Failed to load announcements.'); }
        finally { setLoading(false); }
    };

    const openCreate = () => { setEditing(null); setForm({ ...emptyForm }); setModalOpen(true); };
    const openEdit = (item) => { setEditing(item); setForm({ title: item.title || '', message: item.message || '', type: item.type || 'General', priority: item.priority || 'Medium', targetAudience: item.targetAudience || 'All', startDate: item.startDate?.slice(0, 10) || '', endDate: item.endDate?.slice(0, 10) || '', dismissible: item.dismissible !== false }); setModalOpen(true); };
    const handleSubmit = async (event) => {
        event.preventDefault(); setSubmitting(true); setError(null);
        try {
            const payload = { ...form, startDate: form.startDate || undefined, endDate: form.endDate || undefined };
            const response = await fetch(editing ? `${API}/announcements/${editing._id}` : `${API}/announcements`, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error((await response.json()).message || 'Failed to save announcement.');
            setModalOpen(false); await loadAnnouncements();
        } catch (requestError) { setError(requestError.message || 'Failed to save announcement.'); }
        finally { setSubmitting(false); }
    };
    const archive = async (item) => {
        if (!window.confirm(`Archive "${item.title}"?`)) return;
        try { const response = await fetch(`${API}/announcements/${item._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify({ isActive: false }) }); if (!response.ok) throw new Error('Failed to archive announcement.'); await loadAnnouncements(); }
        catch (requestError) { setError(requestError.message || 'Failed to archive announcement.'); }
    };

    const columns = [
        { key: 'title', label: 'Title', sortable: true, render: (value) => <span className="font-semibold text-cyber-text">{value}</span> },
        { key: 'type', label: 'Type', render: (value) => <span className="text-cyan-400 text-xs">{value}</span> },
        { key: 'priority', label: 'Priority', render: (value) => <StatusBadge value={value?.toLowerCase()} colorMap={{ high: 'bg-red-500/20 text-red-400', medium: 'bg-yellow-500/20 text-yellow-400', low: 'bg-blue-500/20 text-blue-400' }} /> },
        { key: 'targetAudience', label: 'Audience', render: (value) => <span className="text-gray-400 text-xs">{value}</span> },
        { key: 'isActive', label: 'Status', render: (value) => <StatusBadge value={value ? 'active' : 'archived'} colorMap={STATUS_COLORS} /> }
    ];

    return <AdminLayout activeSection="announcements"><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}><div className="flex items-center justify-between mb-6"><div><h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3"><Bell className="text-cyber-neon" size={28} /> Announcements</h1><p className="text-cyber-muted text-sm mt-1">Publish platform notices for FANOS SEC learners.</p></div><button onClick={openCreate} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold text-sm"><Plus size={16} /> New Announcement</button></div>{error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex justify-between"><span>{error}</span><button onClick={loadAnnouncements} title="Retry"><RefreshCw size={14} /></button></div>}<div className="glass-panel p-4 rounded-lg border border-cyber-neon/20 mb-5"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search announcements..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray/30 border border-cyber-neon/20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" /></div></div>{loading ? <div className="text-center py-16 text-cyber-muted animate-pulse">Loading announcements...</div> : filtered.length === 0 ? <div className="text-center py-16 text-cyber-muted"><Bell size={40} className="mx-auto mb-3 opacity-30" /><p>No announcements found.</p></div> : <DataTable data={filtered} columns={columns} onEdit={openEdit} onDelete={archive} actions={['edit', 'delete']} />}<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Announcement' : 'Create Announcement'} size="lg"><form onSubmit={handleSubmit} className="space-y-4"><div><label className="admin-label">Title *</label><input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="admin-input" /></div><div><label className="admin-label">Message *</label><textarea required rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="admin-input resize-y" /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="admin-label">Type</label><select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="admin-input">{['General', 'Maintenance', 'New Feature', 'Event', 'Security Alert', 'Other'].map((value) => <option key={value}>{value}</option>)}</select></div><div><label className="admin-label">Priority</label><select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })} className="admin-input">{['High', 'Medium', 'Low'].map((value) => <option key={value}>{value}</option>)}</select></div><div><label className="admin-label">Audience</label><select value={form.targetAudience} onChange={(event) => setForm({ ...form, targetAudience: event.target.value })} className="admin-input">{['All', 'Students', 'Instructors', 'Admins'].map((value) => <option key={value}>{value}</option>)}</select></div><div><label className="admin-label">Start Date</label><input type="date" value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} className="admin-input" /></div><div><label className="admin-label">End Date</label><input type="date" value={form.endDate} onChange={(event) => setForm({ ...form, endDate: event.target.value })} className="admin-input" /></div></div><label className="flex items-center gap-2 text-sm text-cyber-text"><input type="checkbox" checked={form.dismissible} onChange={(event) => setForm({ ...form, dismissible: event.target.checked })} /> Dismissible by learners</label><div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon/10"><button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray/30 border border-cyber-neon/20 text-cyber-text rounded-lg text-sm">Cancel</button><button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black font-semibold text-sm disabled:opacity-50">{submitting ? 'Saving...' : editing ? 'Update Announcement' : 'Publish Announcement'}</button></div></form></Modal></motion.div></AdminLayout>;
};

export default AnnouncementsPage;
