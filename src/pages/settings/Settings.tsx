/* eslint-disable @typescript-eslint/no-explicit-any */
import { TMyProfileQUery } from "@/interface/navbar.types";
import { useMyProfileQuery } from "@/redux/features/user/userApi";
import { useState } from "react";
import PersonalInfoSettings from "./PersonalInfoSettings";
import ContactInfoSettings from "./ContactInfoSettings";
import PasswordSettings from "./PasswordSettings";
import DelationSettings from "./DelationSettings";
import SettingsButtons from "./SettingsButtons";
import SettingsSkeleton from "@/myComponent/loader/SettingsSkeleton";
import { TUserInfo } from "@/interface/userInterface/userInfo";
import SmallDeviceButton from "./SmallDeviceButton";
export type TSettings = "personal" | "contact" | "password" | "deletion";

export interface TSettingExtendType extends TUserInfo {
  verifyWithEmail: boolean;
}

const Settings = () => {
  // redux state
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "settings";
  const { data, isLoading } = useMyProfileQuery(query);
  const profileInfo = data?.data;
  // local state
  const [settings, setSettings] = useState<TSettings>("personal");

  if (isLoading) {
    return <SettingsSkeleton />;
  }
  return (
    <section className="mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md px-2 lg:px-16  h-[calc(100vh-76px)] space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex justify-center items-center">
        Settings
      </h2>
      <SmallDeviceButton settings={settings} setSettings={setSettings} />
      <div className="flex items-start justify-between gap-20">
        <SettingsButtons settings={settings} setSettings={setSettings} />
        <div className="w-full">
          {settings === "personal" && (
            <PersonalInfoSettings profileInfo={profileInfo} />
          )}
          {settings === "contact" && (
            <ContactInfoSettings profileInfo={profileInfo} />
          )}
          {settings === "password" && <PasswordSettings />}
          {settings === "deletion" && <DelationSettings />}
        </div>
      </div>
    </section>
  );
};

export default Settings;
