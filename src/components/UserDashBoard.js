import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { PieChart, Pie, Tooltip, Legend } from "recharts";

const UserDashboard = () => {
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

    const colors = {
      complete: "#8884d8",
      pending: "#82ca9d",
      "To-Do": "#ffc658",
    };

    return Object.entries(count).map(([key, value]) => ({ status: key, count: value, color: colors[key] }));
  };

  const data = getStatusCount(status);

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
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div style={{ flex: 1 }}>
          <div className="container">
            <div className="py-4">
              <div className="mb-3"></div>
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
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
