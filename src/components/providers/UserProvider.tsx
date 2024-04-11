import {ReactNode} from "react";
import {AppUser} from "@/model/user-profile.model";
import getUser from "@/utils/supabase/user";

export default async function UserProvider({children}: { children: (user: AppUser | null) => ReactNode }) {
    const user = await getUser(true);

    return (
        <>{children(user)}</>
    )
}