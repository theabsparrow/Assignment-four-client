type TUSerInitianState = {
  gender: string;
  role: string;
  status: string;
  isDeleted: null | boolean | string;
};

export const userInitalState: TUSerInitianState = {
  gender: "",
  role: "",
  status: "",
  isDeleted: null,
};
