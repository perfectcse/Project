import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";

dotenv.config();

const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= Routes =================
app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/driver", driverRoutes);

// ================= Error Handler (LAST) =================
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// ================= DB + Server =================
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });
