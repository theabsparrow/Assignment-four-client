import { currentFilter, setFilter } from "@/redux/features/car/carSlice";
import { TInitialState } from "@/redux/features/car/carSlice.type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";

type TSelectComponentProps<T> = {
  valueOptions: T[];
  label: string;
};

const SelectComponent = <T,>({
  valueOptions,
  label,
}: TSelectComponentProps<T>) => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(currentFilter);

  return (
    <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-2 lg:p-3">
      <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
        {" "}
        {label} :
      </h1>
      <select
        disabled={label === "model" && !query.brand}
        value={query[label as keyof TInitialState]}
        onChange={(e) => {
          const value = e.target.value;
          dispatch(setFilter({ [label]: value }));
          if (label === "brand") {
            dispatch(setFilter({ model: "" }));
          }
        }}
        className="px-5 rounded outline-none bg-transparent font-bold"
      >
        <option value="">
          {label === "model"
            ? query.brand
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
