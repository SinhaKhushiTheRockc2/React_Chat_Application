// Importing necessary modules
import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth} from "../database/firebaseInit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context creation
const authContext = createContext();

// Function to access the context values easily
function useAuthValues() {
  return useContext(authContext);
}

// Custom context provider function
function AuthContextProvider({ children }) {
  // State management
  const [currentUser, setCurrentUser] = useState(null);
  const [viewPassword, setViewPassword] = useState("password");
  const [viewSignedInPassword, setViewSignedInPassword] = useState("password");
  const [viewConfirmPassword, setViewConfirmPassword] = useState("password");
  const [img, setImg] = useState(null);

  // Toggle the password field visibility
  const toggleViewPasswordField = () => {
    setViewPassword((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  };

  // Toggle the confirm password field visibility
  const toggleConfirmPasswordField = () => {
    setViewConfirmPassword((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  };

  // Toggle the password field visibility on signin page
  const toggleViewSignedInPassword = () => {
    setViewSignedInPassword((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsub();
    };
  }, []);

  // Helper function to display toast notifications
  const showToast = (message, type) => {
    toast[type](message, {
      position: "top-right",
      autoClose: true,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: "dark",
    });
  };

  return (
    <authContext.Provider
      value={{
        currentUser,
        viewPassword,
        toggleViewPasswordField,
        viewConfirmPassword,
        toggleConfirmPasswordField,
        toggleViewSignedInPassword,
        viewSignedInPassword,
        img,
        setImg,showToast
      }}
    >
      {children}
    </authContext.Provider>
  );
}

// Named export statement
export { useAuthValues };

// Default export statement
export default AuthContextProvider;
