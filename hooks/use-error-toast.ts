import {useToast} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";
import {useCallback} from "react";

interface ErrorToastProps {
    title?: string;
    message?: unknown;
}

const useErrorToast = () => {
    const toast = useToast();
    const {t} = useTranslation();

    return useCallback(({title = t('error.noun'), message = t('error.generic')}: ErrorToastProps) => {
        toast({
            title: title,
            description: message as string,
            status: 'error'
        });
    }, [t]);
}

export default useErrorToast;