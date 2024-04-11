'use client';

import {
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {useTranslations} from "next-intl";
import {Link, usePathname, useRouter} from "@/navigation";
import {AppUser} from "@/model/user-profile.model";
import UserProfileButton from "@/components/atoms/UserProfileButton";
import {FiHome, FiLogOut, FiPlus, FiUser} from "react-icons/fi";
import {createClient} from "@/utils/supabase/client";
import {colorScheme} from "@/utils/chakra/theme";
import {ReactNode} from "react";

export default function HeaderContent({user, addPostForm}: HeaderContentProps) {
    const t = useTranslations('common');
    const logoutMessage = t('button.logout');
    const {push, refresh} = useRouter();
    const pathname = usePathname();
    const isHome = pathname === '/';
    const {isOpen: isPostModalOpen, onOpen: openPostModal, onClose: closePostModal} = useDisclosure();

    const handleLogout = async () => {
        const supabase = createClient();

        await supabase.auth.signOut();

        push('/');
        refresh();
    }

    return (
        <>
            <Flex
                key={user?.id}
                justify="space-between"
                as="header">
                <Flex gap="1rem">
                    <IconButton icon={<FiPlus/>}
                                variant="solid"
                                borderRadius="full"
                                onClick={openPostModal}
                                colorScheme={colorScheme}
                                aria-label="New post"
                    />

                    {!isHome && <IconButton
                        variant="ghost"
                        aria-label="Home"
                        fontSize="2rem"
                        as={Link}
                        href="/"
                        colorScheme={colorScheme}
                        icon={<FiHome/>}
                    />}
                </Flex>

                {user &&

                    <Menu>
                        <MenuButton>
                            <UserProfileButton showFullName={false} user={user}/>
                        </MenuButton>

                        <MenuList>
                            <MenuItem icon={<FiUser/>}
                                      href="/profile"
                                      as={Link}>
                                {t('button.yourProfile')}
                            </MenuItem>

                            <MenuItem onClick={handleLogout} icon={<FiLogOut fontSize="1.6rem"/>} color="red.500">
                                {t('button.logout')}
                            </MenuItem>
                        </MenuList>
                    </Menu>
                }
            </Flex>

            <Modal isOpen={isPostModalOpen} onClose={closePostModal}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Aggiungi nuovo post</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody onSubmit={() => closePostModal()}>
                        {addPostForm}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

interface HeaderContentProps {
    user: AppUser | null;
    addPostForm: ReactNode;
}