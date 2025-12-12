import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const registerUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };


  const signOutUser = () => { 
    setLoading(true);
    return signOut(auth);
  }; 
  
  const updateUserprofile = (profile) =>{
    return updateProfile(auth.currentUser, profile)

  }








  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser);
        setLoading(false)
        console.log(currentUser)


    } )

    return ()=>{
        unSubscribe();
    }


  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    registerUser,
    signInUser,
    signInGoogle,
     signOutUser,
     updateUserprofile,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
