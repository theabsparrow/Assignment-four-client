import { TUserFilterState, TUserInitialState } from "./userSlice.type";

export const userInitialFilter: TUserFilterState = {
  gender: "",
  status: "",
  role: "",
  verifyWithEmail: "",
};

export const initialState: TUserInitialState = {
  ...userInitialFilter,
  searchTerm: "",
  sort: "",
  page: 1,
  limit: "",
};
