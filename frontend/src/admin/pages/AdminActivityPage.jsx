import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, RefreshCw } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import { API, getAuthHeader } from '../adminUtils';

const AdminActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    const filtered = activities.filter((activity) => {
      const text = `${activity.action || ''} ${activity.entity || ''} ${activity.description || ''}`.toLowerCase();
      return !searchTerm || text.includes(searchTerm.toLowerCase());
    });
    setFilteredActivities(filtered);
  }, [searchTerm, activities]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API}/admin-activities?limit=100`, { headers: getAuthHeader() });
      if (!response.ok) throw new Error('Failed to load activity log.');
      const data = await response.json();
      setActivities(Array.isArray(data) ? data : []);
      setFilteredActivities(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load activity log.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'action', label: 'Action', render: (value) => <span className="text-cyber-neon text-xs uppercase font-semibold">{value || 'VIEW'}</span> },
    { key: 'entity', label: 'Entity', render: (value) => <span className="text-cyan-400 text-xs">{value || 'System'}</span> },
    { key: 'description', label: 'Description', render: (value) => <span className="text-gray-300 text-xs">{value || '—'}</span> },
    { key: 'createdAt', label: 'Date', render: (value) => <span className="text-gray-400 text-xs">{value ? new Date(value).toLocaleString() : '—'}</span> }
  ];

  return (
    <AdminLayout activeSection="admin-activity">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3">
              <Shield className="text-cyber-neon" size={28} /> Admin Activity
            </h1>
            <p className="text-cyber-muted text-sm mt-1">Audit change history for admin actions and learner approvals.</p>
          </div>
          <button onClick={fetchActivities} className="px-4 py-2.5 border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 text-sm">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm">{error}</div>
        )}

        <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search activity log..."
              className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading activity log...</div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-16 text-cyber-muted">
            <Shield size={40} className="mx-auto mb-3 opacity-30" />
            <p>No activity recorded yet.</p>
          </div>
        ) : (
          <DataTable data={filteredActivities} columns={columns} actions={[]} />
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default AdminActivityPage;
