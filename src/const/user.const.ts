import { TGender, TStatus } from "@/interface/userInterface/userInfo";
import { TValue } from "./carInfo.const";

export const gender: TGender[] = ["male", "female", "others"];
export const status: TStatus[] = ["active", "deactive"];

export const userSortingOrder: TValue[] = [
  { value: "-firstName", label: "Name (desc)" },
  { value: "-dateOfBirth", label: "Date of birth(desc)" },
  { value: "firstName", label: "Name" },
  { value: "dateOfBirth", label: "Date of birth" },
];
