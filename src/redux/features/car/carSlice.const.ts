import { TFilterState, TInitialState } from "./carSlice.type";

export const initalFilter: TFilterState = {
  brand: "",
  model: "",
  minPrice: 0,
  maxPrice: 0,
  year: "",
  category: "",
  condition: "",
  inStock: "",
};

export const initialState: TInitialState = {
  ...initalFilter,
  searchTerm: "",
  sort: "",
  page: 1,
  limit: "",
};
