"use server";

import {createClient} from "@/utils/supabase/server";
import getUser from "@/utils/supabase/user";
import {revalidatePath} from "next/cache";
import {z} from "zod";

export const createPost = async (
    state: CreatePostState | undefined,
    formData: FormData,
) => {
    const data = Object.fromEntries(formData.entries()) as {
        message: string;
        image: File;
        adddress: string;
        disruption_id: string;
        city_id: string;
    };

    const validatedFields = CreatePostSchema.safeParse({
        ...data,
        disruption_id: +data.disruption_id,
        city_id: +data.city_id,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
            message: "Invalid fields. New post was not created.",
        };
    }

    const {city_id, address, disruption_id, message, image} = validatedFields.data;

    const supabase = createClient();

    const user = await getUser();

    let image_url: string = "";

    if (image.size > 0) {
        const time = Date.now();

        const {data: uploadData} = await supabase.storage
            .from("posts")
            .upload(`${user?.id}/posts/${time}_${image.name}`, image);

        image_url = uploadData?.path
            ? `https://loywoviwfotlcofcfoiu.supabase.co/storage/v1/object/public/posts/${uploadData?.path}`
            : "";
    }

    await supabase.from("posts").insert({
        user_id: user?.id,
        ...(image_url && {image_url}),
        address,
        disruption_id,
        city_id,
        message,
    });

    revalidatePath("/");

    return {
        message: Date.now().toString(),
        success: true,
        errors: {},
    };
};

export interface CreatePostState {
    errors?: {
        message?: string[];
        image?: string[];
        disruption_id?: string[];
        city_id?: string[];
    };
    message?: string;
    success?: boolean;
}

const CreatePostSchema = z.object({
    message: z.string().min(1, "Message is required."),
    address: z.string().min(1, "Address is required."),
    city_id: z.number().min(1, "City is required"),
    disruption_id: z.number().min(1, "Disruption is required"),
    image: z.instanceof(File),
});
