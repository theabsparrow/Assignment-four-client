import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { blogInfoInitialState } from "./blogSlice.const";
import { RootState } from "@/redux/store";
import { TBlogStatus } from "@/interface/blogInterface/blog.interface";

const blogInfoSlice = createSlice({
  name: "blogInfoSlice",
  initialState: blogInfoInitialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setStatus: (state, action: PayloadAction<TBlogStatus>) => {
      state.status = action.payload;
    },
    setAddTags: (state, action: PayloadAction<string>) => {
      state.addTags?.push(action.payload);
    },
    setRemoveTags: (state, action: PayloadAction<string>) => {
      state.removeTags?.push(action.payload);
    },
    resetBlogInfo: () => blogInfoInitialState,
  },
});

export default blogInfoSlice.reducer;
export const {
  setTitle,
  setContent,
  setStatus,
  setAddTags,
  setRemoveTags,
  resetBlogInfo,
} = blogInfoSlice.actions;
export const currentBlogInfo = (state: RootState) => state.blogInfoSlice;
