import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, ShieldAlert, ShieldCheck, RefreshCw } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import { API, getAuthHeader, StatusBadge, STATUS_COLORS } from '../adminUtils';

const LearnersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesText = !searchTerm ||
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesText && matchesStatus;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, statusFilter, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API}/users?limit=100`, { headers: getAuthHeader() });
      if (!response.ok) throw new Error('Failed to load learners.');
      const data = await response.json();
      const list = Array.isArray(data.users) ? data.users : [];
      setUsers(list);
      setFilteredUsers(list);
    } catch (err) {
      setError(err.message || 'Failed to load learners.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatus = async (user, nextStatus) => {
    try {
      const response = await fetch(`${API}/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify({ status: nextStatus })
      });
      if (!response.ok) throw new Error('Could not update learner status.');
      await fetchUsers();
    } catch (err) {
      setError(err.message || 'Could not update learner status.');
    }
  };

  const columns = [
    { key: 'name', label: 'Name', sortable: true, render: (value, row) => <span className="font-semibold text-cyber-text">{value || '—'}</span> },
    { key: 'email', label: 'Email', render: (value) => <span className="text-cyber-muted text-xs">{value || '—'}</span> },
    { key: 'status', label: 'Status', render: (value) => <StatusBadge value={value || 'active'} colorMap={{ active: 'bg-green-500/20 text-green-400', suspended: 'bg-red-500/20 text-red-400' }} /> },
    { key: 'role', label: 'Role', render: (value) => <span className="text-cyan-400 text-xs uppercase">{value || 'user'}</span> },
    { key: 'lastActive', label: 'Last Active', render: (value) => <span className="text-gray-400 text-xs">{value ? new Date(value).toLocaleDateString() : 'Never'}</span> },
  ];

  return (
    <AdminLayout activeSection="learners">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3">
              <Users className="text-cyber-neon" size={28} /> Learners
            </h1>
            <p className="text-cyber-muted text-sm mt-1">Manage learner access, approval, and activity.</p>
          </div>
          <button onClick={fetchUsers} className="px-4 py-2.5 border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 text-sm">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm">{error}</div>
        )}

        <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search learners..."
              className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm"
          >
            <option value="all">All Learners</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading learners...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-16 text-cyber-muted">
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p>No learners found.</p>
          </div>
        ) : (
          <DataTable
            data={filteredUsers}
            columns={columns}
            actions={['edit', 'delete']}
            onEdit={(user) => handleUserStatus(user, user.status === 'suspended' ? 'active' : 'suspended')}
            onDelete={(user) => handleUserStatus(user, 'suspended')}
          />
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default LearnersPage;
