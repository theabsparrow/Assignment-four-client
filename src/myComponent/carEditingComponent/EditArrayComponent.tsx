import { TFeature } from "@/interface/carInterface/safetyFeature.interface";
import {
  resetSafetyFeature,
  setAddFeature,
  setremoveFeature,
} from "@/redux/features/car/safetyFeatureSlice";
import { useAppDispatch } from "@/redux/hooks";
import { ReactNode, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

export type TArrayEditProps<T> = {
  label: string;
  value: T[];
  valueOptions: T[];
  handleSubmit: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<any>;
};

const EditArrayComponent = <T,>({
  label,
  value,
  valueOptions,
  handleSubmit,
}: TArrayEditProps<T>) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<T[]>([]);
  const [availableOptions, setAvailableOptions] = useState<T[]>([]);
  const options: T[] = value ?? [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSelectedOptions(options as T[]);
    setAvailableOptions(valueOptions.filter((item) => !options.includes(item)));
  }, [value, valueOptions]);

  const handleRemove = (item: T) => {
    setSelectedOptions(selectedOptions.filter((a) => a !== item));
    setAvailableOptions([...availableOptions, item]);
    dispatch(setremoveFeature(item as TFeature));
  };

  const handleAdd = (item: T) => {
    setSelectedOptions([...selectedOptions, item]);
    setAvailableOptions(availableOptions.filter((a) => a !== item));
    dispatch(setAddFeature(item as TFeature));
  };

  return (
    <li className="flex items-end justify-between bg-gray-200 px-4 py-2 rounded-xl">
      <div className="space-y-2">
        <div className="flex items-start gap-1">
          <strong>{label}:</strong>{" "}
          {selectedOptions.length > 0 ? (
            <p className="flex flex-wrap gap-2 ">
              {selectedOptions.map((item, i) => (
                <span key={i}>
                  {item as ReactNode}
                  {open && (
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-red-500 hover:text-red-700 ml-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                  ,
                </span>
              ))}
            </p>
          ) : (
            <p className="text-gray-500 mt-2">None specified</p>
          )}
        </div>
        {open && availableOptions.length > 0 && (
          <div className="space-y-1">
            <select
              onChange={(e) => {
                const selected = e.target.value as T;
                if (selected) handleAdd(selected);
                e.target.selectedIndex = 0;
              }}
              className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            >
              <option value="">Add {label}</option>
              {availableOptions.map((item, i) => (
                <option key={i} value={item as string}>
                  {item as ReactNode}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-10">
              <button
                onClick={() => {
                  setOpen(false);
                  setSelectedOptions(options as T[]);
                  setAvailableOptions(
                    valueOptions!.filter((item) => !options.includes(item))
                  );
                  dispatch(resetSafetyFeature());
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
        )}
      </div>
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="text-red-600 text-lg "
        >
          <MdEdit />
        </button>
      )}
    </li>
  );
};

export default EditArrayComponent;
