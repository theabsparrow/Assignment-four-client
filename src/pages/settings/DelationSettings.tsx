import AcceptTermsInput from "@/myComponent/formInput/AcceptTermsInput";
import SignInFormInput from "@/myComponent/formInput/SignInFormInput";
import { baseApi } from "@/redux/api/baseApi";
import { logOut } from "@/redux/features/auth/authSlice";
import { useDeleteUserMutation } from "@/redux/features/user/userApi";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import RetrivePass from "./RetrivePass";
type TPassword = {
  password: string;
};
const DelationSettings = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [deleteAccount] = useDeleteUserMutation();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TPassword>();

  const onSubmit = async (data: TPassword) => {
    const toastId = toast.loading("updating password....");
    try {
      const res = await deleteAccount(data).unwrap();
      if (res?.success) {
        dispatch(logOut());
        dispatch(baseApi.util.resetApiState());
        toast.success("Account deleted successfully", {
          id: toastId,
          duration: 3000,
        });
        navigate("/sign-in");
        setOpen(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <section>
      <h3 className="text-lg font-semibold flex justify-center items-center">
        Account deletion
      </h3>
      <div className="py-2 px-4 bg-gray-400 dark:bg-gray-800 rounded-lg mt-4">
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={() => setOpen(!open)}
            className="text-lg font-bold text-secondary dark:text-gray-100 hover:scale-110 duration-500"
          >
            Delete Account
          </button>
        </div>
        {open && (
          <div className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-72 space-y-4">
              <SignInFormInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                register={register}
                required={true}
                error={errors.password}
              />
              <div className=" font-medium text-lg text-secondary">
                <h1 className="flex items-center gap-1">
                  {" "}
                  <AiFillWarning />
                  If you delete your account, all your information will be lost
                  forever.{" "}
                </h1>
                <h1 className="flex items-center gap-1">
                  {" "}
                  <AiFillWarning /> Do you agree ?
                </h1>
              </div>
              <AcceptTermsInput
                register={register}
                name="acceptTerms"
                errors={errors}
                required={true}
                label="Yes I agree to delete"
              />

              <button
                disabled={isSubmitting}
                type="submit"
                className="flex items-center bg-red-500 px-2 py-1 rounded-lg hover:bg-red-600 duration-500 text-white"
              >
                Delete Account
              </button>
            </form>
            <RetrivePass />
          </div>
        )}
      </div>
    </section>
  );
};

export default DelationSettings;
