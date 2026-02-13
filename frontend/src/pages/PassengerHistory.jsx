import { useEffect, useState, useContext } from "react";
import API from "../services/api";
//import { AuthContext } from "../context/AuthContext";
import { AuthContext } from "../context/AuthContext";
import "../styles/history.css";

export default function PassengerHistory() {
  const { user } = useContext(AuthContext);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      try {
        const res = await API.get("/rides/history/passenger", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setRides(res.data || []);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="page-container">
      <div className="history-container">
        <h2>Ride History</h2>
        <p className="history-subtitle">Your completed rides</p>

        {loading && <p className="loading-text">Loading history...</p>}

        {!loading && rides.length === 0 && (
          <div className="empty-history">
            <p>No completed rides yet</p>
          </div>
        )}

        {!loading && rides.length > 0 && (
          <div className="history-list">
            {rides.map((ride) => (
              <div className="history-card" key={ride._id}>
                <div className="history-row">
                  <span>Pickup</span>
                  <strong>{ride.pickup}</strong>
                </div>
                <div className="history-row">
                  <span>Drop</span>
                  <strong>{ride.drop}</strong>
                </div>
                <div className="history-row">
                  <span>Distance</span>
                  <strong>{ride.distance} km</strong>
                </div>
                <div className="history-row fare">
                  <span>Fare</span>
                  <strong>₹{ride.fare}</strong>
                </div>
                <div className="history-footer">
                  <span className="badge completed">Completed</span>
                  <span className="date">
                    {new Date(ride.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}