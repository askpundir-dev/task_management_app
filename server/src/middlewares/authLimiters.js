import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // max 10 login per 10 min allowed
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // only 5 account creations per hour per IP 
  message: {
    success: false,
    message: "Too many registration attempts from this IP. Try again later.",
  },
});

export { loginLimiter, registerLimiter };
