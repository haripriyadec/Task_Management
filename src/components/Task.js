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
          The Task Assigned to {name}:
        </h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          {users.map((user, index) => (
            <div key={index} style={{ marginBottom: "10px", padding: "10px", background: "#f2f2f2", borderRadius: "5px" ,color:'blue'}}>
              {user.taskname}
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default Task;
