import { years } from "@/const/carInfo.const";
import { countries } from "@/const/country.const";
import EditComponent from "@/myComponent/carEditingComponent/EditComponent";
import EditInput from "@/myComponent/carEditingComponent/EditInput";
import { useUpdateRegistrationDataMutation } from "@/redux/features/car/carApi";
import { TRegistration } from "@/redux/features/car/carSlice.const";
import {
  currentRegistrationData,
  resetRegistrationData,
  setAuthority,
  setCountry,
  setLicense,
  setPreviousAddress,
  setPreviousOwner,
  setRegistrationYera,
  setRoadTaxoaid,
  setVIN,
} from "@/redux/features/car/registrationDataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const RegistrationInfo = ({
  registrationData,
}: {
  registrationData: TRegistration;
}) => {
  const [registrationInfo, setRegistrationInfo] =
    useState<Partial<TRegistration> | null>(registrationData ?? null);
  const registration = useAppSelector(currentRegistrationData);
  const dispatch = useAppDispatch();
  const [updateCar] = useUpdateRegistrationDataMutation();

  useEffect(() => {
    if (registrationData) setRegistrationInfo(registrationData);
  }, [registrationData]);

  const handleSubmit = async (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!registration || Object.keys(registration).length === 0) {
      return toast.error("nothing to update", { duration: 3000 });
    }
    const toastId = toast.loading("updating registration info....");
    const payload = { id: registrationData?._id, data: registration };
    try {
      const res = await updateCar(payload).unwrap();
      if (res?.data) {
        toast.success("successfully updated registration data", {
          id: toastId,
          duration: 3000,
        });
        setOpen(false);
        dispatch(resetRegistrationData());
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
      dispatch(resetRegistrationData());
    }
  };

  return (
    <div className="w-full p-4 space-y-4 ">
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
          Registration Information
        </h2>
      </div>
      <div className="text-gray-700 dark:text-gray-300 space-y-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-1 text-sm">
          <EditInput
            label="License Plate"
            name="licensePlate"
            carData={registrationInfo as TRegistration}
            car={registrationData as TRegistration}
            setCardata={setRegistrationInfo}
            handleChange={(value) => {
              const newValue = value as string;
              setRegistrationInfo({
                ...registrationInfo,
                licensePlate: newValue,
              });
              dispatch(setLicense(newValue));
            }}
            handleSubmit={handleSubmit}
          />
          <EditInput
            label="VIN (Vehicle Identification Number)"
            name="vin"
            carData={registrationInfo as TRegistration}
            car={registrationData as TRegistration}
            setCardata={setRegistrationInfo}
            handleChange={(value) => {
              const newValue = value as string;
              setRegistrationInfo({ ...registrationInfo, vin: newValue });
              dispatch(setVIN(newValue));
            }}
            handleSubmit={handleSubmit}
          />
          <EditInput
            label="Authority"
            name="registrationAuthority"
            carData={registrationInfo as TRegistration}
            car={registrationData as TRegistration}
            setCardata={setRegistrationInfo}
            handleChange={(value) => {
              const newValue = value as string;
              setRegistrationInfo({
                ...registrationInfo,
                registrationAuthority: newValue,
              });
              dispatch(setAuthority(newValue));
            }}
            handleSubmit={handleSubmit}
          />
          <EditComponent
            label="Registration Country"
            name="registrationCountry"
            carData={registrationInfo as TRegistration}
            car={registrationData as TRegistration}
            setCardata={setRegistrationInfo}
            handleChange={(value) => {
              const newValue = value as string;
              setRegistrationInfo({
                ...registrationInfo,
                registrationCountry: newValue,
              });
              dispatch(setCountry(newValue));
            }}
            options={countries}
            handleSubmit={handleSubmit}
          />
          <EditInput
            label="Previous Owner"
            name="previousOwner"
            carData={registrationInfo as TRegistration}
            car={registrationData as TRegistration}
            setCardata={setRegistrationInfo}
            handleChange={(value) => {
              const newValue = value as string;
              setRegistrationInfo({
                ...registrationInfo,
                previousOwner: newValue,
              });
              dispatch(setPreviousOwner(newValue));
            }}
            handleSubmit={handleSubmit}
          />
          <EditInput
            label="Previous Owner Address"
            name="previousOwnerAddress"
            carData={registrationInfo as TRegistration}
            car={registrationData as TRegistration}
            setCardata={setRegistrationInfo}
            handleChange={(value) => {
              const newValue = value as string;
              setRegistrationInfo({
                ...registrationInfo,
                previousOwnerAddress: newValue,
              });
              dispatch(setPreviousAddress(newValue));
            }}
            handleSubmit={handleSubmit}
          />
          <EditComponent
            label="Registration Year"
            name="registrationYear"
            carData={registrationInfo as TRegistration}
            car={registrationData as TRegistration}
            setCardata={setRegistrationInfo}
            handleChange={(value) => {
              const newValue = value as string;
              setRegistrationInfo({
                ...registrationInfo,
                registrationYear: newValue,
              });
              dispatch(setRegistrationYera(newValue));
            }}
            options={years}
            handleSubmit={handleSubmit}
          />
          <EditComponent
            label="Road Tax Paid"
            name="roadTaxPaid"
            carData={registrationInfo as TRegistration}
            car={registrationData as TRegistration}
            setCardata={setRegistrationInfo}
            handleChange={(value) => {
              const newValue = value === "Yes";
              setRegistrationInfo({
                ...registrationInfo,
                roadTaxPaid: newValue,
              });
              dispatch(setRoadTaxoaid(newValue));
            }}
            options={["Yes", "No"]}
            handleSubmit={handleSubmit}
          />
        </ul>
      </div>
    </div>
  );
};

export default RegistrationInfo;
