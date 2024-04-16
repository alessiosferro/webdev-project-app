"use server";

import { createClient } from "@/utils/supabase/server";
import getUser from "@/utils/supabase/user";
import { revalidatePath } from "next/cache";
import { redirect } from "@/navigation";

export default async function uploadProfileImage(formData: FormData) {
  const supabase = createClient();

  const file = formData.get("file") as File;

  const user = await getUser();

  const { error } = await supabase.storage
    .from("profile-pictures")
    .update(`${user?.id}/profile-image.jpg`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/profile");
}
