import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUserReport() {
  const [user, setUser] = useState({
    taskname: "",
    description: "",
    duedate: "",
    status: "",
    username: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8017/user/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Report</h2>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Report of User ID: {user.id}</h5>
              <div className="card-body">
                <p>
                 The task assigned to you is {user.taskname}
                </p>
                <p>
                 and the deadline to complete is {user.duedate}
                </p>
                <p>
                your status of completion is {user.status}
                </p>
              </div>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/report"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
