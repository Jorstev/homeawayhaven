import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ryesuiscgjwqoanptuwr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZXN1aXNjZ2p3cW9hbnB0dXdyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTMwOTU5NSwiZXhwIjoyMDQwODg1NTk1fQ.GSgas8PgFUh7GLmCDBtOTi1a551JaVYvQ7nZ0cXEv2s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
