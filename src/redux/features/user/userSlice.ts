import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./userSlice.const";
import { TUserFilterState } from "./userSlice.type";
import { RootState } from "@/redux/store";

const userFilterSlice = createSlice({
  name: "userFilter",
  initialState: initialState,
  reducers: {
    setUserFilter: (
      state,
      action: PayloadAction<Partial<TUserFilterState>>
    ) => {
      return { ...state, ...action.payload };
    },
    setUserSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.page = 1;
    },
    setUserSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
      state.page = 1;
    },
    setUserPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetUserFilter: () => initialState,
  },
});

export const {
  setUserFilter,
  setUserSearchTerm,
  setUserSort,
  setUserPage,
  resetUserFilter,
} = userFilterSlice.actions;
export default userFilterSlice.reducer;
export const currentUserFlter = (state: RootState) => state.userFilter;
