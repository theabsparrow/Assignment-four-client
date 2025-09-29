export type TFilterState = {
  brand: string;
  model: string;
  minPrice: number;
  maxPrice: number;
  year: string;
  category: string;
  condition: string;
  inStock: string;
};

export interface TInitialState extends TFilterState {
  searchTerm: string;
  sort: string;
  page: number;
  limit: "";
}
