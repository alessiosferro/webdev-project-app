'use server';

import {createClient} from "@/utils/supabase/server";
import getUser from "@/utils/supabase/user";
import {revalidatePath} from "next/cache";
import {z} from "zod";

export const createPost = async (state: CreatePostState | undefined, formData: FormData) => {
    const data = Object.fromEntries(formData.entries()) as {
        message: string;
        image: File;
        disruption_id: string;
        city_id: string;
    };

    const validatedFields = CreatePostSchema.safeParse({
        ...data,
        disruption_id: +data.disruption_id,
        city_id: +data.city_id
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid fields. New post was not created.",
        }
    }

    const {city_id, disruption_id, message, image} = validatedFields.data;

    const supabase = createClient();

    const user = await getUser();

    let image_url: string = '';

    if (image) {
        const {
            data: uploadData
        } = await supabase.storage.from('posts')
            .upload(`${user?.id}/posts/${image.name}`, image, {upsert: true})

        image_url = uploadData?.path ?
            `https://loywoviwfotlcofcfoiu.supabase.co/storage/v1/object/public/posts/${uploadData?.path}`
            : '';
    }

    await supabase.from('posts').insert({
        user_id: user?.id,
        ...(image_url && {image_url}),
        disruption_id,
        city_id,
        message
    });

    revalidatePath('/');

    return {
        message: Date.now().toString(),
        errors: {}
    }
}

export interface CreatePostState {
    errors?: {
        message?: string[];
        image?: string[];
        disruption_id?: string[];
        city_id?: string[];
    },
    message?: string;
}

const CreatePostSchema = z.object({
    message: z.string({required_error: 'message is required.'}),
    city_id: z.number({required_error: 'city_id is required.'}),
    disruption_id: z.number({required_error: 'disruption_id is required'}),
    image: z.instanceof(File)
});