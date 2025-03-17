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

export type TGalleryImage = {
  url: string;
};
export type TSeatingCapacity = "2" | "4" | "5" | "6" | "7" | "8" | "9" | "10+";
export type TCondition = "New" | "Used" | "Certified Pre-Owned";
export type TPaymentMethod = "Cash on Delivery" | "Online Payment";
export type TPaymentOption = "SSLCommerz" | "Stripe" | "SurjoPay";

export type TCarInfo = {
  brand: TCarBrand;
  model: string;
  year: string;
  price: number;
  category: TCategory;
  condition: TCondition;
  color: string;
  description: string;
  seatingCapacity: TSeatingCapacity;
  madeIn: string;
  country: string;
  image?: string;
  galleryImage?: TGalleryImage[];
  paymentMethod: TPaymentMethod[];
  paymentOption: TPaymentOption[];
};
