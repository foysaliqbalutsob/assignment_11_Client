import React, { useEffect, useState } from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useauth";
import { FaUser } from "react-icons/fa";
import useUserRole from "../../../Hooks/useUserRole";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";

const Header = () => {
  const { user, signOutUser } = useAuth();
  console.log(user);
  console.log(user?.photoURL);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const { userData } = useUserRole();
  console.log(userData)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // for dark theme apply
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  console.log(userData?.role);

  const handleLogOut = () => {
    signOutUser()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const link = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold underline" : "text-gray-600"
          }
        >
          Home
        </NavLink>
      </li>

      {!user && (
        <>
          {/* HR  */}
          <li>
            <NavLink
              to="/registration"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold underline"
                  : "text-gray-600"
              }
            >
              Company Registration
            </NavLink>
          </li>

          {/* employee */}
          <li>
            <NavLink
              to="/employee-registration"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold underline"
                  : "text-gray-600"
              }
            >
              Employee Registration
            </NavLink>
          </li>
        </>
      )}

      

     {user && userData &&
     
     <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold underline" : "text-gray-600"
          }
        >
        
        {userData?.role === "employee"
      ? "Employee Dropdown"
      : userData?.role === "hr"
      ? "HR Manager Dropdown"
      : "Dashboard"}
        </NavLink>
      </li>}

    {
      user?   <li>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold underline" : "text-gray-600"
          }
        >
          Profile
        </NavLink>
      </li> : ''

    }
    
      

    </>

    



  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 bg-blue-500 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <div>
            {" "}
            <Logo></Logo>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>
        <div className="navbar-end gap-5">
          
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2"
                  >
                    {theme === "light" ? <MdDarkMode size={25} /> : <MdLightMode size={25} />}
                    
                  </button>
                
          {user ? (
            <div className="dropdown dropdown-end">
               
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full flex items-center justify-center bg-gray-200">
                  {user?.photoURL ? <img src={user.photoURL} /> : <FaUser />}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="ghost ">Role: {userData?.role} </li>

                {/* dark mode */}

            

                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to={"/login"}
                className="btn border-none rounded text-white hover:bg-secondary hover:rounded-3xl bg-primary"
              >
                LogIn
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
