import {
  TCarBrand,
  TCategory,
  TCondition,
  TSeatingCapacity,
} from "@/interface/carInterface/car.interface";
import { getYears } from "@/utills/generateYears";

export const carBrands: TCarBrand[] = [
  "Toyota",
  "Hyundai",
  "Nissan",
  "Audi",
  "Tesla",
  "Ford",
  "Land Rover",
  "Honda",
  "Suzuki",
  "Mitsubishi",
  "BMW",
  "Mercedes Benz",
  "Volkswagen",
  "Chevrolet",
  "Lexus",
  "Jaguar",
  "Kia",
  "Mazda",
  "Subaru",
  "Bentley",
  "Peugeot",
  "Renault",
  "Volvo",
  "Jeep",
  "Chrysler",
  "Dodge",
  "Cadillac",
  "GMC",
  "Acura",
  "Infiniti",
  "Alfa Romeo",
  "Maserati",
  "Lincoln",
  "Citroën",
  "Fiat",
  "Mini",
  "Skoda",
  "Genesis",
  "RAM",
  "Hummer",
  "Saab",
  "Seat",
  "Proton",
  "Tata",
  "Opel",
] as const;

export const carCategories: TCategory[] = [
  "Sedan",
  "SUV",
  "Coupe",
  "Convertible",
  "Electric",
  "Sports Car",
  "Hybrid",
  "Jeep",
  "Luxury",
  "Hatchback",
  "Pickup Truck",
  "Van",
  "Minivan",
  "Wagon",
  "Crossover",
  "Muscle Car",
  "Roadster",
  "Diesel",
  "Off-Road",
  "Supercar",
  "Classic Car",
  "Limousine",
  "Station Wagon",
  "Microcar",
  "Targa Top",
  "Camper Van",
  "Utility Vehicle",
  "Compact Car",
  "Pony Car",
] as const;

export const conditions: TCondition[] = [
  "New",
  "Used",
  "Certified Pre-Owned",
] as const;

export const seatingCapacies: TSeatingCapacity[] = [
  "2",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10+",
] as const;

export const years = getYears();

export type TValue = {
  value: string;
  label: string;
};
export const carSortingOrder: TValue[] = [
  { value: "-price", label: "Price (desc)" },
  { value: "-year", label: "Year (desc)" },
  { value: "price", label: "Price" },
  { value: "year", label: "Year" },
  { value: "brand", label: "Brand" },
];
