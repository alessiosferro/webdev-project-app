import {Box, Container, Flex, Heading, Stack, StackDivider, Text} from "@chakra-ui/react";
import getUser from "@/utils/supabase/user";
import getPosts from "@/utils/supabase/posts";
import PostList from "@/components/molecules/PostList";
import {getTranslations} from "next-intl/server";
import {LocaleParams} from "@/model/locale-params.props";
import ProfilePhotoForm from "@/components/molecules/ProfilePhotoForm";
import {getFormattedDate} from "@/utils";
import {createClient} from "@/utils/supabase/server";

export default async function ProfilePage({params: {locale}}: LocaleParams) {
    const t = await getTranslations({locale, namespace: 'common'});

    const user = await getUser();

    const posts = await getPosts();

    const formattedDate = getFormattedDate(user.created_at);

    const supabase = createClient();

    return (
        <Container>
            <Stack spacing="3rem" divider={<StackDivider/>}>
                <Flex direction="column" align="flex-start" gap="2rem">
                    <ProfilePhotoForm user={user}/>
                    <Heading as="h2" size="lg">{user.email}</Heading>
                    <Text>{t('profile.accountCreatedAt', {createdAt: formattedDate})}</Text>
                </Flex>

                <Box>
                    <Heading as="h3" size="md" mb="2rem">I tuoi post</Heading>

                    <PostList posts={posts}/>
                </Box>
            </Stack>
        </Container>
    );
}