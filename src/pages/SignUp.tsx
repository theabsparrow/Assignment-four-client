/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import FormPhoneInput from "@/myComponent/formInput/FormPhoneInput";
import { imageUpload } from "@/utills/uploadImage";
import { TUserInfo } from "@/interface/userInterface/userInfo";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { decodeToken } from "@/utills/decodeToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useMyProfileQuery } from "@/redux/features/user/userApi";
import { TMyProfileQUery } from "@/interface/navbar.types";
import InputType from "@/myComponent/formInput/InputType";
import InputSelect from "@/myComponent/formInput/InputSelect";
import InputImage from "@/myComponent/formInput/InputImage";
import AcceptTermsInput from "@/myComponent/formInput/AcceptTermsInput";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TUserInfo>();
  // redux state
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "navbar";
  const { data, refetch } = useMyProfileQuery(query);
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
      navigate("/my-profile");
      refetch();
      reset();
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <div className="flex justify-center bg-gray-100 dark:bg-gray-900 p-4 font-inter">
      <div className=" p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
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

        <div className="mt-2">
          <p>
            Already have an account?{" "}
            <Link
              className="text-primary font-bold hover:scale-125 duration-500"
              to="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
