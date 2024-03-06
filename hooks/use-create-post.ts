import {DefaultError, useMutation} from "@tanstack/react-query";
import {axiosClient, queryClient} from "@/pages/_app";
import {NewPostFormValues} from "@/pages";
import useErrorToast from "@/hooks/use-error-toast";
import {useTranslation} from "next-i18next";
import {useFormContext} from "react-hook-form";
import ApiResponse from "@/model/api-response.model";
import Post from "@/model/post.model";

const useCreatePost = () => {
    const errorToast = useErrorToast();
    const {t} = useTranslation();
    const form = useFormContext();

    return useMutation<unknown, DefaultError, NewPostFormValues>({
        mutationFn: async (data) => {
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');

            const response = await axiosClient.post<ApiResponse<Post[]>>('posts', data);

            if (response.statusText !== 'OK') {
                return;
            }

            form.reset();
            return response.data.data;
        },
        onError: () => errorToast({
            title: t('error.noun'),
            message: t('error.generic')
        }),
        onSuccess: (posts) => queryClient.setQueryData(['posts'], posts)
    })
}

export default useCreatePost;