import {createClient} from "@/utils/supabase/client";
import Post from "@/model/post.model";

export async function getPostsClient(params: GetPostsParams) {
  const {userId, page, pageLimit} = params;

  const supabase = createClient();

  const query = supabase.rpc('get_posts_with_comments_count')
    .order("upvotes", {ascending: false});

  const {error, data, count} =
    await (userId ? query.eq("user_id", userId) : query)
      .range(page, page + pageLimit)
      .returns<Post[]>();

  if (error || !data) {
    error && console.error(error);
    return {posts: [], count: 0};
  }

  return {
    posts: data,
    count
  }
}

interface GetPostsParams {
  userId?: string;
  page: number;
  pageLimit: number;
}