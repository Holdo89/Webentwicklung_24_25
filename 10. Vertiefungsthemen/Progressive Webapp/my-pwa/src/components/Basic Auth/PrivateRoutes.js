import React, { Suspense } from "react";
import { UserProvider } from "./UserContext.js";
import Fallback from "../Fallback.js";
import { Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  return (
    <UserProvider>
      <Suspense fallback={<Fallback />}>
          <Outlet />
      </Suspense>
    </UserProvider>
  );
}
