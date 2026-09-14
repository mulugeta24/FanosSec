const mongoose = require('mongoose');

const adminActivitySchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: [
            'CREATE',
            'UPDATE',
            'DELETE',
            'VIEW',
            'EXPORT',
            'IMPORT',
            'LOGIN',
            'LOGOUT',
            'SETTINGS_CHANGE',
            'USER_MANAGEMENT',
            'OTHER'
        ]
    },
    entity: {
        type: String, // e.g., 'Course', 'User', 'Lab', 'Challenge'
        required: true
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId
    },
    description: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    },
    changes: {
        type: mongoose.Schema.Types.Mixed // Store before/after values
    }
}, {
    timestamps: true
});

// Index for efficient querying
adminActivitySchema.index({ admin: 1, createdAt: -1 });
adminActivitySchema.index({ action: 1, createdAt: -1 });
adminActivitySchema.index({ entity: 1, createdAt: -1 });

const AdminActivity = mongoose.model('AdminActivity', adminActivitySchema);
module.exports = AdminActivity;
