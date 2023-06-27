
import { createClient } from '@supabase/supabase-js';

const { supabaseUrl, supabaseApiKey } = useRuntimeConfig();

// Create a single supabase client for interacting with your database
// Project settings > api settings, env에 저장하고 nuxt.config.ts에서 runTimeConfig내에 선언해서 불러와서 쓰기
export const supabase = createClient(supabaseUrl, supabaseApiKey, {
  auth: {
    persistSession: false,
  }
});
