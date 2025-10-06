import { TSettingExtendType } from "./Settings";

const ContactInfoSettings = ({
  profileInfo,
}: {
  profileInfo: TSettingExtendType;
}) => {
  return (
    <section className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex justify-center items-center">
        Contact Information
      </h3>
      <div className="px-2 lg:px-20 py-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-4">
        <div className="space-y-1">
          <h1 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </h1>
          <p className="text-gray-600">{profileInfo?.email} </p>
        </div>
        <div className="space-y-1">
          <h1 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number
          </h1>
          <p className="text-gray-600">{profileInfo?.phoneNumber} </p>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSettings;
