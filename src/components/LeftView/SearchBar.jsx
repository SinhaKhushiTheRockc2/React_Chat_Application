// Importing css 
import style from "./LeftView.module.css";
// Importing necessary modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useAuthValues } from "../../context/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../database/firebaseInit";

// Search Bar component
export default function SearchBar() {
  // States
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  //   Fetching current user from auth context
  const { currentUser, showToast } = useAuthValues();

  // Effect to clear error message after a few seconds
  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => setErr(false), 3000); // Change 3000 to any value in milliseconds you prefer
      return () => clearTimeout(timer);
    }
  }, [err]);

  // Function to handle search
  const handleSearch = async () => {
    if (userName === currentUser.displayName) {
      setErr(true);
      showToast("🥺You cannot add yourself as a friend!!!", "warning");
      return;
    }
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErr(true);
        console.log("No documents found.");
        return;
      }
      setErr(false);

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData) {
          console.log("User data:", userData);
          setUser(userData);
        } else {
          console.log("Document data is empty or not an object:", doc.data());
          setErr(true);
        }
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
      setErr(true);
    }
  };

  // Handle enter click event
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  // Handle selected chat
  const handledSelectChat = async () => {
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combineId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error("Error while adding user as friend:", err);
    }
    setUser(null);
    setUserName("");
  };

  return (
    <>
      <div className={style.searchBarContainer}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={style.searchIcon}
        />
        <input
          type="text"
          className={style.searchBar}
          placeholder="Search Friends......"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
          value={userName}
        />
      </div>
      {err && <span style={{display:"block",textAlign:"center"}}>User not found!</span>}
      {user && (
        <div className={style.userChat} onClick={handledSelectChat}>
          <img
            src={user.photoURL || "https://www.clker.com/cliparts/t/e/E/n/D/I/a-system-user-hi.png"}
            alt="user-chat"
          />
          <div className={style.userChatInfo}>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </>
  );
}
