import TextareaControl from "@/components/molecules/TextareaControl";
import {Button, Flex} from "@chakra-ui/react";
import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";
import getUser from "@/utils/supabase/user";

const AddPostForm = () => {

    const createPost = async (formData: FormData) => {
        'use server';

        const message = formData.get('message');

        const supabase = createClient();

        const user = await getUser();

        await supabase.from('posts').insert({
            user_id: user.id,
            message
        });

        revalidatePath('/');
    }

    return (
        <Flex as="form"
              action={createPost}
              gap="1rem"
              direction="column"
              alignItems="flex-end">
            <TextareaControl name="message"/>

            <Button type="submit" colorScheme="teal" variant="solid">Posta</Button>
        </Flex>
    )
}

export default AddPostForm;