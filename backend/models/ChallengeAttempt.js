const mongoose = require('mongoose');

const challengeAttemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    solved: {
        type: Boolean,
        default: false
    },
    pointsAwarded: {
        type: Number,
        default: 0
    },
    solvedAt: {
        type: Date
    },
    submittedFlags: [{
        flag: String,
        isCorrect: Boolean,
        attemptedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

challengeAttemptSchema.index({ user: 1, challenge: 1 }, { unique: true });

const ChallengeAttempt = mongoose.model('ChallengeAttempt', challengeAttemptSchema);
module.exports = ChallengeAttempt;
