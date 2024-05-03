"use client";

import {Box, Flex, IconButton, LinkBox, Menu, MenuButton, MenuItem, MenuList, Text,} from "@chakra-ui/react";
import Post from "@/model/post.model";
import {Link, useRouter} from "@/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import {createClient} from "@/utils/supabase/client";
import {User} from "@supabase/supabase-js";
import {FiMoreVertical, FiTrash2} from "react-icons/fi";
import {useParams} from "next/navigation";
import {useTranslations} from "next-intl";
import Avatar from "@/components/atoms/Avatar";
import {FaRegAngry, FaRegComment} from "react-icons/fa";
import {useState} from "react";

dayjs.extend(relativeTime);

const PostCard = ({post: initialPost, user}: PostCardProps) => {
  const [post, setPost] = useState(initialPost);
  const fullName = (post.user_first_name || '') + (post.user_last_name || '');
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

  const upvoteHandler = async () => {
    const {data: updatedPost} = await supabase.from("posts").update({
      upvotes: post.upvotes + 1
    }).eq("id", post.id).select("*, users(*), disruptions(*), cities(*)").single()

    setPost(updatedPost);
  }

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
        <Avatar flexShrink={0} src={post.user_image_url} alt="" display={{base: 'none', md: 'block'}}/>

        <Flex flex={1} justify="space-between">
          <Flex flex={1} gap=".5rem" direction="column">
            <Flex align="center" gap="1rem">
              <Avatar display={{md: 'none'}} flexShrink={0} src={post.user_image_url} alt=""/>

              <Flex color="gray.500"
                    align="center"
                    gap={{base: 0, md: '1rem'}}
                    direction={{base: 'column', md: 'row'}}>
                <Text color="black" fontWeight="bold">{fullName}</Text>

                <Text display={{base: "none", md: "block"}}>
                  {post.user_email}
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
              fontSize="xs">{post.city_name}, {post.address}, {t(`disruption.${post.disruption_name}`)}</Text>

            <PostContent post={post}/>

            <Flex gap="2rem">
              <Flex align="center" mt="2rem" gap=".8rem">
                <IconButton onClick={upvoteHandler}
                            minW="auto"
                            variant="link"
                            aria-label="upvote"
                            icon={<FaRegAngry fontSize="2.4rem"/>}/>
                <Text mb=".1rem" fontSize="sm">{post.upvotes}</Text>
              </Flex>

              {postId !== post.id && <Flex align="center" mt="2rem" gap=".8rem">
                  <IconButton minW="auto"
                              variant="link"
                              as={Link}
                              href={`/${post.user_id}/posts/${post.id}`}
                              aria-label="upvote"
                              icon={<FaRegComment fontSize="2.4rem"/>}/>
                  <Text mb=".1rem" fontSize="sm">{post.comments_count}</Text>
              </Flex>}
            </Flex>
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
