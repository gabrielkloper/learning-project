/**
 * Database Initialization Script
 *
 * This script runs automatically when the PostgreSQL container starts for the first time.
 * Complete the TODOs to create the database schema.
 */

-- TODO: Create the users table with the following columns:
-- - id: SERIAL PRIMARY KEY
-- - name: VARCHAR(100) NOT NULL
-- - email: VARCHAR(255) NOT NULL UNIQUE
-- - created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

CREATE TABLE users (
  -- TODO: Add id column (SERIAL PRIMARY KEY)

  -- TODO: Add name column (VARCHAR(100) NOT NULL)

  -- TODO: Add email column (VARCHAR(255) NOT NULL UNIQUE)

  -- TODO: Add created_at column (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

);

-- TODO: Insert some sample data
-- Insert at least 3 users with different names and emails
-- Example: INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');

INSERT INTO users (name, email) VALUES
  -- TODO: Add first user

  -- TODO: Add second user

  -- TODO: Add third user

;

-- TODO: Create an index on the email column for faster lookups
-- Hint: CREATE INDEX idx_users_email ON users(email);

