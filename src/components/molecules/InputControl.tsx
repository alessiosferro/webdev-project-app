"use client";

import {FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, VisuallyHidden,} from "@chakra-ui/react";
import {CommonControlProps} from "@/model/common-control.props";
import {Controller} from "react-hook-form";
import {forwardRef} from "react";

const InputControl = forwardRef<HTMLInputElement, CommonControlProps>(
    function InputControl(props, ref) {
        const {
            labelVisuallyHidden,
            name,
            disabled,
            helperText,
            label,
            placeholder,
            type,
            rules,
            accept,
            ...controlProps
        } = props;

        return (
            <Controller
                disabled={disabled}
                name={name}
                rules={rules}
                defaultValue={null}
                render={({
                             field: {ref: inputRef, value, ...fieldProps},
                             fieldState: {error},
                         }) => (
                    <FormControl {...controlProps} isInvalid={!!error}>
                        {labelVisuallyHidden ? (
                            <VisuallyHidden>
                                <FormLabel>{label}</FormLabel>
                            </VisuallyHidden>
                        ) : (
                            <FormLabel>{label}</FormLabel>
                        )}

                        <Input
                            {...fieldProps}
                            {...(type === "file"
                                ? {
                                    p: 0,
                                    border: "none",
                                }
                                : {
                                    value,
                                })}
                            accept={accept}
                            ref={(el) => {
                                inputRef(el);

                                if (!ref) return;

                                if (typeof ref !== "function") {
                                    ref.current = el;
                                    return;
                                }

                                return ref(el);
                            }}
                            isDisabled={disabled}
                            type={type}
                            placeholder={placeholder}
                        />

                        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
                        {helperText && !error && (
                            <FormHelperText>{helperText}</FormHelperText>
                        )}
                    </FormControl>
                )}
            ></Controller>
        );
    },
);

export default InputControl;
