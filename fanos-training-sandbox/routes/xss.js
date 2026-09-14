/**
 * FANOS SEC — Security Training Sandbox
 * Module 2: Stored Cross-Site Scripting (XSS) Practice Lab
 * 
 * ⚠️ INTENTIONAL VULNERABILITY EXPLANATION:
 * -------------------------------------------------------------
 * In this module, user comments and messages are accepted by the server
 * without HTML entity encoding or input sanitization, stored into the database,
 * and subsequently delivered to the client browser where they are rendered
 * directly using unescaped DOM insertion (`innerHTML` or raw template rendering).
 * 
 * Vulnerable Pattern:
 *   1. Backend receives `<script>alert(document.cookie)</script>` or `<img src=x onerror=...>`
 *   2. Backend saves the raw string directly to SQLite.
 *   3. Client renders: container.innerHTML = comment.message;
 * 
 * Why it is vulnerable:
 * When another user visits the message board, the attacker's JavaScript code
 * executes within the context of the victim's authenticated browser session.
 * The script can access `document.cookie` (if HttpOnly is missing), redirect the user,
 * log keystrokes, or make authenticated API calls on the victim's behalf!
 * 
 * 🛡️ HOW TO FIX (SECURE CODING REMEDIATION):
 * -------------------------------------------------------------
 * 1. Context-Aware Output Encoding / Escaping:
 *    Always use `textContent` or `innerText` when inserting text into the DOM:
 *      element.textContent = comment.message;
 *    Or encode HTML special characters:
 *      & -> &amp;, < -> &lt;, > -> &gt;, " -> &quot;, ' -> &#x27;
 * 2. Sanitize Rich Text: Use robust libraries like DOMPurify or sanitize-html.
 * 3. Content Security Policy (CSP): Deploy strict HTTP response headers:
 *      Content-Security-Policy: default-src 'self'; script-src 'self';
 * 4. Cookie Security: Always flag sensitive cookies with `HttpOnly; Secure; SameSite=Strict`.
 */

const express = require('express');
const router = express.Router();
const { dbHelper } = require('../database/db');

/**
 * GET /api/xss/comments
 * Fetches all stored comments (raw unescaped data)
 */
router.get('/comments', async (req, res) => {
  try {
    const rows = await dbHelper.all('SELECT * FROM comments ORDER BY id DESC');
    res.json({
      success: true,
      comments: rows || []
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/xss/comments
 * ⚠️ VULNERABLE ENDPOINT: Stores raw unsanitized user input
 */
router.post('/comments', async (req, res) => {
  const { author, message } = req.body;

  if (!author || !message) {
    return res.status(400).json({
      success: false,
      message: 'Author name and message content are required.'
    });
  }

  try {
    // ⚠️ Store raw input into database without sanitization or HTML escaping
    // Escape single quotes for SQL insertion while preserving HTML/JS payload
    const safeAuthor = author.replace(/'/g, "''");
    const safeMessage = message.replace(/'/g, "''");

    await dbHelper.run(`INSERT INTO comments (author, message) VALUES ('${safeAuthor}', '${safeMessage}')`);

    console.log(`[XSS LAB] Stored new comment from "${author}": ${message}`);

    // Check if the payload appears to be a successful XSS test payload
    const isXssPayload = /<script|<img|<svg|<iframe|javascript:|onerror=|onload=|alert\(|prompt\(/i.test(message);

    res.status(201).json({
      success: true,
      message: 'Comment posted successfully!',
      isXssPayload: isXssPayload,
      hint: isXssPayload 
        ? 'Payload detected! When the message board renders this comment using innerHTML, the browser will execute your script.'
        : 'Comment saved. Try crafting an HTML/JavaScript tag payload.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/xss/reset
 * Resets the comment board to default seed data
 */
router.post('/reset', async (req, res) => {
  try {
    await dbHelper.run('DELETE FROM comments');
    await dbHelper.run(`
      INSERT INTO comments (author, message) VALUES
      ('System Alert', 'Welcome to the FANOS SEC Community Threat Board! Feel free to post security findings.'),
      ('SecOps Lead', 'Reminder: Always verify inputs before parsing raw HTML payloads in modern applications.');
    `);

    res.json({
      success: true,
      message: 'Message board successfully reset to default seed state.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
