import mongoose from "mongoose";

const RideSchema = new mongoose.Schema(
  {
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
    },

    pickup: {
      type: String,
      required: true,
    },

    drop: {
      type: String,
      required: true,
    },

    distance: {
      type: Number,
      required: true,
    },

    // 💰 ADD THIS
    fare: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["requested", "accepted", "completed"],
      default: "requested",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ride", RideSchema);