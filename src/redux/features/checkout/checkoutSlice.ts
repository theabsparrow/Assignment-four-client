import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deliveryAndPaymentInitialState } from "./checkoutSlice.const";
import {
  TDeliveryOptions,
  TPaymentMethod,
  TPaymentOptions,
} from "@/interface/carInterface/carDelivery.interface";
import { RootState } from "@/redux/store";

const deliveryAndPaymentSlice = createSlice({
  name: "deliveryAndPayment",
  initialState: deliveryAndPaymentInitialState,
  reducers: {
    setDeliveryOption: (state, action: PayloadAction<TDeliveryOptions>) => {
      state.deliveryOptions = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<TPaymentMethod>) => {
      state.paymentMethods = action.payload;
    },
    setPaymentOption: (state, action: PayloadAction<TPaymentOptions>) => {
      state.paymentOptions = action.payload;
    },
    resetDeliveryAndPayment: () => deliveryAndPaymentInitialState,
  },
});

export default deliveryAndPaymentSlice.reducer;
export const {
  setDeliveryOption,
  setPaymentMethod,
  setPaymentOption,
  resetDeliveryAndPayment,
} = deliveryAndPaymentSlice.actions;
export const currentDeliveryAndPayment = (state: RootState) =>
  state.deliveryAndPayment;
