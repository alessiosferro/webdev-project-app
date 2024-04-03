'use client';

import {Button, Flex, Text} from "@chakra-ui/react";
import {Link, locales, usePathname} from "@/navigation";
import {useTranslations} from "next-intl";

interface LocalesProps {
    showLabel?: boolean;
}

const Locales = ({showLabel}: LocalesProps) => {
    const t = useTranslations();
    const pathname = usePathname();

    return (
        <Flex gap="1rem">
            {showLabel && <Text>{t('label.changeLanguage')}:</Text>}

            <Flex gap="1rem">
                {locales.map(locale => (
                    <Button as={Link}
                            key={locale}
                            href={pathname}
                            locale={locale}
                            minW={0}
                            variant="link"
                            colorScheme='teal'
                            textTransform="uppercase"
                    >{locale}</Button>
                ))}
            </Flex>
        </Flex>
    )
}

export default Locales;