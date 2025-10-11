export type TFilterState = {
  brand: string;
  model: string;
  minPrice: number;
  maxPrice: number;
  year: string;
  category: string;
  condition: string;
  inStock: string;
  negotiable: string;
  madeIn: string;
};

export interface TInitialState extends TFilterState {
  searchTerm: string;
  sort: string;
  page: number;
  limit: "";
}
