'use client';

import FileUpload from "@/components/atoms/FileUpload";
import {Box, Button} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {User} from "@supabase/gotrue-js";
import {useCallback, useRef} from "react";
import {createClient} from "@/utils/supabase/client";

const PhotoBox = ({user}: PhotoBoxProps) => {
    const t = useTranslations('common');

    const inputRef = useRef<HTMLInputElement>(null);

    const uploadImageHandler = useCallback(async (file: File) => {
        const supabase = createClient();

        try {
            await supabase
                .storage
                .from('profile-pictures')
                .upload(`${user.id}/profile-image.jpg`, file, {cacheControl: '3600', upsert: false});
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <Box border=".1rem solid"
             borderColor="gray.300"
             borderRadius=".4rem"
             position="relative"
             maxW="30rem">
            <FileUpload accept="image/*"
                        onFileChange={uploadImageHandler}
                        inputRef={inputRef}/>

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

interface PhotoBoxProps {
    user: User;
}

export default PhotoBox;