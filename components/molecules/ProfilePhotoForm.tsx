'use client';

import FileUpload from "@/components/atoms/FileUpload";
import {Box, Button} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {User} from "@supabase/gotrue-js";
import {useRef} from "react";
import uploadProfileImage from "@/app/[locale]/profile/actions";

const ProfilePhotoForm = ({user}: ProfilePhotoFormProps) => {
    const t = useTranslations('common');

    const inputRef = useRef<HTMLInputElement>(null);

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Box border=".1rem solid"
             borderColor="gray.300"
             borderRadius=".4rem"
             position="relative"
             maxW="30rem">
            <form ref={formRef} action={uploadProfileImage}>
                <FileUpload accept="image/*"
                            onFileChange={() => formRef.current?.submit()}
                            inputRef={inputRef}/>
            </form>

            <Button colorScheme="teal"
                    position="absolute"
                    top="1rem"
                    left="1rem"
                    alignItems="center"
                    gap=".4rem"
                    variant="ghost"
                    onClick={() => inputRef.current?.click()}
                    leftIcon={<AddIcon fontSize="1.4rem"/>}>
                {t('button.uploadPhoto')}
            </Button>

            <Image width={300}
                   height={400}
                   src={`https://loywoviwfotlcofcfoiu.supabase.co/storage/v1/object/public/profile-pictures/${user.id}/profile-image.jpg`}
                   alt="placeholder image"/>
        </Box>
    )
}

interface ProfilePhotoFormProps {
    user: User;
}

export default ProfilePhotoForm;