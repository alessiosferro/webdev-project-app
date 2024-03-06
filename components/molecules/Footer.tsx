import {Container} from "@chakra-ui/react";
import {useTranslations} from "next-intl";

export default function Footer() {
    const t = useTranslations('common');

    return (
        <Container maxW="container.lg"
                   borderTop=".1rem solid"
                   borderTopColor="gray.100"
                   py="2rem"
                   textAlign="center" as="footer">
            {t('footer.copy')}
        </Container>
    )
}
