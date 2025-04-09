import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch users
    axios.get("/api/admin/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Users Error:", err));

    // Fetch attendance
    axios.get("/api/admin/attendance")
      .then(res => setAttendance(res.data))
      .catch(err => console.error("Attendance Error:", err));

    // Fetch payments
    axios.get("/api/admin/payments")
      .then(res => setPayments(res.data))
      .catch(err => console.error("Payments Error:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel - Zehra Sec</h1>

      {/* Users Table */}
      <div className="mb-10">
        <h2 className="text-xl mb-2">Registered Users</h2>
        <div className="overflow-auto">
          <table className="w-full text-sm border border-gray-700">
            <thead className="bg-neutral">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-t border-gray-700">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2 capitalize">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="mb-10">
        <h2 className="text-xl mb-2">Attendance Logs</h2>
        <div className="overflow-auto">
          <table className="w-full text-sm border border-gray-700">
            <thead className="bg-neutral">
              <tr>
                <th className="p-2">User</th>
                <th className="p-2">Date</th>
                <th className="p-2">Check-In</th>
                <th className="p-2">Check-Out</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((log, i) => (
                <tr key={i} className="border-t border-gray-700">
                  <td className="p-2">{log.userName}</td>
                  <td className="p-2">{log.date}</td>
                  <td className="p-2">{log.checkIn}</td>
                  <td className="p-2">{log.checkOut || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payments Table */}
      <div>
        <h2 className="text-xl mb-2">Payments</h2>
        <div className="overflow-auto">
          <table className="w-full text-sm border border-gray-700">
            <thead className="bg-neutral">
              <tr>
                <th className="p-2">User</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, i) => (
                <tr key={i} className="border-t border-gray-700">
                  <td className="p-2">{pay.userName}</td>
                  <td className="p-2">₹{pay.amount}</td>
                  <td className="p-2">{new Date(pay.date).toLocaleDateString()}</td>
                  <td className="p-2 capitalize text-green-400">{pay.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
