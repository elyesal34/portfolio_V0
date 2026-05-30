import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string | null;
  technologies: string[];
  image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  status: 'planned' | 'in_progress' | 'completed';
  featured: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
};

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at' | 'user_id'>;
