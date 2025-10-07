import { useState } from "react";
import { TEmail } from "../forgotPassword/forgetPassword.types";
import { useForm } from "react-hook-form";
import InputType from "@/myComponent/formInput/InputType";
import { useRetrivePasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const RetrivePass = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [retrivePass] = useRetrivePasswordMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TEmail>();

  const onSubmit = async (data: TEmail) => {
    const toastId = toast.loading("otp sending", { duration: 3000 });
    try {
      const res = await retrivePass(data).unwrap();
      if (res?.success) {
        toast.success("otp sent successfully", {
          id: toastId,
          duration: 3000,
        });
        setIsOpen(true);
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };
  return (
    <section>
      <button
        type="button"
        className="text-red-700 font-semibold hover:underline"
        onClick={() => setIsOpen(true)}
      >
        forget password?
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gray-500 dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
            <p className="text-gray-200 dark:text-gray-400 text-center mt-2">
              Enter your email and we’ll send you an otp.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputType
                label="Email"
                name="email"
                register={register}
                error={errors.email}
                type="email"
                required={true}
              />
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-800 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Searching..." : "Search Your Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default RetrivePass;
