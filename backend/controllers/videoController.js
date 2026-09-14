const Video = require('../models/Video');

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
const getVideos = async (req, res) => {
    try {
        const { category, course } = req.query;
        const filter = {};
        
        if (category) filter.category = category;
        if (course) filter.course = course;
        
        const videos = await Video.find(filter)
            .populate('course', 'title')
            .populate('lesson', 'title')
            .sort({ createdAt: -1 });
        
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single video by ID
// @route   GET /api/videos/:id
// @access  Public
const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
            .populate('course')
            .populate('lesson');
        
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        
        // Increment views
        video.views += 1;
        await video.save();
        
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new video
// @route   POST /api/videos
// @access  Private/Admin
const createVideo = async (req, res) => {
    try {
        const { title, description, url, thumbnail, duration, category, tags, course, lesson } = req.body;
        
        const video = await Video.create({
            title,
            description,
            url,
            thumbnail,
            duration,
            category,
            tags,
            course,
            lesson
        });
        
        res.status(201).json(video);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create video', error: error.message });
    }
};

// @desc    Update video
// @route   PUT /api/videos/:id
// @access  Private/Admin
const updateVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        
        res.json(video);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update video', error: error.message });
    }
};

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Private/Admin
const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        
        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete video', error: error.message });
    }
};

module.exports = {
    getVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo
};
