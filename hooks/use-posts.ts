import {useQuery} from "@tanstack/react-query";
import Post from "@/model/post.model";
import {axiosClient} from "@/pages/_app";
import ApiResponse from "@/model/api-response.model";

const usePosts = (initialData: Post[]) => {
    return useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: () => axiosClient.get<ApiResponse<Post[]>>('posts').then(res => res.data.data),
        initialData,
        staleTime: 60000
    });
}

export default usePosts;