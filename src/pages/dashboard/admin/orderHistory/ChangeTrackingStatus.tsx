import { useState } from "react";
import { toast } from "sonner";
import {
  trackingStatus,
  trackingStatusStyles,
} from "../../user/myOrders/myOrder.const";
import { TTrackingStatus } from "../../user/myOrders/myOrder.interface";

interface ChangeTrackingStatusProps {
  value: TTrackingStatus;
  id: string;
  changeTrackingStatus: (id: string, newStatus: TTrackingStatus) => void;
}

const ChangeTrackingStatus: React.FC<ChangeTrackingStatusProps> = ({
  value,
  id,
  changeTrackingStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<TTrackingStatus>(value);
  const handleChange = (newStatus: TTrackingStatus) => {
    setStatus(newStatus);
    if (newStatus === value) {
      return toast.error(`status is already ${newStatus}`);
    }
    changeTrackingStatus(id, newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <span
        onClick={() => {
          if (!["Cancelled", "Delivered"].includes(value)) {
            setIsOpen(!isOpen);
          }
        }}
        className={`px-2 py-1 rounded font-medium text-sm ${
          value === "Cancelled" || value === "Delivered"
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer"
        } ${trackingStatusStyles[value]}`}
      >
        {value as TTrackingStatus}
      </span>
      {((isOpen && value !== "Cancelled") ||
        (isOpen && value !== "Delivered")) && (
        <div className="absolute z-50 mt-1 bg-white shadow-lg border rounded w-36 ">
          {trackingStatus.map((item) => (
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

export default ChangeTrackingStatus;
