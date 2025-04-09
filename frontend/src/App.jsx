import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages & Components
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Attendance from "./pages/Attendance";
import Certificate from "./pages/Certificate";
import RequestService from "./pages/RequestService";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-primary text-white font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/request-service" element={<RequestService />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
