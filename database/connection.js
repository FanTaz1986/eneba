const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'eneba.db');

// Open or create database
const db = new Database(dbPath, {
  verbose: process.env.NODE_ENV === 'development' ? console.log : null
});

// Enable foreign keys
db.pragma('foreign_keys = ON');

module.exports = db;
