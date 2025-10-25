import { TBlog } from "@/interface/blogInterface/blog.interface";

export const blogInitialState = {
  searchTerm: "",
  sort: "",
  page: 1,
  limit: "",
};

export interface TBlogInfo extends TBlog {
  addTags: string[];
  removeTags: string[];
}

export const blogInfoInitialState: Partial<TBlogInfo> = {
  addTags: [],
  removeTags: [],
};
