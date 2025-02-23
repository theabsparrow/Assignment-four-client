import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-lg">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-all"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default Error;
