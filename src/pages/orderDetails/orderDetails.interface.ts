export type TOrderStatus = "Pending" | "Paid" | "Completed" | "Cancelled";
export type TTrackingStatus =
  | "Processing"
  | "Pending"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered";

export type TOrderStatusColor = {
  Pending: string;
  Paid: string;
  Completed: string;
  Cancelled: string;
};
export type TTrackingStatusColor = {
  Processing: string;
  Pending: string;
  Shipped: string;
  "Out for Delivery": string;
  Delivered: string;
};
