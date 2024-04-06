import {Container} from "@chakra-ui/react";
import {createClient} from "@/utils/supabase/server";
import HeaderContent from "@/components/molecules/Header/HeaderContent";
import LogoutButton from "@/components/molecules/LogoutButton";

export default async function Header() {
    const supabase = createClient();

    const {data: {user}} = await supabase.auth.getUser();

    return (
        <Container maxW="container.lg"
                   py="2rem"
                   px={0}
                   borderBottom=".1rem solid"
                   borderBottomColor="gray.200">
            <HeaderContent user={user}
                           logoutButton={<LogoutButton/>}
            />
        </Container>
    )
}
