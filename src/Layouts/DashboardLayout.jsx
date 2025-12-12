import React from "react";
import { FaHome, FaShippingFast, FaTasks, FaUser } from "react-icons/fa";
import { MdAssignment, MdDeliveryDining, MdPayment } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import UseRole from "../Hooks/UseRole";

const DashboardLayout = () => {
  const { role, roleLoading } = UseRole();
  console.log(role)

  if (roleLoading || !role) {
  return <p className="text-center py-8 font-bold">Loading...</p>;
}

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">Navbar Title</div>
          </nav>

          {/* Page content here */}
          <Outlet></Outlet>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            <ul className="menu w-full grow">
              
              {/* Home */}
              <Link to={"/"}>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  <FaHome size={25} />
                  <span className="is-drawer-close:hidden">
                    Homepage
                  </span>
                </button>
              </Link>

              {/* rider only page */}

               {role.role === "rider" && (
                <li>
                  <NavLink
                    to="/dashboard/assign-delivery"
                    data-tip="Accept Delivery"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right 
                        ${isActive ? "text-primary font-semibold underline" : "text-gray-600"}`
                    }
                  >
                    <FaTasks size={25} />
                    <span className="is-drawer-close:hidden">
                      Accept Delivery
                    </span>
                  </NavLink>
                </li>
              )}




               

                 

              {/* Admin Menu */}
              {role.role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/users-management"
                      data-tip=" Users management"
                      className={({ isActive }) =>
                        `is-drawer-close:tooltip is-drawer-close:tooltip-right 
                        ${isActive ? "text-primary font-semibold underline" : "text-gray-600"}`
                      }
                    >
                      <FaUser size={25} />
                      <span className="is-drawer-close:hidden">
                        Users management
                      </span>
                    </NavLink>
                  </li>

                  {/* Assign Rider */}

                  <li>
                    <NavLink
                      to="/dashboard/assign-Riders"
                       data-tip="Assign Rider"
                      className={({ isActive }) =>
                        `is-drawer-close:tooltip is-drawer-close:tooltip-right 
                        ${isActive ? "text-primary font-semibold underline" : "text-gray-600"}`
                      }
                    >
                      <MdAssignment  size={25} />
                      <span className="is-drawer-close:hidden">
                        Assign Rider
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/approve-riders"
                      data-tip="Approve Rider"
                      className={({ isActive }) =>
                        `is-drawer-close:tooltip is-drawer-close:tooltip-right 
                        ${isActive ? "text-primary font-semibold underline" : "text-gray-600"}`
                      }
                    >
                      <FaShippingFast size={25} />
                      <span className="is-drawer-close:hidden">
                        Approve Rider
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Common Menu */}
              <li>
                <NavLink
                  to="/dashboard/my-parcels"
                  data-tip=" My Parcel"
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right 
                    ${isActive ? "text-primary font-semibold underline" : "text-gray-600"}`
                  }
                >
                  <MdDeliveryDining size={25} />
                  <span className="is-drawer-close:hidden">
                    My Parcel
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/payment-history"
                  data-tip="payment-history"
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right 
                    ${isActive ? "text-primary font-semibold underline" : "text-gray-600"}`
                  }
                >
                  <MdPayment size={25} />
                  <span className="is-drawer-close:hidden">
                    payment-history
                  </span>
                </NavLink>
              </li>

              {/* Settings */}
              <li>
                <button
                data-tip="Settings"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>

                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
