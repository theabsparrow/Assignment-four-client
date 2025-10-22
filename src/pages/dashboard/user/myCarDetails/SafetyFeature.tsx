import { airBags, features, safetyRating } from "@/const/safetyFeature.const";
import {
  TAirbags,
  TFeature,
  TSafetyRating,
  TWarranty,
} from "@/interface/carInterface/safetyFeature.interface";
import EditArrayComponent from "@/myComponent/carEditingComponent/EditArrayComponent";
import EditComponent from "@/myComponent/carEditingComponent/EditComponent";
import { useUpdateSafetyFeatureMutation } from "@/redux/features/car/carApi";
import { TSafetyFeatureInfo } from "@/redux/features/car/carSlice.const";
import {
  currentSafetyFeature,
  resetSafetyFeature,
  setAirBags,
  setSafetyRating,
  setWarrenty,
} from "@/redux/features/car/safetyFeatureSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SafetyFeature = ({
  safetyFeature,
  id,
}: {
  safetyFeature: TSafetyFeatureInfo;
  id: string;
}) => {
  const [safetyfeatureInfo, setSafetyFeatureInfo] =
    useState<Partial<TSafetyFeatureInfo> | null>(safetyFeature ?? null);
  const safetyFeatureData = useAppSelector(currentSafetyFeature);
  const dispatch = useAppDispatch();
  const [updateCar] = useUpdateSafetyFeatureMutation();

  useEffect(() => {
    if (safetyFeature) setSafetyFeatureInfo(safetyFeature);
  }, [safetyFeature]);

  const handleSubmit = async (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!safetyFeatureData || Object.keys(safetyFeatureData).length === 0) {
      return toast.error("nothing to update", { duration: 3000 });
    }
    const toastId = toast.loading("updating safety feature info....");
    const payload = { id: id, data: safetyFeatureData };
    try {
      const res = await updateCar(payload).unwrap();
      if (res?.data) {
        toast.success("successfully updated safety feature", {
          id: toastId,
          duration: 3000,
        });
        setOpen(false);
        dispatch(resetSafetyFeature());
      }
    } catch (error: any) {
      console.log(error);
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
      dispatch(resetSafetyFeature());
    }
  };

  return (
    <div className="w-full p-4 space-y-4 ">
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
          Safety Feature
        </h2>
      </div>
      <div className="text-gray-700 dark:text-gray-300 space-y-4">
        <ul className="grid grid-cols-1 gap-y-1 text-sm">
          <EditArrayComponent
            label="Features"
            value={safetyFeature?.features as TFeature[]}
            valueOptions={features as TFeature[]}
            handleSubmit={handleSubmit}
          />
          {safetyFeature?.features.includes("Air Bags") && (
            <EditComponent
              label="Air bags"
              name="airbags"
              carData={safetyfeatureInfo as TSafetyFeatureInfo}
              car={safetyFeature as TSafetyFeatureInfo}
              setCardata={setSafetyFeatureInfo}
              handleChange={(value) => {
                const newValue = value as TAirbags;
                setSafetyFeatureInfo({
                  ...safetyfeatureInfo,
                  airbags: newValue,
                });
                dispatch(setAirBags(newValue));
              }}
              options={airBags}
              handleSubmit={handleSubmit}
            />
          )}
          <EditComponent
            label="Safety Rating"
            name="safetyRating"
            carData={safetyfeatureInfo as TSafetyFeatureInfo}
            car={safetyFeature as TSafetyFeatureInfo}
            setCardata={setSafetyFeatureInfo}
            handleChange={(value) => {
              const newValue = value as TSafetyRating;
              setSafetyFeatureInfo({
                ...safetyfeatureInfo,
                safetyRating: newValue,
              });
              dispatch(setSafetyRating(newValue));
            }}
            options={safetyRating}
            handleSubmit={handleSubmit}
          />
          <EditComponent
            label="Warrenty"
            name="warranty"
            carData={safetyfeatureInfo as TSafetyFeatureInfo}
            car={safetyFeature as TSafetyFeatureInfo}
            setCardata={setSafetyFeatureInfo}
            handleChange={(value) => {
              const newValue = value as TWarranty;
              setSafetyFeatureInfo({
                ...safetyfeatureInfo,
                warranty: newValue,
              });
              dispatch(setWarrenty(newValue));
            }}
            options={safetyRating}
            handleSubmit={handleSubmit}
          />
        </ul>
      </div>
    </div>
  );
};

export default SafetyFeature;
