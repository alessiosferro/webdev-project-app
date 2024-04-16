'use client';

import {colorScheme} from "@/utils/chakra/theme";
import {
  IconButton,
  IconButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import {ReactNode, useEffect} from "react";
import {AiOutlinePlus} from "react-icons/ai";

export default function AddPost(props: AddPostProps) {
  const {
    addPostForm,
    iconButtonProps
  } = props;

  const {
    isOpen: isPostModalOpen,
    onOpen: openPostModal,
    onClose: closePostModal,
  } = useDisclosure();

  const onCreatePost = () => closePostModal()

  useEffect(() => {
    addEventListener('createpostcomplete', onCreatePost);

    return () => {
      removeEventListener('createpostcomplete', onCreatePost);
    }
  }, []);

  return (
    <>
      <IconButton
        type="button"
        icon={<AiOutlinePlus fontSize="2rem"/>}
        variant="solid"
        borderRadius="full"
        size="lg"
        onClick={openPostModal}
        colorScheme={colorScheme}
        aria-label="New post"
        {...iconButtonProps}
      />

      <Modal size={{base: "full", md: "lg"}} isOpen={isPostModalOpen} onClose={closePostModal}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Aggiungi nuovo post</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            {addPostForm}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

interface AddPostProps {
  addPostForm: ReactNode;
  iconButtonProps?: Omit<IconButtonProps, 'aria-label'>;
}