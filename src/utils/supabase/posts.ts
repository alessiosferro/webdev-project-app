import { createClient } from "@/utils/supabase/server";
import Post from "@/model/post.model";

export default async function getPosts(userId?: string) {
  const supabase = createClient();

  const { error, data } = await (userId
    ? supabase
        .from("posts")
        .select("*, users(*)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .returns<Post[]>()
    : supabase
        .from("posts")
        .select("*, users(*)")
        .order("created_at", { ascending: false })
        .returns<Post[]>());

  if (error || !data) {
    error && console.error(error);
    return [];
  }

  return data;
}
