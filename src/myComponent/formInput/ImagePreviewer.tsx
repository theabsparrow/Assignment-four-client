import { X } from "lucide-react";

type TImangePreviewer = {
  setImageFile: React.Dispatch<React.SetStateAction<File | "">>;
  imagePreview: string;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
};
const ImagePreviewer = ({
  setImageFile,
  imagePreview,
  setImagePreview,
}: TImangePreviewer) => {
  const handleRemove = () => {
    setImageFile("");
    setImagePreview("");
  };
  return (
    <section>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        Upload Image <span className="text-red-500">*</span>
      </label>
      <div className="relative w-48 rounded-md overflow-hidden border border-dashed border-gray-300">
        <img src={imagePreview} alt={`Car image`} />
        <button
          type="button"
          onClick={handleRemove}
          className="bg-red-300 hover:bg-red-400 absolute -top-0 -right-0 w-6 h-6 p-0 rounded-full cursor-pointer"
        >
          <X className="w-4 h-4 mx-auto" />
        </button>
      </div>
    </section>
  );
};

export default ImagePreviewer;
