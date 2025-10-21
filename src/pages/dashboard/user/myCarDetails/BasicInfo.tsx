import {
  carBrands,
  carCategories,
  conditions,
  seatingCapacies,
  years,
} from "@/const/carInfo.const";
import { countries } from "@/const/country.const";
import {
  carColors,
  TCarBrand,
  TCarDataInfo,
  TCategory,
  TCondition,
  TSeatingCapacity,
} from "@/interface/carInterface/car.interface";
import {
  currentBasicInfo,
  resetBasicInfo,
  setBrand,
  setCategory,
  setColor,
  setCondition,
  setDescription,
  setInStock,
  setMadeIn,
  setModel,
  setNegotiable,
  setPrice,
  setSeatingCapacity,
  setYear,
} from "@/redux/features/car/basicInfoSlice";
import { useUpdateCarMutation } from "@/redux/features/car/carApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { toast } from "sonner";
import EditComponent from "../../../../myComponent/carEditingComponent/EditComponent";
import EditInput from "../../../../myComponent/carEditingComponent/EditInput";
type TOpen =
  | "brand"
  | "model"
  | "category"
  | "year"
  | "condition"
  | "color"
  | "seating"
  | "madeIn"
  | "negotiable"
  | "inStock"
  | "price"
  | "description";
const BasicInfo = ({ car }: { car: TCarDataInfo }) => {
  const [carData, setCardata] = useState<Partial<TCarDataInfo> | null>(
    car ?? null
  );
  const [open, setOpen] = useState<TOpen | "">("");
  const basicInfo = useAppSelector(currentBasicInfo);
  const dispatch = useAppDispatch();
  const [updateCar] = useUpdateCarMutation();

  useEffect(() => {
    if (car) setCardata(car);
  }, [car]);

  const handleSubmit = async () => {
    if (!basicInfo || Object.keys(basicInfo).length === 0) {
      return toast.error("nothing to update", { duration: 3000 });
    }
    const toastId = toast.loading("updating basic info....");
    const payload = { id: car?._id, data: basicInfo };
    try {
      const res = await updateCar(payload).unwrap();
      if (res?.data) {
        toast.success("successfully updated basic info", {
          id: toastId,
          duration: 3000,
        });
        setOpen("");
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
    <div className="w-full p-4 space-y-4 ">
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
          Car Information
        </h2>
        <div className="flex gap-6">
          <div>
            {open === "description" ? (
              <div className="space-y-2">
                <div className="flex flex-col ">
                  <label>Description</label>
                  <textarea
                    value={carData?.description || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      dispatch(setDescription(value));
                      setCardata({ ...carData, description: value });
                    }}
                    rows={4}
                    cols={50}
                    className="peer px-2 py-1 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 resize-none"
                  />
                </div>

                <div className="flex items-center gap-10">
                  <button
                    onClick={() => {
                      setOpen("");
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
              <p className="text-gray-600 dark:text-gray-300">
                {car?.description ?? "No Description"}
              </p>
            )}
          </div>
          {open !== "description" && (
            <button
              onClick={() => {
                setOpen("description");
                dispatch(resetBasicInfo());
              }}
              className="text-red-600 text-lg "
            >
              <MdEdit />
            </button>
          )}
        </div>
      </div>
      <div className="text-gray-700 dark:text-gray-300 space-y-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-1 text-sm">
          <EditComponent
            label="Brand"
            name="brand"
            carData={carData as TCarDataInfo}
            car={car}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value as TCarBrand;
              setCardata({ ...carData, brand: newValue });
              dispatch(setBrand(newValue));
            }}
            options={carBrands}
          />
          <EditInput
            label="Model"
            name="model"
            carData={carData as TCarDataInfo}
            car={car}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value as string;
              setCardata({ ...carData, model: newValue });
              dispatch(setModel(newValue));
            }}
          />
          <EditComponent
            label="Category"
            name="category"
            carData={carData as TCarDataInfo}
            car={car}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value as TCategory;
              setCardata({ ...carData, category: newValue });
              dispatch(setCategory(newValue));
            }}
            options={carCategories}
          />
          <EditComponent
            label="Year"
            name="year"
            carData={carData as TCarDataInfo}
            car={car}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value as string;
              setCardata({ ...carData, year: newValue });
              dispatch(setYear(newValue));
            }}
            options={years}
          />
          <EditComponent
            label="Condition"
            name="condition"
            carData={carData as TCarDataInfo}
            car={car}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value as TCondition;
              setCardata({ ...carData, condition: newValue });
              dispatch(setCondition(newValue));
            }}
            options={conditions}
          />
          <EditComponent
            label="Color"
            name="color"
            carData={carData as TCarDataInfo}
            car={car}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value as string;
              setCardata({ ...carData, color: newValue });
              dispatch(setColor(newValue));
            }}
            options={carColors}
          />
          <EditComponent
            label="Seating Capacity"
            name="seatingcapacity"
            carData={carData as TCarDataInfo}
            car={car}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value as TSeatingCapacity;
              setCardata({ ...carData, seatingCapacity: newValue });
              dispatch(setSeatingCapacity(newValue));
            }}
            options={seatingCapacies}
          />
          <EditComponent
            label="Made In"
            name="madeIn"
            carData={carData as TCarDataInfo}
            car={car}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value as string;
              setCardata({ ...carData, madeIn: newValue });
              dispatch(setMadeIn(newValue));
            }}
            options={countries}
          />
          <EditComponent
            label="Negotiable"
            name="negotiable"
            carData={carData as TCarDataInfo}
            car={car}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value === "Yes";
              setCardata({ ...carData, negotiable: newValue });
              dispatch(setNegotiable(newValue));
            }}
            options={["Yes", "No"]}
          />
          <EditComponent
            label="In Stock"
            name="inStock"
            carData={carData as TCarDataInfo}
            car={car}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value === "Yes";
              setCardata({ ...carData, inStock: newValue });
              dispatch(setInStock(newValue));
            }}
            options={["Yes", "No"]}
          />
          <EditInput
            label="Price"
            name="price"
            carData={carData as TCarDataInfo}
            car={car}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = Number(value);
              setCardata({ ...carData, price: newValue });
              dispatch(setPrice(newValue));
            }}
            type="number"
          />
        </ul>
      </div>
    </div>
  );
};

export default BasicInfo;
