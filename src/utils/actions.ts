'use server';

import {createClient} from "@/utils/supabase/server";
import getUser from "@/utils/supabase/user";
import {revalidatePath} from "next/cache";

export const createPost = async (formData: FormData) => {
    const message = formData.get('message');

    const supabase = createClient();

    const user = await getUser();

    await supabase.from('posts').insert({
        user_id: user.id,
        message
    });

    revalidatePath('/');
}
