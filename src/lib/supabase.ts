/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase Project URL and Anon Key
// Example: 'https://xyz.supabase.co'
const supabaseUrl = 'https://sipfgaihfxiqcdeffsta.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpcGZnYWloZnhpcWNkZWZmc3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MTk2MTcsImV4cCI6MjA4OTM5NTYxN30.ce4K5Iq26rDf8N6MMoC7R9uqoylg719JhYobn8fXo_0';

export const isConfigured = supabaseUrl !== 'https://sipfgaihfxiqcdeffsta.supabase.co' && supabaseAnonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpcGZnYWloZnhpcWNkZWZmc3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MTk2MTcsImV4cCI6MjA4OTM5NTYxN30.ce4K5Iq26rDf8N6MMoC7R9uqoylg719JhYobn8fXo_0';

if (!isConfigured) {
  console.warn('Supabase is not yet configured. Please replace the placeholders in src/lib/supabase.ts');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
