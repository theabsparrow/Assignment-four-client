import { useForm } from "react-hook-form";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { config } from "@/config";

const Contacts = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const message = data?.message;
    const name = data?.fullName;
    const email = data?.email;

    const templateParams = {
      user_name: name,
      user_email: email,
      message,
    };
    const toastID = "email";
    try {
      toast.loading("message sending", { id: toastID });
      const res = await emailjs.send(
        config.service_id,
        config.template_id,
        templateParams,
        config.public_key
      );
      if (res.status === 200) {
        toast.success("Message sent successfully!", { id: toastID });
        reset();
      }
    } catch (error: any) {
      toast.error(error, { id: toastID });
    }
  };

  return (
    <section className="font-inter bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-14">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question about a car or need help selling? Our team is here
            to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
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

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-blue-100 dark:border-gray-700">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("fullName", {
                    required: "Type you full name here",
                  })}
                  className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 ${
                    errors?.fullName
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-400"
                  }`}
                />
                {errors?.fullName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors?.fullName?.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your email address"
                  {...register("email", {
                    required: "type your email address",
                  })}
                  className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 ${
                    errors?.email ? "focus:ring-red-500" : "focus:ring-blue-400"
                  }`}
                />
                {errors?.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors?.email?.message as string}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Your message here..."
                  {...register("message", {
                    required: "type your message here",
                    minLength: {
                      value: 15,
                      message: "Message must be at least 15 characters",
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 ${
                    errors?.message
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-400"
                  }`}
                ></textarea>
                {errors?.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors?.message?.message as string}
                  </p>
                )}
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
