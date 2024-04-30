"use client";

import InputControl from "@/components/molecules/InputControl";
import UploadedImagePreview from "@/components/atoms/UploadedImagePreview";
import {Dispatch, forwardRef, SetStateAction, useEffect} from "react";
import {CommonControlProps} from "@/model/common-control.props";
import {Button, Flex} from "@chakra-ui/react";
import {FiImage} from "react-icons/fi";
import {colorScheme} from "@/utils/chakra/theme";

const InputFilePreview = forwardRef<
    HTMLInputElement,
    InputFilePreviewProps & Omit<CommonControlProps, "type">
>(function InputFilePreview({fileListState, ...inputProps}, inputRef) {
    const [fileList, setFileList] = fileListState;

    function handleFileChange(e: Event) {
        const input = e.target as HTMLInputElement;
        setFileList(input.files);
    }

    useEffect(() => {
        if (!inputRef || typeof inputRef === "function") return;

        const inputElement = inputRef.current;

        if (!inputElement) return;

        inputElement.addEventListener("change", handleFileChange);

        return () => {
            inputElement.removeEventListener("change", handleFileChange);
        };
    }, []);

    const handleButtonClick = () => {
        if (!inputRef || typeof inputRef === 'function') return;

        inputRef.current?.click();
    }

    return (
        <Flex width="100%" gap="1.5rem" align="flex-start" direction="column">
            <InputControl display="none" ref={inputRef} type="file" {...inputProps} />

            <Button aria-label="Upload a photo"
                    onClick={handleButtonClick}
                    colorScheme={colorScheme}
                    gap=".8rem"
                    p="1rem"
                    variant="ghost"
                    leftIcon={<FiImage fontSize="2rem"/>}>
                Add a photo
            </Button>

            <UploadedImagePreview fileList={fileList}/>
        </Flex>
    );
});

export interface InputFilePreviewProps {
    fileListState: [FileList | null, Dispatch<SetStateAction<FileList | null>>];
}

export default InputFilePreview;
