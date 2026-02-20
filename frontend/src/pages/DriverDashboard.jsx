import { useEffect, useState, useContext } from "react";
import API from "../services/api";
//import { AuthContext } from "../context/AuthContext";
import AuthContext from "../context/AuthContext";  
import driverImg from "../assets/icons/driver.jpg";
import "../styles/dashboard.css";

export default function DriverDashboard() {
  const { user } = useContext(AuthContext);

  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchRide = async () => {
      try {
        const res = await API.get("/rides", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const pendingRide = res.data.find((r) => r.status === "requested");
        setRide(pendingRide || null);
      } catch (err) {
        console.error("FETCH RIDE ERROR:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRide();
  }, [user]);

  const acceptRide = async () => {
    try {
      await API.put(`/rides/accept/${ride._id}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      await API.put(`/rides/complete/${ride._id}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      alert("Ride completed successfully 🚕");
      setRide(null);
    } catch (err) {
      console.error("ACCEPT ERROR:", err.response?.data || err.message);
      alert("Failed to process ride");
    }
  };

  return (
    <div className="page-container">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <h2>Driver Dashboard 🚕</h2>
          <span className="status-pill online">Online</span>
        </div>

        <p className="dashboard-subtitle">
          Check and accept nearby ride requests
        </p>

        {loading && <p className="loading-text">Loading rides...</p>}

        {!loading && !ride && (
          <div className="empty-state">
            <img src={driverImg} alt="No rides" className="empty-img" />
            <h3>No ride requests</h3>
            <p>Relax while we find passengers for you 🚕</p>
          </div>
        )}

        {!loading && ride && (
          <div className="ride-card">

            <div className="ride-info">
              <p><strong>Pickup:</strong> {ride.pickup}</p>
              <p><strong>Drop:</strong> {ride.drop}</p>
              <p><strong>Distance:</strong> {ride.distance} km</p>
            </div>

            <div className="ride-meta">
              <span className="fare">₹{ride.fare || ride.distance * 10}</span>
              <span className={`status ${ride.status}`}>
                {ride.status}
              </span>
            </div>

            <button className="primary-btn" onClick={acceptRide}>
              Accept & Complete Ride
            </button>

          </div>
        )}

      </div>
    </div>
  );
}