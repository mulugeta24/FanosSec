/**
 * FANOS SEC — Security Training Sandbox
 * Module 1: SQL Injection (SQLi) Practice Lab
 * 
 * ⚠️ INTENTIONAL VULNERABILITY EXPLANATION:
 * -------------------------------------------------------------
 * This route constructs SQL queries using direct string concatenation without
 * parameterized input bindings or input sanitation.
 * 
 * Vulnerable Pattern:
 *   const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
 * 
 * Why it is vulnerable:
 * If an attacker inputs `' OR '1'='1` or `admin' --` into the username field,
 * the resulting SQL query becomes:
 *   SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '...'
 * Since '1'='1' is always true, the WHERE clause evaluates to true for all rows,
 * and SQLite returns the first user in the table (the Administrator account),
 * bypassing password authentication completely!
 * 
 * 🛡️ HOW TO FIX (SECURE CODING REMEDIATION):
 * -------------------------------------------------------------
 * Always use Parameterized Queries / Prepared Statements:
 *   const safeQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';
 *   // e.g., using prepared statements where parameters are passed separately
 * 
 * Parameterization ensures user input is strictly treated as data literals,
 * never as executable SQL commands.
 */

const express = require('express');
const router = express.Router();
const { dbHelper } = require('../database/db');

/**
 * GET /api/sqli/info
 * Returns metadata about the challenge and the vulnerable query template
 */
router.get('/info', (req, res) => {
  res.json({
    module: 'SQL Injection Authentication Bypass',
    difficulty: 'Easy / Beginner',
    targetTable: 'users',
    columns: ['id', 'username', 'password', 'role', 'full_name', 'secret_flag'],
    queryTemplate: "SELECT * FROM users WHERE username = '{username}' AND password = '{password}'",
    hint: "Try classic authentication bypass payloads like ' OR '1'='1 or admin' -- in the username input."
  });
});

/**
 * POST /api/sqli/login
 * ⚠️ VULNERABLE LOGIN ENDPOINT (Direct String Concatenation)
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username && username !== '') {
    return res.status(400).json({
      success: false,
      message: 'Username is required'
    });
  }

  // ⚠️ INTENTIONAL VULNERABILITY: Raw string interpolation in SQL query
  const rawQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password || ''}'`;

  console.log(`[SQLi LAB] Executing RAW Query: ${rawQuery}`);

  try {
    // Execute raw query against in-memory SQLite database
    const row = await dbHelper.get(rawQuery);

    if (row) {
      // Authentication Successful (either valid credentials or SQLi Bypass)
      return res.json({
        success: true,
        message: `Welcome back, ${row.full_name || row.username}! Authentication successful.`,
        executedQuery: rawQuery,
        user: {
          id: row.id,
          username: row.username,
          role: row.role,
          fullName: row.full_name
        },
        flag: row.secret_flag || 'FLAG{fanos_sec_sql_master}',
        isBypass: row.username === 'admin' && password !== 'SuperSecretP@ss2026!'
      });
    } else {
      // Authentication Failed
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Access Denied.',
        executedQuery: rawQuery,
        hint: "Authentication failed. Can you manipulate the boolean logic in the query using SQL injection?"
      });
    }
  } catch (err) {
    // Return SQL syntax error to aid student learning & error-based feedback
    return res.status(500).json({
      success: false,
      error: err.message,
      executedQuery: rawQuery,
      hint: 'SQL syntax error! Check your quotes and payload formatting.'
    });
  }
});

/**
 * GET /api/sqli/secure-example
 * Demonstrates how the query SHOULD be written securely
 */
router.get('/secure-example', (req, res) => {
  res.json({
    explanation: 'Secure Parameterized Query Implementation',
    safeCode: `
      // SECURE IMPLEMENTATION:
      const safeQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';
      const user = await db.get(safeQuery, [req.body.username, req.body.password]);
    `
  });
});

module.exports = router;
