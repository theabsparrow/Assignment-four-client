import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";

const SuccessComponent = ({ onForceLogin }: { onForceLogin: () => void }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLater = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <section className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
      <h2 className="text-xl font-bold text-green-600 dark:text-green-400">
        🎉 Password Updated Successfully
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Do you want to log in now or later?
      </p>
      <div className="mt-6 flex gap-4 justify-center">
        <button
          onClick={onForceLogin}
          className="bg-secondary text-white px-4 py-2 rounded-lg shadow hover:scale-105 duration-300"
        >
          Force Login
        </button>
        <button
          onClick={handleLater}
          className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow hover:scale-105 duration-300"
        >
          Login Later
        </button>
      </div>
    </section>
  );
};

export default SuccessComponent;
