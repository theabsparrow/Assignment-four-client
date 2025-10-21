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
import { toast } from "sonner";
import EditComponent from "../../../../myComponent/carEditingComponent/EditComponent";
import EditInput from "../../../../myComponent/carEditingComponent/EditInput";
import EditDescription from "@/myComponent/carEditingComponent/EditDescription";
const BasicInfo = ({ car }: { car: TCarDataInfo }) => {
  const [carData, setCardata] = useState<Partial<TCarDataInfo> | null>(
    car ?? null
  );
  const basicInfo = useAppSelector(currentBasicInfo);
  const dispatch = useAppDispatch();
  const [updateCar] = useUpdateCarMutation();

  useEffect(() => {
    if (car) setCardata(car);
  }, [car]);

  const handleSubmit = async (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
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
        setOpen(false);
        dispatch(resetBasicInfo());
      }
    } catch (error: any) {
      console.log(error);
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
      </div>
      <div className="text-gray-700 dark:text-gray-300 space-y-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-1 text-sm">
          <EditComponent
            label="Brand"
            name="brand"
            carData={carData as TCarDataInfo}
            car={car as TCarDataInfo}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value as TCarBrand;
              setCardata({ ...carData, brand: newValue });
              dispatch(setBrand(newValue));
            }}
            options={carBrands}
            handleSubmit={handleSubmit}
          />
          <EditInput
            label="Model"
            name="model"
            carData={carData as TCarDataInfo}
            car={car as TCarDataInfo}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value as string;
              setCardata({ ...carData, model: newValue });
              dispatch(setModel(newValue));
            }}
            handleSubmit={handleSubmit}
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
            handleSubmit={handleSubmit}
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
            handleSubmit={handleSubmit}
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
            handleSubmit={handleSubmit}
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
            handleSubmit={handleSubmit}
          />
          <EditComponent
            label="Seating Capacity"
            name="seatingCapacity"
            carData={carData as TCarDataInfo}
            car={car}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value as TSeatingCapacity;
              setCardata({ ...carData, seatingCapacity: newValue });
              dispatch(setSeatingCapacity(newValue));
            }}
            options={seatingCapacies}
            handleSubmit={handleSubmit}
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
            handleSubmit={handleSubmit}
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
            handleSubmit={handleSubmit}
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
            handleSubmit={handleSubmit}
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
            handleSubmit={handleSubmit}
          />
          <EditDescription
            label="Description"
            name="description"
            carData={carData as TCarDataInfo}
            car={car as TCarDataInfo}
            setCardata={setCardata}
            handleChange={(value) => {
              const newValue = value;
              setCardata({ ...carData, description: newValue });
              dispatch(setDescription(newValue));
            }}
            handleSubmit={handleSubmit}
          />
        </ul>
      </div>
    </div>
  );
};

export default BasicInfo;
