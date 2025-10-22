import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { serviceHistoryInitialState } from "./carSlice.const";
import { RootState } from "@/redux/store";

const serviceHistorySlice = createSlice({
  name: "serviceHistory",
  initialState: serviceHistoryInitialState,
  reducers: {
    setServiceDate: (state, action: PayloadAction<Partial<string>>) => {
      state.serviceDate = action.payload;
    },
    setServiceCenter: (state, action: PayloadAction<Partial<string>>) => {
      state.serviceCenter = action.payload;
    },
    setServiceDetails: (state, action: PayloadAction<Partial<string>>) => {
      state.serviceDetails = action.payload;
    },
    setCost: (state, action: PayloadAction<Partial<number>>) => {
      state.cost = action.payload;
    },
    setMilageAtService: (state, action: PayloadAction<Partial<string>>) => {
      state.mileageAtService = action.payload;
    },

    resetServiceHistory: () => serviceHistoryInitialState,
  },
});

export const {
  setServiceDate,
  setServiceCenter,
  setServiceDetails,
  setCost,
  setMilageAtService,
  resetServiceHistory,
} = serviceHistorySlice.actions;

export default serviceHistorySlice.reducer;
export const currentServiceHistoryInfo = (state: RootState) =>
  state.serviceHistory;
