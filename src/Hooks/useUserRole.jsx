import { useQuery } from "@tanstack/react-query";
import useAuth from "./useauth";
import useAxios from "./useAxios";
import { useState } from "react";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [dateOfBirth, setDateOfBirth] = useState("");

  const {
    data: userData = {},
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
  console.log(userData.dateOfBirth);

  return { userData, roleLoading, refetch, };
};

export default useUserRole;
