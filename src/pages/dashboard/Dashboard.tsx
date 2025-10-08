import { USER_ROLE } from "@/config/role.const";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useAppSelector(currentUser);

  const navigate = useNavigate();
  useEffect(() => {
    if (
      user?.userRole === USER_ROLE.admin ||
      user?.userRole === USER_ROLE.superAdmin
    ) {
      navigate("/dashboard/admin/manage-users");
    } else {
      navigate("/dashboard/admin/my-orders");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Dashboard;
