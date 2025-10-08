import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import axios from "axios";
export const usePostStore = create((set, get) => ({
  fetchedData: [],
  whattoShow: "Posts",
  isFetching: false,
  fetchedPurchases: [],
  fetchingPurchases: async () => {
    try {
      set({ whattoShow: "Purchases" });
      const resp = await axiosInstance.get("/transactions/my-purchases");
      set({ fetchedData: resp.data.purchases });
      console.log("fetchingPurchases : ", resp);
    } catch (error) {
      console.log(error);
    }
  },
  fetchingMyListedItems: async () => {
    try {
      set({ whattoShow: "Mylisted" });
      const resp = await axiosInstance.get("/item-listed");
      set({ fetchedData: resp.data.items });
      console.log("fetchingPurchases : ", resp);
    } catch (error) {
      console.log(error);
    }
  },
  fetchingMyListed: async () => {
    try {
      set({ whattoShow: "Listed" });
      const resp = await axiosInstance.get("/transactions/my-sales");
      set({ fetchedData: resp.data.sales });
      console.log("fetchingListed : ", resp);
    } catch (error) {
      console.log(error);
    }
  },
  fetchingData: async () => {
    try {
      set({ isFetching: true });
      set({ whattoShow: "Posts" });
      const res = await axiosInstance("/item-get");

      console.log(res.data.items);
      set({
        fetchedData: res.data.items || [],
        isFetching: false,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      set({ isFetching: false });
    }
  },
  postingData: async (data) => {
    try {
      console.log(data);
      const resp = await axiosInstance.post("/item-post", data);
      console.log(resp);

      await get().fetchingData();
      const resp1 = await axiosInstance.put("/transactions/reward", {
        reason: "submission",
      });
      console.log(resp1);
    } catch (error) {
      console.log(error);
    }
  },
  purchaseItem: async (data) => {
    try {
      console.log("Purchasing item:", data);
      const resp = await axiosInstance.post("/transactions/purchase", data);

      console.log(resp.data);
      toast.success(
        resp.data.msg + " 🎊 Added 50 points to the account 🎉" ||
          "Purchase successful!"
      );
      const resp1 = await axiosInstance.put("/transactions/reward", {
        reason: "purchase",
      });
      console.log(resp1);
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(
        error.response?.data?.msg || "Purchase failed. Try again later."
      );
    }
  },
}));
