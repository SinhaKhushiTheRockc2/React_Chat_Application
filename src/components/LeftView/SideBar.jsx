// Importing stylesheet
import Navbar from "./Navbar";
import style from "./LeftView.module.css";
import SearchBar from "./SearchBar";
import FriendList from "./FriendList";

// SideBar List
export default function SideBar(){
    return(
        <div className={style.sideBar}>
          <Navbar/>  
          <SearchBar/>
          <FriendList/>
        </div>
    );
}


