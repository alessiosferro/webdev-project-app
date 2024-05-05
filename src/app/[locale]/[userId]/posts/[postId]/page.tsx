import {createClient} from "@/utils/supabase/server";
import PostCard from "@/components/atoms/PostCard";
import Post from "@/model/post.model";
import {notFound} from "next/navigation";
import getUser from "@/utils/supabase/user";
import BackButton from "@/components/atoms/BackButton";
import {Box, Flex} from "@chakra-ui/react";
import CommentForm from "@/components/molecules/CommentForm";

const PostPage = async ({
                          params,
                        }: {
  params: { postId: string; userId: string; locale: string };
  searchParams: Record<string, string>;
}) => {
  const {userId, postId} = params;

  const user = await getUser();

  const client = createClient();

  const post = await client
    .rpc('get_post_details')
    .eq("user_id", userId)
    .eq("id", postId)
    .single<Post>();

  if (!post.data) {
    return notFound();
  }

  const comments = await client
    .rpc("get_posts_with_comments_count")
    .eq("post_id", post.data.id)
    .returns<Post[]>();

  const postComments = comments.data || ([] as Post[]);


  return (
    <Box as="section">
      <BackButton mb="2rem"/>

      <PostCard user={user} post={post.data}/>

      {postComments.length > 0 && <Flex direction="column" gap="2rem" mt="5rem">
        {postComments.map((post) => (
          <PostCard user={user} post={post} key={post.id}/>
        ))}
      </Flex>}

      <CommentForm postId={post.data.id}/>
    </Box>
  );
};

export default PostPage;
