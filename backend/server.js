const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser: profile photos are sent as small base64 image payloads.
app.use(express.json({ limit: '5mb' }));

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Make public folder static for serving certificates
app.use('/public', express.static(path.join(__dirname, 'public')));

// Basic route for testing
app.get('/', (req, res) => {
    res.send('FANOS SEC API is running...');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/labs', require('./routes/labRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/paths', require('./routes/pathRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/challenges', require('./routes/challengeRoutes'));

// New CMS Routes
app.use('/api/modules', require('./routes/moduleRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/vulnerabilities', require('./routes/vulnerabilityRoutes'));
app.use('/api/threat-intel', require('./routes/threatIntelRoutes'));
app.use('/api/security-advisories', require('./routes/securityAdvisoryRoutes'));
app.use('/api/security-tools', require('./routes/securityToolRoutes'));
app.use('/api/glossary', require('./routes/glossaryRoutes'));
app.use('/api/cheat-sheets', require('./routes/cheatSheetRoutes'));
app.use('/api/guides', require('./routes/guideRoutes'));
app.use('/api/question-bank', require('./routes/questionBankRoutes'));
app.use('/api/announcements', require('./routes/announcementRoutes'));
app.use('/api/admin-activities', require('./routes/adminActivityRoutes'));

// New Admin Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin/dashboard', require('./routes/adminDashboardRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
