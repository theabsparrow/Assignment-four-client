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
      className="fixed inset-0 flex items-center justify-center "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        {modalState === "role" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Change user role from here
            </h3>
            <select
              value={value}
              onChange={(e) => {
                const value = e.target.value;
                setValue(value);
                setLabel(modalState);
                setErrorMessage("");
              }}
              className="border p-2 rounded outline-none"
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
            <h3 className="text-lg font-semibold mb-4">
              Change user status from here
            </h3>
            <select
              value={value}
              onChange={(e) => {
                const value = e.target.value;
                setValue(value);
                setLabel(modalState);
                setErrorMessage("");
              }}
              className="border p-2 rounded outline-none"
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
          <h1>Are you sure , You want to delete this user account</h1>
        )}

        {errorMessage && (
          <h1 className="text-red-600 text-sm text-center mb-4">
            {errorMessage}
          </h1>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
              setLabel("");
              setValue("");
              setErrorMessage("");
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          {modalState === "role" || modalState === "status" ? (
            <button
              onClick={() => {
                handleUpdateUserInfo(value, label);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Confirm
            </button>
          ) : (
            <button
              onClick={() => {
                handleUpdateUserInfo("delete", "delete");
              }}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModalComponent;
