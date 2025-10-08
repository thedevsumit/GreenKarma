import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  role: "Seller",
  setRole: () =>
    set((state) => ({
      role: state.role === "Seller" ? "Buyer" : "Seller",
    })),
  isCheckingAuth: false,
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const resp = await axiosInstance.get("/check");
      set({ authUser: resp.data });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  setAuthUser: (user) => set({ authUser: user }),
  loginAuth: async (data) => {
    set({ isLoggingIn: true });
    try {
      const resp = await axiosInstance.post("/login", data);
      set({ authUser: resp.data });
      toast.success("Logged in successfully!");
    } catch (error) {
      const msg = error.response?.data?.msg || "Login failed";
      toast.error(msg);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signupAuth: async (data) => {
    set({ isSigningUp: true });
    try {
      const resp = await axiosInstance.post("/register", data);
      set({ authUser: resp.data });
      toast.success("Account created successfully!");
    } catch (error) {
      const msg = error.response?.data?.msg || "Signup failed";
      toast.error(msg);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      const resp = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out succesfully!");
    } catch (error) {
      const msg = error.response?.data?.msg || "Signup failed";
      toast.error(msg);
    }
  },
}));
