import SideBar from "../components/LeftView/SideBar";
import ChatScreen from "../components/RightView/ChatScreen";

// Home Page
export default function Home(){
    return(
        <>
        <h1 style={{color:"black",textAlign:'center',fontSize:"2rem"}}>Chat App</h1>
        <div className="home">
            <div className="container">
            <SideBar/>
            <ChatScreen/>
            </div>
        </div>
        </>
    );
}

