const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const authUser = async (req, res) => {
    const { email, password, avatar, profileImage } = req.body;

    const normalizedEmail = String(email || '').trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
        return res.status(401).json({ message: 'No account was found for this email address.' });
    }

    if (await user.matchPassword(String(password || '').trim())) {
        const profileValue = avatar || profileImage;
        if (profileValue) {
            user.avatar = profileValue;
            user.profileImage = profileValue;
            await user.save();
        }

        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isAdmin: user.role === 'admin',
            avatar: user.avatar || user.profileImage || '',
            profileImage: user.profileImage || user.avatar || '',
            bio: user.bio || '',
            token: generateToken(user._id),
        });
    }

    return res.status(401).json({ message: 'The password is incorrect. Please check it and try again.' });
};

const registerUser = async (req, res) => {
    const { name, email, password, avatar, profileImage, bio } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();

    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const profileValue = avatar || profileImage || '';
    const user = await User.create({
        name,
        email: normalizedEmail,
        password,
        role: 'user',
        avatar: profileValue,
        profileImage: profileValue,
        bio: String(bio || '').trim(),
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isAdmin: false,
            avatar: user.avatar || user.profileImage || '',
            profileImage: user.profileImage || user.avatar || '',
            bio: user.bio || '',
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isAdmin: user.role === 'admin',
            avatar: user.avatar || user.profileImage || '',
            profileImage: user.profileImage || user.avatar || '',
            bio: user.bio || '',
            progress: user.progress,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { avatar, profileImage, bio } = req.body;
    const profileValue = avatar || profileImage;
    if (profileValue !== undefined) {
        user.avatar = profileValue;
        user.profileImage = profileValue;
    }
    if (bio !== undefined) user.bio = String(bio).trim().slice(0, 240);
    await user.save();

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.role === 'admin',
        avatar: user.avatar || user.profileImage || '',
        profileImage: user.profileImage || user.avatar || '',
        bio: user.bio || '',
    });
};

module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
};
