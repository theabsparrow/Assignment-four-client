export type TBlogStatus = "draft" | "published";
type TBlogAuthor = {
  _id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  profileImage?: string;
};
export type TBlog = {
  _id: string;
  authorId: TBlogAuthor;
  title: string;
  content: string;
  image?: string | File;
  tags?: string | string[];
  status: TBlogStatus;
  reaction: number;
  comments: number;
  createdAt: string;
};
