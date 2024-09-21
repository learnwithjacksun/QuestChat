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
import ProtectedRoutes from "./Components/ProtectedRoutes";

const App = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      deferredPrompt = e
      console.log('beforeinstallprompt event triggered');
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA installed');
    });
  }, []);

  return (
    <>
      <Toaster />
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/chats" element={<Chats />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat/:id" element={<Message />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
