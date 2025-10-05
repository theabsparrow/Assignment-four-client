import { TUserInfo } from "@/interface/userInterface/userInfo";
import AcceptTermsInput from "@/myComponent/formInput/AcceptTermsInput";
import FormPhoneInput from "@/myComponent/formInput/FormPhoneInput";
import InputImage from "@/myComponent/formInput/InputImage";
import InputSelect from "@/myComponent/formInput/InputSelect";
import InputType from "@/myComponent/formInput/InputType";
import {
  TTimerhandler,
  TUserByEmail,
} from "@/pages/forgotPassword/forgetPassword.types";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { decodeToken } from "@/utills/decodeToken";
import { imageUpload } from "@/utills/uploadImage";
import { UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type TSignUpFormProps = {
  methods: UseFormReturn<TUserInfo>;
  refetch: any;
  setOtpPage: React.Dispatch<any>;
  setUserData: React.Dispatch<React.SetStateAction<TUserByEmail | null>>;
  userInfo: TUserByEmail;
  timerRef: React.RefObject<TTimerhandler>;
};

const SignUpForm = ({
  methods,
  refetch,
  setOtpPage,
  setUserData,
  userInfo,
  timerRef,
}: TSignUpFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const [registration] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: TUserInfo) => {
    const toastId = toast.loading("regestering");
    try {
      if (data?.profileImage) {
        const profileImage = await imageUpload(data?.profileImage as File);
        if (!profileImage) {
          toast.error("faild to upload image", { duration: 3000 });
        }
        data.profileImage = profileImage as string;
      }
      const res = await registration(data).unwrap();
      const user = decodeToken(res.data.access);
      dispatch(setUser({ user, token: res.data.access }));
      toast.success("successfully registered", { id: toastId, duration: 3000 });
      refetch();
      setUserData(userInfo);
      setOtpPage(true);
      timerRef.current?.reset();
      reset();
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className=" p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4 ">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        Create a Free Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
          <InputType
            label="First Name"
            name="name.firstName"
            register={register}
            error={errors.name?.firstName}
            required={true}
          />
          <InputType
            label="Middle Name"
            name="name.middleName"
            register={register}
            error={errors.name?.middleName}
          />
          <InputType
            label="Last Name"
            name="name.lastName"
            register={register}
            error={errors.name?.lastName}
            required={true}
          />
          <InputType
            label="Email"
            name="email"
            register={register}
            error={errors.email}
            type="email"
            required={true}
          />
          <FormPhoneInput
            label="Phone Number"
            name="phoneNumber"
            control={control}
            required={true}
          />
          <InputSelect
            register={register}
            name="gender"
            label="Gender"
            error={errors.gender}
            options={["male", "female", "others"]}
            required={true}
          />
          <InputType
            label="Date of Birth"
            name="dateOfBirth"
            register={register}
            error={errors.dateOfBirth}
            type="date"
            required={true}
          />
          <InputImage
            name={"profileImage"}
            label={"Profile Photo"}
            register={register}
            error={errors.profileImage}
            setValue={setValue}
          />
          <InputType
            label="Password"
            name="password"
            register={register}
            error={errors.password}
            type="password"
            required={true}
          />
        </div>
        <AcceptTermsInput
          register={register}
          name="acceptTerms"
          errors={errors}
          required={true}
        />

        <div className="flex items-start">
          <button
            type="submit"
            disabled={isSubmitting}
            className=" bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
          >
            Sign Up
          </button>
        </div>
      </form>

      <div>
        <p>
          Already have an account?{" "}
          <Link
            className="text-blue-600 font-bold hover:scale-125 duration-500"
            to="/sign-in"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
