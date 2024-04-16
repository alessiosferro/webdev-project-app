"use client";

import Image from "next/image";

export default function UploadedImagePreview(props: UploadedImagePreviewProps) {
  const { fileList } = props;

  if (!fileList) return;

  return (
    <>
      {Array.from(fileList).map((file, index) => (
        <Image
          key={index}
          objectFit="cover"
          objectPosition="center"
          width={400}
          height={400}
          src={URL.createObjectURL(new Blob([file]))}
          alt=""
        />
      ))}
    </>
  );
}

export interface UploadedImagePreviewProps {
  fileList?: FileList | null;
}
