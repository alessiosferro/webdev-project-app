import {useTranslations} from "next-intl";
import useValidationRules from "@/hooks/use-validation-rules";
import Head from "next/head";
import {Button, Container, Flex, Heading} from "@chakra-ui/react";
import InputControl from "@/components/molecules/InputControl";
import ClientFormProvider from "@/components/providers/ClientFormProvider";

const defaultValues = {
    email: "",
    password: ""
}

const LoginForm = () => {
    const t = useTranslations('common');

    const {requiredField} = useValidationRules();

    return (
        <ClientFormProvider defaultValues={defaultValues}>
            <Head>
                <title>{t('seo.login')}</title>
            </Head>

            <Container as="form">
                <Heading as="h2" size="lg">Login</Heading>

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
                            colorScheme="teal">
                        {t('button.register')}
                    </Button>

                    <Button variant="outline"
                            colorScheme="teal"
                            type="submit">
                        {t('button.login')}
                    </Button>
                </Flex>
            </Container>
        </ClientFormProvider>
    )
}

export default LoginForm;