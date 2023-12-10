import { getToken } from "../utils/session";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { Navigate } from "react-router-dom";


export const AdminRoute = ({ children, role }) => {
  return (
    <>
      {isLoggedIn() && isAdmin(role) ? (
        children
      ) : isLoggedIn() && !isAdmin(role) ? (
        <Navigate replace to={"/admin/dashboard"} />
      ) : (
        <Navigate replace to={"/login"} />
      )}
    </>
  );
};

export const PrivateRoute = ({ children }) => {
  return <>{isLoggedIn() ? <Navigate to={"/admin/dashboard"} /> : children}</>;
};

const isAdmin = (role) => {
  if (!role) return true;
  const token = getToken();
  if (!token) return false;

  const { data } = jwtDecode(token);
  const isValid = data.roles.includes(role);
  return isValid;
};

const isLoggedIn = () => {
  const token = getToken();
  if (!token) return false;
  const { exp } = jwtDecode(token);
  const now = new Date().valueOf();
  const isValid = moment.unix(exp) > moment(now);
  return isValid;
};
