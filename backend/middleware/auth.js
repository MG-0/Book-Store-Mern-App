const jwt = require("jsonwebtoken");

const auth = (requiredRole = null) => {
  return async (req, res, next) => {
    console.log("Cookies received:", req.cookies);
    
    // التعديل: قمنا بتغيير طريقة جلب التوكن. بما أن الـ Frontend يحفظ التوكن في الـ Cookie (httpOnly)
    // فإن المتصفح يرسله تلقائياً في req.cookies.token. لذا نبحث عنه أولاً في الكوكيز.
    let token = req.cookies?.token;

    // كخيار احتياطي (Fallback): إذا لم يتواجد التوكن في الكوكيز وكان متاحاً في الهيدرز (مثلاً في اختبارات API أو Postman)
    // نقوم بجلب التوكن من الـ Authorization Header وندعم صيغة الـ Bearer Token.
    if (!token && req.headers['authorization']) {
      const authHeader = req.headers['authorization'];
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      } else {
        token = authHeader;
      }
    }

    console.log("Token extracted:", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied, token not valid!" });
    }

    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) {
        console.log("JWT Verify Error:", error.message);
        return res.status(401).json({ message: "Invalid token" });
      }

      console.log("Decoded payload:", decoded);
      req.user = decoded;

      if (requiredRole && decoded.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Access Denied, no permission!" });
      }

      next();
    });
  };
};



const AuthCookie = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied, token not valid!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({message: 'invalid token'})
  }
}

module.exports = {auth, AuthCookie}
