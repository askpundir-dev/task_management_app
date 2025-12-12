import { db } from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER-------------------------------------
const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  // 1. Basic Input Validation
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
  }

  // Basic email format check
  if (!email.includes("@") || !email.includes(".")) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format." });
  }

  try {
    // 2. Check if the email already exists
    const [existingUsers] = await db.query(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      // Return a 409 Conflict status code for existing email.
      return res
        .status(409)
        .json({ success: false, message: "Email already exists." });
    }

    // 3. Securely hash the password with a salt round
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    // 4. Insert the new user
    await db.query(
      "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)",
      [fullName, email, hashed]
    );

    // 5. Success Response
    res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred during registration.",
    });
  }
};

// LOGIN--------------------------------------
const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. Basic Input Validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }

  try {
    // 2. Fetch the user
    const [rows] = await db.query(
      "SELECT id, email, password, fullName FROM users WHERE email = ?",
      [email]
    );
    const user = rows[0];

    // 3. Check if user exists
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email." });
    }

    // 4. Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      //401 Unauthorized
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password." });
    }

    // Ensure the JWT_SECRET is available in our .env
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables!");
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error." });
    }

    // 5. Generate JWT Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 6. Set HTTP-only Cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === "production",
    });

    // 7. Success Response
    res.status(200).json({
      success: true,
      message: `Login successful. Welcome back ${user.fullName}`,
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred during login.",
    });
  }
};

// LOGOUT-------------------------------------------------
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

function getAuthStatus(req, res) {
  return res.status(200).json({
    success: true,
    message: "User is Authenticated",
  });
}

export { register, login, logout, getAuthStatus };
