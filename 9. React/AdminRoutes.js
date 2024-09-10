import { Navigate, Outlet, useLocation} from "react-router-dom";
import { getCookie } from "./getCookie";
import jwt_decode from "jwt-decode";
import { checkIfAuthenticated } from "../Authentication/checkIfAuthenticated";

const AdminRoutes = () => {
  var location = useLocation();
  let isAuthenticated = checkIfAuthenticated()
  if(!isAuthenticated)
  {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
    var jwt = getCookie("jwt");
    var Role = 0;

    try {
      var decoded = jwt_decode(jwt);
      Role = decoded.Role;
    } catch (e) {
      console.log(e);
    }

    return Role === "2" || Role === "3" ? (
      <Outlet />
    ) : (
      <Navigate to="/nopermission" replace state={{ from: location }} />
    );
};

export default AdminRoutes;
