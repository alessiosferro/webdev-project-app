import {createClient} from "@/utils/supabase/server";
import Post from "@/model/post.model";

export default async function getPosts(userId?: string) {
  const supabase = createClient();

  const query = supabase.rpc('get_posts_with_comments_count')
    .order("upvotes", {ascending: false});

  const {error, data} =
    await (userId ? query.eq("user_id", userId) : query)
      .returns<Post[]>();

  if (error || !data) {
    error && console.error(error);
    return []
  }

  return data;
}
