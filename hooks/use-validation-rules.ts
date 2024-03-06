import {useMemo} from "react";
import {useTranslations} from "next-intl";

const useValidationRules = () => {
    const t = useTranslations('common');

    return useMemo(() => ({
        requiredField: {required: t('validation.required')}
    }), [t]);
}

export default useValidationRules;