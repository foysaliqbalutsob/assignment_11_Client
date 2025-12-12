import React from 'react';
import Logo from '../Components/Logo/Logo';
import authImg from '../assets/banner/registration.jpg'
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <Logo></Logo>
            <div className='flex max-w-7xl mx-auto '>
                <div className='flex-1 '>
                    <Outlet></Outlet>

                </div>
                <div className='flex-1'>
                    <img src={authImg}  alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;