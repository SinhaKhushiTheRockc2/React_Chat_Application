// Importing css
import style from "./RightView.module.css";
import NavigationBar from "./NavigationBar";
import MessageBar from "./MessageBar";
import MessageList from "./MessagList";

// Right View of Chat application
export default function ChatScreen(){
    return(
        <div className={style.chatScreen}>
        <NavigationBar/>
        <MessageList/>
        <MessageBar/>
        </div>
    );
}