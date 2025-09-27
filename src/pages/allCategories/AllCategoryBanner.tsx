import banner from "../../assets/all brands banner.png";

const AllCategoryBanner = () => {
  return (
    <section
      className="relative w-full h-[55vh] lg:h-[60vh] bg-cover bg-center flex items-center justify-center font-inter"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 "></div>
      <div className="absolute top-20 lg:top-48 font-inter space-y-2 ">
        <div className="px-2 lg:px-16 space-y-2 lg:space-y-8 ">
          <h1 className="text-3xl lg:text-6xl text-white dark:text-slate-950 font-bold md:text-center">
            Find the Best Car Price in Bangladeshg
          </h1>
          <p className="lg:text-center text-xl lg:text-2xl font-semibold text-white">
            Leading online automotive marketplace in Bnagladesh
          </p>
        </div>
      </div>
    </section>
  );
};

export default AllCategoryBanner;
