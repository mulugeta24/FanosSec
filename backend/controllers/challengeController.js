const mongoose = require('mongoose');
const Challenge = require('../models/Challenge');
const ChallengeAttempt = require('../models/ChallengeAttempt');

const FALLBACK_CHALLENGES = [
    {
        _id: 'sqli-vault-infiltration',
        title: 'SQLi Vault Infiltration',
        slug: 'sqli-vault-infiltration',
        category: 'Web Security',
        difficulty: 'Easy',
        points: 50,
        description: 'Bypass a legacy login form by exploiting an unsanitized SQL query in the backend authentication logic.',
        scenario: 'A target financial firm uses an outdated query to verify administrative credentials.',
        tags: ['SQLi', 'Web', 'Authentication'],
        solvedCount: 142
    },
    {
        _id: 'xss-cookie-heist',
        title: 'XSS Cookie Heist & Session Steal',
        slug: 'xss-cookie-heist',
        category: 'Web Security',
        difficulty: 'Medium',
        points: 100,
        description: 'Identify a stored Cross-Site Scripting vulnerability in a user feedback board to extract administrator session tokens.',
        scenario: 'The internal admin review dashboard renders user comments without HTML sanitization or CSP headers.',
        tags: ['XSS', 'Web', 'DOM'],
        solvedCount: 89
    },
    {
        _id: 'pcap-traffic-interception',
        title: 'PCAP Traffic Interception & Decoding',
        slug: 'pcap-traffic-interception',
        category: 'Network Security',
        difficulty: 'Easy',
        points: 60,
        description: 'Analyze an encrypted network packet capture to reconstruct an unencrypted FTP session and recover intercepted credentials.',
        scenario: 'An attacker exfiltrated proprietary firmware over a legacy FTP protocol inside the enterprise DMZ.',
        tags: ['PCAP', 'Wireshark', 'FTP'],
        solvedCount: 115
    },
    {
        _id: 'memory-dump-malware-hunt',
        title: 'Memory Dump Malware Hunt (Volatility)',
        slug: 'memory-dump-malware-hunt',
        category: 'Digital Forensics',
        difficulty: 'Hard',
        points: 150,
        description: 'Examine a volatility memory image to identify injected DLLs, anomalous process trees, and hidden persistence handles.',
        scenario: 'A workstation in accounting exhibited anomalous outbound beaconing to a known C2 server.',
        tags: ['Forensics', 'Memory', 'Volatility'],
        solvedCount: 41
    },
    {
        _id: 'rsa-weak-key-cryptanalysis',
        title: 'RSA Weak Key Cryptanalysis',
        slug: 'rsa-weak-key-cryptanalysis',
        category: 'Cryptography',
        difficulty: 'Medium',
        points: 120,
        description: 'Factorize a vulnerable RSA public modulus generated with small prime factors and decrypt the secret ciphertext.',
        scenario: 'An outdated IoT gateway implemented custom key generation with predictable prime entropy.',
        tags: ['Crypto', 'RSA', 'Math'],
        solvedCount: 67
    },
    {
        _id: 'linux-suid-binary-exploitation',
        title: 'Linux SUID Binary Exploitation',
        slug: 'linux-suid-binary-exploitation',
        category: 'Privilege Escalation',
        difficulty: 'Medium',
        points: 110,
        description: 'Discover misconfigured SUID binaries on a hardened Linux distribution and escalate privileges to root.',
        scenario: 'A custom backup helper binary runs with root SUID permissions and invokes system binaries without absolute paths.',
        tags: ['Linux', 'PrivEsc', 'SUID'],
        solvedCount: 78
    },
    {
        _id: 'osint-rogue-domain',
        title: 'OSINT Footprinting: Rogue Domain Discovery',
        slug: 'osint-rogue-domain',
        category: 'OSINT',
        difficulty: 'Easy',
        points: 50,
        description: 'Track down threat actor infrastructure using certificate transparency logs, WHOIS history, and passive DNS records.',
        scenario: 'A phishing syndicate registered lookalike domains mimicking enterprise portals.',
        tags: ['OSINT', 'DNS', 'Recon'],
        solvedCount: 95
    }
];

