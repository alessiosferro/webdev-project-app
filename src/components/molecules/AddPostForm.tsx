"use client";

import TextareaControl from "@/components/molecules/TextareaControl";
import { Button, Flex } from "@chakra-ui/react";
import { colorScheme } from "@/utils/chakra/theme";
import SelectControl from "@/components/molecules/SelectControl";
import InputFilePreview from "@/components/molecules/InputFilePreview";
import { useEffect, useRef, useState } from "react";
import { SelectOption } from "@/model/types";
import { useTranslations } from "next-intl";
import useValidationRules from "@/hooks/use-validation-rules";
import { useFormState } from "react-dom";
import { createPost } from "@/utils/actions";
import { FormProvider, useForm } from "react-hook-form";

const AddPostForm = (props: AddPostFormProps) => {
  const { cities, disruptions } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations("common");

  const [createPostState, createPostAction] = useFormState(createPost, {
    message: "",
    errors: {},
  });

  const { message } = createPostState;

  const fileListState = useState<FileList | null>(null);
  const [, setFileList] = fileListState;

  const { requiredField } = useValidationRules();

  const form = useForm({
    defaultValues: {
      disruption_id: "",
      city_id: "",
      message: "",
      image: null,
    },
  });

  useEffect(() => {
    form.reset();

    setFileList(null);

    if (!inputRef.current) return;
    inputRef.current.value = "";
  }, [message]);

  return (
    <FormProvider {...form}>
      <Flex
        as="form"
        action={createPostAction}
        gap="2rem"
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

        <Flex gap="1rem" width="100%">
          <SelectControl
            label={t("label.city")}
            rules={requiredField}
            options={cities}
            name="city_id"
          />

          <SelectControl
            label={t("label.disruption")}
            rules={requiredField}
            options={disruptions}
            translateKey="disruption"
            name="disruption_id"
          />
        </Flex>

        <InputFilePreview
          label={t("label.uploadPhoto")}
          ref={inputRef}
          fileListState={fileListState}
          name="image"
        />

        <Flex gap="1rem" w="100%">
          <Button
            flex={1}
            type="reset"
            colorScheme={colorScheme}
            variant="outline"
          >
            {t("button.reset")}
          </Button>

          <Button
            flex={1}
            type="submit"
            colorScheme={colorScheme}
            variant="solid"
          >
            {t("button.addNewPost")}
          </Button>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

export default AddPostForm;

export interface AddPostFormProps {
  cities: SelectOption[];
  disruptions: SelectOption[];
}
