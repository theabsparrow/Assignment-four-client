import Banner from "@/myComponent/banner/Banner";
import SecondBanner from "@/myComponent/banner/SecondBanner";
import BodyType from "@/myComponent/bodyType/BodyType";
import PopularBrands from "@/myComponent/popularBrands/PopularBrands";
import RecentCars from "@/myComponent/recentCars/RecentCars";

const Home = () => {
  return (
    <section className="space-y-8 lg:space-y-16">
      <Banner />
      <div className="px-2 lg:px-16">
        <SecondBanner />
      </div>
      <RecentCars />
      <BodyType />
      <PopularBrands />
    </section>
  );
};

export default Home;
