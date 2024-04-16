"use client";

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { CommonControlProps } from "@/model/common-control.props";

const TextareaControl = (props: Omit<CommonControlProps, "type">) => {
  const {
    name,
    rules,
    label,
    disabled,
    placeholder,
    helperText,
    labelVisuallyHidden,
  } = props;

  return (
    <Controller
      rules={rules}
      name={name}
      disabled={disabled}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          {labelVisuallyHidden ? (
            <VisuallyHidden>
              <FormLabel>{label}</FormLabel>
            </VisuallyHidden>
          ) : (
            <FormLabel>{label}</FormLabel>
          )}

          <Textarea placeholder={placeholder} {...field} />

          {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
          {helperText && !error && (
            <FormHelperText>{helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default TextareaControl;
