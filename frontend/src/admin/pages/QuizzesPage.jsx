import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FileQuestion, RefreshCw } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader } from '../adminUtils';

const emptyForm = { title: '', course: '', questions: '' };

const QuizzesPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { loadData(); }, []);
    useEffect(() => {
        const query = search.toLowerCase();
        setFiltered(quizzes.filter((quiz) => quiz.title?.toLowerCase().includes(query) || quiz.course?.title?.toLowerCase().includes(query)));
    }, [quizzes, search]);

    const loadData = async () => {
        try {
            setLoading(true); setError(null);
            const [quizResponse, courseResponse] = await Promise.all([
                fetch(`${API}/quizzes`, { headers: getAuthHeader() }),
                fetch(`${API}/courses`, { headers: getAuthHeader() })
            ]);
            if (!quizResponse.ok || !courseResponse.ok) throw new Error('Failed to load quiz data.');
            const quizData = await quizResponse.json();
            const courseData = await courseResponse.json();
            setQuizzes(Array.isArray(quizData) ? quizData : []);
            setCourses(Array.isArray(courseData) ? courseData : []);
        } catch (requestError) {
            setError(requestError.message || 'Failed to load quiz data.');
        } finally { setLoading(false); }
    };

    const openCreate = () => { setEditing(null); setForm({ ...emptyForm }); setModalOpen(true); };
    const openEdit = (quiz) => {
        setEditing(quiz);
        setForm({ title: quiz.title || '', course: quiz.course?._id || quiz.course || '', questions: (quiz.questions || []).map((question) => JSON.stringify(question)).join('\n') });
        setModalOpen(true);
    };

    const parseQuestions = () => form.questions.split('\n').map((line) => line.trim()).filter(Boolean).map((line) => {
        const question = JSON.parse(line);
        if (!question.questionText || !Array.isArray(question.options) || !question.correctAnswer) throw new Error('Each question needs questionText, options, and correctAnswer.');
        return question;
    });

    const handleSubmit = async (event) => {
        event.preventDefault(); setSubmitting(true); setError(null);
        try {
            const payload = { title: form.title.trim(), course: form.course, questions: parseQuestions() };
            const response = await fetch(editing ? `${API}/quizzes/${editing._id}` : `${API}/quizzes`, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error((await response.json()).message || 'Failed to save quiz.');
            setModalOpen(false); await loadData();
        } catch (requestError) { setError(requestError.message || 'Failed to save quiz.'); }
        finally { setSubmitting(false); }
    };

    const columns = [
        { key: 'title', label: 'Quiz Title', sortable: true, render: (value) => <span className="font-semibold text-cyber-text">{value}</span> },
        { key: 'course', label: 'Course', render: (value) => <span className="text-cyan-400 text-xs">{value?.title || '—'}</span> },
        { key: 'questions', label: 'Questions', render: (value) => <span className="text-gray-400">{value?.length || 0}</span> },
        { key: 'createdAt', label: 'Created', sortable: true, render: (value) => <span className="text-gray-500 text-xs">{value ? new Date(value).toLocaleDateString() : '—'}</span> }
    ];

    return <AdminLayout activeSection="quizzes">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center justify-between mb-6"><div><h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3"><FileQuestion className="text-cyber-neon" size={28} /> Quizzes</h1><p className="text-cyber-muted text-sm mt-1">Create and manage FANOS SEC quizzes.</p></div><button onClick={openCreate} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold text-sm"><Plus size={16} /> New Quiz</button></div>
            {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex justify-between"><span>{error}</span><button onClick={loadData} title="Retry"><RefreshCw size={14} /></button></div>}
            <div className="glass-panel p-4 rounded-lg border border-cyber-neon/20 mb-5"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search quizzes..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray/30 border border-cyber-neon/20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" /></div></div>
            {loading ? <div className="text-center py-16 text-cyber-muted animate-pulse">Loading quizzes...</div> : filtered.length === 0 ? <div className="text-center py-16 text-cyber-muted"><FileQuestion size={40} className="mx-auto mb-3 opacity-30" /><p>No quizzes found.</p></div> : <DataTable data={filtered} columns={columns} onEdit={openEdit} actions={['edit']} />}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Quiz' : 'Create Quiz'} size="xl"><form onSubmit={handleSubmit} className="space-y-4"><div><label className="admin-label">Quiz Title *</label><input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="admin-input" /></div><div><label className="admin-label">Course *</label><select required value={form.course} onChange={(event) => setForm({ ...form, course: event.target.value })} className="admin-input"><option value="">Select a course</option>{courses.map((course) => <option key={course._id} value={course._id}>{course.title}</option>)}</select></div><div><label className="admin-label">Questions *</label><textarea required rows={8} value={form.questions} onChange={(event) => setForm({ ...form, questions: event.target.value })} placeholder='One JSON object per line: {"questionText":"...","options":["A","B"],"correctAnswer":"A","explanation":"..."}' className="admin-input font-mono text-xs resize-y" /><p className="text-cyber-muted text-xs mt-1">Use one JSON question object per line.</p></div><div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon/10"><button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray/30 border border-cyber-neon/20 text-cyber-text rounded-lg text-sm">Cancel</button><button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black font-semibold text-sm disabled:opacity-50">{submitting ? 'Saving...' : editing ? 'Update Quiz' : 'Create Quiz'}</button></div></form></Modal>
        </motion.div>
    </AdminLayout>;
};

export default QuizzesPage;
