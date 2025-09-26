import { TInitialState } from "@/pages/allCars/allCars.types";
import { ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type TSelectComponentProps<T> = {
  valueOptions: T[];
  setFilter: React.Dispatch<React.SetStateAction<TInitialState>>;
  label: string;
  filter: TInitialState;
};

const SelectComponent = <T,>({
  valueOptions,
  setFilter,
  label,
  filter,
}: TSelectComponentProps<T>) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-2 lg:p-3">
      <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
        {" "}
        {label} :
      </h1>
      <select
        disabled={label === "model" && !filter.brand}
        value={filter[label as keyof TInitialState]}
        onChange={(e) => {
          const value = e.target.value;
          setFilter((prev) => ({ ...prev, [label]: value }));
          if (label === "brand") {
            setFilter((prev) => ({ ...prev, model: "" }));
          }
          const params = new URLSearchParams(searchParams);
          if (value) {
            params.set(label, value);
          } else {
            params.delete(label);
          }

          navigate(`/all-cars?${params.toString()}`);
        }}
        className="px-5 rounded outline-none bg-transparent font-bold"
      >
        <option value="">
          {label === "model"
            ? filter.brand
              ? `Select model`
              : "Select brand first"
            : `Select ${label}`}
        </option>
        {[...valueOptions]
          .sort((a, b) => String(a).localeCompare(String(b)))
          .map((value: T, i) => (
            <option
              key={i}
              value={value as string}
              className="dark:bg-gray-700"
            >
              {value as ReactNode}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectComponent;
