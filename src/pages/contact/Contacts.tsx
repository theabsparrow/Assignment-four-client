const Contacts = () => {
  return (
    <section className="font-inter bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question about a car or need help selling? Our team is here
            to help.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-blue-100 dark:border-blue-800">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                📞 Call Us
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                +880 1234 567 890
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-blue-100 dark:border-blue-800">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                ✉️ Email
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                support@autodrive.com
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-blue-100 dark:border-blue-800">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                📍 Location
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-blue-100 dark:border-gray-700">
            <form className="space-y-6">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Your message here..."
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="rounded-xl overflow-hidden shadow-md border border-gray-300 dark:border-gray-700 mt-8">
          <iframe
            title="Google Map"
            className="w-full h-72"
            src="https://maps.google.com/maps?q=Dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
