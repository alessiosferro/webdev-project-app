import {createClient} from "@/utils/supabase/server";
import {redirect} from "@/navigation";
import {getTranslations} from "next-intl/server";
import {LocaleParams} from "@/model/locale-params.props";
import ClientFormProvider from "@/components/providers/ClientFormProvider";
import NewPostForm from "@/components/molecules/NewPostForm";
import {Box, Container} from "@chakra-ui/react";
import PostList from "@/components/molecules/PostList";
import Post from "@/model/post.model";

const defaultValues = {
    message: ""
}

export async function generateMetadata({params: {locale}}: LocaleParams) {
    const t = await getTranslations({locale, namespace: 'common'});

    return {
        title: t('seo.dashboard')
    }
}

export default async function Home() {
    const supabase = createClient();

    const {data, error} = await supabase.auth.getUser();

    if (error || !data) {
        redirect('/login');
    }

    const posts = await supabase
        .from('posts')
        .select('id, user_id, message, created_at');

    return (
        <ClientFormProvider defaultValues={defaultValues}>
            <Container>
                <NewPostForm/>

                <Box mt="3rem">
                    <PostList posts={posts.data as Post[]}/>
                </Box>
            </Container>
        </ClientFormProvider>
    )
}