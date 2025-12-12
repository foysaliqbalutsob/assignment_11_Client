import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import Loading from '../../../Components/Loading/Loading';
import { FaUser, FaUserShield } from 'react-icons/fa';
import { HiUserRemove } from 'react-icons/hi';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';

const UsersManagement = () => {

  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
    const axiosSecure = useAxios();




    // useEffect

    useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 1000); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchText]);

















   const {data : users = [],
    isLoading,refetch
   } = useQuery({
    queryKey:['users',debouncedSearch],
    queryFn:async()=>{
        const res = await axiosSecure.get(`/users?searchText=${searchText}`);
        console.log(users)
        return res.data;
    }
})



const handleMakeAdmin = (user) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Make ${user.displayName} an Admin?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, make admin!"
  }).then((result) => {
    if (result.isConfirmed) {

      const id = user._id;
      const roleInfo = { role: "admin" };

      axiosSecure.patch(`/users/${id}/role`, roleInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Done!",
            text: `${user.displayName} is now Admin.`,
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    }
  });
};



const handleRemoveAdmin = (user) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Remove Admin role from ${user.displayName}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove!"
  }).then((result) => {
    if (result.isConfirmed) {

      const id = user._id;
      const roleInfo = { role: "user" };

      axiosSecure.patch(`/users/${id}/role`, roleInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: `${user.displayName} is now User.`,
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });

    }
  });
};














if(isLoading){
    return <Loading></Loading>
}













    return (
        <div>
      <h2 className='text-xl font-bold mb-4'>
        Total Users: {users.length}
      </h2>


      {/* SearchBar */}
      <div className="mb-4 flex justify-center">
      <div className="w-full md:w-1/2">
        <label className="flex items-center gap-3 bg-base-200 shadow-md px-4 py-3 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          
          <svg className="h-[1.4em] w-[1.4em] opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          <input
          onChange={(e)=>setSearchText(e.target.value)}
            type="search"
            required
            placeholder="Search user by name or email..."
            className="bg-transparent w-full outline-none text-lg placeholder:text-gray-500"
          />
        </label>
      </div>
    </div>
    <div className="mb-4">
  {users.length === 0 && searchText ? (
    <div className="text-center text-red-500 my-2">
      No results found for "{searchText}"
    </div>
  ) : users.length > 0 && searchText ? (
    <div className="text-center text-blue-500 my-2">
      Did you mean:
      {users.map(user => (
        <span key={user._id} className="ml-2 font-semibold">
          {user.displayName || user.email}
        </span>
      ))}
    </div>
  ) : null}
</div>


    {/* Users Table */}

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Other Action</th>
            </tr>
          </thead>

          <tbody>
            {
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    { user.photoURL ? (
      <img
        className='w-12 h-12 rounded-full'
        src={user.photoURL}
        alt="user avatar"
      />
    ) : (
      <FaUser className="text-3xl" />
    )
  }
                  </td>
                  <td>{user.displayName || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className='flex flex-wrap gap-4 '>
                    {
                        user.role === 'admin'?
                         

                    (<button onClick={()=> handleRemoveAdmin (user)} className='btn btn-primary bg-amber-900 text-blue-600'>
                         <FiShieldOff></FiShieldOff>
                    </button>)
                    
                    :
                                    
                    (<button onClick={()=> handleMakeAdmin(user)} className='btn btn-primary text-blue-600'>
                        <FaUserShield></FaUserShield>
                    </button>)
                    }
                  </td>




                 
                  <td>Action</td>

                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
    );
};

export default UsersManagement;