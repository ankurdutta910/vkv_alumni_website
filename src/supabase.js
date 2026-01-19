// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qgfhfhymftxzemrdhqnh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZmhmaHltZnR4emVtcmRocW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NjI4NTAsImV4cCI6MjA4MjMzODg1MH0.WRfJLUAtWDY6kEoEAckqfkZkHrAjkEVHY_kXgxb26IU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
