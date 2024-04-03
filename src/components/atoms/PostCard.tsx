'use client';

import {LinkBox, LinkOverlay, Text} from "@chakra-ui/react";
import Post from "@/model/post.model";
import useFormattedDate from "@/hooks/use-formatted-date";
import {Link} from "@/navigation";

const PostCard = ({post}: PostCardProps) => {
    const formattedDate = useFormattedDate(post.created_at);

    return (
        <LinkBox as='article'
                 display="flex"
                 gap=".5rem"
                 flexDirection="column"
                 p="1rem"
                 borderWidth='.1rem'
                 rounded='md'>
            <Text fontSize="xs"
                  color="gray.500"
                  as='time'
                  dateTime={post.created_at}
            >
                {formattedDate}
            </Text>
            <Text>
                <LinkOverlay as={Link} href={`/${post.user_id}/posts/${post.id}`}>
                    {post.message}
                </LinkOverlay>
            </Text>
        </LinkBox>
    )
}

export interface PostCardProps {
    post: Post;
}

export default PostCard;