import { TValue } from "@/myComponent/formInput/formInput.const";
import { getPastYears } from "@/utills/generateYears";
import { TCarBrand, TCategory } from "./addcar.interface";

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
];
export const seatingCapacities: TValue[] = [
  { value: "", label: "Select seating capacity" },
  { value: "2", label: "2" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10+", label: "10+" },
];

const carColors: string[] = [
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

export const requiredFields: string[] = [
  "brand",
  "category",
  "year",
  "country",
  "madeIn",
  "color",
  "paymentOption",
  "paymentMethod",
  "deliveryMethod",
];
export default carColors;

export const years = getPastYears(25);

export const paymentOptions: string[] = ["SSLCommerz", "Stripe", "SurjoPay"];
export const paymentMethods: string[] = ["Cash on Delivery", "Online Payment"];
export const deliveryMethod: string[] = [
  "Home Delivery",
  "Pickup",
  "Express Delivery",
];
export const estimatedTime: TValue[] = [
  { value: "24 hours", label: "Available Immediately" },
  { value: "2 days", label: "1-2 Business Days" },
  { value: "5 days", label: "3-5 Business Days" },
  { value: "6 days", label: "6 Business Days" },
  { value: "8 days", label: "7-8 Business Days" },
  { value: "9 days", label: "9 Business Days" },
  { value: "10 days", label: "10 Business Days" },
];
