import { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useAddCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!name.trim()) {
      setMessage("Category Name is required");
      return;
    }

    try {
      setSubmitting(true);
      await axiosInstance.post("/categories/createCategory", {
        name: name.trim(),
      });
      
      toast.success("Category Created Successfully! 🎉");
      setMessage("Category Created Successfully");
      setName("");
    } catch (error) {
      console.error("Create Category failed", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/", { replace: true });
        return;
      }
      const errMsg = error.response?.data?.message || "Failed to create category!";
      setMessage(errMsg);
      toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    name,
    submitting,
    message,
    onChange,
    onSubmit,
  };
}
