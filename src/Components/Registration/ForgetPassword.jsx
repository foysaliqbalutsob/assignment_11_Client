// import React, {  useRef } from 'react';

// import { toast } from 'react-toastify';
// import useAuth from '../../Hooks/useauth';

// const ForgetPassword = () => {
//   const { sendPasswordResetEmailFunc } = useAuth();
//   const emailRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const email = emailRef.current.value;
//     sendPasswordResetEmailFunc(email)
//       .then(() => {
//         toast("Password reset email sent!");
//         window.location.href = "https://mail.google.com"; 
//       })
//       .catch((error) => {
//         if (error.code === "auth/user-not-found") {
//           toast.error("No account found with this email.");
//         } else if (error.code === "auth/invalid-email") {
//           toast.error("Invalid email address format.");
//         } else if (error.code === "auth/missing-email") {
//           toast.error("Please provide a valid email address.");
//         } else if (error.code === "auth/network-request-failed") {
//           toast.error("Network error. Please check your connection.");
//         } else {
//           toast.error(`Something went wrong: ${error.message}`);
//         }
//       });
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           ref={emailRef}
//           type="email"
//           placeholder="Enter your email"
//           className="w-full p-2 border rounded mb-4"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Send Reset Link
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgetPassword;



import React, { useRef } from "react";
import useAuth from "../../Hooks/useauth";
import Swal from "sweetalert2";

const ForgetPassword = () => {
  const emailRef = useRef();
  const { sendPasswordResetEmailFunc } = useAuth();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    if (!email) {
      Swal.fire("Error", "Please enter your email", "error");
      return;
    }

    try {
      await sendPasswordResetEmailFunc(email);
      Swal.fire(
        "Success",
        "Password reset email sent! Check your inbox.",
        "success"
      );
    } catch (error) {
      Swal.fire(
        "Error",
        error.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">
            Forget Password
          </h2>

          <form onSubmit={handleForgetPassword}>
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full my-4"
            />

            <button className="btn btn-primary w-full">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
