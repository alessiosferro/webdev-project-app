import {User} from "@supabase/gotrue-js";
import {useQuery} from "@tanstack/react-query";
import {createClient} from "@/utils/supabase/component";

const useUser = (initialData: User) => {
    const supabase = createClient();

    return useQuery({
        queryKey: ['user'],
        initialData,
        queryFn: () => supabase.auth.getUser().then(res => res.data.user)
    });
}

export default useUser;