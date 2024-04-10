import {HTMLInputTypeAttribute} from "react";
import {UseControllerProps} from "react-hook-form";

export interface CommonControlProps extends Pick<UseControllerProps, 'rules'> {
    name: string;
    label?: string;
    placeholder?: string;
    helperText?: string;
    disabled?: boolean;
    rules?: UseControllerProps['rules'];
    type?: HTMLInputTypeAttribute;
    labelVisuallyHidden?: boolean;
}
