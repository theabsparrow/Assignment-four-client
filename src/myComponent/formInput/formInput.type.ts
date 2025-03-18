/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, UseFormRegister } from "react-hook-form";
import { TValue } from "./formInput.const";

export type TFormInputProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  maxLength?: number;
  required?: boolean;
  setValue?: (name: string, value: any) => void;
  clearErrors?: (name: string) => void;
};

export type TFormPhoneInputProps = {
  label: string;
  name: string;
  control: any;
  error?: string | undefined;
  required?: boolean;
};

export type TFormSelectProps = {
  label: string;
  name: string;
  options: TValue[];
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  setValue?: (name: string, value: any) => void;
  clearErrors?: (name: string) => void;
};
