export type TBrandCardProps = {
  _id: string;
  brand: string;
  carBrandLogo: string;
};

const PopularBrandCards = (car: TBrandCardProps) => {
  const { brand, carBrandLogo } = car;
  return (
    <div className=" dark:bg-gray-900  p-4 text-center transition transform hover:scale-105 hover:shadow-2xl duration-500 font-inter cursor-pointer">
      <img
        src={carBrandLogo}
        alt="category"
        className="w-full h-32 object-contain mx-auto"
      />
      <p className="text-gray-500 dark:text-gray-400">{brand}</p>
    </div>
  );
};

export default PopularBrandCards;
