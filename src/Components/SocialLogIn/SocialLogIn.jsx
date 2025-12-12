import React from "react";
import useAuth from "../../Hooks/useauth";
import { useNavigate, useLocation } from "react-router";
import useAxios from "../../Hooks/useAxios";

const SocialLogIn = () => {
  const { signInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure =useAxios()

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log(result);

        // Redirect user back to the page they wanted
       

        // send to db
        const userProfile = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL : result.user.photoURL
        }
        
          axiosSecure.post('/users',userProfile).then(res =>{
              if(res.data.insertedId){
                console.log('user created in database')

              }
            })

             navigate(from, { replace: true });





      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <p className="text-center">Or</p>
      <div>
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-blue-300 w-full text-black border-none border-[#e5e5e5]"
        >
          {/* google icon */}
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogIn;
