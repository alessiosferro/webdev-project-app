import {HTMLInputTypeAttribute} from "react";
import {UseControllerProps} from "react-hook-form";

export interface CommonControlProps extends Pick<UseControllerProps, 'rules'> {
    name: string;
    label?: string;
    placeholder?: string;
    helperText?: string;
    disabled?: boolean;
    type?: HTMLInputTypeAttribute;
    labelVisuallyHidden?: boolean;
}
