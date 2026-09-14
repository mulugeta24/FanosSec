/**
 * FANOS SEC — Security Training Sandbox
 * In-Memory SQLite Database Engine (Powered by sql.js / WebAssembly)
 * 
 * 100% portable across all Node.js versions with zero native compilation dependencies.
 * Automatically resets in RAM (:memory:) on server restart.
 */

const initSqlJs = require('sql.js');

let dbInstance = null;

/**
 * Initializes in-memory SQLite database and seeds initial data
 */
async function initDb() {
  if (dbInstance) return dbInstance;

  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // 1. Create Users Table for SQL Injection Testing
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      full_name TEXT,
      secret_flag TEXT
    );
  `);

  // Seed Users
  db.run(`
    INSERT INTO users (username, password, role, full_name, secret_flag) VALUES
    ('admin', 'SuperSecretP@ss2026!', 'Administrator', 'Mulugeta Ababi (Root Admin)', 'FLAG{fanos_sec_sql_master}'),
    ('sec_analyst', 'Analyst#2026_Secure', 'Security Analyst', 'Sarah Connor', 'FLAG{fanos_sec_analyst_badge}'),
    ('intern', 'welcome123', 'Junior Pentester', 'John Doe', 'FLAG{fanos_sec_junior_flag}');
  `);

  // 2. Create Comments Table for Stored XSS Testing
  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed Comments
  db.run(`
    INSERT INTO comments (author, message, created_at) VALUES
    ('System Alert', 'Welcome to the FANOS SEC Community Threat Board! Feel free to post security findings.', datetime('now', '-1 hour')),
    ('SecOps Lead', 'Reminder: Always verify inputs before parsing raw HTML payloads in modern applications.', datetime('now', '-30 minutes'));
  `);

  console.log('[DATABASE] In-Memory SQLite Database initialized and seeded successfully.');
  dbInstance = db;
  return dbInstance;
}

/**
 * Database Helper Interface for intuitive querying
 */
const dbHelper = {
  // Execute a query and return a single row object
  get: async (sql) => {
    const db = await initDb();
    const res = db.exec(sql);
    if (!res || res.length === 0 || res[0].values.length === 0) {
      return null;
    }
    const columns = res[0].columns;
    const firstRowValues = res[0].values[0];
    const row = {};
    columns.forEach((col, idx) => {
      row[col] = firstRowValues[idx];
    });
    return row;
  },

  // Execute a query and return all matching row objects
  all: async (sql) => {
    const db = await initDb();
    const res = db.exec(sql);
    if (!res || res.length === 0) {
      return [];
    }
    const columns = res[0].columns;
    return res[0].values.map(values => {
      const row = {};
      columns.forEach((col, idx) => {
        row[col] = values[idx];
      });
      return row;
    });
  },

  // Run an INSERT, UPDATE, or DELETE query
  run: async (sql, params = []) => {
    const db = await initDb();
    db.run(sql, params);
  },

  // Reset database back to default initial seed state
  reset: async () => {
    dbInstance = null;
    return await initDb();
  }
};

module.exports = { initDb, dbHelper };
