import Header from "./components/header/Header";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import AllBooks from "./components/admin/allBooks/AllBooks";
import AddBook from "./components/admin/addBook/AddBook";
import { useLocation } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Signin from './pages/signin/Signin'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider} from './context/CartContext'
import Cart from "./pages/cart/Cart";
import UpdateBook from "./components/admin/updateBook/UpdateBook";
import BookDetails from "./pages/bookDetails/BookDetails";
import ProductsPage from "./pages/products/ProductsPage";
import AddCategory from "./components/admin/addCategory/AddCategory";
import AllCategories from "./components/admin/allCategories/AllCategories";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary";
import WishlistPage from "./pages/wishlist/WishlistPage";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="App">
              {!isAdmin && <Header />}

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />

              <Route path="/admin" element={<AdminLayout />}>
                <Route path="addBook" element={<AddBook />} />
                <Route path="updateBook/:id" element={<UpdateBook />} />
                <Route path="addCategory" element={<AddCategory />} />
                <Route path="allCategories" element={<AllCategories />} />
                <Route index element={<AllBooks />} />
                <Route path="allBooks" element={<AllBooks />} />
              </Route>

              {/* fallback 404 route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={true}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </ErrorBoundary>
  );
}

export default App;
