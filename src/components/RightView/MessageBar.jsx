// Importing css
import style from "./RightView.module.css";
// Importing necessary modules
import EmojiPicker, { Emoji, SkinTones } from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useAuthValues } from "../../context/AuthContext";
import { useChatValues } from "../../context/ChatContext";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";
import { db, storage } from "../../database/firebaseInit";
import { v4 as uuid } from "uuid";

// Message Bar Component
export default function MessageBar() {
  // Fetching current user
  const { currentUser, showToast } = useAuthValues();
  // Fetching chats
  const { chats ,setSelectedChats,selectChat} = useChatValues();

  // States
  const [messageText, setMessageText] = useState("");
  const [img, setImg] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [sendingImage, setSendingImage] = useState(false);

  // Handle send message
  const handleSend = async () => {
    const trimmedMessage = messageText.trim();
    // If it is an empty message
    if (!trimmedMessage && !img) {
      console.log("No text or image");
      return;
    }

    let messageContent = trimmedMessage;

    // If there is no message but an image
    if (!messageContent && img) {
      messageContent = img.name;
    }

    if (img && !sendingImage) {
      setSendingImage(true);

      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress if needed
        },
        (error) => {
          showToast(error.message, "error");
          setSendingImage(false); // Reset sendingImage state if there's an error
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const imageName = img.name;
          messageContent = trimmedMessage || `${imageName}`;

          // Add new message
          await updateDoc(doc(db, "chats", chats.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text: messageContent,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });

          setSendingImage(false); // Reset sendingImage state after sending

          // Update userChats for both users
          const userChatUpdate = {
            [`${chats.chatId}.lastMessage`]: {
              text: trimmedMessage,
            },
            [`${chats.chatId}.date`]: serverTimestamp(),
          };

          await updateDoc(doc(db, "userChats", currentUser.uid), userChatUpdate);
          await updateDoc(doc(db, "userChats", chats.user.uid), userChatUpdate);

          // Reset input fields
          setMessageText("");
          setImg(null);
        }
      );
    } else {
      const imageName = img ? img.name : "";
      messageContent = trimmedMessage || `${imageName}`;

      // Add new message without image
      await updateDoc(doc(db, "chats", chats.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: messageContent,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      // Update userChats for both users
      const userChatUpdate = {
        [`${chats.chatId}.lastMessage`]: {
          text: trimmedMessage,
        },
        [`${chats.chatId}.date`]: serverTimestamp(),
      };

      await updateDoc(doc(db, "userChats", currentUser.uid), userChatUpdate);
      await updateDoc(doc(db, "userChats", chats.user.uid), userChatUpdate);

      // Reset input fields
      setMessageText("");
      setImg(null);
    }
  };

  // When the user presses Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Handle emoji click
  const handleEmojiClick = (emojiData, event) => {
    const { unified } = emojiData;
    const emoji = String.fromCodePoint(`0x${unified}`);

    setMessageText(messageText + emoji);
    setSelectedEmoji(emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className={style.messageBarContainer}>
      {selectChat?(
        <>
        <input
        type="text"
        className={style.messageBar}
        placeholder="Say Hi To Friends......."
        onChange={(e) => setMessageText(e.target.value)}
        value={messageText}
        onKeyDown={handleKeyDown}
      />
      {/* Emoji picker */}
      {selectedEmoji ? (
        <Emoji emoji={selectedEmoji} native={true} onClick={handleEmojiClick} />
      ) : null}
      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableAutoFocus={true}
          groupNames={{ smileys_people: "PEOPLE" }}
          native={true}
          SkinTone={SkinTones.NONE}
          className={style.emojiPicker}
        />
      )}
      <div className={style.messageOptionsContainer}>
        <FontAwesomeIcon
          icon={faSmile}
          className={style.selectEmoji}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />
        <input
          type="file"
          id="file"
          className={style.fileInput}
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file" className={style.fileLabel}>
          <FontAwesomeIcon
            icon={faPaperclip}
            className={style.selectImage}
          />
        </label>
        <FontAwesomeIcon
          icon={faPaperPlane}
          className={style.sendBtn}
          onClick={handleSend}
        />
      </div>
        </>
      ):null}
      
    </div>
  );
}

