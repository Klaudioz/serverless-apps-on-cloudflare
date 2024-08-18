-- Migration number: 0001 	 2024-08-18T14:43:39.402Z
CREATE TABLE images (
  id TEXT PRIMARY KEY,
  analysis TEXT,
  completed INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
