import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { blogInitialState } from "./blogSlice.const";
import { RootState } from "@/redux/store";

const blogFIlterSlice = createSlice({
  name: "blogFilter",
  initialState: blogInitialState,
  reducers: {
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
    resetFilter: () => blogInitialState,
  },
});

export default blogFIlterSlice.reducer;
export const { setSearchTerm, setSort, setPage, resetFilter } =
  blogFIlterSlice.actions;
export const currentBlogFilter = (state: RootState) => state.blogFilter;
