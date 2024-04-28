"use client";

import TextareaControl from "@/components/molecules/TextareaControl";
import {Button, Flex} from "@chakra-ui/react";
import {colorScheme} from "@/utils/chakra/theme";
import SelectControl from "@/components/molecules/SelectControl";
import InputFilePreview from "@/components/molecules/InputFilePreview";
import {useEffect, useRef, useState} from "react";
import {SelectOption} from "@/model/types";
import {useTranslations} from "next-intl";
import useValidationRules from "@/hooks/use-validation-rules";
import {useFormState} from "react-dom";
import {createPost} from "@/utils/actions";
import {FormProvider, useForm} from "react-hook-form";
import InputControl from "@/components/molecules/InputControl";
import SubmitButton from "@/components/atoms/SubmitButton";

const AddPostForm = (props: AddPostFormProps) => {
  const {cities, disruptions} = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations("common");

  const formRef = useRef<HTMLFormElement | null>(null);

  const [createPostState, createPostAction] = useFormState(createPost, {
    message: "",
    errors: {},
    success: false,
  });

  const {message} = createPostState;

  const fileListState = useState<FileList | null>(null);
  const [, setFileList] = fileListState;

  const {requiredField} = useValidationRules();

  const form = useForm({
    defaultValues
  });

  useEffect(() => {
    if (!createPostState.success) {
      form.clearErrors();

      Object.entries(createPostState.errors).forEach(([name, errors]) => {
        form.setError(name as keyof typeof defaultValues, {
          message: errors.join(', '),
        });
      });

      return;
    }

    formRef.current?.dispatchEvent(new Event('createpostcomplete', {
      bubbles: true,
    }));
  }, [createPostState]);

  useEffect(() => {
    form.reset();

    setFileList(null);

    if (!inputRef.current) return;
    inputRef.current.value = "";
  }, [message]);

  return (
    <FormProvider {...form}>
      <Flex
        ref={formRef}
        as="form"
        action={createPostAction}
        gap="3rem"
        pb="2rem"
        onReset={() => setFileList(null)}
        direction="column"
        alignItems="flex-start"
      >
        <TextareaControl
          label={t("label.message")}
          rules={requiredField}
          placeholder={t("placeholder.enterMessage")}
          name="message"
        />

        <InputControl
          label={t("label.address")}
          rules={requiredField}
          placeholder={t("placeholder.enterAddress")}
          name="address"
        />

        <SelectControl
          label={t("label.disruption")}
          rules={requiredField}
          options={disruptions}
          translateKey="disruption"
          name="disruption_id"
        />

        <SelectControl
          label={t("label.city")}
          rules={requiredField}
          options={cities}
          name="city_id"
        />

        <InputFilePreview
          label={t("label.uploadPhoto")}
          ref={inputRef}
          fileListState={fileListState}
          name="image"
        />

        <Flex direction={{base: "column", md: "row"}} gap="1rem" w="100%">
          <Button
            flex={1}
            p="1rem"
            type="reset"
            colorScheme={colorScheme}
            variant="outline"
          >
            Reset
          </Button>

          <SubmitButton/>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

const defaultValues = {
  address: "",
  disruption_id: "",
  city_id: "",
  message: "",
  image: null,
};

export default AddPostForm;

export interface AddPostFormProps {
  cities: SelectOption[];
  disruptions: SelectOption[];
}
