const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    icon: { type: String, default: '🛡️' },
    color: { type: String, default: '#00FF41' },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    estimatedHours: { type: Number, default: 0 },
    // Extended admin fields (additive)
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published' },
    tags: [{ type: String }],
    thumbnail: { type: String },
    skills: [{ type: String }],
    prerequisites: [{ type: String }],
    objectives: [{ type: String }],
    featured: { type: Boolean, default: false }
}, { timestamps: true });

const LearningPath = mongoose.model('LearningPath', learningPathSchema);
module.exports = LearningPath;
