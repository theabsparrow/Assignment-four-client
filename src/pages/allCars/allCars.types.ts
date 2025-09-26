export type TInitialState = {
  brand: string;
  model: string;
  minPrice: number;
  maxPrice: number;
  year: string;
  category: string;
  condition: string;
  inStock: string;
};

export type TFilterProps = {
  filter: TInitialState;
  setFilter: React.Dispatch<React.SetStateAction<TInitialState>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  models: string[];
  total: number;
  maxPrice: number;
  minPrice: number;
};
