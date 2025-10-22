import {
  TCarBrand,
  TCategory,
  TCondition,
  TSeatingCapacity,
} from "@/interface/carInterface/car.interface";
import { TFilterState, TInitialState } from "./carSlice.type";
import { TCarEngine } from "@/interface/carInterface/carEngine.interface";
import { TRegistrationdata } from "@/interface/carInterface/registrationData.interface";
import { TserviceHistory } from "@/interface/carInterface/serviceHistory.interface";
import { TSafetyFeature } from "@/interface/carInterface/safetyFeature.interface";

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
export interface TcarEngineInfo extends TCarEngine {
  _id: string;
}
export interface TRegistration extends TRegistrationdata {
  _id: string;
}
export interface TServiceHistoryInfo extends TserviceHistory {
  _id: string;
}
export interface TSafetyFeatureInfo extends TSafetyFeature {
  _id: string;
}
export const basicInfoInitialState: Partial<TCarBasicInfo> = {};
export const engineInfoInitialState: Partial<TcarEngineInfo> = {};
export const registrationDataInitialState: Partial<TRegistration> = {};
export const serviceHistoryInitialState: Partial<TServiceHistoryInfo> = {};
export const safetyFeatureInitialState: Partial<TSafetyFeatureInfo> = {};
