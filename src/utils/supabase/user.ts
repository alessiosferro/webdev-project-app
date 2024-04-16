import { createClient } from "@/utils/supabase/server";
import { redirect } from "@/navigation";
import UserProfile, { AppUser } from "@/model/user-profile.model";

export default async function getUser(preventRedirectEffect?: boolean) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!data || error) {
    if (preventRedirectEffect) {
      return null;
    }

    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select()
    .eq("id", data.user?.id)
    .single<UserProfile>();

  const user = data.user as AppUser;

  if (user) {
    user.profile = profile;
  }

  return data.user as AppUser;
}
