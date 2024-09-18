import { Route, Routes } from "react-router-dom";
import AuthProvider from "./Contexts/AuthProvider";
import {
  Chats,
  Home,
  Login,
  Message,
  Profile,
  Register,
} from "./Components/Pages";
import { Toaster } from "react-hot-toast";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";



const App = () => {

  useEffect(() => {
    Aos.init();
  }, []);
  
  return (
    <>
      <Toaster/>
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat/:id" element={<Message />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
