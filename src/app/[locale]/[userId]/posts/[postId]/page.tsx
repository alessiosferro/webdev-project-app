import {createClient} from "@/utils/supabase/server";
import PostCard from "@/components/atoms/PostCard";
import Post from "@/model/post.model";
import {notFound} from "next/navigation";
import getUser from "@/utils/supabase/user";
import {revalidatePath} from "next/cache";
import ClientFormProvider from "@/components/providers/ClientFormProvider";
import BackButton from "@/components/atoms/BackButton";

const PostPage = async ({
                          params,
                        }: {
  params: { postId: string; userId: string; locale: string };
  searchParams: Record<string, string>;
}) => {
  const {userId, postId} = params;

  const user = await getUser();

  const client = createClient();

  const post = await client
    .from("posts")
    .select("*, users(*)")
    .eq("user_id", userId)
    .eq("id", postId)
    .single<Post>();

  if (!post.data) {
    return notFound();
  }

  const comments = await client
    .from("posts")
    .select()
    .eq("post_id", post.data.id);

  const postComments = comments.data || ([] as Post[]);

  const commentPost = async (formData: FormData) => {
    "use server";

    const message = formData.get("message");

    const supabase = createClient();

    const user = await getUser();

    await supabase.from("posts").insert({
      user_id: user?.id,
      message,
      post_id: post.data.id,
    });

    revalidatePath("/[locale]/[userId]/posts/[postId]");
  };

  return (
    <ClientFormProvider defaultValues={defaultValues}>
      <BackButton mb="2rem"/>

      <PostCard user={user} post={post.data}/>

      {postComments.map((post) => (
        <PostCard user={user} post={post} key={post.id}/>
      ))}
    </ClientFormProvider>
  );
};

const defaultValues = {
  message: "",
};

export default PostPage;
