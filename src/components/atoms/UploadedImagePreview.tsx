"use client";

import Image from "next/image";
import {Box, Text} from "@chakra-ui/react";

export default function UploadedImagePreview(props: UploadedImagePreviewProps) {
  const {fileList} = props;

  if (!fileList) return;

  return (
    <Box bgColor="black"
         height="30rem"
         width="100%"
         p="1rem"
         position="relative">
      {Array.from(fileList).map((file, index) => (
        <>
          <Image
            objectFit="contain"
            objectPosition="center"
            sizes="(max-width: 744px) 100vw, 50vw"
            fill
            src={URL.createObjectURL(new Blob([file]))}
            alt=""
          />

          <Box left={0} top={0} position="absolute" bgGradient="linear(to-b, transparent 70%, rgba(0,0,0,.8))"
               width="100%"
               height="100%"/>

          <Text bottom="1rem" position="absolute" zIndex={1} color="white">{file.name}</Text>
        </>
      ))}
    </Box>
  );
}

export interface UploadedImagePreviewProps {
  fileList?: FileList | null;
}
