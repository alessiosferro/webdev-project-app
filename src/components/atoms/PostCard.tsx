"use client";

import {
    Box,
    Flex,
    IconButton,
    LinkBox,
    LinkOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import Post from "@/model/post.model";
import {Link, useRouter} from "@/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import {createClient} from "@/utils/supabase/client";
import {User} from "@supabase/supabase-js";
import {FiMoreVertical, FiTrash2} from "react-icons/fi";
import {useParams} from "next/navigation";
import {getUserName} from "@/utils";
import {useTranslations} from "next-intl";
import Avatar from "@/components/atoms/Avatar";

dayjs.extend(relativeTime);

const PostCard = ({post, user}: PostCardProps) => {
    const fullName = getUserName(post.users);
    const timeFromNow = dayjs(post.created_at).fromNow();
    const supabase = createClient();
    const {refresh} = useRouter();
    const t = useTranslations('common');

    const params = useParams();

    const postId = +(params.postId as string);

    const handleDeletePost = async () => {
        await supabase.from("posts").delete().eq("id", post.id);

        refresh();
    };

    return (
        <LinkBox
            as="article"
            display="flex"
            gap="1rem"
            flexDirection="column"
            p={{base: "1.5rem 2rem 2rem", lg: "1.5rem 3rem 3rem 2rem"}}
            borderWidth=".1rem"
            rounded="md"
        >
            <Flex gap="1.5rem">
                <Avatar flexShrink={0} src={post.users?.image_url} alt="" display={{base: 'none', md: 'block'}}/>

                <Flex flex={1} justify="space-between">
                    <Flex flex={1} gap=".5rem" direction="column">
                        <Flex align="center" gap="1rem">
                            <Avatar display={{md: 'none'}} flexShrink={0} src={post.users?.image_url} alt=""/>

                            <Flex color="gray.500"
                                  align="center"
                                  gap={{base: 0, md: '1rem'}}
                                  direction={{base: 'column', md: 'row'}}>
                                <Text color="black" fontWeight="bold">{fullName}</Text>

                                <Text display={{base: "none", md: "block"}}>
                                    {post.users?.email}
                                </Text>

                                <Text display={{base: "none", md: "block"}}>
                                    ·
                                </Text>

                                <Text mt=".1rem" fontSize="xs" lineHeight="xs" as="time" dateTime={post.created_at}>
                                    {timeFromNow}
                                </Text>
                            </Flex>
                        </Flex>

                        <Text
                            fontSize="xs">{post.cities.name}, {post.address}, {t(`disruption.${post.disruptions.name}`)}</Text>

                        {postId !== post.id ? (
                            <LinkOverlay
                                as={Link}
                                href={`/${post.users?.id}/posts/${post.id}`}
                            >
                                <PostContent post={post}/>
                            </LinkOverlay>
                        ) : (
                            <PostContent post={post}/>
                        )}
                    </Flex>

                    {post.user_id === user?.id && (
                        <Box position="absolute" top="2rem" right="3rem">
                            <Menu placement="bottom-end">
                                <MenuButton
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={<FiMoreVertical/>}
                                    variant="ghost"
                                />

                                <MenuList position="absolute" right={0}>
                                    <MenuItem
                                        onClick={handleDeletePost}
                                        color="red"
                                        icon={<FiTrash2/>}
                                    >
                                        Delete Post
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    )}
                </Flex>
            </Flex>
        </LinkBox>
    );
};

const PostContent = ({post}: { post: Post }) => {
    return (
        <Flex mt="1rem" gap="1.5rem" direction="column">
            <Text>{post.message}</Text>

            {post.image_url && (
                <Box position="relative" h="40rem">
                    <Image objectFit="cover"
                           objectPosition="center"
                           fill
                           src={post.image_url} alt=""/>
                </Box>
            )}
        </Flex>
    );
};

export interface PostCardProps {
    post: Post;
    user: User | null;
}

export default PostCard;
