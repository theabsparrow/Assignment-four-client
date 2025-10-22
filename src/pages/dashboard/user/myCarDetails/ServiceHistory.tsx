import EditDescription from "@/myComponent/carEditingComponent/EditDescription";
import EditInput from "@/myComponent/carEditingComponent/EditInput";
import { useUpdateServiceHistoryMutation } from "@/redux/features/car/carApi";
import { TServiceHistoryInfo } from "@/redux/features/car/carSlice.const";
import {
  currentServiceHistoryInfo,
  resetServiceHistory,
  setCost,
  setMilageAtService,
  setServiceCenter,
  setServiceDate,
  setServiceDetails,
} from "@/redux/features/car/serviceHistorySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ServiceHistory = ({
  serviceHistory,
}: {
  serviceHistory: TServiceHistoryInfo;
}) => {
  const [serviceHistoryInfo, setServiceHistoryInfo] =
    useState<Partial<TServiceHistoryInfo> | null>(serviceHistory ?? null);
  const service = useAppSelector(currentServiceHistoryInfo);
  const dispatch = useAppDispatch();
  const [updateCar] = useUpdateServiceHistoryMutation();

  useEffect(() => {
    if (serviceHistory) setServiceHistoryInfo(serviceHistory);
  }, [serviceHistory]);

  const handleSubmit = async (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!service || Object.keys(service).length === 0) {
      return toast.error("nothing to update", { duration: 3000 });
    }
    const toastId = toast.loading("updating service history....");
    const payload = { id: serviceHistory?._id, data: service };
    try {
      const res = await updateCar(payload).unwrap();
      if (res?.data) {
        toast.success("successfully updated service history", {
          id: toastId,
          duration: 3000,
        });
        setOpen(false);
        dispatch(resetServiceHistory());
      }
    } catch (error: any) {
      console.log(error);
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
      dispatch(resetServiceHistory());
    }
  };
  return (
    <div className="w-full p-4 space-y-4 ">
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
          Service History
        </h2>
      </div>
      <div className="text-gray-700 dark:text-gray-300 space-y-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-1 text-sm">
          <EditInput
            label="Service Center"
            name="serviceCenter"
            carData={serviceHistoryInfo as TServiceHistoryInfo}
            car={serviceHistory as TServiceHistoryInfo}
            setCardata={setServiceHistoryInfo}
            handleChange={(value) => {
              const newValue = value as string;
              setServiceHistoryInfo({
                ...serviceHistoryInfo,
                serviceCenter: newValue,
              });
              dispatch(setServiceCenter(newValue));
            }}
            handleSubmit={handleSubmit}
          />
          <EditInput
            label="Service Date"
            name="serviceDate"
            carData={serviceHistoryInfo as TServiceHistoryInfo}
            car={serviceHistory as TServiceHistoryInfo}
            setCardata={setServiceHistoryInfo}
            handleChange={(value) => {
              const newValue = value as string;
              setServiceHistoryInfo({
                ...serviceHistoryInfo,
                serviceDate: newValue,
              });
              dispatch(setServiceDate(newValue));
            }}
            type="date"
            handleSubmit={handleSubmit}
          />
          <EditInput
            label="Service Cost"
            name="cost"
            carData={serviceHistoryInfo as TServiceHistoryInfo}
            car={serviceHistory as TServiceHistoryInfo}
            setCardata={setServiceHistoryInfo}
            handleChange={(value) => {
              const newValue = Number(value);
              setServiceHistoryInfo({
                ...serviceHistoryInfo,
                cost: newValue,
              });
              dispatch(setCost(newValue));
            }}
            type="number"
            handleSubmit={handleSubmit}
          />
          <EditInput
            label="Mileage at Service"
            name="mileageAtService"
            carData={serviceHistoryInfo as TServiceHistoryInfo}
            car={serviceHistory as TServiceHistoryInfo}
            setCardata={setServiceHistoryInfo}
            handleChange={(value) => {
              const newValue = value;
              setServiceHistoryInfo({
                ...serviceHistoryInfo,
                mileageAtService: newValue,
              });
              dispatch(setMilageAtService(newValue));
            }}
            type="number"
            handleSubmit={handleSubmit}
          />
          <EditDescription
            label="Service Details"
            name="serviceDetails"
            carData={serviceHistoryInfo as TServiceHistoryInfo}
            car={serviceHistory as TServiceHistoryInfo}
            setCardata={setServiceHistoryInfo}
            handleChange={(value) => {
              const newValue = value;
              setServiceHistoryInfo({
                ...serviceHistoryInfo,
                serviceDetails: newValue,
              });
              dispatch(setServiceDetails(newValue));
            }}
            handleSubmit={handleSubmit}
          />
        </ul>
      </div>
    </div>
  );
};

export default ServiceHistory;
