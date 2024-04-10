import {createClient} from "@/utils/supabase/server";
import mapToOptions from "@/utils/mapToOptions";
import AddPostForm from "@/components/molecules/AddPostForm";

export default async function AddPostFormServer() {
    const client = createClient();

    const citiesResponse = await client.from('cities').select('*');
    const disruptionsResponse = await client.from('disruptions').select('*');

    const cities = mapToOptions(citiesResponse.data);
    const disruptions = mapToOptions(disruptionsResponse.data);

    return (
        <AddPostForm cities={cities}
                     disruptions={disruptions}/>
    );
}
