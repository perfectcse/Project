import { useEffect, useState, useContext } from "react";
import API from "../services/api";
//import { AuthContext } from "../context/AuthContext";
import AuthContext from "../context/AuthContext";
import "../styles/earnings.css";

export default function DriverEarnings() {
  const { user } = useContext(AuthContext);

  const [earnings, setEarnings] = useState(0);
  const [totalRides, setTotalRides] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchEarnings = async () => {
      try {
        const res = await API.get("/driver/earnings", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setEarnings(res.data.totalEarnings);
        setTotalRides(res.data.totalRides);
      } catch (error) {
        console.error(
          "EARNINGS ERROR:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [user]);

  if (loading) {
    return <p className="loading-text">Loading earnings...</p>;
  }

  return (
    <div className="page-container">
      <div className="earnings-card">
        <h2>Driver Earnings</h2>
        <p className="subtitle">Your completed rides & earnings</p>

        <div className="earnings-box">
          <div className="earnings-item">
            <span>Total Earnings</span>
            <strong>₹{earnings}</strong>
          </div>

          <div className="earnings-item">
            <span>Total Rides</span>
            <strong>{totalRides}</strong>
          </div>
        </div>

        {totalRides === 0 && (
          <p className="empty-text">No completed rides yet 🚕</p>
        )}
      </div>
    </div>
  );
}