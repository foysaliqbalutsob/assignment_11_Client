import { useQuery } from "@tanstack/react-query";
import useAuth from "./useauth";
import useAxios from "./useAxios";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: userData = {}, isLoading: roleLoading, refetch} = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  return { userData, roleLoading,refetch };
};

export default useUserRole;
