'use client';

import {useTranslations} from "next-intl";
import {useFormState} from "react-dom";
import {login, signup} from "@/app/[locale]/login/actions";
import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import InputControl from "@/components/molecules/InputControl";
import {FormProvider, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import useValidationRules from "@/hooks/use-validation-rules";
import {createClient} from "@/utils/supabase/client";
import {colorScheme} from "@/utils/chakra/theme";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {useRouter} from "@/navigation";

export default function LoginForm() {
    const t = useTranslations('common');

    const form = useForm({defaultValues, mode: 'onBlur'});
    const supabase = createClient();

    const [registerState, signupAction] = useFormState(signup, {message: "", errors: {}});
    const [loginState, loginAction] = useFormState(login, {message: "", errors: {}});

    const {requiredField} = useValidationRules();

    const [errorMessage, setErrorMessage] = useState("");

    const {refresh} = useRouter();

    function updateFormErrors(errors: Record<string, string[]>) {
        form.clearErrors();

        if (!Object.keys(errors).length) return;

        const emailError = errors?.email;
        const passwordError = errors?.password;

        if (emailError) {
            form.setError('email', {message: emailError.join(', ')}, {shouldFocus: true});
        }

        if (passwordError) {
            form.setError('password', {message: passwordError.join(', ')}, {shouldFocus: !emailError});
        }
    }

    const handleLoginWithGoogle = async (response: CredentialResponse) => {
        if (!response.credential) return;

        await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: response.credential
        });

        refresh();
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
            <Box as="form">
                <Heading mb="2rem" as="h2" size="lg">Login</Heading>

                <GoogleLogin width="300px" onSuccess={handleLoginWithGoogle}/>

                <Flex direction="column" gap="1rem" my="2rem">
                    <InputControl label={t('label.email')}
                                  rules={requiredField}
                                  type="email"
                                  name="email"
                                  placeholder={t('placeholder.email')}
                    />

                    <InputControl label={t('label.password')}
                                  rules={requiredField}
                                  name="password"
                                  type="password"
                                  placeholder={t('placeholder.password')}
                    />
                </Flex>

                <Flex gap="1rem">
                    <Button variant="solid"
                            type="submit"
                            colorScheme={colorScheme}
                            formAction={signupAction}
                    >
                        {t('button.register')}
                    </Button>

                    <Button variant="outline"
                            type="submit"
                            colorScheme={colorScheme}
                            formAction={loginAction}
                    >
                        {t('button.login')}
                    </Button>
                </Flex>

                {errorMessage && <Text mt="2rem" color="red.500">Error: {errorMessage.toLowerCase()}</Text>}
            </Box>
        </FormProvider>
    )
}

const defaultValues = {
    email: "",
    password: ""
}