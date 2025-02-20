import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <AiOutlineLoading3Quarters className="animate-spin text-3xl text-blue-500" />
    </div>
  );
};

export default Loader;
