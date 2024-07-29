// Importing css
import style from "./userAuthentication/Authentication.module.css";

// Importing necessary modules
import { signOut } from "firebase/auth";
import { useAuthValues } from "../context/AuthContext";
import { ACTIONS, useChatValues } from "../context/ChatContext";
import { auth } from "../database/firebaseInit";
import { Link } from "react-router-dom";

// Importing necessary modules

// Profile
export default function Profile() {
  // Fetching auth values
  const { currentUser, showToast } = useAuthValues();
  // Fetching dispatch
  const { dispatch } = useChatValues();
  // Function to clear chats
  const clearUser = (user) => {
    dispatch({ type: ACTIONS.NULL_USER, payload: user });
  };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      // Clear current user
      clearUser(currentUser);
      showToast("👋 User Signed Out Successfully!!!", "success");
    } catch (error) {
      console.log(error);
      showToast("😞 Sign Out Failed!!!", "error");
    }
  };

  return (
    <div className={style.formContainer}>
      <div className={style.profileContainer}>
        <img
          src={
            currentUser.photoURL ||
            "https://www.clker.com/cliparts/t/e/E/n/D/I/a-system-user-hi.png"
          }
          className={style.profileIcon}
        />
        <span className={style.profileName}>{currentUser.displayName}</span>
        <span className={style.profileName}>{currentUser.email}</span>
        <button
          className={style.submitBtn}
          style={{ width: "80%" }}
          onClick={handleSignout}
        >
          Logout
        </button>
        <Link
          to={"/home"}
          style={{ width: "75%",textAlign:"center",textDecoration:"none" }}
          className={style.submitBtn}
        >
          Back To Chats
        </Link>
      </div>
    </div>
  );
}
