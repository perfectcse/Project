import Ride from "../models/Ride.js";

export const getDriverEarnings = async (req, res) => {
  try {
    if (req.user.role !== "driver") {
      return res.status(403).json({ message: "Access denied" });
    }

    const rides = await Ride.find({
      driver: req.user.id,
      status: "completed",
    });

    const totalEarnings = rides.reduce(
      (sum, ride) => sum + (ride.fare || 0),
      0
    );

    res.json({
      totalEarnings,
      totalRides: rides.length,
    });
  } catch (error) {
    console.error("DRIVER EARNINGS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch earnings" });
  }
};