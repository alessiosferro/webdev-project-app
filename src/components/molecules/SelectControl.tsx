"use client";

import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { SelectOption } from "@/model/types";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import { CommonControlProps } from "@/model/common-control.props";

export default function SelectControl(props: SelectControlProps) {
  const { options, label, translateKey, rules, name } = props;

  const t = useTranslations("common");

  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormControl>
          <FormLabel>{label}</FormLabel>
          <Select {...field}>
            <option value="">{t("input.chooseAnOption")}</option>

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {translateKey
                  ? t(`${translateKey}.${option.label}`)
                  : option.label}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}

export interface SelectControlProps extends CommonControlProps {
  options: SelectOption[];
  translateKey?: string;
}
