import {
  FaCreditCard,
  FaHome,
  FaMoneyBillWave,
  FaShippingFast,
  FaStore,
  FaStripe,
} from "react-icons/fa";
import { RiBankCardFill } from "react-icons/ri";

export const deliveryIconMap = {
  "Home Delivery": <FaHome className="text-2xl text-green-500" />,
  Pickup: <FaStore className="text-2xl text-blue-500" />,
  "Express Delivery": <FaShippingFast className="text-2xl text-red-500" />,
};

export const paymentIconMap = {
  "Cash on Delivery": <FaMoneyBillWave className="text-3xl text-green-500" />,
  "Online Payment": <FaCreditCard className="text-2xl text-blue-500" />,
};

export const paymentOptionIconMap = {
  SSLCommerz: <FaCreditCard className="text-blue-500 text-2xl" />,
  Stripe: <FaStripe className="text-purple-500 text-2xl" />,
  SurjoPay: <RiBankCardFill className="text-green-500 text-2xl" />,
};
