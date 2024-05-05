import {createClient as supabaseServer} from "@/utils/supabase/server";
import Post from "@/model/post.model";

export default async function getPosts(userId?: string) {

  const supabase = supabaseServer();

  const query = supabase.rpc('get_posts_with_comments_count', {}, {count: 'exact'})
    .order("created_at", {ascending: false});

  const {error, data, count} =
    await (userId ? query.eq("user_id", userId) : query)
      .range(0, 4)
      .returns<Post[]>();

  if (error || !data) {
    error && console.error(error);
    return {posts: [], count: 0};
  }

  return {
    posts: data,
    count: count || 0
  };
}