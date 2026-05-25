import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ywlgidvwcdbhjdvjvjck.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for our tables
export interface ChatSession {
  id: string;
  session_id: string;
  messages: { role: string; content: string; timestamp: string }[];
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  branch_preference?: string;
  source: string;
  created_at: string;
}

export interface KnowledgeEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
  metadata?: Record<string, unknown>;
}
