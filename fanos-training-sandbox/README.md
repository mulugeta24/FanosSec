# FANOS SEC — Security Training Sandbox

A dedicated, isolated local cybersecurity training sandbox built for **Fanos Sec** engineers and trainees to practice finding, understanding, and remediating web application vulnerabilities.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+ or v20+
- **npm**: v9+

### 1. Installation
Navigate into the `fanos-training-sandbox` directory and install the lightweight dependencies:

```bash
cd fanos-training-sandbox
npm install
```

### 2. Run the Application
Start the Node.js Express server:

```bash
npm start
```
*or*
```bash
node server.js
```

### 3. Open in Browser
Visit the sandbox dashboard:
👉 **[http://localhost:8080](http://localhost:8080)**

---

## 📂 Project Architecture

```
fanos-training-sandbox/
├── database/
│   └── db.js            # In-memory SQLite (:memory:) connection & initial seed data
├── routes/
│   ├── sqli.js          # SQL Injection lab endpoints & vulnerability logic
│   └── xss.js           # Stored XSS lab endpoints & comment board logic
├── public/
│   ├── index.html       # Sandbox Dashboard (Overview & Module Launchers)
│   ├── sqli.html        # SQL Injection interactive practice workspace
│   ├── xss.html         # Stored XSS interactive message board workspace
│   └── style.css        # FANOS SEC dark cyberpunk design system stylesheet
├── server.js            # Express server initialization on port 8080
├── package.json         # Project metadata & dependencies
└── README.md            # Documentation, setup & remediation guide
```

---

## 🧪 Training Modules & Walkthrough

### Module 1: SQL Injection (SQLi) Practice Lab
* **URL**: [http://localhost:8080/sqli.html](http://localhost:8080/sqli.html)
* **Vulnerability Class**: CWE-89 (Improper Neutralization of Special Elements used in an SQL Command)
* **Target Objective**: Bypass administrative authentication and capture the secret root admin flag.

#### ⚠️ The Vulnerability:
The backend constructs SQL queries via direct string concatenation:
```javascript
// routes/sqli.js (Vulnerable)
const rawQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
db.get(rawQuery, (err, row) => { ... });
```

#### 🎯 Exploitation Technique:
Inputting `' OR '1'='1` in the **Username** field modifies the SQL syntax:
```sql
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = ''
```
Because `'1'='1'` evaluates to true for all rows, SQLite returns the first user (`admin`), granting instant administrator access!

#### 🚩 Captured Flag:
```
FLAG{fanos_sec_sql_master}
```

#### 🛡️ Secure Coding Remediation:
Use **Parameterized Prepared Statements**:
```javascript
// SECURE REMEDIATION
const safeQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';
db.get(safeQuery, [username, password], (err, row) => { ... });
```

---

### Module 2: Stored Cross-Site Scripting (XSS) Lab
* **URL**: [http://localhost:8080/xss.html](http://localhost:8080/xss.html)
* **Vulnerability Class**: CWE-79 (Improper Neutralization of Input During Web Page Generation)
* **Target Objective**: Post HTML/JavaScript payloads that execute within victim browser sessions and extract simulated session cookies.

#### ⚠️ The Vulnerability:
The backend stores raw user input without HTML escaping, and the client renders comments directly using `innerHTML`:
```javascript
// public/xss.html (Vulnerable)
commentBody.innerHTML = comment.message;
```

#### 🎯 Exploitation Techniques:
1. **Cookie Access Alert**:
   ```html
   <img src="invalid-image" onerror="alert('Captured Session Cookie: ' + document.cookie)">
   ```
2. **SVG Load Trigger**:
   ```html
   <svg onload="alert('XSS execution on ' + document.domain)">
   ```
3. **DOM Defacement**:
   ```html
   <h2 style="color: #00FF41; text-shadow: 0 0 10px #00FF41;">Defaced by FANOS SEC Red Team</h2>
   ```

#### 🛡️ Secure Coding Remediation:
1. **Context-Aware Encoding**: Use `textContent` or `innerText` instead of `innerHTML`:
   ```javascript
   // SECURE REMEDIATION
   commentBody.textContent = comment.message;
   ```
2. **Rich Text Sanitization**: Use libraries like `DOMPurify.sanitize(userInput)`.
3. **Cookie Hardening**: Always set `HttpOnly` on session cookies so JavaScript cannot read them:
   ```javascript
   res.cookie('session_token', token, { httpOnly: true, secure: true });
   ```
4. **Content Security Policy (CSP)**:
   ```http
   Content-Security-Policy: default-src 'self'; script-src 'self';
   ```

---

## 🔒 Environmental Safety & Isolation
- **In-Memory SQLite**: All data lives in RAM (`:memory:`). No persistent files are written to disk.
- **Instant Reset**: Restarting the server or clicking "Reset Message Board" instantly restores clean initial states.

---

© 2026 FANOS SEC — Cybersecurity Learning & Training Sandbox.
