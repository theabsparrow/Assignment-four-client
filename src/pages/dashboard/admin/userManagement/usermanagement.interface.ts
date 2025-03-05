type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TUserTable = {
  _id: string;
  name: TName;
  email: string;
  phoneNumber: string;
  gender: "male" | "female" | "others";
  role: "user" | "admin" | "superAdmin";
  status: "active" | "deactive";
  isDeleted?: boolean;
};
