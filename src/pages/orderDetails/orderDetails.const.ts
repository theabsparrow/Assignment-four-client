import { Clock, MapPin, Package, Settings, Truck } from "lucide-react";
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
  "Order Placed":
    "bg-orange-400 text-orange-900 dark:bg-orange-500 dark:text-orange-950",
  Processing: "bg-blue-400 text-blue-900 dark:bg-blue-500 dark:text-blue-950",
  Shipped:
    "bg-indigo-400 text-indigo-900 dark:bg-indigo-500 dark:text-indigo-950",
  "Out for Delivery":
    "bg-purple-400 text-purple-900 dark:bg-purple-500 dark:text-purple-950",
  Delivered:
    "bg-green-400 text-green-900 dark:bg-green-500 dark:text-green-950",
};

export const progressPercentage: Record<string, number> = {
  "Order Placed": 20,
  Processing: 40,
  Shipped: 60,
  "Out for Delivery": 80,
  Delivered: 100,
};

export const steps = [
  { status: "Order Placed", icon: Clock },
  { status: "Processing", icon: Settings },
  { status: "Shipped", icon: Truck },
  { status: "Out for Delivery", icon: MapPin },
  { status: "Delivered", icon: Package },
];
