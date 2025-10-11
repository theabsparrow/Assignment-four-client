import { currentFilter, setFilter } from "@/redux/features/car/carSlice";
import { TInitialState } from "@/redux/features/car/carSlice.type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";

type TSelectComponentProps<T> = {
  valueOptions: T[];
  name: string;
  label: string;
};

const CarListingSelect = <T,>({
  valueOptions,
  name,
  label,
}: TSelectComponentProps<T>) => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(currentFilter);
  return (
    <div>
      <select
        disabled={name === "model" && !query.brand}
        value={query[name as keyof TInitialState]}
        onChange={(e) => {
          const value = e.target.value;
          dispatch(setFilter({ [name]: value }));
          if (name === "brand") {
            dispatch(setFilter({ model: "" }));
          }
        }}
        className="rounded-lg outline-none font-medium bg-transparent border-2 p-2"
      >
        <option value="">
          {name === "model"
            ? query.brand
              ? ` Model`
              : "Select brand first"
            : `${label}`}
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

export default CarListingSelect;
