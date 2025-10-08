import { TGender } from "@/interface/userInterface/userInfo";

type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TSettingUser = {
  name: Partial<TName>;
  email: string;
  phoneNumber: string;
  gender: TGender;
  dateOfBirth: string;
  password: string;
};
export const settingsInitialState: Partial<TSettingUser> = {};
