import { resetBasicInfo } from "@/redux/features/car/basicInfoSlice";
import { resetEngineInfo } from "@/redux/features/car/engineInfoSlice";
import { resetRegistrationData } from "@/redux/features/car/registrationDataSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ReactNode, useState } from "react";
import { MdEdit } from "react-icons/md";

type EditComponentProps<T> = {
  label: string;
  name: keyof T;
  carData: Partial<T>;
  car: T;
  setCardata: React.Dispatch<React.SetStateAction<Partial<T> | null>>;
  handleChange: (value: string) => void;
  options: string[];
  handleSubmit: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<any>;
};

const EditComponent = <T extends { _id?: string }>({
  label,
  name,
  setCardata,
  carData,
  car,
  handleChange,
  options,
  handleSubmit,
}: EditComponentProps<T>) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <li className="flex items-end justify-between bg-gray-200 px-4 py-2 rounded-xl">
      <div>
        {open ? (
          <div className="space-y-2">
            <div className="flex flex-col ">
              <label>{label}</label>
              <select
                value={
                  (carData?.[name] as any) === true
                    ? "Yes"
                    : (carData?.[name] as any) ?? ""
                }
                onChange={(e) => {
                  const value = e.target.value;
                  handleChange(value);
                }}
                className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              >
                {options
                  .slice()
                  .sort((a, b) => a.localeCompare(b))
                  .map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
              </select>
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
          <p>
            <strong>{label}:</strong>{" "}
            {(carData?.[name] as ReactNode) === true
              ? "Yes"
              : (carData?.[name] as ReactNode) ?? ""}
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

export default EditComponent;
