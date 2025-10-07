import InputType from "@/myComponent/formInput/InputType";
import SignInFormInput from "@/myComponent/formInput/SignInFormInput";
import { useChnagePassowrdMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { decodeToken } from "@/utills/decodeToken";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import RetrivePass from "./RetrivePass";
import { TUserByEmail } from "../forgotPassword/forgetPassword.types";
type TPasswordSettings = {
  oldPassword: string;
  newPassword: string;
  confirmPass: string;
};

const PasswordSettings = ({ profileInfo }: { profileInfo: TUserByEmail }) => {
  const [changePassword] = useChnagePassowrdMutation();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TPasswordSettings>();

  const onSubmit = async (data: TPasswordSettings) => {
    const toastId = toast.loading("updating password....");
    try {
      const res = await changePassword(data).unwrap();
      if (res?.data) {
        const user = decodeToken(res.data);
        dispatch(setUser({ user, token: res.data }));
        toast.success("pasword changed successfully", {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <section className="space-y-2 bg-gray-500 dark:bg-gray-800 rounded-lg py-4">
      <h3 className="text-lg font-semibold text-white dark:text-gray-100 flex justify-center items-center">
        Password Settings
      </h3>
      <div className="px-2 lg:px-20 py-4 rounded-lg space-y-4 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-72 space-y-3 mx-auto"
        >
          <SignInFormInput
            label=" Old Password"
            name="oldPassword"
            type="password"
            placeholder="Enter your old password"
            register={register}
            required={true}
            error={errors.oldPassword}
          />
          <InputType
            label="New Password"
            name="newPassword"
            register={register}
            error={errors.newPassword}
            type="password"
            required={true}
          />
          <InputType
            label="Confirm Password"
            name="confirmPass"
            register={register}
            error={errors.confirmPass}
            type="password"
            required={true}
            validateMatch={watch("newPassword")}
          />
          <button
            disabled={isSubmitting}
            type="submit"
            className="flex items-center bg-red-500 px-2 py-1 rounded-lg hover:bg-red-600 duration-500 text-white"
          >
            Submit
          </button>
        </form>
        <div className="flex justify-center items-center">
          <RetrivePass profileInfo={profileInfo} />
        </div>
      </div>
    </section>
  );
};

export default PasswordSettings;
