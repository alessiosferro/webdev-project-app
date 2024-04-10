'use client';

import {Avatar, Box, Flex, LinkBox, LinkOverlay, Text} from "@chakra-ui/react";
import Post from "@/model/post.model";
import {Link} from "@/navigation";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from "next/image";

dayjs.extend(relativeTime);

const BASE_POST_STORAGE_URL = 'https://loywoviwfotlcofcfoiu.supabase.co/storage/v1/object/public/posts';

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
                        <LinkOverlay display="flex" flexDirection="column" gap="2rem" as={Link}
                                     href={`/${post.users.id}/posts/${post.id}`}>
                            {post.message}

                            {post.image_url && (
                                <Box mb="2rem">
                                    <Image
                                        width={300}
                                        height={300}
                                        src={`${BASE_POST_STORAGE_URL}/${post.image_url}`}
                                        alt=""/>
                                </Box>)}
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