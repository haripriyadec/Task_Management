import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function AdminReport() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8017/users");
    setUsers(result.data);
  };


  return (
    <div className="container">

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
        Reports
        </h1>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Username</th>
              <th scope="col">Taskname</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                 <td>{user.username}</td>
                <td>{user.taskname}</td>
                <td>
                <Link className="btn btn-primary mx-2" to={`/adminuserreport/${user.id}`}>
                 Report
                </Link>

                  
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}