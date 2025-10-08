import { TSettings } from "./Settings";
import { buttons } from "./SettingsButtons";

const SmallDeviceButton = ({
  settings,
  setSettings,
}: {
  settings: TSettings;
  setSettings: React.Dispatch<React.SetStateAction<TSettings>>;
}) => {
  return (
    <div className="lg:hidden w-full flex items-center gap-1 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar">
      {buttons.map((button) => (
        <button
          key={button.key}
          onClick={() => {
            setSettings(button.key as TSettings);
            localStorage.setItem(
              "Settings",
              JSON.stringify(button.key as TSettings)
            );
          }}
          className={`px-2 py-1 rounded-lg w-full ${
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

export default SmallDeviceButton;
