import { TTrackingInfoProps } from "@/pages/orderDetails/orderDetails.interface";

export type TOrderInfo = {
  _id: string;
  transactionStatus: string;
  status: string;
  orderID: string;
  deliveryMethod: string;
  paymentMethod: string;
  paymentOption?: string;
  userEmail?: string;
  deliveryCost?: number;
  totalPrice?: number;
  tracking?: TTrackingInfoProps;
};

export type TOrderStatus = "Pending" | "Paid" | "Completed" | "Cancelled";
export type TTransactionStatus = "Success" | "Failed" | "Cancel";
export type TDeliveryMethod = "Home Delivery" | "Pickup" | "Express Delivery";
export type TPaymentMethod = "Cash on Delivery" | "Online Payment";
export type TPaymentOption = "SSLCommerz" | "Stripe" | "SurjoPay";
export type TTrackingStatus =
  | "Processing"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Order Placed";
