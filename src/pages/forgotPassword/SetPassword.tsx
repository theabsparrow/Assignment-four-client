import InputType from "@/myComponent/formInput/InputType";
import { useSetNewPasswordMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TUser } from "./SetNewPassword";
import { logOut } from "@/redux/features/auth/authSlice";

type TsetNewPasswordProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<TUser | null>>;
};
type TSetNewPass = {
  newPassword: string;
  confirmPass: string;
};
const SetPassword = ({ setOpen, setUserData }: TsetNewPasswordProps) => {
  const dispatch = useAppDispatch();
  const [setNewPass] = useSetNewPasswordMutation();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TSetNewPass>();

  const onSubmit = async (data: any) => {
    const { newPassword, confirmPass } = data;
    if (newPassword !== confirmPass) {
      return toast.error("password doesn`t match");
    }
    const toastId = toast.loading("Setting new Passoword....");
    const password = { newPassword };
    try {
      const res = await setNewPass(password).unwrap();
      if (res?.data) {
        toast.success("successfully set new password", {
          id: toastId,
          duration: 3000,
        });
        setUserData(res?.data);
        setOpen(true);
        dispatch(logOut());
        reset();
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6 ">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          Set New Password
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
          Enter a new password for your account
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 space-y-4">
          <InputType
            label="Password"
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
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary mt-4 text-white font-bold p-2 rounded-md duration-500 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default SetPassword;
