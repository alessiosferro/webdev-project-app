import NextLink from "next/link";
import {Button, Flex, Text} from "@chakra-ui/react";
import {usePathname} from "next/navigation";
import {locales} from "@/navigation";
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
                    <NextLink passHref legacyBehavior key={locale} href={pathname} locale={locale}>
                        <Button as="a"
                                minW={0}
                                variant="link"
                                colorScheme='teal'
                                textTransform="uppercase"
                        >{locale}</Button>
                    </NextLink>
                ))}
            </Flex>
        </Flex>
    )
}

export default Locales;