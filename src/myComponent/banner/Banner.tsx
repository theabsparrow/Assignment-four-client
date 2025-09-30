import { useEffect, useState } from "react";
import banner from "../../assets/banner.png";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SearchAndSelect from "../searchAndSelect/SearchAndSelect";
import { useGetCarModelQuery } from "@/redux/features/car/carApi";
import { RiResetLeftLine } from "react-icons/ri";
import { carBrands } from "@/const/carInfo.const";
import { TCarBrand } from "@/interface/carInterface/car.interface";

const Banner = () => {
  const [brand, setBrand] = useState<TCarBrand | string>("");
  const [model, setModel] = useState("");
  const navigate = useNavigate();
  const query = { brand };
  const { data } = useGetCarModelQuery(query);
  const { models, maxPrice, minPrice } = data?.data || {};
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (typeof minPrice === "number" && typeof maxPrice === "number") {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [minPrice, maxPrice]);

  const handelSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const minPrice = Number(priceRange[0]);
    const maxPrice = Number(priceRange[1]);
    const queryParams = new URLSearchParams();
    if (brand) queryParams.set("brand", brand);
    if (model) queryParams.set("model", model);
    queryParams.set("minPrice", minPrice.toString());
    queryParams.set("maxPrice", maxPrice.toString());
    navigate(`/all-cars?${queryParams.toString()}`);
  };

  const handleReset = () => {
    setBrand("");
    setModel("");
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <>
      <div
        className="relative w-full h-[65vh] lg:h-[625px] bg-cover bg-center flex items-center justify-center font-inter"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 "></div>
        <div className="absolute top-4 md:top-16 font-inter space-y-2 md:space-y-12 ">
          <div className="px-4">
            <h1 className="text-xl md:text-6xl text-white dark:text-slate-950 font-bold md:text-center">
              Find the Best Car Price in Bangladeshg
            </h1>
            <p className="md:text-center mt-2 md:mt-10 font-inter md:text-2xl font-semibold text-white">
              Leading online automotive marketplace in Bnagladesh
            </p>
          </div>
          <div className=" bg-opacity-65 md:bg-opacity-100 bg-white dark:bg-gray-900 px-3 lg:px-8 py-1 md:py-6 space-x-10 shadow-lg w-full lg:w-[calc(100vw-128px)]">
            <form
              onSubmit={handelSubmit}
              className="flex flex-col lg:flex-row items-center lg:items-start gap-5 lg:gap-0 lg:justify-between"
            >
              <div>
                <SearchAndSelect
                  options={carBrands}
                  label="Brand"
                  name="brand"
                  setValue={setBrand}
                  selectedBrand={brand}
                ></SearchAndSelect>
              </div>
              <div>
                <h1 className="text-gray-500 font-semibold hidden lg:block">
                  Model*
                </h1>
                <select
                  value={model as string}
                  onChange={(e) => setModel(e.target.value)}
                  className="p-1 lg:p-2 rounded outline-none bg-gray-50 dark:bg-gray-800 border cursor-pointer text-sm lg:text-base"
                  disabled={!brand}
                >
                  <option value="">
                    {brand ? "select model" : " select brand first"}
                  </option>
                  {models &&
                    models.map((model: string, i: number) => (
                      <option key={i} value={model}>
                        {model}
                      </option>
                    ))}
                </select>
              </div>
              <div className="lg:text-gray-500 font-semibold space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm md:text-base md:font-semibold">
                    Price range{" "}
                  </h2>
                  <p className="font-bold text-black flex items-center">
                    <TbCurrencyTaka className="text-xl" /> {priceRange[0]}
                  </p>{" "}
                  <p>to</p>{" "}
                  <p className="font-bold text-black flex items-center">
                    <TbCurrencyTaka className="text-xl" /> {priceRange[1]}
                  </p>
                </div>
                <RangeSlider
                  min={minPrice}
                  max={maxPrice}
                  step={100000}
                  value={priceRange}
                  onInput={setPriceRange}
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-10">
                <button
                  type="submit"
                  className=" bg-secondary hover:bg-deepRed dark:bg-gray-700 dark:hover:bg-gray-900 text-white font-semibold px-2 py-2 rounded-xl flex items-center gap-1 justify-center"
                >
                  <IoSearchSharp /> Search
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className=" bg-secondary hover:bg-deepRed dark:bg-gray-700 dark:hover:bg-gray-900 text-white font-semibold px-2 py-2 rounded-xl flex items-center gap-1 justify-center"
                >
                  <RiResetLeftLine /> Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
