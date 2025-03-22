import banner from "../../assets/all brands banner.png";
const AllBrandsBanner = () => {
  return (
    <div
      className="relative w-full h-[55vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center font-inter"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 "></div>
      <div className="absolute top-4 md:top-56 font-inter space-y-2 md:space-y-12 ">
        <div className="px-4">
          <h1 className="text-xl md:text-6xl text-white dark:text-slate-950 font-bold md:text-center">
            Find the Best Car Price in Bangladeshg
          </h1>
          <p className="md:text-center mt-2 md:mt-10 font-inter md:text-2xl font-semibold text-white">
            Leading online automotive marketplace in Bnagladesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllBrandsBanner;
