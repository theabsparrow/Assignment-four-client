import { formatedDate } from "@/pages/myProfile/myProfile.utills";
import { resetBasicInfo } from "@/redux/features/car/basicInfoSlice";
import { resetEngineInfo } from "@/redux/features/car/engineInfoSlice";
import { resetRegistrationData } from "@/redux/features/car/registrationDataSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ReactNode, useState } from "react";
import { MdEdit } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";

type EditInputProps<T> = {
  label: string;
  name: keyof T;
  carData: Partial<T>;
  car: T;
  setCardata: React.Dispatch<React.SetStateAction<Partial<T> | null>>;
  handleChange: (value: string) => void;
  type?: string;
  handleSubmit: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<any>;
};

const EditInput = <T extends { _id?: string }>({
  label,
  name,
  setCardata,
  carData,
  car,
  handleChange,
  type = "text",
  handleSubmit,
}: EditInputProps<T>) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <li className="flex items-end justify-between bg-gray-200 px-4 py-2 rounded-xl">
      <div>
        {open ? (
          <div className="space-y-2">
            <div className="flex flex-col ">
              <label>{label}</label>
              <input
                type={type}
                value={carData?.[name] as any}
                onChange={(e) => {
                  const value = e.target.value;
                  handleChange(value);
                }}
                className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>

            <div className="flex items-center gap-10">
              <button
                onClick={() => {
                  setOpen(false);
                  setCardata(car);
                  dispatch(resetBasicInfo());
                  dispatch(resetEngineInfo());
                  dispatch(resetRegistrationData());
                }}
                className="text-secondary font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(setOpen)}
                className="text-secondary font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="flex items-center gap-1">
            <strong>{label}:</strong>{" "}
            {name === "serviceDate"
              ? (formatedDate(new Date(carData?.[name] as string))
                  .creationDate as string)
              : (carData?.[name] as ReactNode) || "Not yet selected"}
            {name === "topSpeed" && "km/h"} {name === "horsePower" && "hp"}{" "}
            {(name === "mileageAtService" || name === "mileage") && "km"}
            {name === "torque" && "N-m"} {name === "acceleration" && "sec"}{" "}
            {name === "cost" && <TbCurrencyTaka className="text-xl" />}
          </p>
        )}
      </div>
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            dispatch(resetBasicInfo());
            dispatch(resetEngineInfo());
            dispatch(resetRegistrationData());
          }}
          className="text-red-600 text-lg "
        >
          <MdEdit />
        </button>
      )}
    </li>
  );
};

export default EditInput;
