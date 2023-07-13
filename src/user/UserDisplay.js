import React, { useState, useEffect } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

function UserDisplay() {
  const [details, setDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await axios.get(`http://localhost:8017/usermanage`);
    setDetails(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8017/usermanage/${id}`);
    loadData();
  };

  const handleSearch = () => {
    const filteredData = details.filter(user =>
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDetails(filteredData);
  };

  const handleSort = () => {
    const sortedData = [...details].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.firstname.localeCompare(b.firstname);
      } else {
        return b.firstname.localeCompare(a.firstname);
      }
    });
    setDetails(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh', color: 'blue' }}>Users List</h1>
      <div className="container">
        <div className="py-4">
          <div className="mb-3 d-flex align-items-center">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search by first name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    First Name
                    <button
                      className="btn btn-link"
                      onClick={handleSort}
                    >
                      {sortOrder === "asc" ? <>&#x25B2;</> : <>&#x25BC;</>}
                    </button>
                  </div>
                </th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {details.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.firstname}</td>
                  <td>{user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDisplay;