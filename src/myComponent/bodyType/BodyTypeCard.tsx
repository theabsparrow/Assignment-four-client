export type TBodyTypeProps = {
  _id: string;
  image: string;
  category: string;
};

const BodyTypeCard = (car: TBodyTypeProps) => {
  const { image, category } = car;

  return (
    <div className="bg-[#f0f3f8] dark:bg-gray-900 rounded-xl shadow-lg p-4 text-center transition transform hover:scale-105 hover:shadow-2xl duration-500 font-inter cursor-pointer">
      <img
        src={image}
        alt="category"
        className="w-full h-32 object-contain mx-auto"
      />
      <p className="text-gray-500 dark:text-gray-400">{category}</p>
    </div>
  );
};

export default BodyTypeCard;
