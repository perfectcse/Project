import "../styles/dashboard.css";

export default function RideCard({
  pickup,
  drop,
  fare,
  status,
  actionText,
  onAction
}) {
  return (
    <div className="ride-card">
      <div className="ride-info">
        <p><strong>Pickup:</strong> {pickup}</p>
        <p><strong>Drop:</strong> {drop}</p>
      </div>

      <div className="ride-meta">
        <span className="fare">₹{fare}</span>
        <span className={`status ${status}`}>{status}</span>
      </div>

      {actionText && (
        <button className="primary-btn full" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
}
