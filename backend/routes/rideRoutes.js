import express from "express";
import verifyToken from "../middleware/authMiddleware.js";

import {
  createRide,
  acceptRide,
  completeRide,
  getRideById,
  getRides,
  getPassengerHistory,
  getDriverHistory,
} from "../controllers/rideController.js";

const router = express.Router();

/* =========================
   PASSENGER HISTORY
========================= */
router.get("/history/passenger", verifyToken, getPassengerHistory);

/* =========================
   DRIVER HISTORY
========================= */
router.get("/history/driver", verifyToken, getDriverHistory);

/* =========================
   CREATE RIDE (Passenger)
========================= */
router.post("/create", verifyToken, createRide);

/* =========================
   ACCEPT RIDE (Driver)
========================= */
router.put("/accept/:id", verifyToken, acceptRide);

/* =========================
   COMPLETE RIDE (Driver)
========================= */
router.put("/complete/:id", verifyToken, completeRide);

/* =========================
   DRIVER DASHBOARD (requested rides)
========================= */
router.get("/", verifyToken, getRides);

/* =========================
   SINGLE RIDE (Passenger / Driver)
========================= */
router.get("/:id", verifyToken, getRideById);

export default router;
