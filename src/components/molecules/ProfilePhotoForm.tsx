'use client';

import FileUpload from "@/components/atoms/FileUpload";
import {Box, Button, Flex} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {useRef} from "react";
import uploadProfileImage from "@/app/[locale]/profile/actions";

const ProfilePhotoForm = ({avatarUrl}: ProfilePhotoFormProps) => {
    const t = useTranslations('common');

    const inputRef = useRef<HTMLInputElement>(null);

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Flex direction="column" gap="2rem">
            <Image width={100}
                   height={100}
                   src={avatarUrl}
                   alt="placeholder image"/>

            <Box>
                <form ref={formRef} action={uploadProfileImage}>
                    <FileUpload accept="image/*"
                                onFileChange={() => formRef.current?.submit()}
                                inputRef={inputRef}/>
                </form>

                <Button colorScheme="teal"
                        alignItems="center"
                        gap=".4rem"
                        variant="outline"
                        onClick={() => inputRef.current?.click()}
                        leftIcon={<AddIcon fontSize="1.4rem"/>}>
                    {t('button.uploadPhoto')}
                </Button>
            </Box>
        </Flex>
    )
}

interface ProfilePhotoFormProps {
    avatarUrl: string;
}

export default ProfilePhotoForm;