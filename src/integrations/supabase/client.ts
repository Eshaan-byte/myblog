"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

// Re-export the browser client as `supabase` for backward compatibility.
// All existing components import { supabase } from "@/integrations/supabase/client"
export const supabase = getSupabaseBrowserClient();
