// Importing all necessary modules here
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useAuthValues } from "./context/AuthContext";
import SignUp from "./pages/userAuthentication/SignUp";
import SignIn from "./pages/userAuthentication/SignIn";
import Home from "./pages/Home";
import NotFound from "./pages/error/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";

function App() {
  const { currentUser } = useAuthValues();
  // protected route for not logged users
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      console.log("Redirecting to login page")
      return <Navigate to={"/login"} />;
    }
    return children;
  };

  return (
    <>
      <div className="App">
        <ToastContainer/>
        {/* Defining other roots */}
        <BrowserRouter basename="/React_Chat_Application">
          <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            }
          />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
