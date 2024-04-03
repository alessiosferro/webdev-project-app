'use client';

import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Grid,
    GridItem,
    Heading,
    IconButton,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import Locales from "@/components/molecules/Locales";
import {useTranslations} from "next-intl";
import {User} from "@supabase/gotrue-js";
import {ReactNode} from "react";
import {Link} from "@/navigation";

export default function HeaderContent({user, logoutButton}: HeaderContentProps) {
    const t = useTranslations('common');
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
            <Grid columnGap="1rem"
                  templateColumns={{base: 'repeat(4, 1fr)', lg: 'repeat(12, 1fr)'}}
                  as="header">
                {user && <GridItem display={{base: 'none', lg: 'flex'}} gap="2rem" gridColumn="1/4">
                    <Button as={Link} href="/" colorScheme="teal" variant="link">Home</Button>

                    <Button as={Link} href="/profile" colorScheme="teal" variant="link">
                        {t('button.yourProfile')}
                    </Button>

                    {logoutButton}
                </GridItem>}

                <GridItem gridColumn={{base: "1/4", lg: "4/-4"}}>
                    <Link href="/">
                        <Heading textAlign={{lg: 'center'}} as="h1">{t('header.title')}</Heading>
                    </Link>
                </GridItem>

                <GridItem alignItems="center"
                          justifyContent="flex-end"
                          display={{base: 'none', lg: 'flex'}}
                          gridColumn={{lg: "10/13"}}>
                    <Locales/>
                </GridItem>

                <GridItem justifySelf="flex-end" alignSelf="center" gridColumn="4/5" display={{lg: 'none'}}>
                    <IconButton colorScheme="teal"
                                variant="ghost"
                                onClick={onOpen}
                                aria-label={t('button.openSideMenu')}
                    />
                </GridItem>
            </Grid>

            <Drawer onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader display="flex" justifyContent="space-between" alignItems="center"
                                  borderBottomWidth=".1rem">
                        {t('drawer.title')}

                        <IconButton colorScheme="teal"
                                    variant="ghost"
                                    aria-label={t('button.closeSideMenu')}
                                    onClick={onClose}

                        />
                    </DrawerHeader>

                    <DrawerBody display="flex"
                                alignItems="flex-start"
                                flexDirection="column"
                                gap="1.5rem"
                                mt="1rem">
                        <Locales showLabel/>

                        {user && (
                            <>
                                <Text>{t('drawer.welcome', {email: user.email})}</Text>
                                {logoutButton}
                            </>
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

interface HeaderContentProps {
    user: User | null;
    logoutButton: ReactNode;
}