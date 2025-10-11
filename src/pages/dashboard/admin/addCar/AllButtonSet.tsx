import { TcarInfoPayload } from "@/interface/carInterface/car.interface";
import { UseFormReset } from "react-hook-form";

type TAllButtonPropps = {
  onNext: () => void;
  onBack: () => void;
  handleNext: () => Promise<void>;
  handleSkip: () => void;
  reset: UseFormReset<TcarInfoPayload>;
  onRoot: () => void;
};
const AllButtonSet = ({
  onBack,
  handleNext,
  handleSkip,
  reset,
  onRoot,
}: TAllButtonPropps) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        type="button"
        onClick={onBack}
        className="bg-gray-300 px-4 py-2 rounded"
      >
        Back
      </button>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            reset();
            onRoot();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleSkip}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllButtonSet;
