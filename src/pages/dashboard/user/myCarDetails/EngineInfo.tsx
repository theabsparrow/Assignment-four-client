import { fuelType, transmission } from "@/const/carEngine.const";
import {
  TDriveTrain,
  TFuelType,
  TTransmission,
} from "@/interface/carInterface/carEngine.interface";
import EditComponent from "@/myComponent/carEditingComponent/EditComponent";
import EditInput from "@/myComponent/carEditingComponent/EditInput";
import { useUpdateCarEngineMutation } from "@/redux/features/car/carApi";
import { TcarEngineInfo } from "@/redux/features/car/carSlice.const";
import {
  currentEngineInfo,
  resetEngineInfo,
  setAccelaration,
  setcarEngine,
  setDriveTrain,
  setFuelType,
  setHorsePower,
  setMilage,
  setTopSpeed,
  setTorque,
  setTransmission,
} from "@/redux/features/car/engineInfoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EngineInfo = ({ carEngine }: { carEngine: TcarEngineInfo }) => {
  const [engineData, setEngineData] = useState<Partial<TcarEngineInfo> | null>(
    carEngine ?? null
  );
  const engineInfo = useAppSelector(currentEngineInfo);
  const dispatch = useAppDispatch();
  const [updateCar] = useUpdateCarEngineMutation();

  useEffect(() => {
    if (carEngine) setEngineData(carEngine);
  }, [carEngine]);

  const handleSubmit = async (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!engineInfo || Object.keys(engineInfo).length === 0) {
      return toast.error("nothing to update", { duration: 3000 });
    }
    const toastId = toast.loading("updating basic info....");
    const payload = { id: carEngine?._id, data: engineInfo };
    try {
      const res = await updateCar(payload).unwrap();
      if (res?.data) {
        toast.success("successfully updated engine info", {
          id: toastId,
          duration: 3000,
        });
        setOpen(false);
        dispatch(resetEngineInfo());
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
      dispatch(resetEngineInfo());
    }
  };
  return (
    <div className="w-full p-4 space-y-4 ">
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
          Engine Information
        </h2>
      </div>
      <div className="text-gray-700 dark:text-gray-300 space-y-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-1 text-sm">
          <EditInput
            label="Engine Type"
            name="engine"
            carData={engineData as TcarEngineInfo}
            car={carEngine as TcarEngineInfo}
            setCardata={setEngineData}
            handleChange={(value) => {
              const newValue = value as string;
              setEngineData({ ...engineData, engine: newValue });
              dispatch(setcarEngine(newValue));
            }}
            handleSubmit={handleSubmit}
          />
          <EditComponent
            label="Transmission"
            name="transmission"
            carData={engineData as TcarEngineInfo}
            car={carEngine as TcarEngineInfo}
            setCardata={setEngineData}
            handleChange={(value) => {
              const newValue = value as TTransmission;
              setEngineData({ ...engineData, transmission: newValue });
              dispatch(setTransmission(newValue));
            }}
            options={transmission}
            handleSubmit={handleSubmit}
          />
          <EditComponent
            label="Fuel"
            name="fuelType"
            carData={engineData as TcarEngineInfo}
            car={carEngine as TcarEngineInfo}
            setCardata={setEngineData}
            handleChange={(value) => {
              const newValue = value as TFuelType;
              setEngineData({ ...engineData, fuelType: newValue });
              dispatch(setFuelType(newValue));
            }}
            options={fuelType}
            handleSubmit={handleSubmit}
          />
          <EditInput
            label="Mileage"
            name="mileage"
            carData={engineData as TcarEngineInfo}
            car={carEngine as TcarEngineInfo}
            setCardata={setEngineData}
            handleChange={(value) => {
              const newValue = value;
              setEngineData({ ...engineData, mileage: newValue });
              dispatch(setMilage(newValue));
            }}
            type="number"
            handleSubmit={handleSubmit}
          />
          <EditComponent
            label="Drive Train"
            name="driveTrain"
            carData={engineData as TcarEngineInfo}
            car={carEngine as TcarEngineInfo}
            setCardata={setEngineData}
            handleChange={(value) => {
              const newValue = value as TDriveTrain;
              setEngineData({ ...engineData, driveTrain: newValue });
              dispatch(setDriveTrain(newValue));
            }}
            options={fuelType}
            handleSubmit={handleSubmit}
          />
          <EditInput
            label="Top Speed"
            name="topSpeed"
            carData={engineData as TcarEngineInfo}
            car={carEngine as TcarEngineInfo}
            setCardata={setEngineData}
            handleChange={(value) => {
              const newValue = value;
              setEngineData({ ...engineData, topSpeed: newValue });
              dispatch(setTopSpeed(newValue));
            }}
            type="number"
            handleSubmit={handleSubmit}
          />
          <EditInput
            label="Horse Power"
            name="horsePower"
            carData={engineData as TcarEngineInfo}
            car={carEngine as TcarEngineInfo}
            setCardata={setEngineData}
            handleChange={(value) => {
              const newValue = value;
              setEngineData({ ...engineData, horsePower: newValue });
              dispatch(setHorsePower(newValue));
            }}
            type="number"
            handleSubmit={handleSubmit}
          />
          <EditInput
            label="Torque"
            name="torque"
            carData={engineData as TcarEngineInfo}
            car={carEngine as TcarEngineInfo}
            setCardata={setEngineData}
            handleChange={(value) => {
              const newValue = value;
              setEngineData({ ...engineData, torque: newValue });
              dispatch(setTorque(newValue));
            }}
            type="number"
            handleSubmit={handleSubmit}
          />
          <EditInput
            label="Acceleration"
            name="acceleration"
            carData={engineData as TcarEngineInfo}
            car={carEngine as TcarEngineInfo}
            setCardata={setEngineData}
            handleChange={(value) => {
              const newValue = value;
              setEngineData({ ...engineData, acceleration: newValue });
              dispatch(setAccelaration(newValue));
            }}
            type="number"
            handleSubmit={handleSubmit}
          />
        </ul>
      </div>
    </div>
  );
};

export default EngineInfo;
