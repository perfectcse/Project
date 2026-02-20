import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
//import { AuthContext } from "../context/AuthContext";
import AuthContext from "../context/AuthContext";
import loginImg from "../assets/illustrations/login.jpg";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    phone: "",
    password: "",
    role: "passenger",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      login({
        token: res.data.token,
        role: res.data.role,
        user: res.data.user,
      });

      if (res.data.role === "driver") {
        navigate("/driver");
      } else {
        navigate("/passenger");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Side Image */}
      <div className="auth-illustration">
        <img src={loginImg} alt="Login illustration" />
      </div>

      {/* Login Form */}
      <div className="auth-container modern">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="phone" required onChange={handleChange} />
            <label>Phone Number</label>
          </div>

          <div className="form-group">
            <input type="password" name="password" required onChange={handleChange} />
            <label>Password</label>
          </div>

          <div className="form-group">
            <select name="role" onChange={handleChange}>
              <option value="passenger">Passenger</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          <button className="primary-btn modern-btn" type="submit">
            Login
          </button>
        </form>

        <p className="auth-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}