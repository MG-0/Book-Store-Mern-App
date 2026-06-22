<h1 align="center">
  📚 BookStore
</h1>

<p align="center">
  A full-stack e-commerce web application for buying and managing books — built with the MERN stack.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/PRs-welcome-orange?style=flat-square" />
</p>

---

## ✨ Features

### 🛍️ Customer Features
- **Browse Books** — Explore a rich catalog with category filtering, search, and sort options
- **Book Details** — Detailed view with description, price, author, and related books
- **Shopping Cart** — Add/remove books, update quantities, view running total
- **Wishlist** — Save favorite books with heart toggle, persisted in `localStorage`
- **Checkout** — Place orders with order summary and confirmation
- **Authentication** — Secure sign-up / sign-in with JWT stored in HTTP-only cookies
- **User Profile** — View account info and order history
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop

### 🔐 Admin Features
- **Dashboard** — Overview of all books in the store
- **Add / Update Books** — Full CRUD with image upload via Multer
- **Category Management** — Create and list book categories

### ⚙️ Technical Highlights
- **JWT Authentication** via secure HTTP-only cookies
- **Cart isolation per user** — cart resets cleanly on login/logout
- **Order persistence** — orders saved to MongoDB after successful checkout
- **Debounced search** — smooth search experience without excess API calls
- **Skeleton loaders** — perceived performance during data fetching
- **Error Boundary** — graceful fallback for unexpected UI errors
- **404 Page** — user-friendly not-found experience
- **Toast notifications** — real-time feedback via `react-toastify`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, React Router v6, Context API |
| **Styling** | Tailwind CSS (utility-first inline styles) |
| **Backend** | Node.js, Express.js 5 |
| **Database** | MongoDB Atlas + Mongoose ODM |
| **Auth** | JSON Web Tokens (JWT) + bcrypt |
| **File Upload** | Multer (book cover images) |
| **Notifications** | react-toastify |
| **Icons** | lucide-react |

---

## 📁 Project Structure

```
BookStore/
├── backend/
│   ├── config/          # Database connection
│   ├── controller/      # Route handlers (books, users, cart, orders, categories)
│   ├── images/          # Uploaded book cover images
│   ├── middleware/       # JWT authentication middleware
│   ├── model/           # Mongoose schemas (Book, User, Cart, Order, Category)
│   ├── routes/          # Express route definitions
│   ├── .env.example     # Environment variable template ← copy to .env
│   └── server.js        # App entry point
│
└── frontend/
    └── src/
        ├── api/         # Axios API service functions
        ├── components/  # Reusable UI components (Atomic Design)
        │   ├── header/  # Desktop + Mobile header sub-components
        │   ├── ui/      # BookCard, Button, Input, Card, Skeleton...
        │   ├── admin/   # Admin panel components
        │   └── ...      # Hero, Footer, FAQ, Testimonials, etc.
        ├── context/     # AuthContext, CartContext, WishlistContext
        ├── pages/       # Route-level page components
        │   ├── home, products, cart, checkout
        │   ├── wishlist, profile, about, contact
        │   ├── signin, signup, bookDetails, notFound
        └── utils/       # Custom hooks (useDebounce, etc.)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/BookStore.git
cd BookStore
```

---

### 2. Configure the Backend

```bash
cd backend
cp .env.example .env
```

Open `.env` and fill in your values:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/bookstore
JWT_KEY=your_super_secret_jwt_key
```

Install dependencies and start the server:

```bash
npm install
npm run dev
```

The backend will run at: `http://localhost:5000`

---

### 3. Configure the Frontend

```bash
cd ../frontend
npm install
npm start
```

The frontend will run at: `http://localhost:3000`

> Make sure the backend is running before starting the frontend.

---

## 🔑 Environment Variables

All secret configuration lives in `backend/.env` (never committed to Git).

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port the Express server listens on | `5000` |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_KEY` | Secret key used to sign JWT tokens | `a-long-random-string` |

> 📄 See [`backend/.env.example`](./backend/.env.example) for the full template.

---

## 📸 Screenshots

> _Coming soon — add screenshots of the Home, Products, Cart, and Admin pages here._

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ using the MERN Stack
</p>
