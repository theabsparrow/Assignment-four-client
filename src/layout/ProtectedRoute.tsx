import { baseApi } from "@/redux/api/baseApi";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import {
  currentToken,
  currentUser,
  logOut,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type TProtectedRouteProps = {
  children: ReactNode;
  roles?: string[];
};

const ProtectedRoute = ({ children, roles }: TProtectedRouteProps) => {
  const token = useAppSelector(currentToken);
  const user = useAppSelector(currentUser);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      const handleLogout = async () => {
        try {
          await logout(user?.userId);
          dispatch(logOut());
          dispatch(baseApi.util.resetApiState());
          navigate("/sign-in");
        } catch (error) {
          console.log(error);
        }
      };
      handleLogout();
    }
  }, [dispatch, logout, navigate, token, user?.userId]);

  useEffect(() => {
    if (!token || !user) {
      navigate("/sign-in");
    }
    if (roles?.length && (!user?.userRole || !roles.includes(user?.userRole))) {
      navigate("/sign-in");
    }
  }, [roles, token, user]);

  return children;
};

export default ProtectedRoute;
