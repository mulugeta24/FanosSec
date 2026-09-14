const mongoose = require('mongoose');

const topicProgressSchema = new mongoose.Schema({
  topicKey: { type: String, required: true }, // e.g. "dmcst-m1-t0"
  watched: { type: Boolean, default: false },
  quizPassed: { type: Boolean, default: false },
  quizScore: { type: Number, default: 0 },
}, { _id: false });

const enrollmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: String, required: true }, // e.g. "dmcst"
  topicProgress: [topicProgressSchema],
  completedAt: { type: Date },
  certificateIssued: { type: Boolean, default: false },
}, { timestamps: true });

enrollmentSchema.index({ user: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
