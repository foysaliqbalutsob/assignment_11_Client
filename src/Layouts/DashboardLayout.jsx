import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FcPackage } from "react-icons/fc";
import useUserRole from "../Hooks/useUserRole";
import useAuth from "../Hooks/useauth";
import { FaHistory } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { TbPointerQuestion } from "react-icons/tb";
import { MdOutlineWebAsset } from "react-icons/md";
import { IoIosAddCircle, IoMdAnalytics } from "react-icons/io";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { GiDarkSquad } from "react-icons/gi";

const DashboardLayout = () => {
  const { userData, roleLoading } = useUserRole();
  const { user } = useAuth();

  if (roleLoading) {
    return <p className="text-center py-8 font-bold">Loading...</p>;
  }

 const getNavLinkClass = ({ isActive }) =>
  `flex items-center gap-2 p-2 rounded-md tooltip tooltip-right ${
    isActive ? "text-blue-600 font-semibold underline" : "text-gray-600"
  }`;

  return (
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
          <div className="px-4 font-bold">Dashboard</div>
        </nav>

        {/* Page content */}
        <Outlet />
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
            <li className="tooltip tooltip-right" data-tip="Homepage">
              <NavLink to="/" className={getNavLinkClass}>
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
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>

            {/* HR Links */}
            {user && userData?.role === "hr" && (
              <>
                <li>
                  <NavLink to="/dashboard/add-asset" className={getNavLinkClass} data-tip="Add Asset">
                    <IoIosAddCircle size={20} />
                    <span className="is-drawer-close:hidden">Add Asset</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/asset-list" className={getNavLinkClass} data-tip="Asset List">
                    <MdOutlineWebAsset size={20}/>
                    <span className="is-drawer-close:hidden">Asset List</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/all-request" className={getNavLinkClass} data-tip="All Requests">
                    <TbPointerQuestion size={20} />
                    <span className="is-drawer-close:hidden  ">All Requests</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/employee-list" className={getNavLinkClass} data-tip="Employee List">
                    <CiViewList size={20} />
                    <span className="is-drawer-close:hidden">Employee List</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/package" className={getNavLinkClass} data-tip="Upgrade Package">
                    <FcPackage size={20} />
                    <span className="is-drawer-close:hidden">Upgrade Package</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/your-package" className={getNavLinkClass} data-tip="Your Package">
                    <FaHistory size={20} />
                    <span className="is-drawer-close:hidden">Your Package</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/hr-rechart" className={getNavLinkClass} data-tip="Asset Analytics">
                    <IoMdAnalytics size={20} />
                    <span className="is-drawer-close:hidden">Asset Analytics</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Employee Links */}
            {user && userData?.role === "employee" && (
              <>
                <li>
                  <NavLink to="/dashboard/my-asset" className={getNavLinkClass} data-tip="My Asset">
                    <MdOutlineWebAsset size={20} />
                    <span className="is-drawer-close:hidden">My Asset</span>
                  </NavLink>
                </li>

               

                <li>
                  <NavLink to="/dashboard/request-asset" className={getNavLinkClass} data-tip="Request Asset">
                    <VscGitPullRequestGoToChanges size={20} />
                    <span className="is-drawer-close:hidden">Request Asset</span>
                  </NavLink>
                </li>

                 <li>
                  <NavLink to="/dashboard/my-team" className={getNavLinkClass} data-tip="My Team">
                    <GiDarkSquad size={20} />
                    <span className="is-drawer-close:hidden">My Team</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
