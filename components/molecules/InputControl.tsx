'use client';

import {FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, VisuallyHidden} from "@chakra-ui/react";
import {Controller} from "react-hook-form";
import {CommonControlProps} from "@/model/common-control.props";

const InputControl = (props: CommonControlProps) => {
    const {
        labelVisuallyHidden,
        name,
        disabled,
        helperText,
        label,
        placeholder,
        rules,
        type
    } = props;

    return (
        <Controller rules={rules}
                    name={name}
                    disabled={disabled}
                    render={({field: {onChange, onBlur, name, value, disabled, ref}, fieldState: {error}}) => (
                        <FormControl isInvalid={!!error}>
                            {labelVisuallyHidden ? (
                                <VisuallyHidden>
                                    <FormLabel>{label}</FormLabel>
                                </VisuallyHidden>
                            ) : (
                                <FormLabel>{label}</FormLabel>
                            )}

                            <Input ref={ref}
                                   name={name}
                                   isDisabled={disabled}
                                   type={type}
                                   onChange={onChange}
                                   onBlur={onBlur}
                                   value={value}
                                   placeholder={placeholder}
                            />

                            {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
                            {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
                        </FormControl>
                    )}/>
    )
}

export default InputControl;