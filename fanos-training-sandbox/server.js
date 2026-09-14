/**
 * FANOS SEC — Security Training Sandbox
 * Main Server Entry Point
 * 
 * Stack: Node.js, Express, SQLite In-Memory Database
 * Port: http://localhost:8080
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Initialize database
const db = require('./database/db');

// Import modular routes
const sqliRoutes = require('./routes/sqli');
const xssRoutes = require('./routes/xss');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Demo session cookie setup for XSS testing (simulating sensitive session state)
app.use((req, res, next) => {
  if (!req.cookies.fanos_training_session) {
    res.cookie('fanos_training_session', 'fanos_sec_sess_89a3ef0019bc2', {
      maxAge: 86400000,
      httpOnly: false // Intentionally set to false for educational XSS cookie extraction demonstration
    });
  }
  if (!req.cookies.fanos_user_role) {
    res.cookie('fanos_user_role', 'security_trainee', { maxAge: 86400000 });
  }
  next();
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Mount API Routes
app.use('/api/sqli', sqliRoutes);
app.use('/api/xss', xssRoutes);

// Sandbox Status / Healthcheck endpoint
app.get('/api/status', (req, res) => {
  res.json({
    platform: 'FANOS SEC — Security Training Sandbox',
    version: '1.0.0',
    status: 'ONLINE',
    database: 'SQLite In-Memory (:memory:)',
    activeLabs: [
      { id: 'sqli', name: 'SQL Injection Authentication Bypass', endpoint: '/sqli.html' },
      { id: 'xss', name: 'Stored Cross-Site Scripting (XSS) Message Board', endpoint: '/xss.html' }
    ]
  });
});

// Fallback route for 404s
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log('====================================================');
  console.log('🛡️  FANOS SEC — SECURITY TRAINING SANDBOX');
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`📂 SQLi Lab URL:      http://localhost:${PORT}/sqli.html`);
  console.log(`📂 XSS Lab URL:       http://localhost:${PORT}/xss.html`);
  console.log('====================================================');
});
