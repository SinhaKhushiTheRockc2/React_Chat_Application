import { createContext, useContext, useReducer, useState } from "react";
import { useAuthValues } from "./AuthContext";

// Context creation
const chatContext = createContext();

// Function for easy access of chat context values
export const useChatValues = () => {
  return useContext(chatContext);
};

// Defining Actions
export const ACTIONS = {
  NULL_USER: "null-user",
  CHANGE_USER: "change-user",
  SET_SEARCH_QUERY: "set-search-query",
};

// Defining initial state
const INITIAL_STATE = {
  user: {},
  chatId: null,
  searchQuery: "",
};
// Chat context provider
function ChatContextProvider({ children }) {
  // Fetching current user from auth context
  const { currentUser } = useAuthValues();
  // Chat reducer function
  const chatReducer = (chats, action) => {
    switch (action.type) {
      case ACTIONS.CHANGE_USER:
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case ACTIONS.NULL_USER:
        return {
          chatId: "null",
          user: {},
        };
      case ACTIONS.SET_SEARCH_QUERY:
        return {
          ...chats,
          searchQuery: action.payload,
        };
      default:
        return chats;
    }
  };

  // State to manage chats
  const [chats, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  // State for selected chat
  const[selectChat,setSelectChat]=useState(false);
  return (
    <chatContext.Provider value={{ chats, dispatch,setSelectChat,selectChat}}>
      {children}
    </chatContext.Provider>
  );
}

// Export statement
export default ChatContextProvider;
