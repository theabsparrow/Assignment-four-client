import { resetBasicInfo } from "@/redux/features/car/basicInfoSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

type TEditDescriptionProps<T> = {
  label: string;
  name: keyof T;
  carData: Partial<T>;
  car: T;
  setCardata: React.Dispatch<React.SetStateAction<Partial<T> | null>>;
  handleChange: (value: string) => void;
  handleSubmit: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<any>;
};

const EditDescription = <T extends { _id?: string }>({
  label,
  name,
  setCardata,
  carData,
  car,
  handleChange,
  handleSubmit,
}: TEditDescriptionProps<T>) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <li className="flex gap-6 bg-gray-200 px-4 py-2 rounded-xl">
      <div>
        {open ? (
          <div className="space-y-2">
            <div className="flex flex-col ">
              <label>{label}</label>
              <textarea
                value={(carData?.[name] as any) ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  handleChange(value);
                }}
                rows={4}
                cols={50}
                className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 resize-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setOpen(false);
                  setCardata(car);
                  dispatch(resetBasicInfo());
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
          <p className="text-gray-600 dark:text-gray-300">
            {(carData?.[name] as any) || "No description"}
          </p>
        )}
      </div>
      {!open && (
        <button
          onClick={() => {
            setOpen(false);
            dispatch(resetBasicInfo());
          }}
          className="text-red-600 text-lg "
        >
          <MdEdit />
        </button>
      )}
    </li>
  );
};

export default EditDescription;
