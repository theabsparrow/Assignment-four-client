import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registrationDataInitialState } from "./carSlice.const";
import { RootState } from "@/redux/store";

const registrationDataSlice = createSlice({
  name: "registrationData",
  initialState: registrationDataInitialState,
  reducers: {
    setLicense: (state, action: PayloadAction<Partial<string>>) => {
      state.licensePlate = action.payload;
    },
    setVIN: (state, action: PayloadAction<Partial<string>>) => {
      if (action.payload.length !== 17) {
        return;
      }
      state.vin = action.payload;
    },
    setRegistrationYera: (state, action: PayloadAction<Partial<string>>) => {
      state.registrationYear = action.payload;
    },
    setAuthority: (state, action: PayloadAction<Partial<string>>) => {
      state.registrationAuthority = action.payload;
    },
    setPreviousOwner: (state, action: PayloadAction<Partial<string>>) => {
      state.previousOwner = action.payload;
    },
    setPreviousAddress: (state, action: PayloadAction<Partial<string>>) => {
      state.previousOwnerAddress = action.payload;
    },
    setCountry: (state, action: PayloadAction<Partial<string>>) => {
      state.registrationCountry = action.payload;
    },
    setRoadTaxoaid: (state, action: PayloadAction<Partial<boolean>>) => {
      state.roadTaxPaid = action.payload;
    },
    resetRegistrationData: () => registrationDataInitialState,
  },
});

export const {
  setLicense,
  setVIN,
  setRegistrationYera,
  setAuthority,
  setPreviousOwner,
  setPreviousAddress,
  setCountry,
  setRoadTaxoaid,
  resetRegistrationData,
} = registrationDataSlice.actions;

export default registrationDataSlice.reducer;
export const currentRegistrationData = (state: RootState) =>
  state.registrationData;
