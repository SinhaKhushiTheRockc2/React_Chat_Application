// Importing css
import style from "./RightView.module.css";
// Importing necessary modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ACTIONS, useChatValues } from "../../context/ChatContext";
import { useState } from "react";

// Right View Navigation Bar
export default function NavigationBar() {
  // Fetching chats
  const { chats, dispatch } = useChatValues();
  // State to manage search
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: e.target.value });
  };

  return (
    <div className={style.navigationBar}>
      <div className={style.friendIconContainer}>
        {chats.user && chats.user.photoURL? (
          <>
            <img
              src={chats.user.photoURL}
              alt="user-icon"
              className={style.friendIcon}
            />
            <span className={style.friendName}>{chats.user.displayName}</span>
          </>
        ) : null}
      </div>
      <div className={style.searchBarContainer}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={style.searchIcon}
        />
        <input type="text" placeholder="Search in messages..." onChange={handleSearchChange} value={searchQuery}/>
      </div>
    </div>
  );
}
