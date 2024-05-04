import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);
  const isAuthenticated =
    auth?.accessToken &&
    auth?.user &&
    auth?.role !== null
  return !!isAuthenticated;
}