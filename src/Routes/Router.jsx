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
import HrRechart from "../Pages/HR/HrRechart";
import DashboardHome from "../Layouts/DasgboardHome";

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




      // HR


      
      
      
      

      
    
     
      
      

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

  },


  {
    path: '/dashboard',
    element:<DashboardLayout></DashboardLayout>,
    children:[
        {
      index: true,
      element: <DashboardHome />,
    },


      {
        path:'hr-rechart',
        element:<PrivateRoute>
          <HrRoute>
          <HrRechart></HrRechart>
          
          </HrRoute>
        </PrivateRoute>
      },
      {
        path:'add-asset',
        element:<PrivateRoute>
          <HrRoute>

          <AddAsset></AddAsset>
          </HrRoute>
        </PrivateRoute>
      },
      {
        path:'Asset-list',
        element:
        <PrivateRoute>
          <HrRoute>

          <AssetList></AssetList>
          </HrRoute>
        </PrivateRoute>
      },
      {
        path:'all-request',
        element:<PrivateRoute>
          <HrRoute>
          <AllRequests></AllRequests>
          
          </HrRoute>
        </PrivateRoute>
      },
      {
        path:'employee-list',
        element:<PrivateRoute>
          <HrRoute>
          <EmployeeList></EmployeeList>
          
          </HrRoute>
        </PrivateRoute>
      },
       {
        path:'package',
        element:
        <PrivateRoute>
          <HrRoute>
          <Package></Package>
          
          </HrRoute>
          
        </PrivateRoute>
        
      },
      {
        path:'your-package',
        element:<PrivateRoute>

          <HrRoute>
        <YourPackage></YourPackage>
        </HrRoute>
        </PrivateRoute>
        
        
      },
      {
        path:'payment-success',
        element: <PrivateRoute>
          <HrRoute>
          

          <PaymentSuccess></PaymentSuccess>
          </HrRoute>
        </PrivateRoute>
      },
      {
        path:'payment-cancel',
        element: <PrivateRoute>

          <HrRoute>
          <PaymentCancel></PaymentCancel>
          
          </HrRoute>
        </PrivateRoute>
      },



      // employee


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
    ]
  }


  
 


    


      
      

    






  
     


    
  


]);
