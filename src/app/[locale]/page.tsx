import {getTranslations} from "next-intl/server";
import {LocaleParams} from "@/model/locale-params.props";
import ClientFormProvider from "@/components/providers/ClientFormProvider";
import {Box, Container} from "@chakra-ui/react";
import PostList from "@/components/molecules/PostList";
import getPosts from "@/utils/supabase/posts";
import getUser from "@/utils/supabase/user";
import AddPostForm from "@/components/molecules/AddPostForm";
import {createPost} from "@/utils/actions";

export default async function Home() {
    await getUser();

    const posts = await getPosts();

    return (
        <ClientFormProvider defaultValues={defaultValues}>
            <Container>
                <AddPostForm ctaLabel="Posta" action={createPost}/>

                <Box mt="3rem">
                    <PostList posts={posts}/>
                </Box>
            </Container>
        </ClientFormProvider>
    )
}

const defaultValues = {
    message: ""
}

export async function generateMetadata({params: {locale}}: LocaleParams) {
    const t = await getTranslations({locale, namespace: 'common'});

    return {
        title: t('seo.dashboard')
    }
}
