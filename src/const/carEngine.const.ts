import {
  TAccelaration,
  TDriveTrain,
  TEngineType,
  TFuelType,
  THorsePower,
  TTopSpeed,
  TTorque,
  TTransmission,
} from "@/interface/carInterface/carEngine.interface";

export const fuelType: TFuelType[] = [
  "Petrol",
  "Diesel",
  "Electric",
  "Hybrid",
  "CNG",
  "LPG",
  "Hydrogen",
] as const;

export const engine: TEngineType[] = [
  "1.5L 3-cylinder",
  "2.0L 4-cylinder",
  "2.5L 4-cylinder",
  "3.0L V6",
  "3.5L V6",
  "4.0L V8",
  "Hybrid",
  "Electric Motor",
  "Turbocharged",
] as const;

export const transmission: TTransmission[] = [
  "Automatic",
  "Manual",
  "CVT",
  "Dual-Clutch",
  "Semi-Automatic",
  "Electric Drive",
] as const;

export const driveTrain: TDriveTrain[] = [
  "FWD",
  "RWD",
  "AWD",
  "4WD",
  "All-Wheel Drive",
];

export const horsePower: THorsePower[] = [
  "100",
  "150",
  "200",
  "250",
  "300",
  "350",
  "400",
  "450",
  "500",
  "600+",
] as const;

export const torque: TTorque[] = [
  "100",
  "150",
  "200",
  "250",
  "300",
  "350",
  "400",
  "450",
  "500",
  "600",
  "700",
  "800+",
] as const;

export const topSpeed: TTopSpeed[] = [
  "120",
  "150",
  "180",
  "200",
  "220",
  "240",
  "260",
  "280",
  "300+",
] as const;

export const accelaration: TAccelaration[] = [
  "3.5",
  "4.0",
  "4.5",
  "5.0",
  "5.5",
  "6.0",
  "6.5",
  "7.0",
  "7.5",
  "8.0+",
] as const;
