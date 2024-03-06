'use client';

import {FormProvider, useForm} from "react-hook-form";
import {PropsWithChildren} from "react";

export default function ClientFormProvider(props: PropsWithChildren<ClientFormProviderProps>) {
    const {
        defaultValues,
        children
    } = props;

    const form = useForm({defaultValues});

    return (
        <FormProvider {...form}>
            {children}
        </FormProvider>
    );
}

interface ClientFormProviderProps {
    defaultValues: object;
}