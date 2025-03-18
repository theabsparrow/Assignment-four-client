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
  | "Porsche"
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
  | "Seat";

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

export type TGalleryImage = {
  url: string;
};
export type TSeatingCapacity = "2" | "4" | "5" | "6" | "7" | "8" | "9" | "10+";
export type TCondition = "New" | "Used" | "Certified Pre-Owned";
export type TPaymentMethod = "Cash on Delivery" | "Online Payment";
export type TPaymentOption = "SSLCommerz" | "Stripe" | "SurjoPay";
export type TMethod = "Home Delivery" | "Pickup" | "Express Delivery";

export type TEstimatedTime =
  | "24 hours"
  | "2 days"
  | "5 days"
  | "6 days"
  | "8 days"
  | "9 days"
  | "10 days";

export type TDeliveryMethod = {
  method: TMethod;
  estimatedTime: TEstimatedTime;
  deliveryCost: number;
};

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
  deliveryMethod: TDeliveryMethod[];
};
