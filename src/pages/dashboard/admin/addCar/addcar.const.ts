import { TValue } from "@/myComponent/formInput/formInput.const";
import { getPastYears } from "@/utills/generateYears";

export type TCarBrand =
  | "Toyota"
  | "Hyundai"
  | "Nissan"
  | "Audi"
  | "Tesla"
  | "Ford"
  | "Land-rover"
  | "Honda"
  | "Suzuki"
  | "Mitsubishi";

export type TCategory =
  | "Sedan"
  | "SUV"
  | "Coupe"
  | "Convertible"
  | "Electric"
  | "Sports-car"
  | "Hybrid"
  | "Jeep"
  | "Luxury";

export type TSeatingCapacity = "2" | "4" | "5" | "6" | "7" | "8" | "9" | "10+";
export const carBrands: TCarBrand[] = [
  "Toyota",
  "Hyundai",
  "Nissan",
  "Audi",
  "Tesla",
  "Ford",
  "Land-rover",
  "Honda",
  "Suzuki",
  "Mitsubishi",
];
export const carCategories: TCategory[] = [
  "Sedan",
  "SUV",
  "Coupe",
  "Convertible",
  "Electric",
  "Sports-car",
  "Hybrid",
  "Jeep",
  "Luxury",
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
  "Overnight Delivery",
];
export const estimatedTime: TValue[] = [
  { value: "24 hours", label: "Available Immediately" },
  { value: "1 day", label: "Overnight" },
  { value: "2 days", label: "1-2 Business Days" },
  { value: "5 days", label: "3-5 Business Days" },
  { value: "6 days", label: "6 Business Days" },
  { value: "8 days", label: "7-8 Business Days" },
  { value: "9 days", label: "9 Business Days" },
  { value: "10 days", label: "10 Business Days" },
];
