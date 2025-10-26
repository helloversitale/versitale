import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  pricing: string;
  timeline: string;
  perfect_for: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceFeature {
  id: string;
  service_id: string;
  feature_text: string;
  order_index: number;
  created_at: string;
}

export interface ServiceFAQ {
  id: string;
  service_id: string;
  question: string;
  answer: string;
  order_index: number;
  created_at: string;
}

export interface ServiceInquiry {
  service_id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface WebsiteOrder {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website_type: string;
  budget_range: string;
  timeline: string;
  requirements: string;
  current_website?: string;
}
