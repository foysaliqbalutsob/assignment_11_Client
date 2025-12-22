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
      Swal.fire("Error", error.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Forget Password</h2>

          <form onSubmit={handleForgetPassword}>
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full my-4"
            />

            <button className="btn btn-primary w-full">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
