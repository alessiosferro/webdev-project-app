import {Box, Button} from "@chakra-ui/react";
import {useTranslations} from "next-intl";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {colorScheme} from "@/utils/chakra/theme";

const LogoutButton = () => {
    const t = useTranslations('common');

    async function logout() {
        'use server';

        const supabase = createClient();

        const {error} = await supabase.auth.signOut();

        if (error) {
            redirect('/error');
        }

        revalidatePath('/login');
        redirect('/login');
    }

    return (
        <Box display="flex" alignItems="center" as="form" action={logout}>
            <Button variant="ghost"
                    type="submit"
                    colorScheme={colorScheme}>
                {t('button.logout')}
            </Button>
        </Box>
    )
}

export default LogoutButton;