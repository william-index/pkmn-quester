import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://kzrdpahkmknijzvdkdur.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6cmRwYWhrbWtuaWp6dmRrZHVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc3MDMyOTYsImV4cCI6MTk5MzI3OTI5Nn0.JCk4_496siKz-5FJrwTsDpKTe5ztmpZntZqY-IBktlU')