import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const DataTable = ({
    data = [],
    columns = [],
    onEdit,
    onDelete,
    onView,
    itemsPerPage = 10,
    actions = ['view', 'edit', 'delete']
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    // Sorting logic
    const sortedData = [...data].sort((a, b) => {
        if (!sortColumn) return 0;
        
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        
        if (sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    return (
        <div className="space-y-4">
            {/* Table */}
            <div className="glass-panel rounded-lg border border-cyber-neon border-opacity-20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-cyber-gray/50">
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className="px-6 py-4 text-left text-xs font-semibold text-cyber-neon uppercase tracking-wider cursor-pointer hover:bg-cyber-gray hover:bg-opacity-70 transition-colors"
                                        onClick={() => column.sortable && handleSort(column.key)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {column.label}
                                            {sortColumn === column.key && (
                                                <span className="text-cyber-cyan">
                                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                                {actions.length > 0 && (
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-cyber-neon uppercase tracking-wider">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cyber-gray divide-opacity-20">
                            {currentData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                                        className="px-6 py-8 text-center text-cyber-muted"
                                    >
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                currentData.map((item, index) => (
                                    <motion.tr
                                        key={item._id || index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="hover:bg-cyber-gray hover:bg-opacity-30 transition-colors"
                                    >
                                        {columns.map((column) => (
                                            <td key={column.key} className="px-6 py-4 text-sm text-cyber-text">
                                                {column.render ? column.render(item[column.key], item) : item[column.key]}
                                            </td>
                                        ))}
                                        {actions.length > 0 && (
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    {actions.includes('view') && (
                                                        <button
                                                            onClick={() => onView && onView(item)}
                                                            className="p-2 text-cyber-cyan hover:bg-cyber-cyan hover:bg-opacity-20 rounded transition-colors"
                                                            title="View"
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                    )}
                                                    {actions.includes('edit') && (
                                                        <button
                                                            onClick={() => onEdit && onEdit(item)}
                                                            className="p-2 text-cyber-neon hover:bg-cyber-neon hover:bg-opacity-20 rounded transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                    )}
                                                    {actions.includes('delete') && (
                                                        <button
                                                            onClick={() => onDelete && onDelete(item)}
                                                            className="p-2 text-cyber-red hover:bg-cyber-red hover:bg-opacity-20 rounded transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-cyber-muted">
                        Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} entries
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-2 glass-panel border border-cyber-neon border-opacity-20 rounded text-cyber-text disabled:opacity-50 disabled:cursor-not-allowed hover:border-opacity-40 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 glass-panel border rounded transition-colors ${currentPage === i + 1
                                    ? 'border-cyber-neon bg-[#0b1710] text-cyber-neon'
                                    : 'border-cyber-neon border-opacity-20 text-cyber-text hover:border-opacity-40'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 glass-panel border border-cyber-neon border-opacity-20 rounded text-cyber-text disabled:opacity-50 disabled:cursor-not-allowed hover:border-opacity-40 transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
