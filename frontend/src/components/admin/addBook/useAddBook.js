import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";


export default function useAddBook() {
      const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [category, setCategory] = useState([]);
  const [submiting, setSubmiting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: 0,
    isOnSale: false,
    isFeatured: false,
    stock: "",
    discountPercentage: 0,
    imageUrl: null,
    category: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosInstance.get("/categories/getCategories");
        return setCategory(response.data.categories);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          navigate("/", { replace: true });
          return;
        }
        console.log("Failed Fetch Category", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    return () => {
      if (preview) {
        return URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onChange = (e) => {
    const { name, value, files, checked, type } = e.target;

    if (type === "file") {
      const file = files?.[0] || null;
      setForm((p) => ({ ...p, [name]: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
      return;
    }
    if (type === "checkbox") {
      setForm((p) => ({ ...p, [name]: checked }));
      return;
    }
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (
      !form.title.trim() ||
      !form.author.trim() ||
      !form.stock ||
      !form.description.trim() ||
      Number(form.price <= 0)
    ) {
      setMessage("All Feildes Are Requires");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("description", form.description);
    formData.append("price", String(form.price));
    formData.append("stock", String(form.stock));
    formData.append("discountPercentage", String(form.discountPercentage));
    formData.append("isFeatured", String(form.isFeatured));
    formData.append("isOnSale", String(form.isOnSale));
    if (form.category) formData.append("category", form.category);
    if (form.imageUrl) formData.append("imageUrl", form.imageUrl);

    try {
      setSubmiting(true);
     const response = await axiosInstance.post("/admin/createBook", formData);
     console.log(response.data.book)
      
      setMessage("Book Created Successfully");
      setForm({
        title: "",
        author: "",
        description: "",
        price: 0,
        isOnSale: false,
        isFeatured: false,
        stock: "",
        discountPercentage: 0,
        imageUrl: null,
        category: "",
      });
      setPreview(null);
    } catch (error) {
       if (error.response.status === 401 || error.response.status === 403) {
         navigate("/", { replace: true });
         return
       }
      setMessage(error.response?.data?.message || "Created Book Failed!");
    } finally {
      setSubmiting(false);
    }
  };

  return {
    form,
    category,
    preview,
    loading,
    submiting,
    message,
    onChange,
    onSubmit,
  };
}
