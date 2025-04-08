import { Clock } from "lucide-react";

const FinishedCounter = () => {
  return (
    <div className="text-center py-4">
      <div className="flex justify-center items-center gap-2 text-blue-700 dark:text-blue-400 text-lg font-semibold">
        <Clock className="w-6 h-6" />
        <span>Estimated Delivery In:</span>
      </div>
      <div className="mt-2 text-gray-800 dark:text-gray-200 text-xl font-bold tracking-wide">
        <span className="inline-block min-w-[2rem]">
          {String(0).padStart(2, "0")}d
        </span>{" "}
        <span className="inline-block min-w-[2rem]">
          {String(0).padStart(2, "0")}h
        </span>{" "}
        <span className="inline-block min-w-[2rem]">
          {String(0).padStart(2, "0")}m
        </span>{" "}
        <span className="inline-block min-w-[2rem]">
          {String(0).padStart(2, "0")}s
        </span>
      </div>
    </div>
  );
};

export default FinishedCounter;
