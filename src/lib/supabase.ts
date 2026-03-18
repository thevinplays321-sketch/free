/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// Your actual Supabase Project URL and Anon Key
const supabaseUrl = 'https://sipfgaihfxiqcdeffsta.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpcGZnYWloZnhpcWNkZWZmc3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MTk2MTcsImV4cCI6MjA4OTM5NTYxN30.ce4K5Iq26rDf8N6MMoC7R9uqoylg719JhYobn8fXo_0';

// Check if the values are still the default placeholders
export const isConfigured = (supabaseUrl as string) !== 'https://YOUR_PROJECT_ID.supabase.co' && (supabaseAnonKey as string) !== 'YOUR_SUPABASE_ANON_KEY';

if (!isConfigured) {
  console.warn('Supabase is not yet configured. Please replace the placeholders in src/lib/supabase.ts');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
