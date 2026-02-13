import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import Ride from "../models/Ride.js";

const router = express.Router();

/* ===========================
   DRIVER EARNINGS
=========================== */

router.get("/earnings", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "driver") {
      return res.status(403).json({ message: "Access denied" });
    }

    const rides = await Ride.find({
      driver: req.user.id,
      status: "completed",
    });

    const totalEarnings = rides.reduce(
      (sum, r) => sum + (r.fare || 0), // 🛡️ Safe fallback
      0
    );

    res.json({
      totalEarnings,
      totalRides: rides.length,
    });
  } catch (err) {
    console.error("DRIVER EARNINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch earnings" });
  }
});

export default router;