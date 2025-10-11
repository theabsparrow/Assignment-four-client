export type TUserFilterState = {
  gender: string;
  status: string;
  role: string;
  verifyWithEmail: string;
};

export interface TUserInitialState extends TUserFilterState {
  searchTerm: string;
  sort: string;
  page: number;
  limit: "";
}
