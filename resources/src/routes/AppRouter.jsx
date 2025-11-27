import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import ChatPage from "../pages/ChatPage.jsx";
import VerifyAccount from "../pages/VerifyAccount.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/verify/:token" element={<VerifyAccount />} />
      </Routes>
    </BrowserRouter>
  );
}
