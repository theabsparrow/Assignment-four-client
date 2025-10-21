import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { basicInfoInitialState } from "./carSlice.const";
import {
  TCarBrand,
  TCategory,
  TCondition,
  TSeatingCapacity,
} from "@/interface/carInterface/car.interface";
import { RootState } from "@/redux/store";

const basicInfoSlice = createSlice({
  name: "basicInfo",
  initialState: basicInfoInitialState,
  reducers: {
    setBrand: (state, action: PayloadAction<Partial<TCarBrand>>) => {
      state.brand = action.payload;
    },
    setModel: (state, action: PayloadAction<Partial<string>>) => {
      state.model = action.payload;
    },
    setCategory: (state, action: PayloadAction<Partial<TCategory>>) => {
      state.category = action.payload;
    },
    setYear: (state, action: PayloadAction<Partial<string>>) => {
      state.year = action.payload;
    },
    setPrice: (state, action: PayloadAction<Partial<number>>) => {
      state.price = action.payload;
    },
    setColor: (state, action: PayloadAction<Partial<string>>) => {
      state.color = action.payload;
    },
    setCondition: (state, action: PayloadAction<Partial<TCondition>>) => {
      state.condition = action.payload;
    },
    setDescription: (state, action: PayloadAction<Partial<string>>) => {
      state.description = action.payload;
    },
    setSeatingCapacity: (
      state,
      action: PayloadAction<Partial<TSeatingCapacity>>
    ) => {
      state.seatingCapacity = action.payload;
    },
    setMadeIn: (state, action: PayloadAction<Partial<string>>) => {
      state.madeIn = action.payload;
    },
    setNegotiable: (state, action: PayloadAction<Partial<boolean>>) => {
      state.negotiable = action.payload;
    },
    setInStock: (state, action: PayloadAction<Partial<boolean>>) => {
      state.inStock = action.payload;
    },
    resetBasicInfo: () => basicInfoInitialState,
  },
});

export const {
  setBrand,
  setModel,
  setCategory,
  setYear,
  setPrice,
  setColor,
  setCondition,
  setDescription,
  setSeatingCapacity,
  setMadeIn,
  setNegotiable,
  setInStock,

  resetBasicInfo,
} = basicInfoSlice.actions;

export default basicInfoSlice.reducer;
export const currentBasicInfo = (state: RootState) => state.basicInfo;
