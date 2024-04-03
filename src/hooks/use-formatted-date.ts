import {useMemo} from "react";
import {getFormattedDate} from "@/utils";

const useFormattedDate = (date: string) => {
    return useMemo(() => getFormattedDate(date), [date]);
}

export default useFormattedDate;