import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useAllCategories() {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/categories/getCategories");
        setCategoryList(response.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch categories list", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/", { replace: true });
          return;
        }
        toast.error("Failed to load categories list!");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return {
    categoryList,
    loading,
  };
}
