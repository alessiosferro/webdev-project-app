import {Button, Container, Heading, Text} from "@chakra-ui/react";
import {Link} from "@/navigation";
import {createClient} from "@/utils/supabase/server";
import {colorScheme} from "@/utils/chakra/theme";

const NotFoundPage = async () => {
    const supabase = createClient();

    const {data, error} = await supabase.auth.getUser();

    const link = !data || error ? {
        href: '/login',
        label: 'Go to login page'
    } : {
        href: '/',
        label: 'Go to home page'
    }

    return (
        <Container mt="5rem" textAlign="center">
            <Heading size="lg">404 - Page Not Found</Heading>

            <Text mt="1rem">Sorry, we couldn&apos;t find the page you requested!</Text>

            <Link legacyBehavior passHref href={link.href}>
                <Button mt="4rem" as="a" variant="solid" colorScheme={colorScheme}>
                    {link.label}
                </Button>
            </Link>
        </Container>
    )
}

export default NotFoundPage;