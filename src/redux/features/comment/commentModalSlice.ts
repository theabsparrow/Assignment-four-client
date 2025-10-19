import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommentModalState {
  replyOpen?: string | null;
}

const initialState: CommentModalState = {
  replyOpen: null,
};

const openCommentSlice = createSlice({
  name: "openComment",
  initialState,
  reducers: {
    setReplyOpen: (state, action: PayloadAction<string | null>) => {
      state.replyOpen = action.payload;
    },
    resetCommentState: () => initialState,
  },
});

export default openCommentSlice.reducer;
export const currentState = (state: RootState) => state.openCommentL;
export const { setReplyOpen, resetCommentState } = openCommentSlice.actions;
