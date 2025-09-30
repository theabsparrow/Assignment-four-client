type TImageUploader = {
  setImageFile: React.Dispatch<React.SetStateAction<File | "">>;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
};

const ImageUploader = ({ setImageFile, setImagePreview }: TImageUploader) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  return (
    <section className="font-Inter">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        Upload Image <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        id="uploadImage"
        accept="image/*"
        onChange={(e) => handleImageChange(e)}
        className="hidden"
      />
      <label
        htmlFor="uploadImage"
        className="md:w-[13vw] w-[40vw] h-28 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-600 hover:border-primary transition"
      >
        {" "}
        <span className="text-gray-500 dark:text-gray-400 text-sm text-center font-playfair">
          Click to upload file <br /> (Only image files)
        </span>
      </label>
    </section>
  );
};

export default ImageUploader;
