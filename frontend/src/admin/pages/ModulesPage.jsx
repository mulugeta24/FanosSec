import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const ModulesPage = () => {
    const [modules, setModules] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredModules, setFilteredModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        course: '',
        order: 0,
        duration: '',
        fileUrl: '',
        fileType: 'PDF',
        isPublished: false
    });

    useEffect(() => {
        fetchModules();
        fetchCourses();
    }, []);

    useEffect(() => {
        // Filter modules based on search term
        const filtered = modules.filter(module =>
            module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            module.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredModules(filtered);
    }, [searchTerm, modules]);

    const getAuthToken = () => {
        const savedUser = JSON.parse(localStorage.getItem('userInfo') || '{}');
        return savedUser?.token || localStorage.getItem('token') || '';
    };

    const fetchCourses = async () => {
        try {
            const token = getAuthToken();
            const response = await fetch(`${import.meta.env.VITE_API_URL}/courses`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setCourses(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchModules = async () => {
        try {
            const token = getAuthToken();
            const response = await fetch(`${import.meta.env.VITE_API_URL}/modules`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setModules(data);
            setFilteredModules(data);
        } catch (error) {
            console.error('Error fetching modules:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (modalOpen) {
            fetchCourses();
        }
    }, [modalOpen]);

    const handleCreate = () => {
        setEditingModule(null);
        setFormData({
            title: '',
            description: '',
            course: '',
            order: 0,
            duration: '',
            fileUrl: '',
            fileType: 'PDF',
            isPublished: false
        });
        fetchCourses();
        setModalOpen(true);
    };

    const handleEdit = (module) => {
        setEditingModule(module);
        setFormData({
            title: module.title,
            description: module.description,
            course: module.course?._id || module.course || '',
            order: module.order,
            duration: module.duration || '',
            fileUrl: module.fileUrl || '',
            fileType: module.fileType || 'PDF',
            isPublished: module.isPublished
        });
        setModalOpen(true);
    };

    const handleDelete = async (module) => {
        if (!confirm(`Are you sure you want to delete "${module.title}"?`)) return;

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/modules/${module._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchModules();
        } catch (error) {
            console.error('Error deleting module:', error);
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setFormData({
            ...formData,
            fileUrl: URL.createObjectURL(file),
            fileType: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Document'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = editingModule
                ? `${import.meta.env.VITE_API_URL}/modules/${editingModule._id}`
                : `${import.meta.env.VITE_API_URL}/modules`;

            const method = editingModule ? 'PUT' : 'POST';

            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            setModalOpen(false);
            fetchModules();
        } catch (error) {
            console.error('Error saving module:', error);
        }
    };

    const columns = [
        {
            key: 'title',
            label: 'Title',
            sortable: true
        },
        {
            key: 'description',
            label: 'Description',
            render: (value) => value?.substring(0, 100) + (value?.length > 100 ? '...' : '')
        },
        {
            key: 'course',
            label: 'Course',
            render: (value) => value?.title || 'N/A'
        },
        {
            key: 'order',
            label: 'Order',
            sortable: true
        },
        {
            key: 'duration',
            label: 'Duration'
        },
        {
            key: 'isPublished',
            label: 'Status',
            render: (value) => (
                <span className={`px-2 py-1 rounded text-xs ${value ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-gray-500 bg-opacity-20 text-gray-400'}`}>
                    {value ? 'Published' : 'Draft'}
                </span>
            )
        }
    ];

    return (
        <AdminLayout activeSection="modules">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold font-mono text-cyber-text mb-2">
                            Modules Management
                        </h1>
                        <p className="text-cyber-muted">Manage course modules and content structure</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="px-6 py-3 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold"
                    >
                        <Plus size={20} />
                        Add Module
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6 glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-muted" size={20} />
                        <input
                            type="text"
                            placeholder="Search modules..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none focus:border-opacity-40"
                        />
                    </div>
                </div>

                {/* Data Table */}
                {loading ? (
                    <div className="text-center py-12 text-cyber-muted">Loading...</div>
                ) : (
                    <DataTable
                        data={filteredModules}
                        columns={columns}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        actions={['edit', 'delete']}
                    />
                )}

                {/* Modal */}
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={editingModule ? 'Edit Module' : 'Create New Module'}
                    size="lg"
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="lg:col-span-2">
                                <label className="block text-2xl font-semibold text-cyber-text mb-3">Course <span className="text-red-400">*</span></label>
                                <select
                                    required
                                    value={formData.course}
                                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                    className="w-full h-16 px-5 py-3 bg-[#0d1117] border border-[#00FF41] rounded-xl text-cyber-text text-xl shadow-[0_0_0_1px_rgba(0,255,65,0.12)] focus:outline-none focus:border-[#00FF41]"
                                >
                                    <option value="">Select course</option>
                                    {courses.map((course) => (
                                        <option key={course._id} value={course._id}>{course.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="lg:col-span-2">
                                <label className="block text-2xl font-semibold text-cyber-text mb-3">Title <span className="text-red-400">*</span></label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter module title"
                                    className="w-full h-16 px-5 py-3 bg-[#0d1117] border border-[#00FF41] rounded-xl text-cyber-text text-xl placeholder:text-gray-500 focus:outline-none focus:border-[#00FF41]"
                                />
                            </div>

                            <div className="lg:col-span-2">
                                <label className="block text-2xl font-semibold text-cyber-text mb-3">Description <span className="text-red-400">*</span></label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Add module description"
                                    className="w-full px-5 py-4 bg-[#0d1117] border border-[#00FF41] rounded-xl text-cyber-text text-lg placeholder:text-gray-500 focus:outline-none focus:border-[#00FF41] resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-2xl font-semibold text-cyber-text mb-3">Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    className="w-full h-16 px-5 py-3 bg-[#0d1117] border border-[#00FF41] rounded-xl text-cyber-text text-xl focus:outline-none focus:border-[#00FF41]"
                                />
                            </div>

                            <div>
                                <label className="block text-2xl font-semibold text-cyber-text mb-3">Duration</label>
                                <input
                                    type="text"
                                    placeholder="e.g., 2 hours"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full h-16 px-5 py-3 bg-[#0d1117] border border-[#00FF41] rounded-xl text-cyber-text text-xl placeholder:text-gray-500 focus:outline-none focus:border-[#00FF41]"
                                />
                            </div>

                            <div className="lg:col-span-2">
                                <label className="block text-2xl font-semibold text-cyber-text mb-3">File Type</label>
                                <select
                                    value={formData.fileType}
                                    onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
                                    className="w-full h-16 px-5 py-3 bg-[#0d1117] border border-[#00FF41] rounded-xl text-cyber-text text-2xl focus:outline-none focus:border-[#00FF41]"
                                >
                                    {['PDF', 'Document', 'Image', 'Slide', 'Link'].map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="pt-2">
                            <label className="block text-2xl font-semibold text-cyber-text mb-3">Module file / PDF</label>
                            <div className="flex items-center gap-4 rounded-xl border border-[#00FF41] bg-[#0d1117] p-4 shadow-[0_0_0_1px_rgba(0,255,65,0.12)]">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.ppt,.pptx,.txt"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    id="module-file-upload"
                                />
                                <label
                                    htmlFor="module-file-upload"
                                    className="inline-flex items-center justify-center h-16 min-w-[220px] px-6 rounded-xl bg-[#00FF41] text-black text-2xl font-black cursor-pointer hover:brightness-110 transition-all shadow-[0_0_25px_rgba(0,255,65,0.4)]"
                                >
                                    Choose File
                                </label>
                                <span className="text-xl text-cyber-text truncate">
                                    {formData.fileUrl ? 'File selected' : 'No file chosen'}
                                </span>
                            </div>
                            {formData.fileUrl && (
                                <a href={formData.fileUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-base text-cyber-neon underline hover:text-white">
                                    Open selected file
                                </a>
                            )}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <input
                                type="checkbox"
                                id="isPublished"
                                checked={formData.isPublished}
                                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                className="w-5 h-5 accent-[#00FF41]"
                            />
                            <label htmlFor="isPublished" className="text-xl text-cyber-text">Publish module</label>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="px-6 py-3 bg-[#111827] border border-[#00FF41]/40 text-cyber-text rounded-lg hover:bg-[#1a2433] transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-[#00FF41] text-black rounded-lg hover:brightness-110 transition-all font-bold"
                            >
                                {editingModule ? 'Update Module' : 'Create Module'}
                            </button>
                        </div>
                    </form>
                </Modal>
            </motion.div>
        </AdminLayout>
    );
};

export default ModulesPage;
