import Banner from "@/myComponent/banner/Banner";
import SecondBanner from "@/myComponent/banner/SecondBanner";
import BodyType from "@/myComponent/bodyType/BodyType";
import HomePageCars from "@/myComponent/homepageCars/HomePageCars";
import PopularBrands from "@/myComponent/popularBrands/PopularBrands";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <div className="md:px-32">
        <SecondBanner></SecondBanner>
      </div>
      <HomePageCars></HomePageCars>
      <BodyType></BodyType>
      <PopularBrands></PopularBrands>
    </>
  );
};

export default Home;
