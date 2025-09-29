import { USER_ROLE } from "@/config/role.const";

export type TUserInfo = {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email: string;
  phoneNumber: string;
  gender: "male" | "female" | "others";
  dateOfBirth: string;
  password: string;
  profileImage?: string;
};

export type TUSerRole = keyof typeof USER_ROLE;
