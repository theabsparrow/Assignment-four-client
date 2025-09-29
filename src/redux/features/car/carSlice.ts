import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFilterState } from "./carSlice.type";
import { initialState } from "./carSlice.const";
import { RootState } from "@/redux/store";

const carFilterSlice = createSlice({
  name: "carFilter",
  initialState: initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<TFilterState>>) => {
      return { ...state, ...action.payload };
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.page = 1;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetFilter: () => initialState,
  },
});

export const { setFilter, setSearchTerm, setSort, setPage, resetFilter } =
  carFilterSlice.actions;
export default carFilterSlice.reducer;
export const currentFilter = (state: RootState) => state.carFilter;
