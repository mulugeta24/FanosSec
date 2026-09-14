import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    BookOpen,
    GraduationCap,
    FileText,
    Map,
    BookMarked,
    Video,
    FileImage,
    File,
    Image,
    Presentation,
    FolderOpen,
    FlaskConical,
    Dumbbell,
    Flag,
    Target,
    ClipboardCheck,
    HelpCircle,
    MessageSquare,
    FileQuestion,
    ListChecks,
    Newspaper,
    Shield,
    AlertTriangle,
    Radio,
    Activity,
    Wrench,
    BookOpenCheck,
    FileCode,
    ScrollText,
    Award,
    CheckCircle,
    FileCheck,
    Users,
    UserCog,
    UserCheck,
    BarChart3,
    TrendingUp,
    PieChart,
    LineChart,
    MessageCircle,
    Bell,
    Send,
    Settings,
    Lock,
    History,
    Database,
    LogOut,
    ChevronDown,
    ChevronRight,
    Menu,
    X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProfileEditor from '../components/ProfileEditor';

const AdminLayout = ({ children, activeSection }) => {
    const [expandedMenus, setExpandedMenus] = useState(['overview']);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, updateProfile } = useContext(AuthContext);

    useEffect(() => {
        const matchingSection = navigationStructure.find((section) => {
            if (section.single) return section.path === location.pathname;
            return section.children?.some((child) => child.path === location.pathname);
        });

        if (matchingSection && !matchingSection.single) {
            setExpandedMenus((prev) => prev.includes(matchingSection.id) ? prev : [...prev, matchingSection.id]);
        }
    }, [location.pathname]);

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const adminName = user?.name || userInfo?.name || 'Administrator';
    const adminEmail = user?.email || userInfo?.email || '';
    const adminAvatar = user?.avatar || user?.profileImage || userInfo?.avatar || '';

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    const toggleMenu = (menuId) => {
        setExpandedMenus(prev =>
            prev.includes(menuId)
                ? prev.filter(id => id !== menuId)
                : [...prev, menuId]
        );
    };

    const navigationStructure = [
        {
            id: 'overview',
            label: 'Overview',
            icon: LayoutDashboard,
            path: '/admin',
            single: true
        },
        {
            id: 'learning-management',
            label: 'Learning Management',
            icon: BookOpen,
            children: [
                { id: 'courses', label: 'Courses', icon: GraduationCap, path: '/admin/courses' },
                { id: 'modules', label: 'Modules', icon: BookMarked, path: '/admin/modules' },
                { id: 'lessons', label: 'Lessons', icon: FileText, path: '/admin/lessons' },
                { id: 'theory', label: 'Theory Pages', icon: BookOpen, path: '/admin/theory' },
                { id: 'paths', label: 'Learning Paths', icon: Map, path: '/admin/paths' },
                { id: 'curriculum', label: 'Curriculum', icon: ListChecks, path: '/admin/curriculum' }
            ]
        },
        {
            id: 'learning-content',
            label: 'Learning Content',
            icon: Video,
            children: [
                { id: 'videos', label: 'Videos', icon: Video, path: '/admin/videos' },
                { id: 'documents', label: 'Documents', icon: File, path: '/admin/documents' },
                { id: 'pdfs', label: 'PDFs', icon: FileText, path: '/admin/pdfs' },
                { id: 'images', label: 'Images', icon: Image, path: '/admin/images' },
                { id: 'slides', label: 'Slides', icon: Presentation, path: '/admin/slides' },
                { id: 'resources', label: 'Resources', icon: FolderOpen, path: '/admin/resources' }
            ]
        },
        {
            id: 'practical-training',
            label: 'Practical Training',
            icon: FlaskConical,
            children: [
                { id: 'labs', label: 'Labs', icon: FlaskConical, path: '/admin/labs' },
                { id: 'exercises', label: 'Exercises', icon: Dumbbell, path: '/admin/exercises' },
                { id: 'challenges', label: 'CTF Challenges', icon: Flag, path: '/admin/challenges' },
                { id: 'scenarios', label: 'Scenarios', icon: Target, path: '/admin/scenarios' },
                { id: 'assessments', label: 'Assessments', icon: ClipboardCheck, path: '/admin/assessments' }
            ]
        },
        {
            id: 'assessment',
            label: 'Assessment',
            icon: HelpCircle,
            children: [
                { id: 'question-bank', label: 'Question Bank', icon: MessageSquare, path: '/admin/question-bank' },
                { id: 'quizzes', label: 'Quizzes', icon: FileQuestion, path: '/admin/quizzes' },
                { id: 'exams', label: 'Exams', icon: ClipboardCheck, path: '/admin/exams' },
                { id: 'question-categories', label: 'Question Categories', icon: ListChecks, path: '/admin/question-categories' }
            ]
        },
        {
            id: 'cyber-intelligence',
            label: 'Cyber Intelligence',
            icon: Newspaper,
            children: [
                { id: 'news', label: 'Daily News', icon: Newspaper, path: '/admin/news' },
                { id: 'vulnerabilities', label: 'Vulnerabilities', icon: Shield, path: '/admin/vulnerabilities' },
                { id: 'threat-intel', label: 'Threat Intelligence', icon: AlertTriangle, path: '/admin/threat-intel' },
                { id: 'advisories', label: 'Security Advisories', icon: Radio, path: '/admin/advisories' },
                { id: 'research', label: 'Security Research', icon: Activity, path: '/admin/research' }
            ]
        },
        {
            id: 'knowledge-center',
            label: 'Knowledge Center',
            icon: Wrench,
            children: [
                { id: 'security-tools', label: 'Security Tools', icon: Wrench, path: '/admin/security-tools' },
                { id: 'glossary', label: 'Glossary', icon: BookOpenCheck, path: '/admin/glossary' },
                { id: 'cheat-sheets', label: 'Cheat Sheets', icon: FileCode, path: '/admin/cheat-sheets' },
                { id: 'guides', label: 'Guides', icon: ScrollText, path: '/admin/guides' }
            ]
        },
        {
            id: 'certifications',
            label: 'Certifications',
            icon: Award,
            children: [
                { id: 'cert-tracks', label: 'Certification Tracks', icon: Award, path: '/admin/cert-tracks' },
                { id: 'requirements', label: 'Requirements', icon: CheckCircle, path: '/admin/requirements' },
                { id: 'certificates', label: 'Certificates', icon: Award, path: '/admin/certificates' },
                { id: 'verification', label: 'Verification', icon: FileCheck, path: '/admin/verification' }
            ]
        },
        {
            id: 'users',
            label: 'Users',
            icon: Users,
            children: [
                { id: 'learners', label: 'Learners', icon: Users, path: '/admin/learners' },
                { id: 'instructors', label: 'Instructors', icon: UserCog, path: '/admin/instructors' },
                { id: 'administrators', label: 'Administrators', icon: UserCheck, path: '/admin/administrators' }
            ]
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: BarChart3,
            children: [
                { id: 'learning-analytics', label: 'Learning Analytics', icon: TrendingUp, path: '/admin/learning-analytics' },
                { id: 'course-analytics', label: 'Course Analytics', icon: PieChart, path: '/admin/course-analytics' },
                { id: 'lab-analytics', label: 'Lab Analytics', icon: LineChart, path: '/admin/lab-analytics' },
                { id: 'exam-analytics', label: 'Exam Analytics', icon: BarChart3, path: '/admin/exam-analytics' }
            ]
        },
        {
            id: 'communication',
            label: 'Communication',
            icon: MessageCircle,
            children: [
                { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/admin/messages' },
                { id: 'announcements', label: 'Announcements', icon: Bell, path: '/admin/announcements' },
                { id: 'notifications', label: 'Notifications', icon: Send, path: '/admin/notifications' }
            ]
        },
        {
            id: 'settings',
            label: 'Platform Settings',
            icon: Settings,
            path: '/admin/settings',
            single: true
        },
        {
            id: 'security-audit',
            label: 'Security & Audit',
            icon: Lock,
            children: [
                { id: 'admin-activity', label: 'Admin Activity', icon: History, path: '/admin/admin-activity' },
                { id: 'login-history', label: 'Login History', icon: Database, path: '/admin/login-history' },
                { id: 'audit-logs', label: 'Audit Logs', icon: FileText, path: '/admin/audit-logs' }
            ]
        }
    ];

    const handleNavigation = (path) => {
        if (path) {
            navigate(path);
        }
    };

    return (
        <div className="flex min-h-screen bg-cyber-darkest">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? 'w-72' : 'w-16'
                    } transition-all duration-300 border-r border-cyber-neon border-opacity-20 glass-panel flex flex-col fixed h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-cyber-neon scrollbar-track-cyber-gray z-50`}
            >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-cyber-neon border-opacity-10 flex items-center justify-between flex-shrink-0">
                    {sidebarOpen && (
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="min-w-0 flex-1">
                                <div className="mb-3 border-b border-white/10 pb-3">
                                    <h2 className="text-base font-bold font-mono leading-tight text-cyber-neon">FANOS SEC</h2>
                                    <p className="text-[10px] uppercase tracking-widest text-cyber-muted">Admin Control Center</p>
                                </div>
                                <ProfileEditor user={user || { ...userInfo, name: adminName, email: adminEmail, avatar: adminAvatar }} updateProfile={updateProfile} compact />
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-cyber-neon hover:text-white transition-colors p-1 rounded"
                    >
                        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-grow py-4">
                    <ul className="space-y-1">
                        {navigationStructure.map((section) => (
                            <li key={section.id}>
                                {section.single ? (
                                    <button
                                        onClick={() => handleNavigation(section.path)}
                                        className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-colors ${activeSection === section.id
                                            ? 'border-l-4 border-cyber-neon bg-cyber-neon/10 text-cyber-neon font-bold'
                                            : 'border-l-4 border-transparent text-cyber-muted hover:bg-cyber-gray hover:text-cyber-text'
                                            }`}
                                        title={!sidebarOpen ? section.label : ''}
                                    >
                                        <span className={`flex h-5 w-5 items-center justify-center ${activeSection === section.id ? 'text-cyber-neon' : 'text-cyber-muted'}`}>
                                            <section.icon size={18} />
                                        </span>
                                        {sidebarOpen && <span className="text-sm">{section.label}</span>}
                                    </button>
                                ) : (
                                    <div>
                                        <button
                                            onClick={() => toggleMenu(section.id)}
                                            className={`w-full text-left px-6 py-3 flex items-center justify-between transition-colors ${expandedMenus.includes(section.id)
                                                ? 'text-cyber-neon'
                                                : 'text-cyber-muted hover:text-cyber-text'
                                                }`}
                                            title={!sidebarOpen ? section.label : ''}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`flex h-5 w-5 items-center justify-center ${expandedMenus.includes(section.id) ? 'text-cyber-neon' : 'text-cyber-muted'}`}>
                                                    <section.icon size={18} />
                                                </span>
                                                {sidebarOpen && <span className="text-sm font-semibold">{section.label}</span>}
                                            </div>
                                            {sidebarOpen && (
                                                expandedMenus.includes(section.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                                            )}
                                        </button>

                                        <AnimatePresence>
                                            {expandedMenus.includes(section.id) && sidebarOpen && (
                                                <motion.ul
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden bg-cyber-gray/20"
                                                >
                                                    {section.children.map((child) => (
                                                        <li key={child.id}>
                                                            <button
                                                                onClick={() => handleNavigation(child.path)}
                                                                className={`w-full text-left pl-14 pr-6 py-2.5 flex items-center gap-3 transition-colors ${activeSection === child.id
                                                                    ? 'bg-cyber-neon/10 text-cyber-neon'
                                                                    : 'text-cyber-muted hover:bg-cyber-gray hover:text-cyber-text'
                                                                    }`}
                                                            >
                                                                <span className={`flex h-4 w-4 items-center justify-center ${activeSection === child.id ? 'text-cyber-neon' : 'text-cyber-muted'}`}>
                                                                    <child.icon size={14} />
                                                                </span>
                                                                <span className="text-xs">{child.label}</span>
                                                            </button>
                                                        </li>
                                                    ))}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer with user info + logout */}
                <div className="p-3 border-t border-cyber-neon border-opacity-10 flex-shrink-0">
                    {sidebarOpen && (
                        <div className="mb-2 flex items-center gap-3 rounded-lg bg-cyber-gray/20 px-2 py-2">
                            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-cyber-neon/40 bg-cyber-neon/10">
                                {adminAvatar ? (
                                    <img src={adminAvatar} alt={adminName} className="h-full w-full object-contain" />
                                ) : (
                                    <span className="text-[10px] font-bold text-cyber-neon">{adminName?.charAt(0)?.toUpperCase() || 'A'}</span>
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-cyber-text font-semibold truncate">{adminName}</p>
                                <p className="text-[10px] text-cyber-muted truncate">{adminEmail}</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-cyber-red hover:text-white transition-colors w-full px-2 py-2 rounded hover:bg-red-500 hover:bg-opacity-10"
                        title={!sidebarOpen ? 'Logout' : ''}
                    >
                        <LogOut size={18} />
                        {sidebarOpen && <span className="text-sm">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main content area */}
            <div className={`flex-grow ${sidebarOpen ? 'ml-72' : 'ml-16'} transition-all duration-300 flex flex-col min-h-screen`}>
                {/* Topbar */}
                <header className="sticky top-0 z-40 bg-cyber-darkest border-b border-cyber-neon border-opacity-10 px-6 py-3 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-cyber-neon rounded"></div>
                        <span className="text-cyber-text text-sm font-mono uppercase tracking-wide">FANOS SEC Admin</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden items-center gap-2 md:flex">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-cyber-neon/40 bg-cyber-neon/10">
                                {adminAvatar ? (
                                    <img src={adminAvatar} alt={adminName} className="h-full w-full object-contain" />
                                ) : (
                                    <span className="text-[10px] font-bold text-cyber-neon">{adminName?.charAt(0)?.toUpperCase() || 'A'}</span>
                                )}
                            </div>
                            <span className="text-xs text-cyber-muted">Logged in as <span className="text-cyber-neon font-semibold">{adminName}</span></span>
                        </div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-xs text-cyber-muted border border-cyber-neon border-opacity-20 px-3 py-1.5 rounded hover:border-opacity-40 hover:text-cyber-text transition-all"
                        >
                            ← Learner View
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-grow p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
