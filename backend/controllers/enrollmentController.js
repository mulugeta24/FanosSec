const Enrollment = require('../models/Enrollment');
const { generateCertificatePDF } = require('../utils/pdfGenerator');
const path = require('path');

// All topic keys for each course (must match frontend COURSE_CONTENT)
const COURSE_TOPIC_KEYS = {
  dmcst: [
    'dmcst-m1-t0','dmcst-m1-t1','dmcst-m1-t2','dmcst-m1-t3',
    'dmcst-m2-t0','dmcst-m2-t1','dmcst-m2-t2','dmcst-m2-t3',
    'dmcst-m3-t0','dmcst-m3-t1','dmcst-m3-t2','dmcst-m3-t3',
    'dmcst-m4-t0','dmcst-m4-t1','dmcst-m4-t2','dmcst-m4-t3',
    'dmcst-m5-t0','dmcst-m5-t1','dmcst-m5-t2','dmcst-m5-t3',
    'dmcst-m6-t0','dmcst-m6-t1','dmcst-m6-t2','dmcst-m6-t3',
  ],
  dmcwss: [
    'dmcwss-m1-t0','dmcwss-m1-t1','dmcwss-m1-t2','dmcwss-m1-t3',
    'dmcwss-m2-t0','dmcwss-m2-t1','dmcwss-m2-t2','dmcwss-m2-t3',
    'dmcwss-m3-t0','dmcwss-m3-t1','dmcwss-m3-t2','dmcwss-m3-t3',
    'dmcwss-m4-t0','dmcwss-m4-t1','dmcwss-m4-t2','dmcwss-m4-t3',
    'dmcwss-m5-t0','dmcwss-m5-t1','dmcwss-m5-t2','dmcwss-m5-t3',
    'dmcwss-m6-t0','dmcwss-m6-t1','dmcwss-m6-t2','dmcwss-m6-t3',
  ],
  dmccrt: [
    'dmccrt-m1-t0','dmccrt-m1-t1','dmccrt-m1-t2','dmccrt-m1-t3',
    'dmccrt-m2-t0','dmccrt-m2-t1','dmccrt-m2-t2','dmccrt-m2-t3',
    'dmccrt-m3-t0','dmccrt-m3-t1','dmccrt-m3-t2','dmccrt-m3-t3',
    'dmccrt-m4-t0','dmccrt-m4-t1','dmccrt-m4-t2','dmccrt-m4-t3',
    'dmccrt-m5-t0','dmccrt-m5-t1','dmccrt-m5-t2','dmccrt-m5-t3',
    'dmccrt-m6-t0','dmccrt-m6-t1','dmccrt-m6-t2','dmccrt-m6-t3',
  ],
  dmccbt: [
    'dmccbt-m1-t0','dmccbt-m1-t1','dmccbt-m1-t2','dmccbt-m1-t3',
    'dmccbt-m2-t0','dmccbt-m2-t1','dmccbt-m2-t2','dmccbt-m2-t3',
    'dmccbt-m3-t0','dmccbt-m3-t1','dmccbt-m3-t2','dmccbt-m3-t3',
    'dmccbt-m4-t0','dmccbt-m4-t1','dmccbt-m4-t2','dmccbt-m4-t3',
    'dmccbt-m5-t0','dmccbt-m5-t1','dmccbt-m5-t2','dmccbt-m5-t3',
    'dmccbt-m6-t0','dmccbt-m6-t1','dmccbt-m6-t2','dmccbt-m6-t3',
  ],
};

// POST /api/enrollments/:courseId  — enroll
const enroll = async (req, res) => {
  try {
    const { courseId } = req.params;
    const existing = await Enrollment.findOne({ user: req.user._id, courseId });
    if (existing) return res.json(existing);
    const enrollment = await Enrollment.create({ user: req.user._id, courseId, topicProgress: [] });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/enrollments/:courseId  — get my progress
const getProgress = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({ user: req.user._id, courseId: req.params.courseId });
    if (!enrollment) return res.status(404).json({ message: 'Not enrolled' });
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/enrollments/:courseId/topic  — mark topic watched or quiz passed
const updateTopic = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { topicKey, watched, quizPassed, quizScore } = req.body;

    let enrollment = await Enrollment.findOne({ user: req.user._id, courseId });
    if (!enrollment) return res.status(404).json({ message: 'Not enrolled' });

    const existing = enrollment.topicProgress.find(t => t.topicKey === topicKey);
    if (existing) {
      if (watched !== undefined) existing.watched = watched;
      if (quizPassed !== undefined) existing.quizPassed = quizPassed;
      if (quizScore !== undefined) existing.quizScore = quizScore;
    } else {
      enrollment.topicProgress.push({ topicKey, watched: !!watched, quizPassed: !!quizPassed, quizScore: quizScore || 0 });
    }

    // Check if all topics complete
    const allKeys = COURSE_TOPIC_KEYS[courseId] || [];
    const allDone = allKeys.every(key => {
      const tp = enrollment.topicProgress.find(t => t.topicKey === key);
      return tp && tp.watched && tp.quizPassed;
    });

    if (allDone && !enrollment.completedAt) {
      enrollment.completedAt = new Date();
    }

    await enrollment.save();
    res.json({ enrollment, allComplete: allDone });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/enrollments/:courseId/certificate  — issue certificate if complete
const issueCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const enrollment = await Enrollment.findOne({ user: req.user._id, courseId });
    if (!enrollment) return res.status(404).json({ message: 'Not enrolled' });
    if (!enrollment.completedAt) return res.status(400).json({ message: 'Course not fully completed yet. Finish all topics and quizzes first.' });
    if (enrollment.certificateIssued) return res.status(400).json({ message: 'Certificate already issued' });

    const COURSE_NAMES = { dmcst: 'FANOS SEC Security Tester', dmcwss: 'FANOS SEC Web Security Specialist', dmccrt: 'FANOS SEC Certified Red Teamer', dmccbt: 'FANOS SEC Certified Blue Teamer' };
    const certificateId = `FS-${courseId.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const fileName = `${certificateId}.pdf`;
    const outputPath = path.join(__dirname, '..', 'public', 'certificates', fileName);

    await generateCertificatePDF({ userName: req.user.name, courseName: COURSE_NAMES[courseId] || courseId, certificateId, issuedAt: new Date() }, outputPath);

    enrollment.certificateIssued = true;
    await enrollment.save();

    res.json({ certificateId, pdfUrl: `/public/certificates/${fileName}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { enroll, getProgress, updateTopic, issueCertificate };
