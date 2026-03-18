/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase Project URL and Anon Key
// Example: 'https://xyz.supabase.co'
const supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const isConfigured = supabaseUrl !== 'https://YOUR_PROJECT_ID.supabase.co' && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY';

if (!isConfigured) {
  console.warn('Supabase is not yet configured. Please replace the placeholders in src/lib/supabase.ts');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
