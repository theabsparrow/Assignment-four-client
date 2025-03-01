import { baseApi } from "@/redux/api/baseApi";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import {
  currentToken,
  currentUser,
  logOut,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type TProtectedRouteProps = {
  children: ReactNode;
  roles?: string[];
};

const ProtectedRoute = ({ children, roles }: TProtectedRouteProps) => {
  const token = useAppSelector(currentToken);
  const user = useAppSelector(currentUser);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [needLogout, setNeedLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (needLogout) {
      const handleLogout = async () => {
        try {
          await logout(user?.userEmail || "");
          dispatch(logOut());
          dispatch(baseApi.util.resetApiState());
          navigate("/sign-in");
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      };
      handleLogout();
    }
  }, [dispatch, logout, navigate, needLogout, user?.userEmail]);

  useEffect(() => {
    if (!token || !user) {
      setNeedLogout(true);
    }
    if (roles?.length && (!user?.userRole || !roles.includes(user?.userRole))) {
      setNeedLogout(true);
    }
  }, [roles, token, user]);
  if (needLogout) {
    return <Navigate to="/sign-in" />;
  }
  return children;
};

export default ProtectedRoute;
