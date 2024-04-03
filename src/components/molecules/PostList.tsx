import {Flex} from "@chakra-ui/react";
import Post from "@/model/post.model";
import PostCard from "@/components/atoms/PostCard";

const PostList = ({posts}: PostListProps) => {
    return (
        <Flex direction="column" gap="2rem">
            {posts.map((post, index) => (
                <PostCard post={post} key={index}/>
            ))}
        </Flex>
    )
}

export interface PostListProps {
    posts: Post[];
}

export default PostList;