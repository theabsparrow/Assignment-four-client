import { safetyRating } from "@/const/safetyFeature.const";
import { TSafetyRating } from "@/interface/carInterface/safetyFeature.interface";
import EditComponent from "@/myComponent/carEditingComponent/EditComponent";
import { useUpdateSafetyFeatureMutation } from "@/redux/features/car/carApi";
import { TSafetyFeatureInfo } from "@/redux/features/car/carSlice.const";
import {
  currentSafetyFeature,
  resetSafetyFeature,
  setSafetyRating,
} from "@/redux/features/car/safetyFeatureSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SafetyFeature = ({
  safetyFeature,
}: {
  safetyFeature: TSafetyFeatureInfo;
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
    const payload = { id: safetyFeature?._id, data: safetyFeatureData };
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
          <li className="flex items-center gap-1">
            <strong>Safety Rating:</strong> {safetyFeature?.safetyRating}
          </li>
          {safetyFeature?.airbags && (
            <li className="flex items-center gap-1">
              <strong>Air bags:</strong> {safetyFeature?.airbags} air bags
            </li>
          )}
          {safetyFeature?.warranty && (
            <li className="flex items-center gap-1">
              <strong>Warrenty:</strong> {safetyFeature?.warranty}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SafetyFeature;
