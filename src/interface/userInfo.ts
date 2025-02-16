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
