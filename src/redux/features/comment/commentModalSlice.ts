import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const openCommentSlice = createSlice({
  name: "openComment",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export default openCommentSlice.reducer;
export const currentState = (state: RootState) => state.openCommentL;
export const { setOpen } = openCommentSlice.actions;
