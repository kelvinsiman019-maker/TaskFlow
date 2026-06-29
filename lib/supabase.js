import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import "react-native-url-polyfill/auto";

// Palitan ang dalawang values sa baba ng galing sa iyong Supabase project
// (Project Settings -> API)
const SUPABASE_URL = "https://rijwittxmexhhovjqvtf.supabase.co";
const SUPABASE_ANON_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpandpdHR4bWV4aGhvdmpxdnRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMDg4NTQsImV4cCI6MjA5NzY4NDg1NH0.Fg4II0ykc13rBVVqXi_IAxzGfZtdKsNDCS54-8LZLwc";

// Sa Web, gamitin ang built-in localStorage ng browser.
// Sa Android/iOS, gamitin ang AsyncStorage.
// Ginawa itong "lazy require" para hindi mabundle sa Web kung hindi kailangan.
const storage =
  Platform.OS === "web"
    ? undefined // Supabase will fall back to localStorage automatically on web
    : require("@react-native-async-storage/async-storage").default;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
