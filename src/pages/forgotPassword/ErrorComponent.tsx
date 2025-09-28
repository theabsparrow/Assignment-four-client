import { Link } from "react-router-dom";

const ErrorComponent = () => {
  return (
    <section className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
      <h2 className="text-xl font-bold text-red-500">Session Expired</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Please request a new OTP and try again.
      </p>
      <div className="flex flex-col gap-4">
        <Link className="text-blue-700 font-semibold" to="/forgot-password">
          Forget Password ?
        </Link>
        <Link className="text-blue-700 font-semibold" to="/forgot-password">
          Back to Login
        </Link>
      </div>
    </section>
  );
};

export default ErrorComponent;
