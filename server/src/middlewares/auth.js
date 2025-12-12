import jwt from "jsonwebtoken";

/**
 * Authentication middleware that verifies JWT token from cookies and attaches userId to the request object.
 */
export const auth = (req, res, next) => {
  try {
    const token = req.cookies?.token; // Using optional chaining for safety
    console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (err) {
      res.clearCookie("token");
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
