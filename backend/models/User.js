const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    // keep isAdmin in sync for backward compatibility
    isAdmin: { type: Boolean, default: false },
    // Extended admin fields (additive)
    avatar: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    status: { type: String, enum: ['active', 'suspended'], default: 'active' },
    lastActive: { type: Date },
    bio: { type: String },
    progress: {
        coursesCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
        labsCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lab' }],
        quizzesCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
        certificatesEarned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' }],
    }
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.isAdmin = this.role === 'admin';
});

const User = mongoose.model('User', userSchema);
module.exports = User;
