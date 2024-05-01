import {Box, Flex, Heading, Stack, StackDivider, Text,} from "@chakra-ui/react";
import getUser from "@/utils/supabase/user";
import PostList from "@/components/molecules/PostList";
import {getTranslations} from "next-intl/server";
import {LocaleParams} from "@/model/locale-params.props";
import {getFormattedDate} from "@/utils";
import Avatar from "@/components/atoms/Avatar";

export default async function ProfilePage({
                                              params: {locale},
                                          }: LocaleParams) {
    const t = await getTranslations({locale, namespace: "common"});

    const user = await getUser();

    if (!user) return null;

    const imageUrl = user.profile?.image_url || "";

    const formattedDate = getFormattedDate(user.created_at);

    return (
        <Stack spacing="3rem" divider={<StackDivider/>}>
            <Flex direction="column" align="flex-start" gap="2rem">
                <Avatar src={imageUrl} alt="" width="10rem" height="10rem" borderRadius="0"/>

                <Heading as="h2" size="lg">
                    {user.user_metadata?.name || user.email}
                </Heading>
                <Text>
                    {t("profile.accountCreatedAt", {createdAt: formattedDate})}
                </Text>
            </Flex>

            <Box>
                <Heading as="h3" size="md" mb="2rem">
                    I tuoi post
                </Heading>

                <PostList filterByUserId user={user}/>
            </Box>
        </Stack>
    );
}
