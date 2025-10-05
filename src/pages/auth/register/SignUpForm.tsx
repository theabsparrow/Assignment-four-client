import { TUserInfo } from "@/interface/userInterface/userInfo";
import AcceptTermsInput from "@/myComponent/formInput/AcceptTermsInput";
import FormPhoneInput from "@/myComponent/formInput/FormPhoneInput";
import InputImage from "@/myComponent/formInput/InputImage";
import InputSelect from "@/myComponent/formInput/InputSelect";
import InputType from "@/myComponent/formInput/InputType";
import { UseFormReturn } from "react-hook-form";
import { Link } from "react-router-dom";

type TSignUpFormProps = {
  methods: UseFormReturn<TUserInfo>;
  onSubmit: (data: TUserInfo) => Promise<void>;
};

const SignUpForm = ({ methods, onSubmit }: TSignUpFormProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  return (
    <div className="absolute lg:left-[20%] md:left-[15%] left-0 top-[1%] md:top-[10%] lg:top-[5%] px-2 py-2 md:px-6 md:py-6 lg:px-6 lg:py-2 bg-gray-800/80 rounded-lg shadow-md space-y-3">
      <h2 className="text-2xl font-bold text-center text-green-500">
        Create a Free Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-3 ">
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
            className=" bg-secondary hover:bg-red-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition"
          >
            Sign Up
          </button>
        </div>
      </form>

      <div>
        <p className="text-green-500">
          Already have an account?{" "}
          <Link
            className="text-blue-600 font-bold hover:underline duration-500"
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
