import React from 'react';
import useUserRole from '../Hooks/useUserRole';
import useAuth from '../Hooks/useauth';
import Loading from '../Components/Loading/Loading';
import Forbidden from '../Components/Forbidden/Forbidden';

const EmployeeOnlyRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { userData, roleLoading } = useUserRole();

    
    if (loading || roleLoading) {
        return <Loading />;
    }

    
    if (!user || userData?.role !== "employee") {
        return <Forbidden />;
    }

    return children;
};

export default EmployeeOnlyRoute;
