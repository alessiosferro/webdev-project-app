import {useMemo} from "react";
import dayjs from "dayjs";

const useFormattedDate = (date: string) => {
    return useMemo(() => dayjs(date).format('DD MMM YYYY HH:mm:ss'), [date]);
}

export default useFormattedDate;