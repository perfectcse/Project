import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import AuthContext from "../context/AuthContext";

import passengerImg from "../assets/illustrations/passenger.jpg";
import RideTimeline from "../components/RideTimeline";
import "../styles/booking.css";

export default function RideStatus() {
  const [params] = useSearchParams();
  const rideId = params.get("id");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    if (!rideId) {
      setError("Invalid ride ID");
      setLoading(false);
      return;
    }

    const fetchRide = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get(`/rides/${rideId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setRide(res.data);
      } catch (err) {
        console.error("FETCH RIDE ERROR:", err);
        setError("Unable to load ride details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRide();
  }, [user, rideId, navigate]);

  /* =====================
     UI STATES
  ===================== */

  if (loading) {
    return <p className="info loading">Loading ride status…</p>;
  }

  if (error) {
    return <p className="info error">{error}</p>;
  }

  if (!ride) {
    return <p className="info error">Ride not found</p>;
  }

  return (
    <div className="status-page">
      <div className="status-card">

        <div className="status-header">
          <h2>Ride Status</h2>
          <span className={`badge ${ride.status}`}>
            {ride.status?.toUpperCase()}
          </span>
        </div>

        <RideTimeline status={ride.status} />

        {ride.status === "requested" && (
          <div className="status-image">
            <img src={passengerImg} alt="Waiting for driver" />
            <h3>Finding a driver…</h3>
            <p>Please wait while a nearby driver accepts your ride</p>
          </div>
        )}

        <div className="status-details">
          <div className="detail-row">
            <span>Pickup</span>
            <strong>{ride.pickup}</strong>
          </div>

          <div className="detail-row">
            <span>Drop</span>
            <strong>{ride.drop}</strong>
          </div>

          <div className="detail-row">
            <span>Distance</span>
            <strong>{ride.distance} KM</strong>
          </div>
        </div>

      </div>
    </div>
  );
}