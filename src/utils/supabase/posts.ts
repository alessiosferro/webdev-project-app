import {createClient} from "@/utils/supabase/server";
import Post from "@/model/post.model";

export default async function getPosts() {
    const supabase = createClient();

    const {error, data} = await supabase
        .from('posts')
        .select('*, users(*)')
        .returns<Post[]>();

    if (error || !data) {
        error && console.error(error);
        return [];
    }

    return data;
}