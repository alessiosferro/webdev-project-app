import { User } from "@supabase/supabase-js";

export default interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  age: number;
  image_url: string;
}

export type AppUser = User & { profile: UserProfile | null };
