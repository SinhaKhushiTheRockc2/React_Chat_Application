// Importing css
import style from "./RightView.module.css";
// Import necessary modules
import { useChatValues } from "../../context/ChatContext";
import { useEffect, useRef, useState } from "react";
import { db } from "../../database/firebaseInit";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthValues } from "../../context/AuthContext";

export default function MessageList() {
  // Use state for message array
  const [messages, setMessages] = useState([]);
  // Fetching current user from auth context
  const { currentUser } = useAuthValues();
  // User chat data from chat context
  const { chats } = useChatValues();
  // Use ref for message shown function
  const messageContainerRef = useRef();

  // Display all chats on initial render and render chats anytime a new chat is added
  useEffect(() => {
    if (chats.chatId) {
      const unsub = onSnapshot(doc(db, "chats", chats.chatId), (doc) => {
        if (doc.exists()) {
          setMessages(doc.data().messages);
        }
      });
      return () => {
        unsub();
      };
    }
  }, [chats.chatId]);

  // Scroll to bottom when messages are updated
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Filter messages based on the search query
  const filteredMessages = chats.searchQuery
  ? messages.filter((message) =>
      message.text.toLowerCase().includes(chats.searchQuery.toLowerCase())
    )
  : messages;

  return (
    <div className={style.messages} ref={messageContainerRef}>
      {filteredMessages.map((message) => (
        <div className={`${style.messageContainer} ${message.senderId===currentUser.uid ? style.sent : style.received}`} key={message.id} >
          <div className={style.messageInfo}>
            <img
              src={
                message.senderId === currentUser.uid
                  ? currentUser.photoURL
                  : chats.user.photoURL
              }
              className={style.userIcon}
              alt="message-owner-icon"
            />
            <span className={style.timeSpan}>just now</span>
          </div>
          <div className={style.messageContent}>
            <p className={style.message}>
              {message.text}
              {message.img && <img src={message.img} alt="message" />}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
