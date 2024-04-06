'use client';

import {Avatar, Box, Flex, LinkBox, LinkOverlay, Text} from "@chakra-ui/react";
import Post from "@/model/post.model";
import {Link} from "@/navigation";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const PostCard = ({post}: PostCardProps) => {
    const fullName = `${post.users.first_name} ${post.users.last_name}`;
    const timeFromNow = dayjs(post.created_at).fromNow();

    return (
        <LinkBox as='article'
                 display="flex"
                 gap="1rem"
                 flexDirection="column"
                 p="1rem"
                 borderWidth='.1rem'
                 rounded='md'>
            <Flex gap="1.5rem">
                <Avatar size="lg" name={fullName} src={post.users.image_url}/>

                <Flex gap=".5rem" direction="column">
                    <Flex align="center" gap="1rem">
                        <Text fontWeight="bold">{fullName}</Text>

                        <Text display="flex" gap="1rem" color="gray.500">
                            <Box as="span" display={{base: 'none', md: 'block'}}>{post.users.email}</Box>
                            <Box as="span" display={{base: 'none', md: 'block'}}>·</Box>
                            <Box as="time" dateTime={post.created_at}>{timeFromNow}</Box>
                        </Text>
                    </Flex>
                    <Text>
                        <LinkOverlay as={Link} href={`/${post.users.id}/posts/${post.id}`}>
                            {post.message}
                        </LinkOverlay>
                    </Text>
                </Flex>

            </Flex>
        </LinkBox>
    )
}

export interface PostCardProps {
    post: Post;
}

export default PostCard;