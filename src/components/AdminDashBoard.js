import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { PieChart, Pie, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    extractStatusValues(users);
  }, [users]);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8017/users");
    setUsers(result.data);
  };

  const extractStatusValues = (data) => {
    const statuses = data.map((user) => user.status.toLowerCase());
    setStatus(statuses);
  };

  const getStatusCount = (status) => {
    const count = status.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(count).map(([key, value]) => ({ status: key, count: value }));
  };

  const data = getStatusCount(status);

  const getUserCountByStatus = (status) => {
    const count = users.reduce((acc, user) => {
      if (user.status.toLowerCase() === status.toLowerCase()) {
        acc[user.username] = (acc[user.username] || 0) + 1;
      }
      return acc;
    }, {});
    return Object.entries(count).map(([username, count]) => ({ username, count }));
  };

  const renderLineCharts = () => {
    const lineCharts = ["Complete", "Pending", "To-Do"].map((status, index) => (
      <div key={index} style={{ marginBottom: "2rem" }}>
        <h3>{status} Tasks</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getUserCountByStatus(status)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="username" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    ));
    return lineCharts;
  };

  return (
    <div>
      <Navbar />
      <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
            color: "aquablue",
            background:"whitesmoke"
          }}
        >
          Dashboard
        </h1>
      <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Username</th>
                <th scope="col">Taskname</th>
                <th scope="col">Description</th>
                <th scope="col">Duedate</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.taskname}</td>
                  <td>{user.description}</td>
                  <td>{user.duedate}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <PieChart width={400} height={400}>
          <Pie data={data} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <div className="container">
        <div className="py-4">{renderLineCharts()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
