// Importing css
import { Link, useNavigate } from "react-router-dom";
import style from "./Authentication.module.css";
import { useAuthValues } from "../../context/AuthContext";
import { auth } from "../../database/firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";


// SignIn
export default function SignIn() {
  // Fetching context values
  const { toggleViewSignedInPassword, viewSignedInPassword, showToast } =
    useAuthValues();
  
  // Defining state to handle submit button text
  const [submit, setSubmit] = useState(false);
  const navigate=useNavigate();

  // Function to handle user login
  const handleSignIn = async (e) => {
    setSubmit(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast("✌️ User Signed In Successfully!!!", "success");
      navigate('/');
      setSubmit(false);
    } catch (error) {
      setSubmit(false);
      showToast("🤕 Incorrect Credentials!!!", "error");
      console.log("SignIn error:", error);
    }
  };

  return (
    <>
    <div className={style.formContainer}>
      <div className={style.formWrapper}>
        <h1 className={style.headPrimary}>ChatApp</h1>
        <span className={style.title}>SignIn</span>
        <form className={style.authForm} onSubmit={handleSignIn}>
          <input type="email" placeholder="Enter your email...." requried />
          <div className={style.passwordField}>
            <input
              type={viewSignedInPassword}
              placeholder="Enter your password...."
              required
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/709/709724.png"
              className={style.viewIcon}
              alt="view-icon"
              onClick={toggleViewSignedInPassword}
            />
          </div>
          <button className={style.submitBtn} disabled={submit}>
            {submit ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <h1 className={style.navigationLink}>
          Don't have an account?<Link to={"/signup"}>SignUp</Link>
        </h1>
      </div>
    </div>
    </>
  );
}
