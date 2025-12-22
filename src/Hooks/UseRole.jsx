import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useauth';
import useAxios from './useAxios';
import Loading from '../Components/Loading/Loading';


const UseRole = () => {
    const {user} = useAuth();
    const axiosSecure = useAxios();

    
    const { data: role = 'user', isLoading : roleLoading }=useQuery(
        {
            queryKey:['user-role',user.email],
            queryFn: async () =>{
                const res = await axiosSecure.get(`/users/${user.email}/role`);
                 console.log(res.data)
                return res.data;
            }
        }


    )
   

    
    return{ role, roleLoading };
};

export default UseRole;