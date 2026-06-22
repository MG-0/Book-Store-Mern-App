const express = require("express");
const router = express.Router();
const bookAdmin = require("../controller/admin");
const multer = require("multer");
const { auth, AuthCookie } = require("../middleware/auth");

// Upload Image by Multer Processing
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const fieldname = Date.now() + "-" + file.fieldname;
    cb(null, file.fieldname);
  },
});

const upload = multer({ storage: storage });

// Create New Book
router.post(
  "/createBook",
  auth("admin"),
  upload.single("imageUrl"),
  bookAdmin.createBook,
);

// Get All Books
// التعديل: قمنا بحذف وسيط المصادقة المكرر `AuthCookie` من هذا المسار لأن وسيط `auth("admin")` 
// يقوم بالفعل بالتحقق من التوكن وصلاحية الأدمن بالكامل. وضع الاثنين معاً يسبب تكرار وفشل بدون داعي.
router.get("/getBooks", auth("admin"), bookAdmin.getBooks);

// Get Book By ID
router.get("/:id", bookAdmin.getBook);

// Updated Book
router.put("/update/:id", auth("admin"), bookAdmin.updateBook);

// deleted Book
router.delete("/delete/:id", auth("admin"), bookAdmin.deleteBook);

module.exports = router;
