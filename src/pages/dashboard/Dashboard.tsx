import { USER_ROLE } from "@/config/role.const";
import useMyProfile from "@/hook/useMyProfile";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const myprofile = useMyProfile(["role"]) || undefined;
  const navigate = useNavigate();
  useEffect(() => {
    if (
      myprofile.myProfile?.role === USER_ROLE.admin ||
      myprofile.myProfile?.role === USER_ROLE.superAdmin
    ) {
      navigate("/dashboard/manage-users");
    } else {
      navigate("/dashboard/my-orders");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Dashboard;
