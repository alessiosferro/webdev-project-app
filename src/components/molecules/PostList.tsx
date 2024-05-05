import {Flex} from "@chakra-ui/react";
import getPosts from "@/utils/supabase/posts";
import {User} from "@supabase/supabase-js";
import PostListClient from "@/components/molecules/PostListClient";

const PostList = async (props: PostListProps) => {
  const {
    user,
    filterByUserId,
  } = props;

  const {posts, count} = await getPosts(user && filterByUserId ? user.id : "");

  return (
    <Flex direction="column" gap="3rem">
      <PostListClient posts={posts} count={count} user={user}/>
    </Flex>
  );
};

export interface PostListProps {
  user: User | null;
  filterByUserId?: boolean;
}

export default PostList;
