import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Award } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import { API, getAuthHeader, StatusBadge, STATUS_COLORS } from '../adminUtils';

const CertificatesPage = () => {
    const [certs, setCerts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [total, setTotal] = useState(0);

    useEffect(() => { fetchCerts(); }, []);
    useEffect(() => {
        let f = certs;
        if (searchTerm) f = f.filter(c => c.certificateId?.toLowerCase().includes(searchTerm.toLowerCase()) || c.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
        if (filterStatus !== 'all') f = f.filter(c => (c.status || 'active') === filterStatus);
        setFiltered(f);
    }, [searchTerm, filterStatus, certs]);

    const fetchCerts = async () => {
        try {
            setLoading(true); setError(null);
            const res = await fetch(`${API}/certificates/all`, { headers: getAuthHeader() });
            const data = await res.json();
            const list = data.certificates || data;
            setCerts(Array.isArray(list) ? list : []);
            setFiltered(Array.isArray(list) ? list : []);
            setTotal(data.total || list.length);
        } catch { setError('Failed to load certificates.'); }
        finally { setLoading(false); }
    };

    const updateStatus = async (cert, status) => {
        if (!confirm(`Set certificate ${cert.certificateId} to "${status}"?`)) return;
        try {
            const res = await fetch(`${API}/certificates/${cert._id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
                body: JSON.stringify({ status })
            });
            if (!res.ok) throw new Error('Failed to update status');
            fetchCerts();
        } catch (err) { alert(err.message); }
    };

    const columns = [
        { key: 'certificateId', label: 'Certificate ID', render: (v) => <span className="font-mono text-cyber-neon font-bold">{v}</span> },
        { key: 'user', label: 'Learner', render: (v) => <div><p className="text-cyber-text text-sm font-medium">{v?.name || '—'}</p><p className="text-gray-500 text-xs">{v?.email || ''}</p></div> },
        { key: 'course', label: 'Course', render: (v) => <span className="text-cyan-400 text-xs">{v?.title || '—'}</span> },
        { key: 'status', label: 'Status', render: (v) => <StatusBadge value={v || 'active'} colorMap={STATUS_COLORS} /> },
        { key: 'issuedAt', label: 'Issued', sortable: true, render: (v) => <span className="text-gray-400 text-xs">{v ? new Date(v).toLocaleDateString() : '—'}</span> },
    ];

    const customActions = (cert) => (
        <div className="flex items-center gap-1">
            {(cert.status === 'active' || !cert.status) && (
                <button onClick={() => updateStatus(cert, 'revoked')} className="px-2 py-1 text-xs text-red-400 border border-red-500 border-opacity-30 rounded hover:bg-red-500 hover:bg-opacity-10 transition-all">Revoke</button>
            )}
            {cert.status === 'revoked' && (
                <button onClick={() => updateStatus(cert, 'active')} className="px-2 py-1 text-xs text-green-400 border border-green-500 border-opacity-30 rounded hover:bg-green-500 hover:bg-opacity-10 transition-all">Restore</button>
            )}
        </div>
    );

    return (
        <AdminLayout activeSection="certificates">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3"><Award className="text-yellow-400" size={28} />Certificates</h1>
                        <p className="text-cyber-muted text-sm mt-1">Manage FANOS SEC issued certificates — {total} total</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                        { label: 'Total Issued', value: total, color: 'text-yellow-400' },
                        { label: 'Active', value: certs.filter(c => !c.status || c.status === 'active').length, color: 'text-green-400' },
                        { label: 'Revoked', value: certs.filter(c => c.status === 'revoked').length, color: 'text-red-400' },
                    ].map((s, i) => (
                        <div key={i} className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 text-center">
                            <p className={`text-3xl font-mono font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-xs text-cyber-muted mt-1 uppercase tracking-wide">{s.label}</p>
                        </div>
                    ))}
                </div>

                {error && <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm">{error}</div>}

                <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5 flex gap-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by ID or learner name..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" />
                    </div>
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="revoked">Revoked</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>

                {loading ? <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading certificates...</div> : filtered.length === 0 ? (
                    <div className="text-center py-16 text-cyber-muted"><Award size={40} className="mx-auto mb-3 opacity-30 text-yellow-400" /><p>No certificates found matching your search.</p></div>
                ) : (
                    <div className="space-y-4">
                        <DataTable data={filtered} columns={columns} actions={[]} itemsPerPage={15} />
                        <div className="flex flex-wrap gap-2">
                            {filtered.map(cert => (
                                <div key={cert._id} className="ml-auto">{customActions(cert)}</div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </AdminLayout>
    );
};

export default CertificatesPage;
