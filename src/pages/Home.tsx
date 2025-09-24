import Banner from "@/myComponent/banner/Banner";
import SecondBanner from "@/myComponent/banner/SecondBanner";
import BodyType from "@/myComponent/bodyType/BodyType";
import PopularBrands from "@/myComponent/popularBrands/PopularBrands";
import RecentCars from "@/myComponent/recentCars/RecentCars";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <div className="md:px-32">
        <SecondBanner></SecondBanner>
      </div>
      <RecentCars />
      <BodyType></BodyType>
      <PopularBrands></PopularBrands>
    </>
  );
};

export default Home;
