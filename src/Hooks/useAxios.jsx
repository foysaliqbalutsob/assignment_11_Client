// import axios from "axios";
// import { useEffect } from "react";
// import useAuth from "./useauth";
// import { useNavigate } from "react-router";

// const useAxios = () => {
//   const { user, signOutUser } = useAuth();
//   const navigate = useNavigate();

//   const axiosSecure = axios.create({
//     baseURL: "http://localhost:3000",
//   });

//   useEffect(() => {
    
//     const requestInterceptor = axiosSecure.interceptors.request.use(
//       (config) => {
//         if (user?.accessToken) {
//           config.headers.Authorization = `Bearer      ${user. accessToken }`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

    
//     const responseInterceptor = axiosSecure.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response) {
//           const status = error.response.status;
//           if (status === 401 || status === 403) {
//             signOutUser().then(() => {
//               navigate("/login");
//             });
//           }
//         }
//         return Promise.reject(error);
//       }
//     );

//     // Cleanup
//     return () => {
//       axiosSecure.interceptors.request.eject(requestInterceptor);
//       axiosSecure.interceptors.response.eject(responseInterceptor);
//     };
//   }, [user?.accessToken, navigate, signOutUser]);

//   return axiosSecure;
// };

// export default useAxios;



import axios from "axios";
import useAuth from "./useauth";
import { useNavigate } from "react-router";

const useAxios = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "https://assignment-server-mu-nine.vercel.app",
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

