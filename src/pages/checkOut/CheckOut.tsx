import { useGetCheckoutInfoQuery } from "@/redux/features/car/carApi";
import { useParams } from "react-router-dom";
import CheckOutCar from "./CheckOutCar";
import CheckOutUser from "./CheckOutUser";
import OrderSummery from "./OrderSummery";
import CheckoutDelivery from "./CheckoutDelivery";
import { useAppSelector } from "@/redux/hooks";
import { currentDeliveryAndPayment } from "@/redux/features/checkout/checkoutSlice";

const CheckOut = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCheckoutInfoQuery(id);
  const { car, userInfo } = data?.data || {};
  const { deliveryAndPayment } = car || {};
  const currentState = useAppSelector(currentDeliveryAndPayment);

  if (isLoading) {
    return <h1>loading ...</h1>;
  }
  return (
    <section className="px-1 md:px-8 lg:px-16 pb-4 mx-auto bg-gray-50 dark:bg-gray-900 shadow-lg rounded-lg min-h-[calc(100vh-80px)] font-inter">
      {/* car and user information */}
      <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row items-center justify-between py-4">
        <CheckOutCar car={car} />
        <CheckOutUser user={userInfo} />
      </div>

      {/* Order Details */}
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <CheckoutDelivery deliveryAndPayment={deliveryAndPayment} />

        {(currentState.paymentMethods || currentState.paymentOptions) && (
          <OrderSummery car={car} user={userInfo} />
        )}
      </div>
    </section>
  );
};

export default CheckOut;
