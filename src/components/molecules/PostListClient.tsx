"use client";

import PostCard from "@/components/atoms/PostCard";
import {Box} from "@chakra-ui/react";
import Post from "@/model/post.model";
import {User} from "@supabase/supabase-js";
import {useEffect, useRef} from "react";
import {useInfiniteQuery} from "react-query";
import {getPostsClient} from "@/utils/posts-client";

export default function PostListClient({posts: initialPosts, count, user}: PostListClientProps) {
  const ref = useRef<HTMLDivElement>(null);

  const {data, fetchNextPage} = useInfiniteQuery("posts", {
    queryFn: async ({pageParam: {page, pageLimit}}) => {
      const {posts} = await getPostsClient({page, pageLimit});
      return posts;
    },
    staleTime: Infinity,
    keepPreviousData: true,
    initialData: {pages: [initialPosts], pageParams: [{page: 0, pageLimit: 5}]},
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length * 5 >= count) return;
      return ({page: (allPages.length) * 5, pageLimit: 5});
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [{isIntersecting}] = entries;
      if (!isIntersecting) return;
      fetchNextPage();
    }, {
      threshold: 1
    });

    observer.observe(ref.current!);

    return () => observer.disconnect()
  }, []);

  return (
    <>
      {data?.pages?.flatMap((posts) =>
        posts.map(post => (<PostCard user={user} post={post} key={post.id}/>))
      )}

      <Box ref={ref}/>
    </>
  )
}

interface PostListClientProps {
  posts: Post[];
  count: number;
  user: User | null;
}