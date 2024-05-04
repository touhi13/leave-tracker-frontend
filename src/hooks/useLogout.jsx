import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../features/auth/authSlice";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandle = () => {
    localStorage.removeItem("auth");
    dispatch(
      userLoggedOut({
        accessToken: null,
        user: null,
        role: null
      })
    );
    navigate("/login");
  };

  return { logoutHandle };
};

export default useLogout;
