import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState({
    field: "taskname",
    order: "asc",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8017/users");
    setUsers(result.data);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    setSortBy((prevSortBy) => ({
      field,
      order: prevSortBy.field === field && prevSortBy.order === "asc" ? "desc" : "asc",
    }));
  };

  const compareStrings = (a, b, order) => {
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();

    if (order === "asc") {
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    } else if (order === "desc") {
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    } else {
      return 0;
    }
  };

  const filteredUsers = users.filter((user) =>
    user.taskname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    const field = sortBy.field;
    const order = sortBy.order;

    if (field === "taskname") {
      return compareStrings(a.taskname, b.taskname, order);
    } else if (field === "status") {
      return compareStrings(a.status, b.status, order);
    } else {
      return 0;
    }
  });

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8017/user/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by taskname..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sort by:</label>
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-outline-primary ${sortBy.field === "taskname" && sortBy.order === "asc" ? "active" : ""}`}
              onClick={() => handleSort("taskname")}
            >
              Task Name {sortBy.field === "taskname" && <span>&#x25B2;</span>}
            </button>
            <button
              type="button"
              className={`btn btn-outline-primary ${sortBy.field === "taskname" && sortBy.order === "desc" ? "active" : ""}`}
              onClick={() => handleSort("taskname")}
            >
              Task Name {sortBy.field === "taskname" && <span>&#x25BC;</span>}
            </button>
            <button
              type="button"
              className={`btn btn-outline-primary ${sortBy.field === "status" && sortBy.order === "asc" ? "active" : ""}`}
              onClick={() => handleSort("status")}
            >
              Status {sortBy.field === "status" && <span>&#x25B2;</span>}
            </button>
            <button
              type="button"
              className={`btn btn-outline-primary ${sortBy.field === "status" && sortBy.order === "desc" ? "active" : ""}`}
              onClick={() => handleSort("status")}
            >
              Status {sortBy.field === "status" && <span>&#x25BC;</span>}
            </button>
          </div>
        </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Username</th>
              <th scope="col">Taskname</th>
              <th scope="col">Description</th>
              <th scope="col">Duedate</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                 <td>{user.username}</td>
                <td>{user.taskname}</td>
                <td>{user.description}</td>
                <td>{user.duedate}</td>
                <td>{user.status}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewtask/${user.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/edittask/${user.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}