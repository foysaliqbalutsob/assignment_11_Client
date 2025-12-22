import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import useUserRole from "../Hooks/useUserRole";

const DashboardHome = () => {
  const { userData } = useUserRole();
  // const axiosSecure = useAxios();

  // // --- Fetch Assets ---
  // const { data: assetsData = [] } = useQuery({
  //   queryKey: ["assetsDashboard", userData?.email],
  //   queryFn: async () => {
  //     try {
  //       if (userData?.role === "hr") {
  //         const res = await axiosSecure.get("/assigned-assets");
  //         return res.data.data || [];
  //       } else if (userData?.role === "employee") {
  //         // Employee sees only their own assets
  //         const res = await axiosSecure.get("/assigned-assets/self");
  //         return res.data.data || [];
  //       }
  //       return [];
  //     } catch (err) {
  //       console.error("Assets fetch error:", err);
  //       return [];
  //     }
  //   },
  //   enabled: !!userData,
  // });

  // // --- Fetch Pending Requests ---
  // const { data: pendingData = [] } = useQuery({
  //   queryKey: ["pendingRequests", userData?.email],
  //   queryFn: async () => {
  //     try {
  //       if (userData?.role === "hr") {
  //         const res = await axiosSecure.get("/asset-requests/by-hr");
  //         return res.data || [];
  //       } else if (userData?.role === "employee") {
  //         const res = await axiosSecure.get(`/asset-requests/user/${userData.email}`);
  //         return res.data || [];
  //       }
  //       return [];
  //     } catch (err) {
  //       console.error("Pending requests fetch error:", err);
  //       return [];
  //     }
  //   },
  //   enabled: !!userData,
  // });

  // // --- Total Employees (HR only) ---
  // const totalEmployees =
  //   userData?.role === "hr"
  //     ? [...new Set(assetsData.map((item) => item.employeeEmail))].length
  //     : 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Welcome, {userData?.displayName || "User"}!
      </h1>
      <p className="text-gray-500">
        Role: <span className="font-semibold">{userData?.role}</span>
      </p>


        <div className="bg-base-200 rounded-lg p-6 shadow space-y-4">
        {userData?.role === "hr" ? (
          <>
            <h2 className="text-xl font-bold">HR Dashboard</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Create new assets and assign to employees</li>
              <li>Go to Employee page to assign assets</li>
              <li>Approve or reject asset requests</li>
              <li>Monitor assigned assets and employee limits</li>
              <li>View dashboard summaries and charts</li>
            </ul>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold">Employee Dashboard</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>View assigned assets</li>
              <li>Request new assets</li>
              <li>Track pending requests</li>
              <li>View asset return deadlines</li>
            </ul>
          </>
        )}
      </div>

      {/* Dashboard Cards */}
      { userData?.role ==='hr' && 


<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow p-4">
          {/* <h3 className="text-sm text-gray-500">Total Assets</h3> */}
          {/* <p className="text-2xl font-bold">{assetsData.length}</p> */}
        </div>

        {/* <div className="card bg-base-100 shadow p-4">
          <h3 className="text-sm text-gray-500">Pending Requests</h3>
          <p className="text-2xl font-bold">
            {pendingData.filter((r) => r.requestStatus === "pending").length}
          </p>
        </div> */}

        {/* {userData?.role === "hr" && (
          <div className="card bg-base-100 shadow p-4">
            <h3 className="text-sm text-gray-500">Total Employees</h3>
            <p className="text-2xl font-bold">{totalEmployees}</p>
          </div>
        )} */}

        
{/* 
        <div className="card bg-primary text-white shadow p-4 cursor-pointer hover:bg-primary-focus">
          <h3 className="text-sm">Quick Action</h3>
          <p className="mt-2">
            {userData?.role === "hr" ? "Add/Assign Asset" : "Request an Asset"}
          </p>
        </div> */}
      </div>
      }

      {/* Role-Based Info Section */}
    
    </div>
  );
};

export default DashboardHome;
