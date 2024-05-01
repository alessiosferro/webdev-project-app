import {Box, BoxProps} from "@chakra-ui/react";
import Image from "next/image";

export default function Avatar(props: AvatarProps) {
    const {src, alt, ...boxProps} = props;

    return (
        <Box borderRadius="50%" overflow="hidden" position="relative" width="5rem" height="5rem" {...boxProps}>
            <Image sizes="5rem" fill src={src} alt={alt}/>
        </Box>
    );
}

export interface AvatarProps extends BoxProps {
    src: string;
    alt: string;
}