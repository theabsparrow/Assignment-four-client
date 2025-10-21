import { TCarDataInfo } from "@/interface/carInterface/car.interface";
import {
  currentBasicInfo,
  resetBasicInfo,
} from "@/redux/features/car/basicInfoSlice";
import { useUpdateCarMutation } from "@/redux/features/car/carApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ReactNode, useState } from "react";
import { MdEdit } from "react-icons/md";
import { toast } from "sonner";

type EditComponentProps = {
  label: string;
  name: string;
  carData: Partial<TCarDataInfo>;
  car: TCarDataInfo;
  setCardata: React.Dispatch<
    React.SetStateAction<Partial<TCarDataInfo> | null>
  >;
  handleChange: (value: string) => void;
  options: string[];
};

const EditComponent = ({
  label,
  name,
  setCardata,
  carData,
  car,
  handleChange,
  options,
}: EditComponentProps) => {
  const [open, setOpen] = useState(false);
  const basicInfo = useAppSelector(currentBasicInfo);
  const dispatch = useAppDispatch();
  const [updateCar] = useUpdateCarMutation();

  const handleSubmit = async () => {
    if (!basicInfo || Object.keys(basicInfo).length === 0) {
      return toast.error("nothing to update", { duration: 3000 });
    }
    const toastId = toast.loading("updating basic info....");
    const payload = { id: car?._id, basicInfo };
    try {
      const res = await updateCar(payload).unwrap();
      if (res?.data) {
        toast.success("successfully updated basic info", {
          id: toastId,
          duration: 3000,
        });
        setOpen(false);
        dispatch(resetBasicInfo());
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
      dispatch(resetBasicInfo());
    }
  };

  return (
    <li className="flex items-end justify-between bg-gray-200 px-4 py-2 rounded-xl">
      <div>
        {open ? (
          <div className="space-y-2">
            <div className="flex flex-col ">
              <label>{label}</label>
              <select
                value={
                  name === "negotiable" || name === "inStock"
                    ? carData?.[name as keyof TCarDataInfo]
                      ? "Yes"
                      : "No"
                    : (carData?.[name as keyof TCarDataInfo] as string) ?? ""
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
                }}
                className="text-secondary font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="text-secondary font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p>
            <strong>{label}:</strong>{" "}
            {car[name as keyof TCarDataInfo] as ReactNode}
          </p>
        )}
      </div>
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
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

export default EditComponent;
