import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    employees: 0,
    certificates: 0,
    earnings: 0,
  });

  useEffect(() => {
    axios.get("/api/admin/dashboard")
      .then(res => setStats(res.data))
      .catch(err => console.error("Dashboard fetch error:", err));
  }, []);

  const cards = [
    { title: "Total Users", value: stats.users, color: "bg-blue-600" },
    { title: "Active Employees", value: stats.employees, color: "bg-green-600" },
    { title: "Certificates Issued", value: stats.certificates, color: "bg-purple-600" },
    { title: "Total Earnings (₹)", value: stats.earnings, color: "bg-yellow-600" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Zehra Sec Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} rounded-lg p-6 text-white shadow-md flex flex-col justify-center items-center`}
          >
            <p className="text-lg">{card.title}</p>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
