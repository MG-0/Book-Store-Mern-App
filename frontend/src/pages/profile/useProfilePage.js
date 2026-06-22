// CLEAN CODE RATIONALE:
// Creating a separate useProfilePage hook separates data fetching and API querying logic 
// from profile presentation rendering, maintaining a clean Component-Driven architecture.
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function useProfilePage() {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/orders/my-orders");
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Failed to fetch user orders:", error);
        toast.error("Failed to load your orders history!");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return {
    user,
    orders,
    loading,
  };
}
