import { PostgrestError } from "@supabase/supabase-js";
//import apm from "./elasticConfig";

export function dbErrorsCheck(error: PostgrestError | null) {
  if (error) {
    //apm.captureError(error);
    console.log(error);
  }
}
