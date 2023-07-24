import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

export default function AddTask() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    taskname: "",
    description: "",
    duedate: new Date(),
    status: "pending",
    username: "",
  });

  const { taskname, description, duedate, status, username } = user;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState("pending");

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
    setUser({ ...user, duedate: date });
  };

  const onStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setUser({ ...user, status: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8017/user", user);
    // navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Task</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="taskname" className="form-label">
                Taskname
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your taskname"
                name="taskname"
                value={taskname}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter your description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="duedate" className="form-label">
                DueDate
              </label>
              <div className="input-group">
                <DatePicker
                  className="form-control"
                  selected={selectedDate}
                  onChange={onDateChange}
                />
                <span className="input-group-text calendar-icon">
                  <FaCalendarAlt />
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="Status" className="form-label">
                Status
              </label>
              <select
                className="form-control"
                name="status"
                value={selectedStatus}
                onChange={onStatusChange}
              >
                <option value="pending">Pending</option>
                <option value="to-do">To-Do</option>
                <option value="complete">Complete</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="Status" className="form-label">
                Assign To
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/tasklist">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
