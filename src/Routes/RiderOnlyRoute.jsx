import React from "react";
import useAuth from "../Hooks/useauth";
import UseRole from "../Hooks/UseRole";
import Loading from "../Components/Loading/Loading";
import Forbidden from "../Components/Forbidden/Forbidden";

const RiderOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = UseRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  // ❌ Not rider? Block access
  if (role.role !== "rider") {
    return <Forbidden />;
  }

  return children;
};

export default RiderOnlyRoute;
