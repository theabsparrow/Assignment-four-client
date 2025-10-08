/* eslint-disable @typescript-eslint/no-explicit-any */
import { TMyProfileQUery } from "@/interface/navbar.types";
import { useMyProfileQuery } from "@/redux/features/user/userApi";
import { useEffect, useState } from "react";
import PersonalInfoSettings from "./PersonalInfoSettings";
import ContactInfoSettings from "./ContactInfoSettings";
import PasswordSettings from "./PasswordSettings";
import DelationSettings from "./DelationSettings";
import SettingsButtons from "./SettingsButtons";
import SettingsSkeleton from "@/myComponent/loader/SettingsSkeleton";
import { TUserInfo } from "@/interface/userInterface/userInfo";
import SmallDeviceButton from "./SmallDeviceButton";
import { useLocation } from "react-router-dom";
export type TSettings = "personal" | "contact" | "password" | "deletion";

export interface TSettingExtendType extends TUserInfo {
  verifyWithEmail: boolean;
  _id: string;
}

const Settings = () => {
  // redux state
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "settings";
  const { data, isLoading } = useMyProfileQuery(query);
  const profileInfo = data?.data;
  // local state
  const [settings, setSettings] = useState<TSettings>(
    () =>
      JSON.parse(localStorage.getItem("Settings") as TSettings) || "personal"
  );
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("Settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const currentPath = location.pathname;
    return () => {
      if (location.pathname !== currentPath) {
        localStorage.removeItem("Settings");
      }
    };
  }, [location.pathname]);

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
          {settings === "password" && (
            <PasswordSettings profileInfo={profileInfo} />
          )}
          {settings === "deletion" && (
            <DelationSettings profileInfo={profileInfo} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Settings;
