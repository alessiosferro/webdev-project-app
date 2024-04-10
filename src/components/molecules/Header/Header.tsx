import {Container} from "@chakra-ui/react";
import {createClient} from "@/utils/supabase/server";
import HeaderContent from "@/components/molecules/Header/HeaderContent";

export default async function Header() {
    const supabase = createClient();

    const {data: {user}} = await supabase.auth.getUser();

    return (
        <Container maxW="container.lg"
                   p={{base: '2rem 1.6rem', lg: '2rem 0'}}
                   borderBottom=".1rem solid"
                   borderBottomColor="gray.200">
            <HeaderContent user={user}/>
        </Container>
    )
}
