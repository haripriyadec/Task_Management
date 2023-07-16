import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import AddTask from "../users/AddTask";
import axios from 'axios';

function Task() {
  const [authid, setAuthId] = useState(
    JSON.parse(localStorage.getItem("userdata")).authorities[0].id
  );
  const [task, setTask] = useState(
    JSON.parse(localStorage.getItem("userdata")).tasks
  );
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("userdata")).firstname
  );
  const [mail, setMail] = useState(
    JSON.parse(localStorage.getItem("userdata")).username
  );
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8017/users");
    const filteredTasks = result.data.filter((user) => user.username === mail);
    setUsers(filteredTasks);
  };

  return (
    authid == 2 ? (
      <div>
        <Navbar />
        <AddTask />
      </div>
    ) : (
      <div>
        <Navbar />
        <div
          style={{
            background: "linear-gradient(to bottom right, #FFFFFF, #F5F5F5)",
            paddingTop: "2rem",
            paddingBottom: "2rem",
          }}
        >
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "aquablue",
              fontSize: "2.5rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              margin: 0,
              padding: "1rem",
              borderBottom: "1px solid #ccc",
            }}
          >
            Tasks Assigned to {name}
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "2rem",
            }}
          >
            {users.map((user, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  background: "#f2f2f2",
                  borderRadius: "5px",
                  color: "blue",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  width: "300px",
                  textAlign: "center",
                }}
              >
                {user.taskname}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Task;
