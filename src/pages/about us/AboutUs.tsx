import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section className="font-inter bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-16 px-4 md:px-32">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            About{" "}
            <span className="text-blue-600 dark:text-blue-400">AutoDrive</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Your trusted destination for buying and selling cars with confidence
            and ease.
          </p>
        </div>

        {/* Info + Image */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Who We Are
            </h2>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              AutoDrive is an online car marketplace created by car lovers, for
              car lovers. Whether you're buying your first vehicle or selling
              your tenth, our platform offers a seamless, secure, and smart
              experience.
            </p>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              We partner with verified dealers and individual sellers to offer a
              wide selection of vehicles, from budget-friendly rides to luxury
              models — all in one place.
            </p>
          </div>

          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://i.ibb.co.com/VhnPh45/car-showroom.png"
              alt="Showroom"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Our Mission
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              To simplify the car buying and selling process by delivering a
              trusted, user-friendly platform that connects people to their
              perfect ride.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Our Vision
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              To be the go-to digital showroom where every buyer finds the right
              car, and every seller reaches the right audience — transparently
              and efficiently.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl text-center space-y-6 shadow-md">
          <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Why Choose AutoDrive?
          </h3>
          <ul className="text-gray-700 dark:text-gray-300 text-base space-y-2">
            <li>✔ Verified Listings & Dealer Partnerships</li>
            <li>✔ Transparent Vehicle History & Pricing</li>
            <li>✔ Easy Financing Options & Secure Transactions</li>
            <li>✔ 24/7 Customer Support & Fast Assistance</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center pt-10">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to find your dream car?
          </h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Browse our listings today or get in touch — we're here to help you
            drive forward.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
