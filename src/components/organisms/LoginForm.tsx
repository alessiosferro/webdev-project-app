"use client";

import {useTranslations} from "next-intl";
import {useFormState} from "react-dom";
import {login, signup} from "@/app/[locale]/login/actions";
import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import InputControl from "@/components/molecules/InputControl";
import {FormProvider, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import useValidationRules from "@/hooks/use-validation-rules";
import {colorScheme} from "@/utils/chakra/theme";
import GoogleLoginButton from "@/components/atoms/GoogleLoginButton";

export default function LoginForm() {
  const t = useTranslations("common");

  const form = useForm({defaultValues, mode: "onBlur"});

  const [registerState, signupAction] = useFormState(signup, {
    message: "",
    errors: {},
  });
  const [loginState, loginAction] = useFormState(login, {
    message: "",
    errors: {},
  });

  const {requiredField} = useValidationRules();

  const [errorMessage, setErrorMessage] = useState("");

  function updateFormErrors(errors: Record<string, string[]>) {
    form.clearErrors();

    if (!Object.keys(errors).length) return;

    const emailError = errors?.email;
    const passwordError = errors?.password;

    if (emailError) {
      form.setError(
        "email",
        {message: emailError.join(", ")},
        {shouldFocus: true},
      );
    }

    if (passwordError) {
      form.setError(
        "password",
        {message: passwordError.join(", ")},
        {shouldFocus: !emailError},
      );
    }
  }

  useEffect(() => {
    setErrorMessage(loginState?.message);
    updateFormErrors(loginState?.errors);
  }, [loginState]);

  useEffect(() => {
    setErrorMessage(registerState?.message);
    updateFormErrors(registerState?.errors);
  }, [registerState]);

  return (
    <FormProvider {...form}>
      <Box mt={{base: 0, md: "4rem"}} as="form">
        <Heading mb="2rem" as="h1" size="2xl">{t('login.title')}</Heading>
        <Text mb="3rem">{t('login.description')}</Text>

        <GoogleLoginButton/>

        <Flex mt="10rem" mb="3rem" direction="column" gap="2rem">
          <InputControl
            label={t("label.email")}
            rules={requiredField}
            type="email"
            name="email"
            placeholder={t("placeholder.email")}
          />

          <InputControl
            label={t("label.password")}
            rules={requiredField}
            name="password"
            type="password"
            placeholder={t("placeholder.password")}
          />
        </Flex>

        <Flex direction={{base: "column", md: "row"}} gap="2rem">
          <Button
            flex={1}
            variant="solid"
            p="1rem"
            type="submit"
            colorScheme={colorScheme}
            formAction={loginAction}
          >
            {t("button.login")}
          </Button>

          <Button
            flex={1}
            variant="outline"
            p="1rem"
            type="submit"
            colorScheme={colorScheme}
            formAction={signupAction}
          >
            {t("button.register")}
          </Button>
        </Flex>

        {errorMessage && (
          <Text mt="2rem" color="red.500">
            Error: {errorMessage.toLowerCase()}
          </Text>
        )}
      </Box>
    </FormProvider>
  );
}

const defaultValues = {
  email: "",
  password: "",
};
