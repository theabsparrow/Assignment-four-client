type TUser = {
  admin: string;
  user: string;
  superAdmin: string;
};

export const USER_ROLE: TUser = {
  admin: "admin",
  user: "user",
  superAdmin: "superAdmin",
} as const;
