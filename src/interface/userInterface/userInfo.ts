import { USER_ROLE } from "@/config/role.const";
export type TUSerRole = keyof typeof USER_ROLE;
export type TGender = "male" | "female" | "others";
export type TUserInfo = {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email: string;
  password: string;
  phoneNumber: string;
  gender: TGender;
  dateOfBirth: string;
  profileImage?: string | File;
};
