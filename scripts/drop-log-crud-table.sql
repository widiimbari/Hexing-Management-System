-- Drop log_crud table from PostgreSQL database
-- Run this after stopping the development server

-- Drop the table
DROP TABLE IF EXISTS log_crud CASCADE;

-- Verify the table is dropped
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = 'log_crud';
-- This should return no rows if successful
