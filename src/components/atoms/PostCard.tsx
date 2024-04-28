"use client";

import {
  Avatar,
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

dayjs.extend(relativeTime);

const PostCard = ({post, user}: PostCardProps) => {
  const fullName = getUserName(post.users);
  const timeFromNow = dayjs(post.created_at).fromNow();
  const supabase = createClient();
  const {refresh} = useRouter();

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
      p="1.5rem 2rem 2rem"
      borderWidth=".1rem"
      rounded="md"
    >
      <Flex gap="1.5rem">
        <Avatar
          display={{base: "none", md: "block"}}
          flexShrink={0}
          size="lg"
          name={fullName}
          src={post.users?.image_url}
        />

        <Flex flex={1} justify="space-between">
          <Flex flex={1} gap=".5rem" direction="column">
            <Flex align="center" gap="1rem">
              <Avatar display={{md: "none"}} name={fullName} src={post.users?.image_url}/>

              <Text fontWeight="bold">{fullName}</Text>

              <Text display="flex" gap="1rem" color="gray.500">
                <Box as="span" display={{base: "none", md: "block"}}>
                  {post.users?.email}
                </Box>
                <Box as="span" display={{base: "none", md: "block"}}>
                  ·
                </Box>
                <Box as="time" dateTime={post.created_at}>
                  {timeFromNow}
                </Box>
              </Text>
            </Flex>
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
            <Box position="absolute" right="2rem">
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
  const t = useTranslations('common');

  return (
    <Flex gap="1rem" direction="column">
      <Text fontSize="xs">{post.cities.name}, {post.address}, {t(`disruption.${post.disruptions.name}`)}</Text>

      <Text>{post.message}</Text>

      {post.image_url && (
        <Box bgColor="black" position="relative" height={{base: "40rem", md: "50rem"}}>
          <Image sizes="" objectFit="contain" objectPosition="center" fill src={post.image_url} alt=""/>
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
