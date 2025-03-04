type TCarListingInitial = {
  brand: string;
  model: string;
  minPrice: number;
  maxPrice: number;
  year: string;
  category: string;
  condition: string;
  inStock: null | boolean | string;
};
export const carListingInitalState: TCarListingInitial = {
  brand: "",
  model: "",
  minPrice: 0,
  maxPrice: 100000000,
  year: "",
  category: "",
  condition: "",
  inStock: null,
};
