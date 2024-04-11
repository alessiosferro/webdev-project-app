import {Container} from "@chakra-ui/react";
import HeaderContent from "@/components/molecules/Header/HeaderContent";
import getUser from "@/utils/supabase/user";
import AddPostFormServer from "@/components/molecules/AddPostFormServer";

export default async function Header() {
    const user = await getUser(true);

    return (
        <Container p={{base: '2rem 1.6rem', lg: '2rem 0'}}
                   borderBottom=".1rem solid"
                   borderBottomColor="gray.200">
            <HeaderContent addPostForm={<AddPostFormServer/>} user={user}/>
        </Container>
    )
}
