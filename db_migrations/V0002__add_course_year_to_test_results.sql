-- Add course_year column to test_results table
ALTER TABLE test_results 
ADD COLUMN course_year VARCHAR(10) DEFAULT '';
