import { TSettings } from "./Settings";
export const buttons = [
  { key: "personal", label: "Personal" },
  { key: "contact", label: "Contact" },
  { key: "password", label: "Password" },
  { key: "deletion", label: "Account Deletion" },
];
const SettingsButtons = ({
  settings,
  setSettings,
}: {
  settings: TSettings;
  setSettings: React.Dispatch<React.SetStateAction<TSettings>>;
}) => {
  return (
    <div className="hidden lg:flex flex-col items-start space-y-2 w-44 ">
      {buttons.map((button) => (
        <button
          key={button.key}
          onClick={() => setSettings(button.key as TSettings)}
          className={`px-2 py-1 rounded-lg w-full  ${
            settings === button.key
              ? "bg-gray-300"
              : "hover:bg-gray-400 duration-500"
          }`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default SettingsButtons;
