import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { engineInfoInitialState } from "./carSlice.const";
import { RootState } from "@/redux/store";
import {
  TDriveTrain,
  TFuelType,
  TTransmission,
} from "@/interface/carInterface/carEngine.interface";

const engineInfoSlice = createSlice({
  name: "engineInfo",
  initialState: engineInfoInitialState,
  reducers: {
    setcarEngine: (state, action: PayloadAction<Partial<string>>) => {
      state.engine = action.payload;
    },
    setTransmission: (state, action: PayloadAction<Partial<TTransmission>>) => {
      state.transmission = action.payload;
    },
    setMilage: (state, action: PayloadAction<Partial<string>>) => {
      state.mileage = action.payload;
    },
    setFuelType: (state, action: PayloadAction<Partial<TFuelType>>) => {
      state.fuelType = action.payload;
    },
    setDriveTrain: (state, action: PayloadAction<Partial<TDriveTrain>>) => {
      state.driveTrain = action.payload;
    },
    setHorsePower: (state, action: PayloadAction<Partial<string>>) => {
      state.horsePower = action.payload;
    },
    setTorque: (state, action: PayloadAction<Partial<string>>) => {
      state.torque = action.payload;
    },
    setTopSpeed: (state, action: PayloadAction<Partial<string>>) => {
      state.topSpeed = action.payload;
    },
    setAccelaration: (state, action: PayloadAction<Partial<string>>) => {
      state.acceleration = action.payload;
    },
    resetEngineInfo: () => engineInfoInitialState,
  },
});

export const {
  setcarEngine,
  setTransmission,
  setMilage,
  setFuelType,
  setDriveTrain,
  setHorsePower,
  setTorque,
  setTopSpeed,
  setAccelaration,
  resetEngineInfo,
} = engineInfoSlice.actions;

export default engineInfoSlice.reducer;
export const currentEngineInfo = (state: RootState) => state.engineInfo;
