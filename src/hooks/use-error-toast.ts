import {useToast} from "@chakra-ui/react";
import {useTranslations} from "next-intl";
import {useCallback} from "react";

interface ErrorToastProps {
    title?: string;
    message?: unknown;
}

const useErrorToast = () => {
    const toast = useToast();
    const t = useTranslations('common');

    return useCallback(({title = t('error.noun'), message = t('error.generic')}: ErrorToastProps) => {
        toast({
            title: title,
            description: message as string,
            status: 'error'
        });
    }, [t]);
}

export default useErrorToast;