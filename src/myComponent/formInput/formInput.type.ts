/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, UseFormRegister } from "react-hook-form";
import { TGender } from "./formInput.const";

export type TFormInputProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  maxLength?: number;
  required?: boolean;
  setValue?: any;
};

export type TFormPhoneInputProps = {
  label: string;
  name: string;
  control: any;
  error?: string | undefined;
};

export type TFormSelectProps = {
  label: string;
  name: string;
  options: TGender[];
  register: UseFormRegister<FieldValues>;
  required?: boolean;
};
