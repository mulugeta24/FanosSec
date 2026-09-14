const User = require('../models/User');
const Course = require('../models/Course');
const Lab = require('../models/Lab');
const Challenge = require('../models/Challenge');
const Certificate = require('../models/Certificate');
const QuestionBank = require('../models/QuestionBank');
const News = require('../models/News');
const Vulnerability = require('../models/Vulnerability');
const SecurityTool = require('../models/SecurityTool');
const Guide = require('../models/Guide');
const Announcement = require('../models/Announcement');
const AdminActivity = require('../models/AdminActivity');
const LearningPath = require('../models/LearningPath');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Contact = require('../models/Contact');
const ChallengeAttempt = require('../models/ChallengeAttempt');

// @desc    Get consolidated admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const [
            totalLearners,
            suspendedLearners,
            newLearners,
            totalAdmins,
            totalCourses,
            totalPaths,
            totalModules,
            totalLessons,
            totalLabs,
            totalChallenges,
            totalCertificates,
            totalQuestions,
            totalNews,
            totalVulnerabilities,
            totalTools,
            totalGuides,
            totalAnnouncements,
            totalMessages,
            unreadMessages,
            recentActivity
        ] = await Promise.all([
            User.countDocuments({ role: 'user' }),
            User.countDocuments({ role: 'user', status: 'suspended' }),
            User.countDocuments({ role: 'user', createdAt: { $gte: sevenDaysAgo } }),
            User.countDocuments({ role: 'admin' }),
            Course.countDocuments(),
            LearningPath.countDocuments(),
            Module.countDocuments(),
            Lesson.countDocuments(),
            Lab.countDocuments(),
            Challenge.countDocuments(),
            Certificate.countDocuments(),
            QuestionBank.countDocuments({ isActive: { $ne: false } }),
            News.countDocuments(),
            Vulnerability.countDocuments(),
            SecurityTool.countDocuments(),
            Guide.countDocuments(),
            Announcement.countDocuments({ isActive: true }),
            Contact.countDocuments(),
            Contact.countDocuments({ isRead: false }),
            AdminActivity.find().sort({ createdAt: -1 }).limit(10).populate('admin', 'name email')
        ]);

        // Count published courses if status field exists
        const publishedCourses = await Course.countDocuments({
            $or: [{ status: 'published' }, { status: { $exists: false } }]
        });

        res.json({
            learners: {
                total: totalLearners,
                active: totalLearners - suspendedLearners,
                suspended: suspendedLearners,
                newThisWeek: newLearners
            },
            admins: totalAdmins,
            education: {
                courses: totalCourses,
                publishedCourses,
                paths: totalPaths,
                modules: totalModules,
                lessons: totalLessons
            },
            practical: {
                labs: totalLabs,
                challenges: totalChallenges
            },
            assessments: {
                questions: totalQuestions
            },
            certificates: totalCertificates,
            intelligence: {
                news: totalNews,
                vulnerabilities: totalVulnerabilities,
                tools: totalTools,
                guides: totalGuides
            },
            communication: {
                announcements: totalAnnouncements,
                messages: totalMessages,
                unreadMessages
            },
            recentActivity
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getDashboardStats };
