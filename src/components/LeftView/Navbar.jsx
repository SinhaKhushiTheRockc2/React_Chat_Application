// Importing css
import style from "./LeftView.module.css";
// Importing other modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments} from "@fortawesome/free-regular-svg-icons";
import { useAuthValues } from "../../context/AuthContext";
import { ACTIONS, useChatValues } from "../../context/ChatContext";
import { signOut } from "firebase/auth";
import { auth } from "../../database/firebaseInit";
import { Link } from "react-router-dom";



//Left View Navbar Component
export default function Navbar() {
  // Fetching current user from auth context
  const {currentUser,showToast}=useAuthValues();

  // Fetching dispatch from chat context
  const{dispatch}=useChatValues();

  // Function to clear chats
  const clearUser=(user)=>{
    dispatch({type:ACTIONS.NULL_USER,payload:user})
  }

  const handleSignout=async()=>{
    try {
      await signOut(auth);
      // Clear current user
      clearUser(currentUser);
      showToast("👋 User Signed Out Successfully!!!", "success");
    } catch (error) {
      console.log(error);
      showToast("😞 Sign Out Failed!!!", "error");
    }
  }

  return (
    <div className={style.navbar}>
      <div className={style.userIconContainer}>
        <Link to={'/profile'}>
        <img
          src={currentUser.photoURL||"https://www.clker.com/cliparts/t/e/E/n/D/I/a-system-user-hi.png"}
          alt="user-icon"
          className={style.userIcon}
        />
        </Link>
        <span className={style.userName}>{currentUser.displayName}</span>
      </div>
      <FontAwesomeIcon icon={faComments} className={style.chatLogo}/>
      <button className={style.logoutBtn} onClick={handleSignout}>Logout</button>
    </div>
  );
}
