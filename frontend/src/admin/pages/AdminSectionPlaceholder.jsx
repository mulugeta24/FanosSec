import AdminLayout from '../AdminLayout';

const AdminSectionPlaceholder = ({ activeSection, title, description }) => (
    <AdminLayout activeSection={activeSection}>
        <div className="max-w-3xl">
            <h1 className="text-3xl font-bold font-mono text-cyber-text">{title}</h1>
            <p className="text-cyber-muted mt-2">{description}</p>
            <div className="mt-8 glass-panel rounded-lg border border-cyber-neon border-opacity-20 p-8 text-center">
                <p className="text-cyber-text font-semibold">This admin section is not available yet.</p>
                <p className="text-cyber-muted text-sm mt-2">No changes were made to learner data or existing records.</p>
            </div>
        </div>
    </AdminLayout>
);

export default AdminSectionPlaceholder;
