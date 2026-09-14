import React from 'react';

// Shared admin page template utility
// Provides consistent CRUD page structure across all admin sections

export const getAuthHeader = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    return { Authorization: `Bearer ${userInfo?.token || ''}` };
};

export const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const DIFFICULTY_COLORS = {
    Easy: 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30',
    Beginner: 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30',
    Medium: 'bg-yellow-500/15 text-yellow-300 border border-yellow-400/30',
    Intermediate: 'bg-yellow-500/15 text-yellow-300 border border-yellow-400/30',
    Hard: 'bg-red-500/15 text-red-300 border border-red-400/30',
    Advanced: 'bg-red-500/15 text-red-300 border border-red-400/30',
    Expert: 'bg-red-600/20 text-red-200 border border-red-400/30',
    Insane: 'bg-purple-500/15 text-purple-300 border border-purple-400/30',
};

export const STATUS_COLORS = {
    published: 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30',
    draft: 'bg-gray-500/20 text-gray-300 border border-gray-400/30',
    archived: 'bg-yellow-500/15 text-yellow-300 border border-yellow-400/30',
    active: 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30',
    revoked: 'bg-red-500/15 text-red-300 border border-red-400/30',
    expired: 'bg-orange-500/15 text-orange-300 border border-orange-400/30',
    pending: 'bg-blue-500/15 text-blue-300 border border-blue-400/30',
};

export const SEVERITY_COLORS = {
    Critical: 'bg-red-600/30 text-red-300',
    High: 'bg-red-500/20 text-red-400',
    Medium: 'bg-yellow-500/20 text-yellow-400',
    Low: 'bg-blue-500/20 text-blue-400',
    Info: 'bg-gray-500/20 text-gray-400',
};

export const StatusBadge = ({ value, colorMap = STATUS_COLORS }) => React.createElement(
    'span',
    { className: `px-2 py-1 rounded text-xs font-semibold ${colorMap[value] || 'bg-gray-500/20 text-gray-400'}` },
    value || 'N/A'
);
