import { createClient } from "@supabase/supabase-js";

export function supabaseAdmin() {
  try {
    return createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SECRET!,
    );
  } catch (e) {
    console.log(e);
    console.log("SUPABASE_URL " + process.env.SUPABASE_URL);
    throw new Error("Can't initialize supabase");
  }
}
