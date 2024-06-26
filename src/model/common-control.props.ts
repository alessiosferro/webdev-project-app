import {HTMLInputTypeAttribute} from "react";
import {UseControllerProps} from "react-hook-form";
import {FormControlProps} from "@chakra-ui/react";

export interface CommonControlProps extends Pick<UseControllerProps, "rules">, FormControlProps {
    name: string;
    label?: string;
    placeholder?: string;
    helperText?: string;
    accept?: string;
    disabled?: boolean;
    rules?: UseControllerProps["rules"];
    type?: HTMLInputTypeAttribute;
    labelVisuallyHidden?: boolean;
}
