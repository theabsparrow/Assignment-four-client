import { useForm } from "react-hook-form";
import { useAddCarMutation } from "@/redux/features/car/carApi";
import { useState } from "react";
import { TcarInfoPayload } from "@/interface/carInterface/car.interface";
import BasicInfoForm from "./BasicInfoForm";
import EngineInfoForm from "./EngineInfoForm";
import RegistrationDataForm from "./RegistrationDataForm";
import SafetyFeature from "./SafetyFeature";
import ServiceHistoryForm from "./ServiceHistoryForm";
import DeliverAndPaymentForm from "./DeliverAndPaymentForm";
import { toast } from "sonner";
import { imageUpload } from "@/utills/uploadImage";

const AddCar = () => {
  const [step, setStep] = useState(1);
  const methods = useForm<TcarInfoPayload>({ mode: "all" });
  const { handleSubmit, reset } = methods;
  const [addCar] = useAddCarMutation();

  const onSubmit = async (data: TcarInfoPayload) => {
    data.basicInfo.price = Number(data.basicInfo.price);
    data.engineInfo.mileage = Number(data.engineInfo.mileage);
    if (data?.serviceHistory) {
      data.serviceHistory.mileageAtService = Number(
        data.serviceHistory?.mileageAtService
      );
      data.serviceHistory.cost = Number(data.serviceHistory?.cost);
    }
    if (data?.registrationData) {
      data.registrationData.roadTaxPaid =
        data.registrationData.roadTaxPaid === "Yes";
    }
    if (data?.safetyFeature) {
      if (!data.safetyFeature.airbags) {
        delete data.safetyFeature.airbags;
      }
      if (!data.safetyFeature.warranty) {
        delete data.safetyFeature.warranty;
      }
    }

    const toastId = toast.loading("car data uploading.....");
    try {
      const carImage = await imageUpload(data?.basicInfo?.image as File);
      if (!carImage) {
        toast.error("faild to sumbit car info", {
          id: toastId,
          duration: 3000,
        });
        return;
      }
      data.basicInfo.image = carImage as string;
      if (
        data?.basicInfo?.galleryImage &&
        data?.basicInfo?.galleryImage.length > 0
      ) {
        const galleryImages = data.basicInfo.galleryImage;
        const images: string[] = [];
        for (const image of galleryImages) {
          const imageUrl = await imageUpload(image as File);
          if (imageUrl) {
            images.push(imageUrl as string);
          }
        }
        data.basicInfo.galleryImage = images;
      }
      const res = await addCar(data).unwrap();
      if (res?.data) {
        toast.success("car info uploaded successfully ", {
          id: toastId,
          duration: 3000,
        });
        reset();
        setStep(1);
      }
    } catch (error: any) {
      console.log(error);
      const errorInfo =
        error?.data?.errorSource[0].message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <section className="px-5 lg:px-10 py-4 bg-gray-500 font-inter space-y-2 min-h-screen">
      <h1 className="text-3xl font-bold">Add a New Car</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 1 && (
          <BasicInfoForm methods={methods} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <EngineInfoForm
            methods={methods}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            onRoot={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <RegistrationDataForm
            methods={methods}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
            onRoot={() => setStep(1)}
          />
        )}
        {step === 4 && (
          <SafetyFeature
            methods={methods}
            onNext={() => setStep(5)}
            onBack={() => setStep(3)}
            onRoot={() => setStep(1)}
          />
        )}
        {step === 5 && (
          <ServiceHistoryForm
            methods={methods}
            onNext={() => setStep(6)}
            onBack={() => setStep(4)}
            onRoot={() => setStep(1)}
          />
        )}
        {step === 6 && (
          <DeliverAndPaymentForm
            methods={methods}
            onBack={() => setStep(5)}
            onRoot={() => setStep(1)}
          />
        )}
      </form>
    </section>
  );
};

export default AddCar;
