import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rijwittxmexhhovjqvtf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpandpdHR4bWV4aGhvdmpxdnRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMDg4NTQsImV4cCI6MjA5NzY4NDg1NH0.Fg4II0ykc13rBVVqXi_IAxzGfZtdKsNDCS54-8LZLwc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);