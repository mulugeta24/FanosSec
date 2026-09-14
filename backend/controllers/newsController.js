const News = require('../models/News');

// @desc    Get all news
// @route   GET /api/news
// @access  Public
const getNews = async (req, res) => {
    try {
        const { category, severity } = req.query;
        const filter = { isPublished: true };
        
        if (category) filter.category = category;
        if (severity) filter.severity = severity;
        
        const news = await News.find(filter)
            .sort({ publishedDate: -1 })
            .limit(50);
        
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single news by ID or slug
// @route   GET /api/news/:identifier
// @access  Public
const getNewsById = async (req, res) => {
    try {
        const news = await News.findOne({
            $or: [
                { _id: req.params.identifier },
                { slug: req.params.identifier }
            ]
        });
        
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        
        // Increment views
        news.views += 1;
        await news.save();
        
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new news
// @route   POST /api/news
// @access  Private/Admin
const createNews = async (req, res) => {
    try {
        const { title, slug, summary, content, category, source, sourceUrl, imageUrl, tags, severity, author } = req.body;
        
        const news = await News.create({
            title,
            slug,
            summary,
            content,
            category,
            source,
            sourceUrl,
            imageUrl,
            tags,
            severity,
            author
        });
        
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create news', error: error.message });
    }
};

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private/Admin
const updateNews = async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        
        res.json(news);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update news', error: error.message });
    }
};

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private/Admin
const deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        
        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete news', error: error.message });
    }
};

module.exports = {
    getNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
};
