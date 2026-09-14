import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FolderOpen, FileText, Trash2, Download, RefreshCw } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { API, getAuthHeader, StatusBadge, STATUS_COLORS } from '../adminUtils';

const RESOURCE_TYPES = ['PDF', 'Document', 'Image', 'Slide', 'Code', 'Tool', 'Link', 'Other'];
const RESOURCE_CATEGORIES = ['Course Material', 'Reference', 'Tool', 'Template', 'Cheat Sheet', 'Research Paper', 'Guide', 'Other'];

const emptyForm = {
  title: '',
  description: '',
  type: 'PDF',
  category: 'Course Material',
  fileUrl: '',
  fileSize: '',
  course: '',
  lesson: '',
  isPublished: true,
};

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchResources();
    fetchCourses();
    fetchLessons();
  }, []);

  useEffect(() => {
    const normalized = searchTerm.toLowerCase();
    setFilteredResources(resources.filter((resource) => {
      const title = resource.title?.toLowerCase() || '';
      const type = resource.type?.toLowerCase() || '';
      const category = resource.category?.toLowerCase() || '';
      return title.includes(normalized) || type.includes(normalized) || category.includes(normalized);
    }));
  }, [searchTerm, resources]);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API}/courses`, { headers: getAuthHeader() });
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load courses', err);
    }
  };

  const fetchLessons = async () => {
    try {
      const res = await fetch(`${API}/lessons`, { headers: getAuthHeader() });
      const data = await res.json();
      setLessons(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load lessons', err);
    }
  };

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API}/resources`, { headers: getAuthHeader() });
      if (!res.ok) throw new Error('Failed to load resource library.');
      const data = await res.json();
      setResources(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || 'Failed to load resource library.');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingResource(null);
    setFormData({ ...emptyForm, course: courses[0]?._id || '', lesson: lessons[0]?._id || '' });
    setModalOpen(true);
  };

  const openEdit = (resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title || '',
      description: resource.description || '',
      type: resource.type || 'PDF',
      category: resource.category || 'Course Material',
      fileUrl: resource.fileUrl || '',
      fileSize: resource.fileSize || '',
      course: resource.course?._id || resource.course || '',
      lesson: resource.lesson?._id || resource.lesson || '',
      isPublished: resource.isPublished !== false,
    });
    setModalOpen(true);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFormData((current) => ({
      ...current,
      fileUrl: URL.createObjectURL(file),
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : file.type.includes('sheet') || file.name.includes('ppt') ? 'Slide' : 'Document',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const endpoint = editingResource ? `${API}/resources/${editingResource._id}` : `${API}/resources`;
      const method = editingResource ? 'PUT' : 'POST';
      const payload = {
        ...formData,
        course: formData.course || undefined,
        lesson: formData.lesson || undefined,
        isPublished: formData.isPublished,
      };

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Failed to save resource.');
      }

      setModalOpen(false);
      await fetchResources();
    } catch (err) {
      setError(err.message || 'Failed to save resource.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (resource) => {
    if (!window.confirm(`Delete "${resource.title}" from the file library?`)) return;
    try {
      const res = await fetch(`${API}/resources/${resource._id}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });
      if (!res.ok) throw new Error('Delete failed');
      await fetchResources();
    } catch (err) {
      setError(err.message || 'Delete failed.');
    }
  };

  const columns = [
    { key: 'title', label: 'Title', render: (value) => <span className="font-semibold text-cyber-text">{value}</span> },
    { key: 'type', label: 'Type', render: (value) => <span className="text-cyan-400 text-xs uppercase">{value}</span> },
    { key: 'category', label: 'Category', render: (value) => <span className="text-gray-400 text-xs">{value}</span> },
    { key: 'fileSize', label: 'Size', render: (value) => <span className="text-gray-400 text-xs">{value || '—'}</span> },
    { key: 'isPublished', label: 'Status', render: (value) => <StatusBadge value={value === false ? 'draft' : 'published'} colorMap={STATUS_COLORS} /> },
  ];

  return (
    <AdminLayout activeSection="resources">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-mono text-cyber-text flex items-center gap-3">
              <FolderOpen className="text-cyber-neon" size={28} /> Resource Library
            </h1>
            <p className="text-cyber-muted text-sm mt-1">Upload PDFs, documents, slides, images and teaching files.</p>
          </div>
          <button
            onClick={openCreate}
            className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all flex items-center gap-2 font-semibold text-sm"
          >
            <Plus size={16} /> Add File
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg text-red-400 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchResources} title="Retry" className="p-1"><RefreshCw size={14} /></button>
          </div>
        )}

        <div className="glass-panel p-4 rounded-lg border border-cyber-neon border-opacity-20 mb-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted" size={16} />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search resources..."
              className="w-full pl-9 pr-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text placeholder-cyber-muted focus:outline-none text-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-cyber-muted animate-pulse font-mono">Loading file library...</div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-16 text-cyber-muted">
            <FileText size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-lg font-semibold mb-1">No files found</p>
            <p className="text-sm">Upload the first PDF or learning asset for the FANOS SEC library.</p>
          </div>
        ) : (
          <DataTable data={filteredResources} columns={columns} onEdit={openEdit} onDelete={handleDelete} actions={['edit', 'delete']} />
        )}

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingResource ? 'Edit Resource' : 'Upload Resource'} size="lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Title *</label>
              <input required value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Description</label>
              <textarea rows={3} value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Type</label>
                <select value={formData.type} onChange={(event) => setFormData({ ...formData, type: event.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                  {RESOURCE_TYPES.map((type) => <option key={type}>{type}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Category</label>
                <select value={formData.category} onChange={(event) => setFormData({ ...formData, category: event.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                  {RESOURCE_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Course</label>
                <select value={formData.course} onChange={(event) => setFormData({ ...formData, course: event.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                  <option value="">No course</option>
                  {courses.map((course) => <option key={course._id} value={course._id}>{course.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">Lesson</label>
                <select value={formData.lesson} onChange={(event) => setFormData({ ...formData, lesson: event.target.value })} className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm">
                  <option value="">No lesson</option>
                  {lessons.map((lesson) => <option key={lesson._id} value={lesson._id}>{lesson.title}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cyber-text mb-1.5 uppercase tracking-wide">File Upload</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.ppt,.pptx,.txt"
                onChange={handleFileSelect}
                className="w-full px-4 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 rounded-lg text-cyber-text focus:outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-cyber-neon file:text-black file:font-semibold"
              />
              {formData.fileUrl && (
                <div className="mt-2 flex items-center gap-2 text-xs text-cyber-neon">
                  <Download size={14} />
                  <a href={formData.fileUrl} target="_blank" rel="noreferrer" className="underline">Open file preview</a>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" checked={formData.isPublished} onChange={(event) => setFormData({ ...formData, isPublished: event.target.checked })} className="w-4 h-4 accent-cyber-neon" />
              <label className="text-sm text-cyber-text">Publish in resource library</label>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-cyber-neon border-opacity-10">
              <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-cyber-gray bg-opacity-30 border border-cyber-neon border-opacity-20 text-cyber-text rounded-lg hover:bg-opacity-50 transition-all text-sm">Cancel</button>
              <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[#0b1710] border border-cyber-neon text-cyber-neon rounded-lg hover:bg-cyber-neon hover:text-black transition-all font-semibold text-sm disabled:opacity-50">
                {submitting ? 'Saving...' : editingResource ? 'Update Resource' : 'Upload File'}
              </button>
            </div>
          </form>
        </Modal>
      </motion.div>
    </AdminLayout>
  );
};

export default ResourcesPage;
