import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PassengerHome from "./pages/PassengerHome";
import DriverDashboard from "./pages/DriverDashboard";
import RideStatus from "./pages/RideStatus";
import PassengerHistory from "./pages/PassengerHistory";
import DriverHistory from "./pages/DriverHistory";
import DriverEarnings from "./pages/DriverEarnings";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Passenger */}
        <Route
          path="/passenger"
          element={
            <ProtectedRoute>
              <PassengerHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ride-status"
          element={
            <ProtectedRoute>
              <RideStatus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/passenger/history"
          element={
            <ProtectedRoute>
              <PassengerHistory />
            </ProtectedRoute>
          }
        />

        {/* Driver */}
        <Route
          path="/driver"
          element={
            <ProtectedRoute>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/history"
          element={
            <ProtectedRoute>
              <DriverHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/earnings"
          element={
            <ProtectedRoute>
              <DriverEarnings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;