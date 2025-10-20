import {
  TCarBrand,
  TCategory,
  TCondition,
  TSeatingCapacity,
} from "@/interface/carInterface/car.interface";
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
  negotiable: "",
  madeIn: "",
};

export const initialState: TInitialState = {
  ...initalFilter,
  searchTerm: "",
  sort: "",
  page: 1,
  limit: "",
};

export type TCarBasicInfo = {
  brand: TCarBrand;
  model: string;
  category: TCategory;
  year: string;
  price: number;
  description: string;
  color: string;
  condition: TCondition;
  seatingCapacity: TSeatingCapacity;
  madeIn: string;
  negotiable: boolean | string;
  inStock: boolean | string;
};

export const basicInfoInitialState: Partial<TCarBasicInfo> = {};
