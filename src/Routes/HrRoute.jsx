import React from 'react';
import useUserRole from '../Hooks/useUserRole';
import useAuth from '../Hooks/useauth';
import Loading from '../Components/Loading/Loading';
import Forbidden from '../Components/Forbidden/Forbidden';

const HrRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { userData, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading />;
    }

    // Only allow HR role
    if (!user || userData?.role !== "hr") {
        return <Forbidden />;
    }

    return children;
};

export default HrRoute;
