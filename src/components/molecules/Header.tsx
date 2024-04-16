"use client";

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
  useDisclosure,
} from "@chakra-ui/react";
import {useTranslations} from "next-intl";
import {Link, usePathname, useRouter} from "@/navigation";
import {AppUser} from "@/model/user-profile.model";
import UserProfileButton from "@/components/atoms/UserProfileButton";
import {FiHome, FiPlus, FiUser} from "react-icons/fi";
import {colorScheme} from "@/utils/chakra/theme";
import {ReactNode} from "react";
import LogoutButton from "@/components/atoms/LogoutButton";

export default function Header({user, addPostForm}: HeaderContentProps) {
  const t = useTranslations("common");
  const {refresh} = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const {
    isOpen: isPostModalOpen,
    onOpen: openPostModal,
    onClose: closePostModal,
  } = useDisclosure();

  if (!user) return null;

  return (
    <form>
      <Flex key={user?.id} justify="space-between" as="header">
        <Flex gap="1rem">
          <IconButton
            type="button"
            icon={<FiPlus/>}
            variant="solid"
            borderRadius="full"
            onClick={openPostModal}
            colorScheme={colorScheme}
            aria-label="New post"
          />

          {!isHome && (
            <IconButton
              type="button"
              variant="ghost"
              aria-label="Home"
              fontSize="2rem"
              as={Link}
              href="/"
              colorScheme={colorScheme}
              icon={<FiHome/>}
            />
          )}
        </Flex>

        <Menu placement="bottom-end">
          <MenuButton type="button">
            <UserProfileButton as="div" showFullName={false} user={user}/>
          </MenuButton>

          <MenuList>
            <MenuItem icon={<FiUser/>} href="/profile" as={Link}>
              {t("button.yourProfile")}
            </MenuItem>

            <LogoutButton>
              {t("button.logout")}
            </LogoutButton>
          </MenuList>
        </Menu>
      </Flex>

      <Modal isOpen={isPostModalOpen} onClose={closePostModal}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Aggiungi nuovo post</ModalHeader>
          <ModalCloseButton/>
          <ModalBody onSubmit={() => closePostModal()}>{addPostForm}</ModalBody>
        </ModalContent>
      </Modal>
    </form>
  );
}


interface HeaderContentProps {
  user: AppUser | null;
  addPostForm: ReactNode;
}
