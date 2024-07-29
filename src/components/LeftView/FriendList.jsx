// Importing css
import { useEffect, useState } from "react";
import style from "./LeftView.module.css";
import { useAuthValues } from "../../context/AuthContext";
import { ACTIONS, useChatValues } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../database/firebaseInit";

// Chats Component
export default function FriendList() {
  // State to store chats
  const [chats, setChats] = useState([]);

  // Fetching current user
  const { currentUser } = useAuthValues();
  // Fetching dispatch
  const { dispatch,setSelectChat } = useChatValues();

  // user effect for get current users chats
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // when user select any chat it will appear to the screen
  const handledSelectChat = (user) => {
    dispatch({ type: ACTIONS.CHANGE_USER, payload: user });
    setSelectChat(true);
  };
  return (
    <div className={style.parentFriendListContainer}>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div className={style.chatContainer} key={chat[0]}
          onClick={() => handledSelectChat(chat[1].userInfo)}>
            <img
              src={chat[1].userInfo.photoURL||"https://www.clker.com/cliparts/t/e/E/n/D/I/a-system-user-hi.png"}
              className={style.friendDisplayPicture}
              alt="friend-display-picture"
            />
            <div className={style.latestChatDisplay}>
              <span className={style.friendTitle}>{chat[1].userInfo.displayName}</span>
              <span className={style.latestChat}>{chat[1].lastMessage?.text}</span>
            </div>
          </div>
        ))}
    </div>
  );
}
