import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
//import { AuthContext } from "../context/AuthContext";
import AuthContext from "../context/AuthContext";
import pickupIcon from "../assets/icons/pickup.jpg";
import dropIcon from "../assets/icons/drop.jpg";

import "../styles/booking.css";

export default function PassengerHome() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    pickup: "",
    drop: "",
    distance: ""
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const bookRide = async () => {
    if (!form.pickup || !form.drop || !form.distance) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await API.post(
        "/rides/create",
        {
          pickup: form.pickup,
          drop: form.drop,
          distance: Number(form.distance)
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      navigate(`/ride-status?id=${res.data.ride._id}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Ride creation failed");
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-overlay" />

      <div className="booking-card">
        <h2>Book Your Auto</h2>
        <p className="booking-subtitle">
          Fast • Affordable • Reliable
        </p>

        <div className="input-group">
          <img src={pickupIcon} alt="Pickup" />
          <input
            name="pickup"
            placeholder="Pickup location"
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <img src={dropIcon} alt="Drop" />
          <input
            name="drop"
            placeholder="Drop location"
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <span className="M">Meter</span>
          <input
            name="distance"
            placeholder="Distance"
            type="number"
            onChange={handleChange}
          />
        </div>

        <button className="primary-btn" onClick={bookRide}>
          🚖 Book Auto
        </button>
      </div>
    </div>
  );
}