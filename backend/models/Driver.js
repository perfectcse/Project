import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    totalEarnings: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Driver", DriverSchema);
