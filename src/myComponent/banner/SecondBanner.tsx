import secondBanner from "../../assets/banner-2-removebg-preview.png";

const SecondBanner = () => {
  return (
    <div>
      <div
        className="relative w-full h-36 bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: `url(${secondBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 "></div>
      </div>
    </div>
  );
};

export default SecondBanner;
