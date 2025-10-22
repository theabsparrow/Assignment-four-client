import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { safetyFeatureInitialState } from "./carSlice.const";
import { RootState } from "@/redux/store";
import {
  TAirbags,
  TFeature,
  TSafetyRating,
  TWarranty,
} from "@/interface/carInterface/safetyFeature.interface";

const safetyFeatureSlice = createSlice({
  name: "safetyFeature",
  initialState: safetyFeatureInitialState,
  reducers: {
    setAddFeature: (state, action: PayloadAction<Partial<TFeature>>) => {
      state.addFeatures?.push(action.payload);
    },
    setremoveFeature: (state, action: PayloadAction<Partial<TFeature>>) => {
      state.removeFeatures?.push(action.payload);
    },
    setSafetyRating: (state, action: PayloadAction<Partial<TSafetyRating>>) => {
      state.safetyRating = action.payload;
    },
    setAirBags: (state, action: PayloadAction<Partial<TAirbags>>) => {
      if (!state?.features?.includes("Air Bags")) return;
      state.airbags = action.payload;
    },
    setWarrenty: (state, action: PayloadAction<Partial<TWarranty>>) => {
      state.warranty = action.payload;
    },
    resetSafetyFeature: () => safetyFeatureInitialState,
  },
});

export const {
  setAddFeature,
  setremoveFeature,
  setSafetyRating,
  setAirBags,
  setWarrenty,
  resetSafetyFeature,
} = safetyFeatureSlice.actions;

export default safetyFeatureSlice.reducer;
export const currentSafetyFeature = (state: RootState) => state.safetyFeature;
