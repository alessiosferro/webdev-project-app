import {createClient} from "@/utils/supabase/server";
import {redirect} from "@/navigation";
import {User} from "@supabase/gotrue-js";

export default async function getUser() {
    const supabase = createClient();

    const {data, error} = await supabase.auth.getUser();

    if (!data || error) {
        redirect('/login');
    }

    return data.user as User;
}

