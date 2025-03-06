import { userRoles, userStatus } from "@/myComponent/formInput/formInput.const";
import { useState } from "react";

interface ModalProps {
  isModalOpen: boolean;
  modalState: string;
  closeModal: () => void;
  errorMessage?: string;
  setErrorMessage: (value: string) => void;
  setIsModalOpen: (value: boolean) => void;
  handleUpdateUserInfo: (value: string, label: string) => Promise<void>;
}

const UserModalComponent: React.FC<ModalProps> = ({
  isModalOpen,
  modalState,
  closeModal,
  errorMessage,
  setErrorMessage,
  setIsModalOpen,
  handleUpdateUserInfo,
}) => {
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  if (!isModalOpen) return null;
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl w-80 md:w-96 transition-transform transform scale-95 animate-fadeIn"
      >
        {/* Title */}
        {modalState === "role" && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Change user role
            </h3>
            <select
              value={value}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setValue(selectedValue);
                setLabel(modalState);
                setErrorMessage("");
              }}
              className="w-full border p-3 rounded-lg outline-none bg-gray-100 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select role</option>
              {userRoles.map((role) => (
                <option key={role.label} value={role.value as string}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {modalState === "status" && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Change user status
            </h3>
            <select
              value={value}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setValue(selectedValue);
                setLabel(modalState);
                setErrorMessage("");
              }}
              className="w-full border p-3 rounded-lg outline-none bg-gray-100 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select status</option>
              {userStatus.map((status) => (
                <option key={status.label} value={status.value as string}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {modalState === "deleted" && (
          <h3 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-400">
            Are you sure you want to delete this user account?
          </h3>
        )}

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-600 dark:text-red-400 text-sm text-center mb-4">
            {errorMessage}
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
              setLabel("");
              setValue("");
              setErrorMessage("");
            }}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md transition"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              modalState === "deleted"
                ? handleUpdateUserInfo("delete", "delete")
                : handleUpdateUserInfo(value, label)
            }
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModalComponent;
