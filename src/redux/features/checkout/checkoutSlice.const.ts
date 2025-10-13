import {
  TDeliveryOptions,
  TPaymentMethod,
  TPaymentOptions,
} from "@/interface/carInterface/carDelivery.interface";
export type TcheckoutInitialState = {
  deliveryOptions: TDeliveryOptions | "";
  paymentMethods: TPaymentMethod | "";
  paymentOptions: TPaymentOptions | "";
};
export const deliveryAndPaymentInitialState: TcheckoutInitialState = {
  deliveryOptions: "",
  paymentMethods: "",
  paymentOptions: "",
};
