import {getTranslations} from "next-intl/server";
import {LocaleParams} from "@/model/locale-params.props";
import ClientFormProvider from "@/components/providers/ClientFormProvider";
import {Box} from "@chakra-ui/react";
import PostList from "@/components/molecules/PostList";
import getPosts from "@/utils/supabase/posts";
import getUser from "@/utils/supabase/user";
import AddPostFormServer from "@/components/molecules/AddPostFormServer";

export default async function Home() {
    await getUser();

    const posts = await getPosts();

    return (
        <ClientFormProvider defaultValues={defaultValues}>
            <AddPostFormServer/>

            <Box mt="3rem">
                <PostList posts={posts}/>
            </Box>
        </ClientFormProvider>
    )
}

const defaultValues = {
    disruption: "",
    city: "",
    message: "",
    image: null
}

export async function generateMetadata({params: {locale}}: LocaleParams) {
    const t = await getTranslations({locale, namespace: 'common'});

    return {
        title: t('seo.dashboard')
    }
}
