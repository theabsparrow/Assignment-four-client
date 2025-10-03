import { TUSerRole } from "@/interface/userInterface/userInfo";

export type TAuthUser = {
  userId: string;
  userRole: TUSerRole;
  iat: number;
  exp: number;
};

export type TAuthState = {
  user: null | TAuthUser;
  token: null | string;
};
