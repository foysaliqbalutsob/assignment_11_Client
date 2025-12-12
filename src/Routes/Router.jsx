import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Components/Home/Home";
import Coverage from "../Components/Home/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Components/Login/Login";
import Registration from "../Components/Registration/Registration";
import BeARider from "../Components/beArider/BeARider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/SenParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";

import MyParcel from "../Pages/Dashboard/Myparcel";
import Payment from "../Pages/Dashboard/Payment";
import PaymentSuccess from "../Pages/Dashboard/paymentSuccess";
import PaymentCancel from "../Pages/Dashboard/PaymentCancel";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRider from "../Pages/Dashboard/ApproveRider/ApproveRider";
import UsersManagement from "../Pages/Dashboard/UsersManagemenr/UsersManagement";
import AdminOnlyRoute from "./AdminOnlyRoute";
import AsssignRiders from "../Pages/Dashboard/Assign Riders/AsssignRiders";
import AcceptDeliverByRider from "../Pages/Accept-deliver-by-rider/AcceptDeliverByRider";
import RiderOnlyRoute from "./RiderOnlyRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
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
      },



    ]

  }


  ,      {
  path: '/dashboard',
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    {
      path: 'my-parcels',   
      element: <MyParcel />
    },
    {
      path: 'payment/:parcelId', 
      element: <Payment />
    },
    {
      path: "payment-success",
      element:<PaymentSuccess></PaymentSuccess>
    },
     {
      path: "payment-cancel",
      element:<PaymentCancel></PaymentCancel>
    },
    {
      path:'payment-history',
      element:<PaymentHistory></PaymentHistory>
    },
    {
      path:'approve-riders',
      element:<AdminOnlyRoute>
        <ApproveRider></ApproveRider>
      </AdminOnlyRoute>
    },
    {
      path:'users-management',
      element:<AdminOnlyRoute>
        <UsersManagement></UsersManagement>
      </AdminOnlyRoute>
    },
    {
      path:'assign-Riders',
      element:<AdminOnlyRoute>
        <AsssignRiders></AsssignRiders>
      </AdminOnlyRoute>
    },
     {
      path:'assign-delivery',
      element:<RiderOnlyRoute>
        <AcceptDeliverByRider></AcceptDeliverByRider>
      </RiderOnlyRoute>
        
      
    }


    
  ]
}

]);
