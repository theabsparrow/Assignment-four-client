interface ModalProps {
  isModalOpen: boolean;
  modalState: string;
  closeModal: () => void;
  errorMessage?: string;
  setIsModalOpen: (value: boolean) => void;
}

const UserModalComponent: React.FC<ModalProps> = ({
  isModalOpen,
  modalState,
  closeModal,
  errorMessage,
  setIsModalOpen,
}) => {
  if (!isModalOpen) return null;

  const getModalContent = (): string => {
    switch (modalState) {
      case "updateRole":
        return "Are you sure you want to update the role?";
      case "updateStatus":
        return "Are you sure you want to update the status?";
      case "deleteUser":
        return "Are you sure you want to delete the user?";
      default:
        return "";
    }
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 flex items-center justify-center "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4">{getModalContent()}</h3>
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
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModalComponent;
