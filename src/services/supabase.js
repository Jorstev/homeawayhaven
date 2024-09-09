import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ryesuiscgjwqoanptuwr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZXN1aXNjZ2p3cW9hbnB0dXdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMDk1OTUsImV4cCI6MjA0MDg4NTU5NX0.5PNqvW5TWc5QdsgKYqeyoCpMcDSbKcXoxy-u9OR92Z8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
