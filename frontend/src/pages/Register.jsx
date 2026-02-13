import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import registerImg from "../assets/illustrations/Register.jpg";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await API.post("/auth/register", form);
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      {/* Illustration */}
      <div className="auth-illustration">
        <img src={registerImg} alt="Register illustration" />
      </div>

      {/* Form */}
      <div className="auth-container">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join AutoService today</p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label>Full Name</label>
          </div>

          {/* Phone */}
          <div className="form-group">
            <input
              type="text"
              name="phone"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label>Phone Number</label>
          </div>

          {/* Password */}
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label>Password</label>
          </div>

          {/* Role */}
          <div className="form-group">
            <select name="role" onChange={handleChange}>
              <option value="passenger">Passenger</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          {/* Submit */}
          <button className="primary-btn" type="submit">
            Register
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}