import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import {
    Users, BookOpen, Flag, Award, TrendingUp, AlertCircle, Activity,
    CheckCircle, Clock, Newspaper, Shield, Wrench, FileText, Map,
    BookMarked, MessageSquare, Bell, Lock, Server
} from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import AdminLayout from './AdminLayout';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ProfileEditor from '../components/ProfileEditor';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, updateProfile, profileLoading, profileError } = useContext(AuthContext);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const token = userInfo?.token;

            const { data } = await axios.get(`${API}/admin/dashboard`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(data);
        } catch (err) {
            console.error('Error fetching dashboard stats:', err);
            setError('Could not load dashboard statistics. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const statCards = stats ? [
        { title: 'Total Learners', value: stats.learners?.total ?? 0, icon: Users, color: 'text-cyan-400', bgColor: 'bg-cyan-500', trend: `${stats.learners?.active ?? 0} active` },
        { title: 'New This Week', value: stats.learners?.newThisWeek ?? 0, icon: TrendingUp, color: 'text-emerald-400', bgColor: 'bg-emerald-500', trend: 'Registered' },
        { title: 'Total Courses', value: stats.education?.courses ?? 0, icon: BookOpen, color: 'text-green-400', bgColor: 'bg-green-500', trend: `${stats.education?.publishedCourses ?? 0} published` },
        { title: 'Learning Paths', value: stats.education?.paths ?? 0, icon: Map, color: 'text-violet-400', bgColor: 'bg-violet-500', trend: 'Paths' },
        { title: 'Modules', value: stats.education?.modules ?? 0, icon: BookMarked, color: 'text-blue-400', bgColor: 'bg-blue-500', trend: 'Content Units' },
        { title: 'Lessons', value: stats.education?.lessons ?? 0, icon: FileText, color: 'text-sky-400', bgColor: 'bg-sky-500', trend: 'Lessons' },
        { title: 'Labs', value: stats.practical?.labs ?? 0, icon: Server, color: 'text-purple-400', bgColor: 'bg-purple-500', trend: 'Practical' },
        { title: 'CTF Challenges', value: stats.practical?.challenges ?? 0, icon: Flag, color: 'text-red-400', bgColor: 'bg-red-500', trend: 'Active' },
        { title: 'Questions', value: stats.assessments?.questions ?? 0, icon: MessageSquare, color: 'text-orange-400', bgColor: 'bg-orange-500', trend: 'Question Bank' },
        { title: 'Certificates Issued', value: stats.certificates ?? 0, icon: Award, color: 'text-yellow-400', bgColor: 'bg-yellow-500', trend: 'Total' },
        { title: 'Cyber News', value: stats.intelligence?.news ?? 0, icon: Newspaper, color: 'text-rose-400', bgColor: 'bg-rose-500', trend: 'Articles' },
        { title: 'Vulnerabilities', value: stats.intelligence?.vulnerabilities ?? 0, icon: Shield, color: 'text-pink-400', bgColor: 'bg-pink-500', trend: 'CVEs' },
        { title: 'Security Tools', value: stats.intelligence?.tools ?? 0, icon: Wrench, color: 'text-indigo-400', bgColor: 'bg-indigo-500', trend: 'Tools' },
        { title: 'Guides', value: stats.intelligence?.guides ?? 0, icon: BookOpen, color: 'text-teal-400', bgColor: 'bg-teal-500', trend: 'Resources' },
        { title: 'Unread Messages', value: stats.communication?.unreadMessages ?? 0, icon: Bell, color: 'text-amber-400', bgColor: 'bg-amber-500', trend: `${stats.communication?.messages ?? 0} total` },
        { title: 'Suspended Users', value: stats.learners?.suspended ?? 0, icon: Lock, color: 'text-red-300', bgColor: 'bg-red-400', trend: 'Suspended' },
    ] : [];

    const contentDistribution = stats ? [
        { name: 'Courses', value: stats.education?.courses || 0, color: '#10b981' },
        { name: 'Labs', value: stats.practical?.labs || 0, color: '#a78bfa' },
        { name: 'Challenges', value: stats.practical?.challenges || 0, color: '#f87171' },
        { name: 'News', value: stats.intelligence?.news || 0, color: '#fb923c' },
        { name: 'Vulns', value: stats.intelligence?.vulnerabilities || 0, color: '#f43f5e' },
        { name: 'Tools', value: stats.intelligence?.tools || 0, color: '#6366f1' },
    ].filter(d => d.value > 0) : [];

    const recentActivity = stats?.recentActivity || [];

    return (
        <AdminLayout activeSection="overview">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-8 bg-cyber-neon rounded"></div>
                        <h1 className="text-3xl font-bold font-mono text-cyber-text">
                            FANOS SEC Control Center
                        </h1>
                    </div>
                    <p className="text-cyber-muted ml-5">Admin Dashboard — Platform Overview</p>
                </div>

                <div className="mb-8 max-w-3xl">
                    {profileLoading && <p className="mb-2 text-xs font-mono text-cyber-neon">Loading profile...</p>}
                    {profileError && <p className="mb-2 text-xs text-red-300">{profileError}</p>}
                    <ProfileEditor user={user} updateProfile={updateProfile} />
                </div>

                {/* Error State */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg flex items-center gap-3">
                        <AlertCircle className="text-red-400" size={20} />
                        <span className="text-red-400 text-sm">{error}</span>
                        <button onClick={fetchDashboardStats} className="ml-auto text-xs text-red-400 border border-red-500 border-opacity-40 px-3 py-1 rounded hover:bg-red-500 hover:bg-opacity-10 transition-all">
                            Retry
                        </button>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
                    {loading ? (
                        [...Array(16)].map((_, i) => (
                            <div key={i} className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 animate-pulse col-span-2">
                                <div className="h-8 bg-gray-700 rounded mb-2"></div>
                                <div className="h-6 bg-gray-700 rounded"></div>
                            </div>
                        ))
                    ) : (
                        statCards.map((stat, index) => (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.03 }}
                                className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 hover:border-opacity-40 transition-all col-span-2"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`p-2 rounded-lg ${stat.bgColor} bg-opacity-15`}>
                                        <stat.icon className={stat.color} size={18} />
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium">{stat.trend}</span>
                                </div>
                                <p className={`text-2xl font-mono font-bold ${stat.color}`}>{stat.value}</p>
                                <p className="text-cyber-muted text-xs mt-1 uppercase tracking-wide">{stat.title}</p>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Content Distribution */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="glass-panel p-6 rounded-lg border border-cyber-neon border-opacity-20"
                    >
                        <h2 className="text-lg font-bold font-mono text-cyber-neon mb-4 flex items-center gap-2">
                            <Activity size={18} />
                            Content Distribution
                        </h2>
                        {contentDistribution.length > 0 ? (
                            <ResponsiveContainer width="100%" height={260}>
                                <PieChart>
                                    <Pie
                                        data={contentDistribution}
                                        cx="50%" cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                                        outerRadius={95}
                                        dataKey="value"
                                    >
                                        {contentDistribution.map((entry, i) => (
                                            <Cell key={`cell-${i}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #00ff41', borderRadius: '8px', fontSize: '12px' }} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-64 flex items-center justify-center text-cyber-muted text-sm">
                                No content data available yet.
                            </div>
                        )}
                    </motion.div>

                    {/* Platform Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="glass-panel p-6 rounded-lg border border-cyber-neon border-opacity-20"
                    >
                        <h2 className="text-lg font-bold font-mono text-cyber-neon mb-4 flex items-center gap-2">
                            <CheckCircle size={18} />
                            System Status
                        </h2>
                        <div className="space-y-3">
                            {[
                                { service: 'FANOS SEC API', status: 'Operational', color: 'green' },
                                { service: 'MongoDB Atlas', status: 'Connected', color: 'green' },
                                { service: 'JWT Authentication', status: 'Active', color: 'green' },
                                { service: 'Admin RBAC', status: 'Enforced', color: 'green' },
                                { service: 'CTF Flag Security', status: 'Server-Side', color: 'green' },
                                { service: 'Certificate System', status: 'Online', color: 'green' },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-cyber-gray bg-opacity-20 rounded-lg">
                                    <span className="text-cyber-text text-sm">{s.service}</span>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full bg-${s.color}-400 animate-pulse`} />
                                        <span className={`text-xs text-${s.color}-400 font-semibold`}>{s.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {stats && (
                            <div className="mt-4 pt-4 border-t border-cyber-neon border-opacity-10">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-center p-3 bg-cyber-gray bg-opacity-20 rounded-lg">
                                        <p className="text-cyber-neon text-xl font-mono font-bold">{stats.learners?.total ?? 0}</p>
                                        <p className="text-xs text-cyber-muted mt-1">Total Learners</p>
                                    </div>
                                    <div className="text-center p-3 bg-cyber-gray bg-opacity-20 rounded-lg">
                                        <p className="text-yellow-400 text-xl font-mono font-bold">{stats.certificates ?? 0}</p>
                                        <p className="text-xs text-cyber-muted mt-1">Certificates</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Recent Admin Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="glass-panel p-6 rounded-lg border border-cyber-neon border-opacity-20 mb-6"
                >
                    <h2 className="text-lg font-bold font-mono text-cyber-neon mb-4 flex items-center gap-2">
                        <Clock size={18} />
                        Recent Admin Activity
                    </h2>
                    {recentActivity.length > 0 ? (
                        <div className="space-y-2">
                            {recentActivity.map((activity, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 bg-cyber-gray bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                                    <div className="flex-grow min-w-0">
                                        <p className="text-cyber-text text-sm font-medium">{activity.description}</p>
                                        <p className="text-cyber-muted text-xs">{activity.admin?.name || 'Admin'} · {activity.entity}</p>
                                    </div>
                                    <span className="text-cyber-muted text-xs whitespace-nowrap flex-shrink-0">
                                        {new Date(activity.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-cyber-muted text-sm">
                            No recent admin activity recorded.
                        </div>
                    )}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="glass-panel p-6 rounded-lg border border-cyber-neon border-opacity-20"
                >
                    <h2 className="text-lg font-bold font-mono text-cyber-neon mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {[
                            { label: 'Add Course', icon: BookOpen, link: '/admin/courses' },
                            { label: 'Create Lab', icon: Server, link: '/admin/labs' },
                            { label: 'New Challenge', icon: Flag, link: '/admin/challenges' },
                            { label: 'View Certs', icon: Award, link: '/admin/certificates' },
                            { label: 'Add News', icon: Newspaper, link: '/admin/news' },
                            { label: 'View Learners', icon: Users, link: '/admin/learners' },
                        ].map((action, i) => (
                            <button
                                key={i}
                                onClick={() => window.location.href = action.link}
                                className="p-4 bg-cyber-gray bg-opacity-20 rounded-lg hover:bg-opacity-40 hover:scale-105 transition-all border border-cyber-neon border-opacity-10 hover:border-opacity-30 flex flex-col items-center gap-2 group"
                            >
                                <action.icon className="text-cyber-neon group-hover:text-cyan-300 transition-colors" size={24} />
                                <span className="text-cyber-text text-xs font-medium text-center">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </AdminLayout>
    );
};

export default AdminDashboard;
