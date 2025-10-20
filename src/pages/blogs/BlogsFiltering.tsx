import { blogSorting } from "@/const/blog.const";
import { TValue } from "@/const/carInfo.const";
import {
  currentBlogFilter,
  resetFilter,
  setSearchTerm,
  setSort,
} from "@/redux/features/blog/blogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const BlogsFiltering = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(currentBlogFilter);
  return (
    <section className="space-y-2 lg:px-2 pt-1 lg:flex items-center justify-between bg-gray-200 dark:bg-gray-800 py-4">
      <input
        type="text"
        placeholder="Search items"
        className="p-2 border border-gray-500 rounded-lg shadow-sm bg-[#f0f3f8] dark:bg-gray-700 outline-cyan-400"
        value={query.searchTerm}
        onChange={(e) => {
          const value = e.target.value;
          dispatch(setSearchTerm(value));
        }}
      />
      <div className="flex items-center bg-[#f0f3f8] dark:bg-gray-700 p-2">
        <h1 className="text-gray-500 dark:text-gray-300 font-semibold ">
          {" "}
          Sort by :
        </h1>
        <select
          value={query?.sort}
          onChange={(e) => {
            const value = e.target.value as string;
            dispatch(setSort(value));
          }}
          className="px-5 rounded outline-none bg-transparent "
        >
          <option value="select category">Select an option</option>
          {blogSorting.map((blogSortOrder: TValue) => (
            <option
              key={blogSortOrder.value as string}
              value={blogSortOrder.value as string}
              className="dark:bg-gray-700"
            >
              {blogSortOrder.label}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => {
          dispatch(resetFilter());
        }}
        className="bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-600 duration-500 "
      >
        Reset
      </button>
    </section>
  );
};

export default BlogsFiltering;
