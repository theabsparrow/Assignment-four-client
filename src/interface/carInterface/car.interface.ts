import { TDeliveryAndPayment } from "./carDelivery.interface";
import { TCarEngine } from "./carEngine.interface";
import { TRegistrationdata } from "./registrationData.interface";
import { TSafetyFeature } from "./safetyFeature.interface";
import { TserviceHistory } from "./serviceHistory.interface";

export type TCarBrand =
  | "Toyota"
  | "Hyundai"
  | "Nissan"
  | "Audi"
  | "Tesla"
  | "Ford"
  | "Land Rover"
  | "Honda"
  | "Suzuki"
  | "Mitsubishi"
  | "BMW"
  | "Mercedes Benz"
  | "Volkswagen"
  | "Chevrolet"
  | "Lexus"
  | "Jaguar"
  | "Kia"
  | "Mazda"
  | "Subaru"
  | "Bentley"
  | "Peugeot"
  | "Renault"
  | "Volvo"
  | "Jeep"
  | "Chrysler"
  | "Dodge"
  | "Cadillac"
  | "GMC"
  | "Acura"
  | "Infiniti"
  | "Alfa Romeo"
  | "Maserati"
  | "Lincoln"
  | "Citroën"
  | "Fiat"
  | "Mini"
  | "Skoda"
  | "Genesis"
  | "RAM"
  | "Hummer"
  | "Saab"
  | "Seat"
  | "Proton"
  | "Tata"
  | "Opel";

export type TCategory =
  | "Sedan"
  | "SUV"
  | "Coupe"
  | "Convertible"
  | "Electric"
  | "Sports Car"
  | "Hybrid"
  | "Jeep"
  | "Luxury"
  | "Hatchback"
  | "Pickup Truck"
  | "Van"
  | "Minivan"
  | "Wagon"
  | "Crossover"
  | "Muscle Car"
  | "Roadster"
  | "Diesel"
  | "Off-Road"
  | "Supercar"
  | "Classic Car"
  | "Limousine"
  | "Station Wagon"
  | "Microcar"
  | "Targa Top"
  | "Camper Van"
  | "Utility Vehicle"
  | "Compact Car"
  | "Pony Car";

export const carColors: string[] = [
  "White",
  "Black",
  "Gray",
  "Silver",
  "Red",
  "Blue",
  "Green",
  "Metallic Silver",
  "Metallic Blue",
  "Metallic Red",
  "Pearl White",
  "Pearl Black",
  "Matte Black",
  "Matte Gray",
  "Matte Blue",
  "Matte Green",
  "Candy Apple Red",
  "Midnight Purple",
  "Chameleon",
  "Rose Gold",
  "Champagne Gold",
  "Dual-Tone (Black & White)",
  "Dual-Tone (Red & Black)",
  "Chrome Finish",
  "Satin Finish",
  "Carbon Fiber Wrap",
  "Neon Green",
  "Lava Orange",
  "Deep Purple",
  "Bright Yellow",
];

export type TSeatingCapacity = "2" | "4" | "5" | "6" | "7" | "8" | "9" | "10+";
export type TCondition = "New" | "Used" | "Certified Pre-Owned";

export type TCar = {
  brand: TCarBrand;
  model: string;
  category: TCategory;
  madeIn: string;
  condition: TCondition;
  color: string;
  price: number;
  year: string;
  seatingCapacity: TSeatingCapacity;
  description?: string;
  image: string | File;
  galleryImage?: string[] | File[];
};

export interface TCarInfo extends TCar {
  _id: string;
  inStock: boolean;
  carBrandLogo: string;
  createdAt: string;
  negotiable: boolean;
}
export interface TCarDataInfo extends TCar {
  _id: string;
  inStock: boolean | string;
  carBrandLogo: string;
  createdAt: string;
  negotiable: boolean | string;
}

export type TcarInfoPayload = {
  basicInfo: TCar;
  engineInfo: TCarEngine;
  deliveryAndPayment: TDeliveryAndPayment;
  registrationData: TRegistrationdata;
  safetyFeature?: TSafetyFeature;
  serviceHistory?: TserviceHistory;
};
