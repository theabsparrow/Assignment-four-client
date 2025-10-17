import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommentModalState {
  open: boolean;
  replyOpen?: string | null;
}

const initialState: CommentModalState = {
  open: false,
  replyOpen: null,
};

const openCommentSlice = createSlice({
  name: "openComment",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setReplyOpen: (state, action: PayloadAction<string | null>) => {
      state.replyOpen = action.payload;
    },
    resetCommentState: () => initialState,
  },
});

export default openCommentSlice.reducer;
export const currentState = (state: RootState) => state.openCommentL;
export const { setOpen, setReplyOpen, resetCommentState } =
  openCommentSlice.actions;
