import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCookie } from "./getCookie";
import jwt_decode from "jwt-decode";
import Page from "./Page";
import CommonSidebar from "../Portal/Sidebar/Sidebar";
import { Suspense } from "react";
import { checkIfAuthenticated } from "../Authentication/checkIfAuthenticated";
import { UserProvider } from "../Portal/Users/UserContext";

const PrivateRoutes = () => {
  var location = useLocation();
  let isAuthenticated = checkIfAuthenticated();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  var jwt = getCookie("jwt");
  var Role = 0;
  try {
    var decoded = jwt_decode(jwt);
    Role = decoded.Role;
  } catch (e) {
    console.log(e);
  }
  return Role !== "0" ? (
    <UserProvider>
      <Suspense fallback={<CommonSidebar />}>
        <Page>
          <Outlet />
        </Page>
      </Suspense>
    </UserProvider>
  ) : (
    <Navigate to="/pending" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
