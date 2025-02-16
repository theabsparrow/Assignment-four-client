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

const SignUp = () => {
  const methods = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setError("");
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
      return setError("Password and confirm Passowrd doesn`t match");
    }

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
    if (!profileImage) {
      throw new Error("faild to create account");
    }
    userInfo.profileImage = profileImage;
    console.log(userInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 font-inter">
      <div className=" p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create a Free <br /> Account
        </h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between items-start gap-3 pb-4">
              <FormInput
                label="First name"
                name="firstName"
                placeholder="Enter your first name"
                type="text"
                maxLength={30}
                register={methods.register}
                required={true}
                error={methods.formState.errors.firstName?.message as string}
              />
              <FormInput
                label="Middle name"
                name="middleName"
                placeholder="Enter your middle name"
                type="text"
                maxLength={30}
                register={methods.register}
                required={false}
                error={methods.formState.errors.middleName?.message as string}
              />
              <FormInput
                label="Last name"
                name="lastName"
                placeholder="Enter your last name"
                type="text"
                maxLength={30}
                register={methods.register}
                required={true}
                error={methods.formState.errors.lastName?.message as string}
              />
            </div>

            <div className="flex items-start justify-start gap-3 pb-4">
              <FormInput
                label="Email"
                name="email"
                placeholder="Enter your email address"
                type="email"
                register={methods.register}
                required={true}
                error={methods.formState.errors.email?.message as string}
              />
              <FormPhoneInput
                label="Phone Number"
                name="phoneNumber"
                control={methods.control}
              />
            </div>

            <div className="flex items-start justify-between gap-3 pb-4">
              <FormSelect
                label="Gender"
                name="gender"
                options={genders}
                register={methods.register}
                error={methods.formState.errors.gender?.message as string}
                required
              />
              <FormInput
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                register={methods.register}
                required={true}
                error={methods.formState.errors.dateOfBirth?.message as string}
              />
              <FormInput
                label="Profile Image"
                name="image"
                type="file"
                register={methods.register}
                error={methods.formState.errors.image?.message as string}
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
                error={methods.formState.errors.password?.message as string}
              />

              <FormInput
                label="Confirm Password"
                name="confirmPass"
                type="password"
                placeholder="Confirm your password"
                register={methods.register}
                required={true}
                error={methods.formState.errors.confirmPass?.message as string}
              />
            </div>

            <div className="flex flex-col justify-center mt-2">
              <div className="flex items-center">
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
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SignUp;
