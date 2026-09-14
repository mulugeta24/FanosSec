import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, CheckCheck, Eye, RefreshCw } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import { API, getAuthHeader } from '../adminUtils';

const ContactMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const filtered = messages.filter((message) => {
      const matchesText = !searchTerm ||
        message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || (statusFilter === 'read' ? message.isRead : !message.isRead);
      return matchesText && matchesStatus;
    });
    setFilteredMessages(filtered);
  }, [searchTerm, statusFilter, messages]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API}/contacts`, { headers: getAuthHeader() });
      if (!response.ok) throw new Error('Failed to load contact messages.');
      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []);
      setFilteredMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load contact messages.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (message) => {
    try {
      const response = await fetch(`${API}/contacts/${message._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify({ isRead: !message.isRead })
      });
      if (!response.ok) throw new Error('Update failed.');
      await fetchMessages();
    } catch (err) {
      setError(err.message || 'Could not update message status.');
    }
  };

  const columns = [
    { key: 'name', label: 'Name', sortable: true, render: (value) => <span className="font-semibold text-cyber-text">{value || '—'}</span> },
    { key: 'email', label: 'Email', render: (value) => <span className="text-cyber-muted text-xs">{value || '—'}</span> },
    { key: 'message', label: 'Message', render: (value) => <span className="text-gray-300 text-xs line-clamp-2">{value || '—'}</span> },
    { key: 'isRead', label: 'Status', render: (value) => <span className={`px-2 py-1 rounded text-xs ${value ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>{value ? 'Read' : 'Unread'}</span> },
    { key: 'createdAt', label: 'Submitted', render: (value) => <span className="text-xs text-gray-400">{value ? new Date(value).toLocaleDateString() : '—'}</span> }
  ];

  return (
    <AdminLayout activeSection="messages">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3">
              <MessageSquare className="text-cyber-neon" size={28} /> Contact Messages
            </h1>
            <p className="text-cyber-muted text-sm mt-1">Review learner and public inquiries and approve or mark them as read.</p>
          </div>
          <button onClick={fetchMessages} className="px-4 py-2.5 border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 text-sm">
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
              placeholder="Search contact messages..."
              className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading messages...</div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-16 text-cyber-muted">
            <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
            <p>No messages found.</p>
          </div>
        ) : (
          <DataTable
            data={filteredMessages}
            columns={columns}
            actions={['edit', 'delete']}
            onEdit={handleMarkRead}
            onDelete={handleMarkRead}
          />
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default ContactMessagesPage;
