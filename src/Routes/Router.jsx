import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Components/Home/Home";

import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Components/Login/Login";
import Registration from "../Components/Registration/Registration";

import PrivateRoute from "./PrivateRoute";

import DashboardLayout from "../Layouts/DashboardLayout";


import MyAsset from "../Pages/Employee/MyAsset";
import MyTeam from "../Pages/Employee/MyTeam";
import RequestAsset from "../Pages/Employee/RequestAsset";
import AddAsset from "../Pages/HR/AddAsset";
import AssetList from "../Pages/HR/AssetList";
import AllRequests from "../Pages/HR/AllRequests";
import EmployeeList from "../Pages/HR/EmployeeList";
import EmployeeRegistration from "../Components/Registration/EmployeeRegistration";
import Profile from "../Components/Profile/Profile";
import Package from "../Pages/HR/Package";
import HrRoute from "./HrRoute";
import EmployeeOnlyRoute from "./EmployeeOnlyRoute";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess";
import YourPackage from "../Pages/HR/YourPackage";
import PaymentCancel from "../Pages/Dashboard/PaymentCancel";
import ForgetPassword from "../Components/Registration/ForgetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path:'/profile',
        element:<PrivateRoute>
          <Profile></Profile>
        </PrivateRoute>
      },


      {
        path:'my-asset',
        element:
        <PrivateRoute>
          <EmployeeOnlyRoute>
          
            <MyAsset></MyAsset>
       
        </EmployeeOnlyRoute>
         </PrivateRoute>
      },
       {
        path:'my-team',
        element:
          <PrivateRoute>
            <EmployeeOnlyRoute>
              <MyTeam></MyTeam>
            </EmployeeOnlyRoute>
          
        </PrivateRoute>
        
      },
       {
        path:'request-asset',
        element:
          <PrivateRoute>
            <EmployeeOnlyRoute>
               <RequestAsset></RequestAsset>

            </EmployeeOnlyRoute>
         
        </PrivateRoute>
        
      },

      // HR


      {
        path:'add-asset',
        element:<PrivateRoute>
          <AddAsset></AddAsset>
        </PrivateRoute>
      },
      {
        path:'Asset-list',
        element:<AssetList></AssetList>
      },
      {
        path:'all-request',
        element:<AllRequests></AllRequests>
      },
      {
        path:'employee-list',
        element:<EmployeeList></EmployeeList>
      },
       {
        path:'package',
        element:<HrRoute>
        <PrivateRoute>
          <Package></Package>
        </PrivateRoute>
        </HrRoute>
      },{
        path:'/dashboard/payment-success',
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path:'your-package',
        element:<HrRoute>
        <YourPackage></YourPackage>
        </HrRoute>
        
        
      },
      {
        path:'/dashboard/payment-cancel',
        element: <PaymentCancel></PaymentCancel>
      },
    
     
      
      

    ],
  },


  {
    path:'/',
    element:<AuthLayout></AuthLayout>,
    children: [
      {
        path: '/login',
        element:<Login></Login>
      },
      {
        path:'/registration',
        element:<Registration></Registration>
      },{
        path:'/employee-registration',
        element:<EmployeeRegistration></EmployeeRegistration>
      },
      {
        path:'/forget-password',
        element:<ForgetPassword></ForgetPassword>
      }



    ]

  }


  ,     
 


    


      
      

      // {
      //   path:'package',
      //   element:<EmployeeOnlyRoute>
      //     <Package></Package>
      //   </EmployeeOnlyRoute>
  
      // },
    






  
     


    
  


]);
