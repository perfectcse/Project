import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo/log.jpg";
import "../App.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // clear token + user
    navigate("/");     // redirect to login
  };

  return (
    <header className="navbar">
      {/* ================= LOGO ================= */}
      <div className="nav-left">
        <div className="logo-box">
          <img src={logo} alt="AutoService Logo" className="logo-img" />
          <span className="logo-text">AutoService</span>
        </div>
      </div>

      {/* ================= NAV LINKS ================= */}
      <nav className="nav-right">
        {/* -------- Passenger Links -------- */}
        {user?.role === "passenger" && (
          <>
            <Link to="/passenger" className="nav-link">
              Book Ride
            </Link>

            <Link to="/passenger/history" className="nav-link">
              My Rides
            </Link>
          </>
        )}

        {/* -------- Driver Links -------- */}
        {user?.role === "driver" && (
          <>
            <Link to="/driver" className="nav-link">
              Dashboard
            </Link>

            <Link to="/driver/history" className="nav-link">
              Ride History
            </Link>

            <Link to="/driver/earnings" className="nav-link">
              Earnings
            </Link>
          </>
        )}

        {/* -------- Logout -------- */}
        {user && (
          <button onClick={handleLogout} className="nav-link logout-btn">
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}