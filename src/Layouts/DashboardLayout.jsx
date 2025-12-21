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
  console.log(userData);
  console.log(userData?.role);
  const { user } = useAuth();

  if (roleLoading) {
    return <p className="text-center py-8 font-bold">Loading...</p>;
  }

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
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
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
              </Link>
            </li>

            {user && userData?.role === "hr" && (
              <>
                <li>
                  <Link
                    to="/dashboard/add-asset"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Asset"
                  >
                    <IoIosAddCircle />

                    <span className="is-drawer-close:hidden">Add Asset</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/asset-list"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Asset List"
                  >
                    <MdOutlineWebAsset />

                    <span className="is-drawer-close:hidden">Asset List</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/all-request"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Requests"
                  >
                    <TbPointerQuestion />

                    <span className="is-drawer-close:hidden">All Requests</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/employee-list"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Employee List"
                  >
                    <CiViewList />

                    <span className="is-drawer-close:hidden">
                      {" "}
                      Employee List
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/package"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip=" Upgrade Package"
                  >
                    <FcPackage />

                    <span className="is-drawer-close:hidden">
                      {" "}
                      Upgrade Package
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/your-package"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="your-package"
                  >
                    <FaHistory />
                    <span className="is-drawer-close:hidden">your-package</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/hr-rechart"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Asset Analytics"
                  >
                    <IoMdAnalytics />
                    <span className="is-drawer-close:hidden">
                      Asset Analytics
                    </span>
                  </Link>
                </li>
              </>
            )}

            {user && userData?.role === "employee" && (
              <>
                <>
                  



                   <li>
                    <Link
                      to="/dashboard/my-asset"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="My asset"
                    >
                      <MdOutlineWebAsset />
                      <span className="is-drawer-close:hidden">
                    My asset
                      </span>
                    </Link>
                  </li>

                 

                     <li>
                    <Link
                      to="/dashboard/my-team"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="My Team"
                    >
                      <GiDarkSquad />
                      <span className="is-drawer-close:hidden">
                      My Team
                      </span>
                    </Link>
                  </li>






                  <li>
                    <Link
                      to="/dashboard/request-asset"
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Request Asset"
                    >
                      <VscGitPullRequestGoToChanges />
                      <span className="is-drawer-close:hidden">
                        Request Asset
                      </span>
                    </Link>
                  </li>
                </>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
