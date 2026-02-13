import Ride from "../models/Ride.js";
import Driver from "../models/Driver.js";

/* ================================
   CREATE RIDE (Passenger)
================================ */
export const createRide = async (req, res) => {
  try {
    if (req.user.role !== "passenger") {
      return res.status(403).json({ message: "Only passengers can create rides" });
    }

    const { pickup, drop, distance } = req.body;

    if (!pickup || !drop || !distance) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ride = await Ride.create({
      passenger: req.user.id,
      pickup,
      drop,
      distance: Number(distance),
      status: "requested",
      fare: 0
    });

    res.status(201).json({ ride });

  } catch (err) {
    console.error("CREATE RIDE ERROR:", err);
    res.status(500).json({ message: "Ride creation failed" });
  }
};

/* ================================
   ACCEPT RIDE (Driver)
================================ */
export const acceptRide = async (req, res) => {
  try {
    if (req.user.role !== "driver") {
      return res.status(403).json({ message: "Only drivers can accept rides" });
    }

    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    ride.driver = req.user.id;
    ride.status = "accepted";

    await ride.save();

    res.json({ message: "Ride accepted", ride });

  } catch (err) {
    console.error("ACCEPT RIDE ERROR:", err);
    res.status(500).json({ message: "Accept ride failed" });
  }
};

/* ================================
   COMPLETE RIDE (Driver)
================================ */
export const completeRide = async (req, res) => {
  try {
    if (req.user.role !== "driver") {
      return res.status(403).json({ message: "Only drivers can complete rides" });
    }

    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    if (!ride.driver || ride.driver.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized driver" });
    }

    // 💰 calculate fare
    ride.status = "completed";
    ride.fare = ride.distance * 10;
    await ride.save();

    // 🔥 update driver earnings
    const driver = await Driver.findById(req.user.id);

    if (driver) {
      driver.totalEarnings += ride.fare || 0;
      await driver.save();
    }

    res.json({ message: "Ride completed & earnings updated", ride });

  } catch (err) {
    console.error("COMPLETE RIDE ERROR:", err);
    res.status(500).json({ message: "Complete ride failed" });
  }
};

/* ================================
   DRIVER DASHBOARD RIDES
================================ */
export const getRides = async (req, res) => {
  try {
    if (req.user.role !== "driver") {
      return res.status(403).json({ message: "Access denied" });
    }

    const rides = await Ride.find({ status: "requested" })
      .populate("passenger", "name phone")
      .sort({ createdAt: -1 });

    res.json(rides);

  } catch (err) {
    console.error("GET RIDES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch rides" });
  }
};

/* ================================
   GET SINGLE RIDE
================================ */
export const getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate("passenger", "name phone")
      .populate("driver", "name phone");

    if (!ride) return res.status(404).json({ message: "Ride not found" });

    res.json(ride);

  } catch (err) {
    console.error("GET RIDE ERROR:", err);
    res.status(500).json({ message: "Failed to fetch ride" });
  }
};

/* ================================
   PASSENGER HISTORY
================================ */
export const getPassengerHistory = async (req, res) => {
  try {
    if (req.user.role !== "passenger") {
      return res.status(403).json({ message: "Access denied" });
    }

    const rides = await Ride.find({
      passenger: req.user.id,
      status: "completed"
    }).sort({ createdAt: -1 });

    res.json(rides);

  } catch (err) {
    console.error("PASSENGER HISTORY ERROR:", err);
    res.status(500).json({ message: "Failed to fetch passenger history" });
  }
};

/* ================================
   DRIVER HISTORY
================================ */
export const getDriverHistory = async (req, res) => {
  try {
    if (req.user.role !== "driver") {
      return res.status(403).json({ message: "Access denied" });
    }

    const rides = await Ride.find({
      driver: req.user.id,
      status: "completed"
    }).sort({ createdAt: -1 });

    res.json(rides);

  } catch (err) {
    console.error("DRIVER HISTORY ERROR:", err);
    res.status(500).json({ message: "Failed to fetch driver history" });
  }
};