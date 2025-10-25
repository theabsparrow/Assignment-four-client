import { TBlogStatus } from "@/interface/blogInterface/blog.interface";
import BlogArrayEditing from "@/myComponent/blogEditingComponent/BlogArrayEditing";
import BlogDropdownComponent from "@/myComponent/blogEditingComponent/BlogDropdownComponent";
import BlogEditDescription from "@/myComponent/blogEditingComponent/BlogEditDescription";
import BlogEditingInput from "@/myComponent/blogEditingComponent/BlogEditingInput";
import BlogDetailsSceleton from "@/myComponent/loader/BlogDetailsSceleton";
import DeleteModal from "@/myComponent/modal/DeleteModal";
// import CommentModal from "@/myComponent/modal/CommentModal";
import { formatedDate } from "@/pages/myProfile/myProfile.utills";
import {
  useDeleteMyBlogMutation,
  useGetMySingleBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/features/blog/blogApi";
import {
  currentBlogInfo,
  resetBlogInfo,
  setContent,
  setStatus,
  setTitle,
} from "@/redux/features/blog/blogInfoSlice";
import { TBlogInfo } from "@/redux/features/blog/blogSlice.const";
import {
  useCreateReactionMutation,
  useGetMyReactionQuery,
} from "@/redux/features/reaction/reactionApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const MyBlogDetails = () => {
  const { id } = useParams();
  const [createReaction] = useCreateReactionMutation();
  const { data, isLoading } = useGetMySingleBlogQuery(id);
  const blog = data?.data;
  const { data: react, isLoading: loading } = useGetMyReactionQuery(blog?._id);
  const myReaction = react?.data;
  const [deleteMyBlog] = useDeleteMyBlogMutation();
  const currentBlog = useAppSelector(currentBlogInfo);
  const dispatch = useAppDispatch();
  const [updateBlog] = useUpdateBlogMutation();
  // local state
  const [userReaction, setUserReaction] = useState(blog?.reaction ?? 0);
  const [blogInfo, setBlogInfo] = useState<Partial<TBlogInfo> | null>(
    blog ?? null
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (blog) setBlogInfo(blog);
  }, [blog]);

  useEffect(() => {
    setUserReaction(blog?.reaction);
  }, [blog?.reaction]);

  const handleReaction = async () => {
    if (!myReaction) {
      setUserReaction(blog?.reaction + 1);
    } else {
      setUserReaction(blog?.reaction - 1);
    }
    try {
      const res = await createReaction(blog?._id).unwrap();
      if (!res?.success) {
        setUserReaction(blog?.reaction);
        return;
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[0].message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      if (errorInfo) {
        setUserReaction(blog?.reaction);
      }
    }
  };

  const handleSubmit = async (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!currentBlog || Object.keys(currentBlog).length === 0) {
      return toast.error("nothing to update", { duration: 3000 });
    }
    const toastId = toast.loading("updating blog info....");
    const payload = { id: blogInfo?._id, data: currentBlog };
    try {
      const res = await updateBlog(payload).unwrap();
      if (res?.data) {
        toast.success("successfully updated engine info", {
          id: toastId,
          duration: 3000,
        });
        setOpen(false);
        dispatch(resetBlogInfo());
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
      dispatch(resetBlogInfo());
    }
  };

  const confirmDelete = async (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    try {
      const res = await deleteMyBlog(blog?._id).unwrap();
      if (res?.success) {
        toast.success("blog deleted successfully ", {
          duration: 3000,
        });
        setOpen(false);
        setLoading(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[0].message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
      setLoading(false);
      navigate("/dashboard/my-blogs");
    }
  };

  if (isLoading) {
    return <BlogDetailsSceleton />;
  }
  return (
    <section className="px-2 md:px-8 lg:px-16 min-h-screen bg-gray-200 dark:bg-gray-800 rounded-lg transition-colors duration-300  pb-4 ">
      <div className="lg:w-[60vw] mx-auto space-y-4">
        {blog?.image && (
          <div className=" w-full">
            <img
              src={blog?.image}
              alt={blog?.title}
              className="w-full h-auto rounded-2xl object-cover border"
            />
          </div>
        )}
        <div className="space-y-2 px-4">
          <BlogEditingInput
            label="Title"
            name="title"
            blogInfo={blogInfo as TBlogInfo}
            setBlogInfo={setBlogInfo}
            blog={blog}
            handleChange={(value) => {
              const newValue = value as string;
              setBlogInfo({ ...blogInfo, title: newValue });
              dispatch(setTitle(newValue));
            }}
            handleSubmit={handleSubmit}
          />
          <div>
            <div className="flex items-center justify-between">
              {blog?.authorId?.profileImage ? (
                <img
                  className="w-11 h-11 rounded-full "
                  src={blog?.authorId?.profileImage}
                />
              ) : (
                <img
                  className="w-12 h-12 rounded-full "
                  src={blog?.profileIcon}
                />
              )}
              <BlogDropdownComponent
                label="Status"
                name="status"
                blogInfo={blogInfo as TBlogInfo}
                setBlogInfo={setBlogInfo}
                blog={blog}
                handleChange={(value) => {
                  const newValue = value as TBlogStatus;
                  setBlogInfo({ ...blogInfo, status: newValue });
                  dispatch(setStatus(newValue));
                }}
                options={["draft", "published"]}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className="lg:flex items-center justify-between">
              <p className="font-medium text-blue-600">
                {blog?.authorId?.name.firstName}{" "}
                {blog?.authorId?.name.middleName &&
                  blog?.authorId?.name.middleName}{" "}
                {blog?.authorId?.name.lastName}
              </p>
              <p className="flex items-center gap-2 text-sm">
                {" "}
                <span>
                  {formatedDate(new Date(blog?.createdAt)).creationDate}
                </span>{" "}
                <span>
                  {formatedDate(new Date(blog?.createdAt)).creationTime}
                </span>
              </p>
            </div>
          </div>
          <BlogEditDescription
            label="Content"
            name="content"
            blogInfo={blogInfo as TBlogInfo}
            setBlogInfo={setBlogInfo}
            blog={blog}
            handleChange={(value) => {
              const newValue = value as string;
              setBlogInfo({ ...blogInfo, content: newValue });
              dispatch(setContent(newValue));
            }}
            handleSubmit={handleSubmit}
          />
        </div>
        <BlogArrayEditing
          label="Add tags"
          value={blog?.tags ?? []}
          handleSubmit={handleSubmit}
        />
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 dark:text-gray-300 px-4">
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            {blog?.reaction} people reacted
          </p>
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            Comments: {blog?.comments}
          </p>
        </div>
        <div className="px-4">
          {loading ? (
            <div className="flex items-center gap-48">
              <span
                className={`px-2 py-1 rounded-full transition bg-gray-600 text-white text-sm font-semibold flex items-center gap-2`}
              >
                <SlLike /> Like
              </span>
              <span
                className={`px-2 py-1 rounded-full transition bg-gray-600 text-white text-sm font-semibold flex items-center gap-2`}
              >
                <FaRegComment /> Comment
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-48">
              <button
                onClick={handleReaction}
                className={`px-4 py-1 rounded-full transition text-sm font-semibold flex items-center gap-2 ${
                  userReaction || myReaction
                    ? "bg-blue-300 text-blue-700"
                    : "bg-gray-600 text-white"
                }`}
              >
                <SlLike /> {myReaction ? "Liked" : "Like"}
              </button>
              {/* <CommentModal id={_id} totalComment={comments} /> */}
            </div>
          )}
        </div>
        <div className="flex items-center justify-end px-4 pb-10">
          <DeleteModal confirmDelete={confirmDelete} label="Blog" />
        </div>
      </div>
    </section>
  );
};

export default MyBlogDetails;
