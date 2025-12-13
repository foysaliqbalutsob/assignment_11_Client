import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useauth";
import { FaUser } from "react-icons/fa";
import useUserRole from "../../../Hooks/useUserRole";

const Header = () => {

  const {user, signOutUser} = useAuth();
  console.log(user);
  console.log(user?.photoURL);
  
  const { userData } = useUserRole();

console.log(userData?.role);

  const handleLogOut = () =>{
    signOutUser().then(result =>{
      console.log(result)
    }).catch(error =>{
      console.log(error)
    })

  }





  const link = (
    <>
    <li>
       <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-semibold underline"
            : "text-gray-600"
        }
      >
        Home
      </NavLink>
    </li>

    {!user && (<>



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

      </>)}





 <li>
        <NavLink
          to="/dashboard/package"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold underline" : "text-gray-600"
          }
        >
         Package
        </NavLink>
      </li>

       <li>
        <NavLink
          to="/dashboard/your-package"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold underline" : "text-gray-600"
          }
        >
          Your Package
        </NavLink>
      </li>










<>

      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold underline" : "text-gray-600"
          }
        >
         dashboard
        </NavLink>
      </li>


        <li>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold underline" : "text-gray-600"
          }
        >
        Profile
        </NavLink>
      </li>

      </>
   
  

    {
      user && <>

     
      
      
      
      </>
    }
   
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            {
              link
            }
            </ul>
          </div>
          <div> <Logo></Logo>
          </div> 

        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {link}
          </ul>
        </div>
        <div className="navbar-end gap-5">
            {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || <FaUser></FaUser> }  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/dashboard" className="justify-between">
                    Dashboard
                  </Link>
                </li>
                <li>Role: {userData?.role} </li>
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
              <Link
                to={"/registration"}
                className="btn text-white border-none rounded hover:bg-secondary hover:rounded-3xl bg-primary"
              >
                Registration
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
