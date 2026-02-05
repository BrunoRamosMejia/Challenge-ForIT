import Database from 'better-sqlite3';

const db = new Database('tasks.db');

// Crea la tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    createdAt TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  )
`).run();

export default db;