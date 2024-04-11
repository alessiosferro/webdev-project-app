import {Flex} from "@chakra-ui/react";
import PostCard from "@/components/atoms/PostCard";
import getPosts from "@/utils/supabase/posts";
import {User} from "@supabase/supabase-js";

const PostList = async ({user, filterByUserId}: PostListProps) => {
    const posts = await getPosts(user && filterByUserId ? user.id : '');

    return (
        <Flex direction="column" gap="2rem">
            {posts.map((post, index) => (
                <PostCard user={user} post={post} key={index}/>
            ))}
        </Flex>
    )
}

export interface PostListProps {
    user: User | null;
    filterByUserId?: boolean;
}

export default PostList;