// GET /api/challenges - Get all challenges (without exposing flags)
const getChallenges = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json(FALLBACK_CHALLENGES);
        }

        const { category, difficulty, search } = req.query;
        let filter = {};

        if (category && category !== 'All') {
            filter.category = category;
        }
        if (difficulty && difficulty !== 'All') {
            filter.difficulty = difficulty;
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        // Return challenge list excluding the secret flag
        const challenges = await Challenge.find(filter).select('-flag');
        
        let userSolvedIds = [];
        if (req.user) {
            const solvedAttempts = await ChallengeAttempt.find({ user: req.user._id, solved: true });
            userSolvedIds = solvedAttempts.map(a => a.challenge.toString());
        }

        const challengesWithStatus = challenges.map(c => ({
            ...c.toObject(),
            isSolved: userSolvedIds.includes(c._id.toString())
        }));

        res.json(challengesWithStatus.length > 0 ? challengesWithStatus : FALLBACK_CHALLENGES);
    } catch (err) {
        res.json(FALLBACK_CHALLENGES);
    }
};

// GET /api/challenges/:id - Get challenge details (excluding flag)
const getChallengeById = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id).select('-flag');
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        let isSolved = false;
        if (req.user) {
            const attempt = await ChallengeAttempt.findOne({ user: req.user._id, challenge: req.params.id });
            isSolved = !!(attempt && attempt.solved);
        }

        res.json({
            ...challenge.toObject(),
            isSolved
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/challenges/:id/submit - Submit flag for verification
const submitFlag = async (req, res) => {
    try {
        const { flag } = req.body;
        if (!flag || typeof flag !== 'string') {
            return res.status(400).json({ message: 'Flag is required' });
        }

        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        let attempt = await ChallengeAttempt.findOne({ user: req.user._id, challenge: challenge._id });
        if (!attempt) {
            attempt = new ChallengeAttempt({
                user: req.user._id,
                challenge: challenge._id,
                submittedFlags: []
            });
        }

        if (attempt.solved) {
            return res.status(400).json({ message: 'Challenge already solved!' });
        }

        const cleanSubmitted = flag.trim();
        const isCorrect = cleanSubmitted.toLowerCase() === challenge.flag.trim().toLowerCase();

        attempt.submittedFlags.push({
            flag: cleanSubmitted,
            isCorrect,
            attemptedAt: new Date()
        });

        if (isCorrect) {
            attempt.solved = true;
            attempt.pointsAwarded = challenge.points;
            attempt.solvedAt = new Date();

            challenge.solvedCount = (challenge.solvedCount || 0) + 1;
            await challenge.save();
        }

        await attempt.save();

        if (isCorrect) {
            return res.json({
                success: true,
                message: `🎉 Correct flag! You earned ${challenge.points} points.`,
                points: challenge.points
            });
        } else {
            return res.status(400).json({
                success: false,
                message: '❌ Incorrect flag. Check your methodology and try again.'
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /api/challenges - Admin: create challenge
const createChallenge = async (req, res) => {
    try {
        const { title, slug, category, difficulty, points, description, scenario, instructions, hints, flag, tags, author } = req.body;
        const newSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const challenge = await Challenge.create({
            title,
            slug: newSlug,
            category,
            difficulty,
            points: points || 50,
            description,
            scenario,
            instructions,
            hints: hints || [],
            flag,
            tags: tags || [],
            author: author || 'FANOS SEC'
        });

        res.status(201).json(challenge);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT /api/challenges/:id - Admin: update challenge
const updateChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.json(challenge);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE /api/challenges/:id - Admin: delete challenge
const deleteChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findByIdAndDelete(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        await ChallengeAttempt.deleteMany({ challenge: req.params.id });
        res.json({ message: 'Challenge removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /api/challenges/user/stats - Get user's challenge stats
const getUserChallengeStats = async (req, res) => {
    try {
        const attempts = await ChallengeAttempt.find({ user: req.user._id, solved: true }).populate('challenge', 'title category points difficulty');
        const totalPoints = attempts.reduce((sum, a) => sum + (a.pointsAwarded || 0), 0);
        const solvedCount = attempts.length;

        res.json({
            solvedCount,
            totalPoints,
            solvedChallenges: attempts
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getChallenges,
    getChallengeById,
    submitFlag,
    createChallenge,
    updateChallenge,
    deleteChallenge,
    getUserChallengeStats
};
