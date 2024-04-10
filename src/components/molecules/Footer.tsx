'use client';

import {Button, Container} from "@chakra-ui/react";
import {useTranslations} from "next-intl";
import {colorScheme} from "@/utils/chakra/theme";

export default function Footer() {
    const t = useTranslations('common');

    return (
        <Container maxW="container.lg"
                   borderTop=".1rem solid"
                   borderTopColor="gray.100"
                   py="2rem"
                   textAlign="center" as="footer">
            {t('footer.copy')}
            {" "}
            <Button as="a" variant="link" colorScheme={colorScheme} href="https://www.linkedin.com/in/alessiosferro/">Alessio
                Sferro</Button>
        </Container>
    )
}
