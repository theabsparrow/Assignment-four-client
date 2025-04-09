import { TOrderStatus } from "@/pages/orderDetails/orderDetails.interface";
import { TTrackingStatus } from "./myOrder.interface";

export const orderStatus: TOrderStatus[] = [
  "Pending",
  "Paid",
  "Cash on Delivery",
  "Completed",
  "Cancelled",
];

export const trackingStatus: TTrackingStatus[] = [
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Order Placed",
];

export const deliveryMethod: string[] = [
  "Home Delivery",
  "Pickup",
  "Express Delivery",
];

export const paymentMethod: string[] = ["Cash on Delivery", "Online Payment"];
export const paymentOption: string[] = ["SSLCommerz", "Stripe", "SurjoPay"];

export const deliveryMethodStyles = {
  "Home Delivery": "bg-blue-100 text-blue-800",
  Pickup: "bg-green-100 text-green-800",
  "Express Delivery": "bg-yellow-100 text-yellow-800",
};

export const paymentMethodStyles = {
  "Cash on Delivery": "bg-purple-100 text-purple-800",
  "Online Payment": "bg-pink-100 text-pink-800",
};

export const paymentOptionStyles = {
  SSLCommerz: "bg-cyan-100 text-cyan-800",
  Stripe: "bg-indigo-100 text-indigo-800",
  SurjoPay: "bg-orange-100 text-orange-800",
};

export const orderStatusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Paid: "bg-green-100 text-green-800",
  Completed: "bg-blue-100 text-blue-800",
  Cancelled: "bg-red-100 text-red-800",
  "Cash on Delivery": "bg-purple-100 text-purple-800",
};

export const transactionStatusStyles = {
  Success: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
  Cancel: "bg-gray-200 text-gray-700",
  Initiated: "bg-amber-100 text-amber-800",
};

export const trackingStatusStyles = {
  "Order Placed": "bg-gray-400 text-gray-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  "Out for Delivery": "bg-indigo-100 text-indigo-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-200 text-red-800",
};
