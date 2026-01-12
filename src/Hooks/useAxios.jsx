
import axios from "axios";
import useAuth from "./useauth";
import { useNavigate } from "react-router";

const useAxios = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "https://assignment-server-mu-nine.vercel.app",
    // baseURL: "http://localhost:3000/",
  });

  // Request interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  
  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401 || status === 403) {
          signOutUser().then(() => navigate("/login"));
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxios;

