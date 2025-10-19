export type TComment = {
  _id: string;
  blogId: string;
  commentId?: string;
  userId: string;
  content: string;
  recation: number;
};

export type TCommentInfo = {
  _id: string;
  blogId: string;
  commentId?: string;
  userId: {
    name: {
      firstName: string;
      middleName?: string;
      lastName: string;
    };
    profileImage: string;
  };
  content: string;
  reaction: number;
  createdAt: string;
  replies: number;
};
