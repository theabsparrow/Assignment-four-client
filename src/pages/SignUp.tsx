/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import FormInput from "@/myComponent/formInput/FormInput";
import "react-phone-input-2/lib/style.css";
import FormPhoneInput from "@/myComponent/formInput/FormPhoneInput";
import FormSelect from "@/myComponent/formInput/FormSelect";
import { genders } from "@/myComponent/formInput/formInput.const";
import { imageUpload } from "@/utills/uploadImage";
import { TUserInfo } from "@/interface/userInfo";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { decodeToken } from "@/utills/decodeToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import useMyProfile from "@/hook/useMyProfile";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const methods = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const { refetch } = useMyProfile();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("regestering");
    setErrorMessage("");
    const {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      gender,
      dateOfBirth,
      image,
      password,
      confirmPass,
    } = data;
    if (password !== confirmPass) {
      return setErrorMessage("Password and confirm Passowrd doesn`t match");
    }
    try {
      const userInfo: TUserInfo = {
        name: {
          firstName,
          middleName,
          lastName,
        },
        email,
        phoneNumber,
        gender,
        dateOfBirth,
        password,
      };
      const profileImage = image ? await imageUpload(image) : undefined;
      if (profileImage) {
        userInfo.profileImage = profileImage;
      }
      const res = await register(userInfo).unwrap();
      const user = decodeToken(res.data.access);
      dispatch(setUser({ user, token: res.data.access }));
      toast.success("successfully registered", { id: toastId, duration: 3000 });
      await refetch();
      navigate("/");
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 font-inter">
      <div className=" p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create a Free <br /> Account
        </h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 pb-2 space-y-2 md:space-y-0">
              <FormInput
                label="First name"
                name="firstName"
                placeholder="Enter your first name"
                type="text"
                maxLength={30}
                register={methods.register}
                required={true}
              />
              <FormInput
                label="Middle name"
                name="middleName"
                placeholder="Enter your middle name"
                type="text"
                maxLength={30}
                register={methods.register}
                required={false}
              />
              <FormInput
                label="Last name"
                name="lastName"
                placeholder="Enter your last name"
                type="text"
                maxLength={30}
                register={methods.register}
                required={true}
              />
            </div>

            <div className="flex flex-col md:flex-row md:justify-start md:items-start gap-3 pb-4 space-y-2 md:space-y-0">
              <FormInput
                label="Email"
                name="email"
                placeholder="Enter your email address"
                type="email"
                register={methods.register}
                required={true}
              />
              <FormPhoneInput
                label="Phone Number"
                name="phoneNumber"
                control={methods.control}
                required={true}
              />
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 space-y-2 md:space-y-0">
              <FormSelect
                label="Gender"
                name="gender"
                options={genders}
                register={methods.register}
                required
              />
              <FormInput
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                register={methods.register}
                required={true}
              />
              <FormInput
                label="Profile Image"
                name="image"
                type="file"
                register={methods.register}
                setValue={methods.setValue}
              />
            </div>

            <div className=" space-y-2">
              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                register={methods.register}
                required={true}
              />

              <FormInput
                label="Confirm Password"
                name="confirmPass"
                type="password"
                placeholder="Confirm your password"
                register={methods.register}
                required={true}
              />
            </div>

            <div className="flex flex-col justify-center mt-4">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  {...methods.register("checked", {
                    required: true,
                  })}
                  id="checked"
                />
                <p>Terms & services.</p>
              </div>
              {methods.formState.errors.checked?.type === "required" && (
                <span className="text-sm text-red-500">
                  Accept our terms and services *
                </span>
              )}
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
            >
              Sign Up
            </button>
          </form>
        </FormProvider>
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
