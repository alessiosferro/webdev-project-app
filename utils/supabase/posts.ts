import {createClient} from "@/utils/supabase/server";
import Post from "@/model/post.model";

export default async function getPosts() {
    const supabase = createClient();

    const response = await supabase
        .from('posts')
        .select('id, user_id, message, created_at');

    return response.data as Post[];
}