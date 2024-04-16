import { Box } from "@chakra-ui/react";
import { RefObject, useEffect } from "react";

const FileUpload = (props: FileUploadProps) => {
  const { onFileChange, inputRef, accept } = props;

  useEffect(() => {
    if (!inputRef.current) return;

    const element = inputRef.current;

    const onInputChange: EventListener = (ev) => {
      const file = (ev.currentTarget as HTMLInputElement).files?.[0];

      if (!file) return;

      onFileChange(file);
    };

    element.addEventListener("change", onInputChange);

    return () => {
      element.removeEventListener("change", onInputChange);
    };
  }, []);

  return (
    <Box
      as="input"
      name="file"
      accept={accept}
      display="none"
      type="file"
      ref={inputRef}
    />
  );
};

export interface FileUploadProps {
  onFileChange: (file: File) => void;
  inputRef: RefObject<HTMLInputElement>;
  accept: string;
}

export default FileUpload;
