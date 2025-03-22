export type TPaymentMethod = {
  method: string;
  isDeleted: boolean;
  _id: string;
};
export type TPaymentOption = {
  option: string;
  isDeleted: boolean;
  _id: string;
};

export type TCar = {
  image: string;
  brand: string;
  model: string;
  price: number;
  category: string;
  year: string;
  madeIn: string;
  condition: string;
};

export type TUser = {
  profileImage: string;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: string;
  email: string;
  phoneNumber: string;
  homeTown: string;
  currentAddress: string;
};

export interface OrderSummaryProps {
  selectedDeliveryMethod: string | null;
  selectedPaymentMethod: string | null;
  selectedPaymentOption?: string | null;
  userPhoneNumber: string;
  phoneNumber: string;
  useExistingNumber: boolean;
  car: any;
  deliveryIconMap: any;
  paymentIconMap: any;
  paymentOptionIconMap: any;
  location: string;
  nearestDealer: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (type: string, value: string) => void;
  setPhoneNumber: (value: string) => void;
  setUseExistingNumber: (value: boolean) => void;
  errorMessage?: string;
}

export type TOrderInfo = {
  deliveryMethod: string;
  estimatedDeliveryTime: string;
  phoneNumber: string;
  deliveryCost: number;
  paymentMethod: string;
  paymentOption: string;
  nearestDealer?: string;
  location?: string;
};
