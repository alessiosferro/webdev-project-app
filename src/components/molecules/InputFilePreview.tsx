'use client';

import InputControl from "@/components/molecules/InputControl";
import UploadedImagePreview from "@/components/atoms/UploadedImagePreview";
import {Dispatch, forwardRef, SetStateAction, useEffect} from "react";
import {CommonControlProps} from "@/model/common-control.props";
import {Flex} from "@chakra-ui/react";

const InputFilePreview = forwardRef<HTMLInputElement, InputFilePreviewProps & Omit<CommonControlProps, 'type'>>(function InputFilePreview(props, inputRef) {

    const [fileList, setFileList] = props.fileListState;

    function handleFileChange(e: Event) {
        const input = e.target as HTMLInputElement;
        setFileList(input.files);
    }

    useEffect(() => {
        if (!inputRef || typeof inputRef === 'function') return;

        const inputElement = inputRef.current;

        if (!inputElement) return;

        inputElement.addEventListener('change', handleFileChange);

        return () => {
            inputElement.removeEventListener('change', handleFileChange);
        }
    }, []);

    return (
        <Flex width="100%" direction="column">
            <InputControl
                ref={inputRef}
                type="file"
                {...props}
            />

            <UploadedImagePreview fileList={fileList}/>
        </Flex>
    )
});

export interface InputFilePreviewProps {
    fileListState: [FileList | null, Dispatch<SetStateAction<FileList | null>>];
}

export default InputFilePreview;