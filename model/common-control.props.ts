import {UseControllerProps} from "react-hook-form";
import {HTMLInputTypeAttribute} from "react";

export interface CommonControlProps extends Pick<UseControllerProps, 'rules'> {
    name: string;
    label?: string;
    placeholder?: string;
    helperText?: string;
    disabled?: boolean;
    type?: HTMLInputTypeAttribute;
    labelVisuallyHidden?: boolean;
}
