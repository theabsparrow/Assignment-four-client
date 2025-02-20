/* eslint-disable @typescript-eslint/no-explicit-any */
import useMyProfile from "@/hook/useMyProfile";
import FormInput from "@/myComponent/formInput/FormInput";
import { genders } from "@/myComponent/formInput/formInput.const";
import FormPhoneInput from "@/myComponent/formInput/FormPhoneInput";
import FormSelect from "@/myComponent/formInput/FormSelect";
import SignInFormInput from "@/myComponent/formInput/SignInFormInput";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Settings = () => {
  const myprofile = useMyProfile();

  const methods = useForm();
  const [editing, setEditing] = useState(false);
  const [contactEdit, setContactEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const onInfoSubmit = (data: any) => {
    setErrorMessage("");
    const updatedFields = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== "")
    );
    if (Object.keys(updatedFields).length === 0) {
      setEditing(true);
      return setErrorMessage("Nothing to update");
    }
    console.log("Updated Data:", updatedFields);
  };

  const onContactSubmit = (data: any) => {
    setErrorMessage("");
    const updatedFields = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== "")
    );
    if (Object.keys(updatedFields).length === 0) {
      setContactEdit(true);
      return setErrorMessage("Nothing to update");
    }
    console.log("Updated Data:", updatedFields);
  };

  const onPassChangeSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Settings
        </h2>
        {((errorMessage && editing) || (errorMessage && contactEdit)) && (
          <h1 className="text-red-600 text-sm text-center mb-4">
            {errorMessage}
          </h1>
        )}
        {/* PERSONAL INFORMATION */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Personal Information
            </h3>
            <button
              className="text-blue-500 font-semibold hover:underline"
              onClick={() => {
                setEditing(!editing);
                setErrorMessage("");
              }}
            >
              {editing ? "Cancel" : "Edit"}
            </button>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onInfoSubmit)}>
              <label
                className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${
                  !editing ? "text-start" : "text-center"
                }`}
              >
                Full Name
              </label>
              <div
                className={`mb-3 ${
                  !editing
                    ? "flex items-center gap-2"
                    : "flex flex-col justify-center space-y-3"
                }`}
              >
                <div>
                  {editing ? (
                    <FormInput
                      label="First name"
                      name="firstName"
                      placeholder="Enter your first name"
                      type="text"
                      maxLength={30}
                      register={methods.register}
                    />
                  ) : (
                    <p className="mt-1 text-gray-800 dark:text-gray-300">
                      {myprofile.myProfile?.name.firstName}
                    </p>
                  )}
                </div>
                <div>
                  {editing ? (
                    <FormInput
                      label="Middle name"
                      name="middleName"
                      placeholder="Enter your middle name"
                      type="text"
                      maxLength={30}
                      register={methods.register}
                    />
                  ) : (
                    <p className="mt-1 text-gray-800 dark:text-gray-300">
                      {myprofile.myProfile?.name?.middleName}
                    </p>
                  )}
                </div>

                <div>
                  {editing ? (
                    <FormInput
                      label="Last name"
                      name="lastName"
                      placeholder="Enter your last name"
                      type="text"
                      maxLength={30}
                      register={methods.register}
                    />
                  ) : (
                    <p className="mt-1 text-gray-800 dark:text-gray-300">
                      {myprofile.myProfile?.name.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label
                  className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${
                    !editing ? "block" : "hidden"
                  }`}
                >
                  Date of Birth
                </label>
                {editing ? (
                  <FormInput
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    register={methods.register}
                  />
                ) : (
                  <p className="mt-1 text-gray-800 dark:text-gray-300">
                    {myprofile.myProfile?.dateOfBirth}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label
                  className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${
                    !editing ? "block" : "hidden"
                  }`}
                >
                  Gender
                </label>
                {editing ? (
                  <FormSelect
                    label="Gender"
                    name="gender"
                    options={genders}
                    register={methods.register}
                  />
                ) : (
                  <p className="mt-1 text-gray-800 dark:text-gray-300">
                    {myprofile.myProfile?.gender}
                  </p>
                )}
              </div>

              {editing && (
                <button
                  type="submit"
                  className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition "
                >
                  Save Changes
                </button>
              )}
            </form>
          </FormProvider>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Contact Information
            </h3>
            <button
              className="text-blue-500 font-semibold hover:underline"
              onClick={() => {
                setContactEdit(!contactEdit);
                setErrorMessage("");
              }}
            >
              {contactEdit ? "Cancel" : "Edit"}
            </button>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onContactSubmit)}>
              <div className="mt-2">
                <label
                  className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${
                    !contactEdit ? "block" : "hidden"
                  }`}
                >
                  Email
                </label>
                {contactEdit ? (
                  <FormInput
                    label="Email"
                    name="email"
                    placeholder="Enter your email address"
                    type="email"
                    register={methods.register}
                  />
                ) : (
                  <p className="mt-1 text-gray-600">
                    {myprofile.myProfile?.email}
                  </p>
                )}
              </div>
              <div className="mt-2">
                <label
                  className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${
                    !contactEdit ? "block" : "hidden"
                  }`}
                >
                  Phone Number
                </label>
                {contactEdit ? (
                  <FormPhoneInput
                    label="Phone Number"
                    name="phoneNumber"
                    control={methods.control}
                  />
                ) : (
                  <p className="mt-1 text-gray-600">
                    {myprofile.myProfile?.phoneNumber}
                  </p>
                )}
              </div>
              {contactEdit && (
                <button
                  type="submit"
                  className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition mt-3"
                >
                  Save Changes
                </button>
              )}
            </form>
          </FormProvider>
        </div>

        {/* CHANGE PASSWORD */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Change Password
            </h3>
            <button
              className="text-blue-500 font-semibold hover:underline"
              onClick={() => setChangingPassword(!changingPassword)}
            >
              {changingPassword ? "Cancel" : "Change"}
            </button>
          </div>
          {changingPassword && (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onPassChangeSubmit)}>
                <div className="mb-3">
                  <SignInFormInput
                    label=" Old Password"
                    name="OldPassword"
                    type="password"
                    placeholder="Enter your old password"
                    register={methods.register}
                    required={true}
                  />
                </div>

                <div className="mb-3">
                  <FormInput
                    label="New Password"
                    name="NewPassword"
                    type="password"
                    placeholder="Enter your new password"
                    register={methods.register}
                    required={true}
                  />
                </div>

                <div className="mb-3">
                  <FormInput
                    label="Confirm New Password"
                    name="confirmPass"
                    type="password"
                    placeholder="Confirm your new password"
                    register={methods.register}
                    required={true}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-secondary dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
                >
                  Update Password
                </button>
              </form>
            </FormProvider>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
