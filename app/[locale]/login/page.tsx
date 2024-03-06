import {useTranslations} from "next-intl";
import useValidationRules from "@/hooks/use-validation-rules";
import ClientFormProvider from "@/components/providers/ClientFormProvider";
import Head from "next/head";
import {Button, Container, Flex, Heading} from "@chakra-ui/react";
import InputControl from "@/components/molecules/InputControl";
import {getTranslations} from "next-intl/server";
import {login, signup} from "@/app/[locale]/login/actions";

const defaultValues = {
    email: "",
    password: ""
}

export const generateMetadata = async () => {
    const {raw} = await getTranslations('common');

    return {
        title: raw('seo.login')
    }
}

export default function LoginPage() {
    const t = useTranslations('common');

    const {requiredField} = useValidationRules();

    return (
        <ClientFormProvider defaultValues={defaultValues}>
            <Head>
                <title>{t('seo.login')}</title>
            </Head>

            <Container as="form" action={login}>
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
                            formAction={signup}
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