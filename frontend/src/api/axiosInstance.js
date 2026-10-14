
import axios from 'axios';

// Base URL is read from the environment variable so we never hardcode localhost.
// In development:  REACT_APP_API_URL=http://localhost:5000  (set in frontend/.env)
// In production:   REACT_APP_API_URL=https://your-backend.onrender.com
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
});

// Helper used by every component that needs to show a book cover image.
// Usage:  <img src={getImageUrl(book.imageUrl)} />
export const getImageUrl = (imageUrl) => {
    if (!imageUrl || imageUrl === 'imageUrl') {
        return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
    }
    // If the backend already returns a full URL, use it as-is.
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${API_BASE_URL}/images/${imageUrl}`;
};

export default axiosInstance;