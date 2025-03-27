import {
  TOrderStatusColor,
  TTrackingStatusColor,
} from "./orderDetails.interface";

export const statusColors: TOrderStatusColor = {
  Pending:
    "bg-yellow-400 text-yellow-900 dark:bg-yellow-500 dark:text-yellow-950",
  Paid: "bg-blue-400 text-blue-900 dark:bg-blue-500 dark:text-blue-950",
  Completed:
    "bg-green-400 text-green-900 dark:bg-green-500 dark:text-green-950",
  Cancelled: "bg-red-400 text-red-900 dark:bg-red-500 dark:text-red-950",
};

export const trackingstatusColors: TTrackingStatusColor = {
  Pending:
    "bg-yellow-400 text-yellow-900 dark:bg-yellow-500 dark:text-yellow-950",
  Processing: "bg-blue-400 text-blue-900 dark:bg-blue-500 dark:text-blue-950",
  Shipped:
    "bg-indigo-400 text-indigo-900 dark:bg-indigo-500 dark:text-indigo-950",
  "Out for Delivery":
    "bg-purple-400 text-purple-900 dark:bg-purple-500 dark:text-purple-950",
  Delivered:
    "bg-green-400 text-green-900 dark:bg-green-500 dark:text-green-950",
};

export const progressPercentage: Record<string, number> = {
  Pending: 10,
  Processing: 20,
  "Out for Delivery": 40,
  Shipped: 60,
  Delivered: 100,
};
