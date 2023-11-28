import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://xtdwstdpktqgpnqyjamj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0ZHdzdGRwa3RxZ3BucXlqYW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExNDg4MzAsImV4cCI6MjAxNjcyNDgzMH0.hL7h3IYJm4LtbRc3BiP4AaSPKsW7ZRUmIQLwXpq6juA";

export default supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
})
