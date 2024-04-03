'use client';

import {FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, VisuallyHidden} from "@chakra-ui/react";
import {CommonControlProps} from "@/model/common-control.props";
import {Controller} from "react-hook-form";

const InputControl = (props: CommonControlProps) => {
    const {
        labelVisuallyHidden,
        name,
        disabled,
        helperText,
        label,
        placeholder,
        type,
        rules
    } = props;

    return (
        <Controller disabled={disabled} rules={rules}
                    render={({field: {disabled, ...inputProps}, fieldState: {error}}) => (
                        <FormControl isInvalid={!!error}>
                            {labelVisuallyHidden ? (
                                <VisuallyHidden>
                                    <FormLabel>{label}</FormLabel>
                                </VisuallyHidden>
                            ) : (
                                <FormLabel>{label}</FormLabel>
                            )}

                            <Input {...inputProps}
                                   isDisabled={disabled}
                                   type={type}
                                   placeholder={placeholder}
                            />

                            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
                            {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
                        </FormControl>
                    )} name={name}>

        </Controller>
    )
}

export default InputControl;