"use client";

import TextareaControl from "@/components/molecules/TextareaControl";
import {FormProvider, useForm} from "react-hook-form";
import {Flex} from "@chakra-ui/react";
import SubmitButton from "@/components/atoms/SubmitButton";
import {useEffect, useRef} from "react";
import {useFormState} from "react-dom";
import {commentPost} from "@/utils/actions";

export default function CommentForm({postId}: CommentFormProps) {
  const [state, action] = useFormState(commentPost, {message: "", status: 'pending'});

  const form = useForm({
    defaultValues: {
      comment: ""
    }
  });

  const formRef = useRef(null);

  useEffect(() => {
    if (state.status === 'success') {
      form.reset();
    }
  }, [state]);

  return (
    <FormProvider {...form}>
      <Flex ref={formRef}
            action={() => form.handleSubmit(() => action(new FormData(formRef.current!)))()}
            direction="column"
            align="flex-end"
            gap="1.5rem"
            mt="3rem"
            as="form">
        <input type="hidden" name="postId" defaultValue={postId}/>

        <TextareaControl rules={{required: 'Campo obbligatorio'}}
                         placeholder="Cosa ne pensi di questo post?"
                         label="Commenta"
                         name="comment"/>

        <SubmitButton minW="15rem"/>
      </Flex>
    </FormProvider>
  );
}

interface CommentFormProps {
  postId: number;
}