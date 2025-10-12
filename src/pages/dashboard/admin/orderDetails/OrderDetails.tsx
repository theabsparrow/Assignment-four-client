import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  console.log(id);
  return <div>this is order details</div>;
};

export default OrderDetails;
