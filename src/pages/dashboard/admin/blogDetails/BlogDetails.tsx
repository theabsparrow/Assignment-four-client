import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  console.log(id);
  return <div>this is blog details</div>;
};

export default BlogDetails;
