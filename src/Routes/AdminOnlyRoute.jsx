import React from 'react';
import useAuth from '../Hooks/useauth';
import Loading from '../Components/Loading/Loading';
import UseRole from '../Hooks/UseRole';
import Forbidden from '../Components/Forbidden/Forbidden';

const AdminOnlyRoute = ({children}) => {
    const {user , loading} = useAuth();
    const {role, roleLoading} =UseRole()
    console.log(role)


    if(loading || roleLoading){
        return <Loading></Loading>

    }

    if(role.role !== 'admin'){
      return <Forbidden></Forbidden>

    }


    return children;
};

export default AdminOnlyRoute;