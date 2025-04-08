import { TOrderStatus } from "@/pages/orderDetails/orderDetails.interface";
import { useState } from "react";
import {
  orderStatus,
  orderStatusStyles,
} from "../../user/myOrders/myOrder.const";
import { toast } from "sonner";

interface ChangeOrderStatusProps {
  value: TOrderStatus;
  id: string;
  changeOrderStatus: (id: string, newStatus: TOrderStatus) => void;
}

const ChangeOrderStatus: React.FC<ChangeOrderStatusProps> = ({
  value,
  id,
  changeOrderStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<TOrderStatus>(value);

  const handleChange = (newStatus: TOrderStatus) => {
    setStatus(newStatus);
    if (newStatus === value) {
      return toast.error(`status is already ${newStatus}`);
    }
    changeOrderStatus(id, newStatus);
    setIsOpen(false);
  };
  return (
    <div className="relative">
      <span
        onClick={() => {
          if (!["Cancelled", "Completed"].includes(value)) {
            setIsOpen(!isOpen);
          }
        }}
        className={`px-2 py-1 rounded font-medium text-sm ${
          value === "Cancelled" || value === "Completed"
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer"
        } ${orderStatusStyles[value]}`}
      >
        {value as TOrderStatus}
      </span>
      {((isOpen && value !== "Cancelled") ||
        (isOpen && value !== "Completed")) && (
        <div className="absolute z-50 mt-1 bg-white shadow-lg border rounded w-36 ">
          {orderStatus.map((item) => (
            <div
              key={item}
              onClick={() => handleChange(item)}
              className={`px-3 py-1 text-sm cursor-pointer hover:bg-gray-100  ${
                item === status
                  ? "font-semibold text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeOrderStatus;
