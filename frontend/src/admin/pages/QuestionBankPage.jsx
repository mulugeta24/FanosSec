import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, MessageSquare, RefreshCw } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader, StatusBadge, DIFFICULTY_COLORS } from '../adminUtils';

const QUESTION_TYPES = ['Multiple Choice', 'True/False', 'Short Answer', 'Code'];
const CATEGORIES = [
    'Network Security', 'Web Security', 'Cryptography', 'Operating Systems',
    'Programming', 'Ethical Hacking', 'Digital Forensics', 'Incident Response',
    'Compliance', 'General Security', 'Other'
];

const emptyForm = {
    questionText: '',
    category: 'General Security',
    difficulty: 'Medium',
    type: 'Multiple Choice',
    options: '',
    correctAnswer: '',
    explanation: '',
    points: 1,
    tags: ''
};

const QuestionBankPage = () => {
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        const normalizedSearch = searchTerm.toLowerCase();
        setFilteredQuestions(questions.filter((question) =>
            question.questionText?.toLowerCase().includes(normalizedSearch) ||
            question.category?.toLowerCase().includes(normalizedSearch) ||
            question.type?.toLowerCase().includes(normalizedSearch)
        ));
    }, [questions, searchTerm]);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API}/question-bank`, { headers: getAuthHeader() });
            if (!response.ok) throw new Error('Failed to load questions.');
            const data = await response.json();
            setQuestions(Array.isArray(data) ? data : []);
        } catch (requestError) {
            setError(requestError.message || 'Failed to load questions.');
        } finally {
            setLoading(false);
        }
    };

    const openCreate = () => {
        setEditingQuestion(null);
        setFormData({ ...emptyForm });
        setModalOpen(true);
    };

    const openEdit = (question) => {
        setEditingQuestion(question);
        setFormData({
            questionText: question.questionText || '',
            category: question.category || 'General Security',
            difficulty: question.difficulty || 'Medium',
            type: question.type || 'Multiple Choice',
            options: (question.options || []).join('\n'),
            correctAnswer: question.correctAnswer || '',
            explanation: question.explanation || '',
            points: question.points || 1,
            tags: (question.tags || []).join(', ')
        });
        setModalOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        const payload = {
            ...formData,
            options: formData.options.split('\n').map((option) => option.trim()).filter(Boolean),
            tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
            points: Number(formData.points) || 1
        };

        try {
            const endpoint = editingQuestion
                ? `${API}/question-bank/${editingQuestion._id}`
                : `${API}/question-bank`;
            const response = await fetch(endpoint, {
                method: editingQuestion ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Failed to save question.');
            }
            setModalOpen(false);
            await fetchQuestions();
        } catch (requestError) {
            setError(requestError.message || 'Failed to save question.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (question) => {
        if (!window.confirm('Archive this question from the question bank?')) return;
        try {
            const response = await fetch(`${API}/question-bank/${question._id}`, {
                method: 'DELETE',
                headers: getAuthHeader()
            });
            if (!response.ok) throw new Error('Failed to archive question.');
            await fetchQuestions();
        } catch (requestError) {
            setError(requestError.message || 'Failed to archive question.');
        }
    };

    const columns = [
        {
            key: 'questionText',
            label: 'Question',
            sortable: true,
            render: (value) => <span className="font-semibold text-cyber-text">{value}</span>
        },
        { key: 'category', label: 'Category', render: (value) => <span className="text-cyan-400 text-xs">{value}</span> },
        { key: 'type', label: 'Type', render: (value) => <span className="text-gray-400 text-xs">{value}</span> },
        { key: 'difficulty', label: 'Difficulty', render: (value) => <StatusBadge value={value} colorMap={DIFFICULTY_COLORS} /> },
        { key: 'points', label: 'Points', render: (value) => <span className="text-yellow-400">{value || 1}</span> }
    ];

    return (
        <AdminLayout activeSection="question-bank">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3">
                            <MessageSquare className="text-cyber-neon" size={28} /> Question Bank
                        </h1>
                        <p className="text-cyber-muted text-sm mt-1">Manage assessment questions for FANOS SEC learning experiences.</p>
                    </div>
                    <button onClick={openCreate} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold text-sm">
                        <Plus size={16} /> New Question
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm flex items-center justify-between">
                        <span>{error}</span>
                        <button onClick={fetchQuestions} title="Retry" className="p-1"><RefreshCw size={14} /></button>
                    </div>
                )}

                <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
                        <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search questions..." className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading question bank...</div>
                ) : filteredQuestions.length === 0 ? (
                    <div className="text-center py-16 text-cyber-muted">
                        <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
                        <p className="text-lg font-semibold mb-1">No questions found</p>
                        <p className="text-sm">Create your first FANOS SEC assessment question.</p>
                    </div>
                ) : (
                    <DataTable data={filteredQuestions} columns={columns} onEdit={openEdit} onDelete={handleDelete} actions={['edit', 'delete']} />
                )}

                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingQuestion ? 'Edit Question' : 'Create Question'} size="xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Question *</label>
                            <textarea required rows={3} value={formData.questionText} onChange={(event) => setFormData({ ...formData, questionText: event.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Category *</label>
                                <select required value={formData.category} onChange={(event) => setFormData({ ...formData, category: event.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Type</label>
                                <select value={formData.type} onChange={(event) => setFormData({ ...formData, type: event.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {QUESTION_TYPES.map((type) => <option key={type}>{type}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Difficulty</label>
                                <select value={formData.difficulty} onChange={(event) => setFormData({ ...formData, difficulty: event.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                                    {['Easy', 'Medium', 'Hard'].map((difficulty) => <option key={difficulty}>{difficulty}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Points</label>
                                <input type="number" min="1" value={formData.points} onChange={(event) => setFormData({ ...formData, points: event.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Options</label>
                            <textarea rows={4} value={formData.options} onChange={(event) => setFormData({ ...formData, options: event.target.value })} placeholder="One option per line" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm resize-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Correct Answer *</label>
                            <input required value={formData.correctAnswer} onChange={(event) => setFormData({ ...formData, correctAnswer: event.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Explanation</label>
                            <textarea rows={3} value={formData.explanation} onChange={(event) => setFormData({ ...formData, explanation: event.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Tags</label>
                            <input value={formData.tags} onChange={(event) => setFormData({ ...formData, tags: event.target.value })} placeholder="Comma-separated tags" className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm" />
                        </div>
                        <div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon border-opacity-10">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 text-cyber-text rounded-lg hover:bg-opacity-50 transition-all text-sm">Cancel</button>
                            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all font-semibold text-sm disabled:opacity-50">
                                {submitting ? 'Saving...' : editingQuestion ? 'Update Question' : 'Create Question'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </motion.div>
        </AdminLayout>
    );
};

export default QuestionBankPage;
