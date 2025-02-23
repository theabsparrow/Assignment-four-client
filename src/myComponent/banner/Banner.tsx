import { useState } from "react";
import banner from "../../assets/banner.png";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";

const brands = ["All", "Toyota", "Honda", "BMW", "Mercedes", "Ford"];
const models = {
  Toyota: ["Corolla", "Camry"],
  Honda: ["Civic", "Accord"],
  BMW: ["X5", "M3"],
};

const Banner = () => {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedModel, setSelectedModel] = useState(models["Toyota"][0]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    1, 100000000,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className="relative w-full h-[55vh] md:h-[calc(100vh-80px)] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 "></div>
        <div className="absolute top-4 md:top-16 font-inter space-y-7 md:space-y-12">
          <div>
            <h1 className="text-2xl md:text-6xl text-white dark:text-slate-950 font-bold text-center">
              Find the Best Car Price in Bangladeshg
            </h1>
            <p className="text-center mt-2 md:mt-10 font-inter md:text-2xl font-semibold text-white">
              Leading online automotive marketplace in Bnagladesh
            </p>
          </div>
          <div className=" bg-opacity-65 md:bg-opacity-100 bg-white dark:bg-gray-900 px-3 md:px-16 py-2 md:py-6 space-x-10 shadow-lg w-full md:max-w-[calc(100vw-256px)]">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-20"
            >
              <div className="flex items-center gap-5 md:gap-20">
                <div className="">
                  <h1 className="text-gray-500 font-semibold">BRAND</h1>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="px-10 rounded outline-none bg-transparent font-bold"
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <h1 className="text-gray-500 font-semibold">MODEL</h1>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="px-10 rounded outline-none bg-transparent font-bold"
                  >
                    {models[selectedBrand as keyof typeof models]?.map(
                      (model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="w-full text-gray-500 font-semibold ">
                <div className="flex items-center mb-3 md:gap-3">
                  <h2 className="text-sm md:text-base md:font-semibold">
                    PRICE RANGE FROM{" "}
                  </h2>
                  <p className="font-bold text-black flex items-center">
                    <TbCurrencyTaka className="text-xl" />{" "}
                    {priceRange[0].toLocaleString()}
                  </p>{" "}
                  <p>TO</p>{" "}
                  <p className="font-bold text-black flex items-center">
                    <TbCurrencyTaka className="text-xl" />{" "}
                    {priceRange[1].toLocaleString()}
                  </p>
                </div>
                <RangeSlider
                  min={1}
                  max={100000000}
                  step={500000}
                  value={priceRange}
                  onInput={setPriceRange}
                  className="w-full"
                />
              </div>

              <button className="w-64 bg-secondary hover:bg-deepRed dark:bg-gray-700 dark:hover:bg-gray-900 text-white font-bold px-2 py-2 rounded-full flex items-center gap-1 justify-center">
                <IoSearchSharp /> Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
