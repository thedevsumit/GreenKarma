import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import HomePage from "./pages/HomePage";
import Marketplace from "./pages/Marketplace";
import PostDetails from "./pages/PostDetails"; 

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-17 animate-spin text-[#699451]" />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/homepage"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/homepage" />}
        />

        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to="/homepage" />}
        />

        <Route
          path="/market"
          element={!authUser ? <Register /> : <Marketplace />}
        />

        <Route
          path="/post/:id"
          element={!authUser ? <Navigate to="/login" /> : <PostDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
