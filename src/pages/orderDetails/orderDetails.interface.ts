export type TOrderStatus =
  | "Pending"
  | "Paid"
  | "Cash on Delivery"
  | "Completed"
  | "Cancelled";
export type TTrackingStatus =
  | "Processing"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Order Placed";

export type TOrderStatusColor = {
  Pending: string;
  Paid: string;
  Completed: string;
  Cancelled: string;
};
export type TTrackingStatusColor = {
  Processing: string;
  "Order Placed": string;
  Shipped: string;
  "Out for Delivery": string;
  Delivered: string;
};

export type TUSerInfo = {
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  profileImage: string;
  email: string;
  phoneNumber: string;
  currentAddress: string;
  gender: string;
  homeTown: string;
  id: string;
};

export type TCarInfoSection = {
  _id: string;
  carBrandLogo: string;
  image: string;
  brand: string;
  category: string;
  model: string;
  year: string;
  price: number;
  condition: string;
  seatingCapacity: number;
};

export type TOrderInfoProps = {
  _id: string;
  orderID: string;
  bank_status: string;
  date_time: string;
  sp_code: string;
  sp_message: string;
  transactionStatus: string;
  status: string;
  quantity: number;
  deliveryMethod: string;
  location?: string;
  nearestDealer?: string;
  estimatedDeliveryTime: string;
  phoneNumber: string;
  paymentMethod: string;
  paymentOption?: string;
  deliveryCost: number;
  totalPrice: number;
};

export type TTrackingInfoProps = {
  trackingID: string;
  trackingStatus: string;
  isTracking: boolean;
  _id: string;
};
