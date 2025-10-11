import { useParams } from "react-router-dom";

const CarDetails = () => {
  const { id } = useParams();
  console.log(id);
  return <div>this is car details</div>;
};

export default CarDetails;
