// Importing all necessary modules
import { useState } from "react";
import { useAuthValues } from "../../context/AuthContext";
import style from "./Authentication.module.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../database/firebaseInit";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Signup
export default function SignUp() {
  // Fetching context values
  const { viewPassword, viewConfirmPassword, toggleViewPasswordField, toggleConfirmPasswordField, setImg, img ,showToast} = useAuthValues();
  const navigate = useNavigate();
  // default url
  const defaultURL = "https://www.clker.com/cliparts/t/e/E/n/D/I/a-system-user-hi.png";
  // State to manage submission
  const [submit, setSubmit] = useState(false);

  // handled submit for  for new user sign in
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const displayName = e.target[0].value?.trim();
    const email = e.target[1].value?.trim();
    const password = e.target[2].value?.trim();
    const confirmPassword = e.target[3].value?.trim();

    // If the password and confirm password field values doesn't match
    if (password !== confirmPassword) {
      // Clear all the fields
      e.target[0].value="";
      e.target[1].value="";
      e.target[2].value="";
      e.target[3].value="";
      setImg(null);
      showToast("💀 Password and Confirm Password field values do not match!!!", "warning");
    }
    if (password.length < 8) {
      // Clear all the fields
      e.target[0].value="";
      e.target[1].value="";
      e.target[2].value="";
      e.target[3].value="";
      setImg(null);
      showToast("😵 Password length must be at least 8 characters!!!!", "warning");
    }
    try {
      // firebase new user create function
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // if user set his avatar this function will handled this
      if (img) {
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, img).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              showToast("🎉 User Registered Successfully!!!", "success");
              navigate("/login");
            } catch (err) {
              showToast("😬 User Registration Failed!!!", "error");
            }
            // Signed in
          });
        });
      } else {
        try {
          //Update profile
          await updateProfile(res.user, {
            displayName,
            photoURL: defaultURL,
          });
          //create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: defaultURL,
          });

          //create empty user chats on firestore
          await setDoc(doc(db, "userChats", res.user.uid), {});
          showToast("🎉 User Registered Successfully!!!", "success");
          navigate("/login");
        } catch (err) {
          showToast("😬 User Registration Failed!!!", "error");
        }
      }
    } catch (err) {
      showToast("😬 User Registration Failed!!!", "error");
    }
  };

  return (
    <div className={style.formContainer}>
      <div className={style.formWrapper}>
        <h1 className={style.headPrimary}>ChatApp</h1>
        <span className={style.title}>SignUp</span>
        <form className={style.authForm} onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter your name..." required />
          <input type="email" placeholder="Enter your email..." required />
          <div className={style.passwordField}>
            <input
              type={viewPassword}
              placeholder="Create password (use at least 8 characters)"
              required
            />
            <img src="https://cdn-icons-png.flaticon.com/128/709/709724.png" className={style.viewIcon} alt="view-icon" onClick={toggleViewPasswordField} />
          </div>
          <div className={style.passwordField}>
            <input type={viewConfirmPassword} placeholder="Confirm password..." />
            <img
              src="https://cdn-icons-png.flaticon.com/128/709/709724.png"
              className={style.viewIcon} alt="view-icon" onClick={toggleConfirmPasswordField}
            />
          </div>
          <input type="file" id="file" className={style.fileInput} onChange={(e) => setImg(e.target.files[0])} />
          <label htmlFor="file" className={style.fileLabel}>
            <img src="https://cdn-icons-png.flaticon.com/128/17436/17436404.png" alt="select-profile-picture" className={style.fileIcon} />
            <span className={style.fileText}>Add Profile</span>
          </label>
          <button className={style.submitBtn} disabled={submit}>{submit ? "Signing Up..." : "Sign Up"}</button>
        </form>
        <h1 className={style.navigationLink}>You have an account?<Link to={'/login'}> SignIn</Link></h1>
      </div>
    </div>
  );
}

