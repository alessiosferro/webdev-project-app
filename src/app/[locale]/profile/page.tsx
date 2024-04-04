import {Box, Container, Flex, Heading, Stack, StackDivider, Text} from "@chakra-ui/react";
import getUser from "@/utils/supabase/user";
import getPosts from "@/utils/supabase/posts";
import PostList from "@/components/molecules/PostList";
import {getTranslations} from "next-intl/server";
import {LocaleParams} from "@/model/locale-params.props";
import ProfilePhotoForm from "@/components/molecules/ProfilePhotoForm";
import {getFormattedDate} from "@/utils";

export default async function ProfilePage({params: {locale}}: LocaleParams) {
    const t = await getTranslations({locale, namespace: 'common'});

    const user = await getUser();

    const posts = await getPosts();

    const formattedDate = getFormattedDate(user.created_at);

    return (
        <Container>
            <Stack spacing="3rem" divider={<StackDivider/>}>
                <Flex direction="column" align="flex-start" gap="2rem">
                    <ProfilePhotoForm avatarUrl={user.user_metadata?.avatar_url}/>
                    <Heading as="h2" size="lg">{user.user_metadata?.name || user.email}</Heading>
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