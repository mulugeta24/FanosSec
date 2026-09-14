const mongoose = require('mongoose');
const Blog = require('../models/Blog');

const FALLBACK_BLOGS = [
    {
        _id: '1',
        title: 'Understanding the Modern OWASP Top 10 Structure & Real-World Exploits',
        content: 'An in-depth breakdown of how web vulnerabilities have evolved. We explore Server-Side Request Forgery (SSRF), Insecure Design, and Broken Access Control with practical exploitation and remediation patterns.',
        author: 'Mulugeta Ababi',
        createdAt: new Date('2026-09-10'),
        tags: ['OWASP', 'Web Security', 'SSRF']
    },
    {
        _id: '2',
        title: 'Building a Defensive Keylogger Detection & Memory Forensics Tool in Python',
        content: 'Learn how low-level Windows API hooks work, dissect how malicious actors monitor keystrokes, and write a proactive Python daemon that inspects DLL injections and anomalous thread creations.',
        author: 'FANOS SEC Research Team',
        createdAt: new Date('2026-09-05'),
        tags: ['Python', 'Malware Analysis', 'Forensics']
    },
    {
        _id: '3',
        title: 'Active Directory Domain Dominance: Kerberoasting & DCSync Deep Dive',
        content: 'Simulating enterprise Active Directory compromise from zero foothold to Domain Admin. Covers Service Principal Names (SPN) extraction, offline hash cracking, and DRS replication abuse.',
        author: 'Mulugeta Ababi',
        createdAt: new Date('2026-08-28'),
        tags: ['Active Directory', 'Kerberos', 'Red Team']
    },
    {
        _id: '4',
        title: 'SIEM Engineering: Writing High-Fidelity Sigma Detection Rules for Splunk',
        content: 'Avoid alert fatigue in your Security Operations Center. Learn how to convert hypothesis-driven threat intelligence into reusable Sigma rules that pinpoint lateral movement.',
        author: 'FANOS SEC Research Team',
        createdAt: new Date('2026-08-20'),
        tags: ['SIEM', 'Splunk', 'Sigma Rules']
    }
];

// @desc    Fetch all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json(FALLBACK_BLOGS);
        }
        const blogs = await Blog.find({});
        res.json(blogs.length > 0 ? blogs : FALLBACK_BLOGS);
    } catch (error) {
        res.json(FALLBACK_BLOGS);
    }
};

// @desc    Fetch single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            const found = FALLBACK_BLOGS.find(b => b._id === req.params.id) || FALLBACK_BLOGS[0];
            return res.json(found);
        }
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            res.json(blog);
        } else {
            const found = FALLBACK_BLOGS.find(b => b._id === req.params.id) || FALLBACK_BLOGS[0];
            res.json(found);
        }
    } catch (error) {
        const found = FALLBACK_BLOGS.find(b => b._id === req.params.id) || FALLBACK_BLOGS[0];
        res.json(found);
    }
};

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res) => {
    try {
        const { title, content, author, pdfUrl, videoEmbedUrl } = req.body;
        const blog = new Blog({
            title,
            content,
            author: author || 'Mulugeta Ababi',
            pdfUrl,
            videoEmbedUrl,
        });

        const createdBlog = await blog.save();
        res.status(201).json(createdBlog);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getBlogs, getBlogById, createBlog };
