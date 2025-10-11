import { useState } from "react";

const DeleteModal = ({
  confirmDelete,
  label,
}: {
  confirmDelete: (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  label: string;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-2 py-1 bg-red-500 text-white rounded font-inter"
      >
        Delete
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete {label}
            </h3>

            <div className="flex justify-end gap-4">
              <button
                disabled={loading}
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={() => confirmDelete(setOpen, setLoading)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;
