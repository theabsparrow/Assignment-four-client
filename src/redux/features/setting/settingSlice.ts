import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { settingsInitialState } from "./setting.const";
import { TGender, TUserInfo } from "@/interface/userInterface/userInfo";
import { RootState } from "@/redux/store";

const settingSlice = createSlice({
  name: "settingSlice",
  initialState: settingsInitialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        name: { ...(state.name ?? {}), firstName: action.payload },
      };
    },
    setMiddleName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        name: { ...(state.name ?? {}), middleName: action.payload },
      };
    },
    setLastName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        name: { ...(state.name ?? {}), lastName: action.payload },
      };
    },
    setDOB: (state, action: PayloadAction<string>) => {
      state.dateOfBirth = action.payload;
    },
    setGender: (state, action: PayloadAction<TGender>) => {
      state.gender = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setProfile: (state, action: PayloadAction<TUserInfo>) => {
      return { ...state, ...action.payload };
    },
    resetProfile: () => settingsInitialState,
  },
});

export const {
  setFirstName,
  setMiddleName,
  setLastName,
  setDOB,
  setGender,
  setEmail,
  setPhone,
  setPassword,
  setProfile,
  resetProfile,
} = settingSlice.actions;
export default settingSlice.reducer;
export const currentSettings = (state: RootState) => state.settingSlice;
