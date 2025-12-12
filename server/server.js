import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/authRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 4000;
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://taskmanagementappv1.netlify.app",
];
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1500,
  message: {
    success: false,
    message:
      "We have received too many requests from this IP. Please try again after some time.",
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use("/api/auth", apiLimiter, authRouter);
app.use("/api/tasks", apiLimiter, taskRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server running at: http://localhost:${PORT}`)
);
