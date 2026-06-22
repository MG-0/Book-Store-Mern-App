import {  useState, useEffect } from 'react'
import axiosInstance from '../../../api/axiosInstance'
import { useNavigate } from 'react-router-dom';

export default function useAllBooks() {

    const [bookList, setBookList] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await axiosInstance.get("/admin/getBooks");
          setBookList(response.data.books);
        } catch (error) {
          console.log("Failed Fetch Books", error);
          if (error.response.status === 401 || error.response.status === 403) {
            navigate("/", { replace: true });
          }
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }, [navigate]);

    const removeBook = async (id) => {
      try {
        await axiosInstance.delete(`/admin/delete/${id}`)
        setBookList((prev) => prev.filter((book) => book._id !== id))
        alert('Book Deleted Successfully')
      } catch (error) {
        console.log("Deleted Book is Failed!", error)
      }
    }

    const toEditBook = (id) => {
      navigate(`/admin/updateBook/${id}`)
    }


    return { bookList, loading, toEditBook, removeBook };
}