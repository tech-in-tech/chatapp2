import "react-toastify/dist/ReactToastify.css";
import { Loader } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser, setOnlineUsers } from "./store/slices/authSlice.js";
import { connectSocket, disconnectSocket } from "./lib/socket";
import {BrowserRouter as Router ,Routes,Route, Navigate} from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import {ToastContainer} from "react-toastify"




function App() {

  const { authUser, isCheckingAuth } = useSelector((state) => state.auth)


  const dispatch = useDispatch();
  



  useEffect(() => {
    dispatch(getUser());
  }, [])



  useEffect(() => {
    if (authUser) {
      const socket = connectSocket(authUser._id);

      socket.on("getOnlineUsers",(users)=>{
        dispatch(setOnlineUsers(users.map(String)))
      });

      return ()=>disconnectSocket();
    }
  }, [authUser]);


  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }



  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/"  element={authUser? <Home/> :<Navigate to={"/login"}/>}/>


          <Route path="/register"  element={!authUser? <Register/> :<Navigate to={"/"}/>}/>
          
          
          <Route path="/login"  
          element={!authUser? <Login/> :<Navigate to={"/"}/>}/>

          <Route path="/profile"  
          element={authUser? <Profile/> :<Navigate to={"/login"}/>}/>


        </Routes>


        <ToastContainer></ToastContainer>
      </Router>
    </>
  )
  
}

export default App
