import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditUserManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    personalemail: "",
    dateofbirth: "",
    mobilenumber: ""
  });

  const { firstname, middlename, lastname, personalemail, dateofbirth, mobilenumber } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8017/usermanage/${id}`, user);
      navigate("/userlist"); // Redirect to the user list page
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = async () => {
    try {
      const response = await axios.get(`http://localhost:8017/usermanage/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your first name"
                name="firstname"
                value={firstname}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="middlename" className="form-label">
                Middle Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your middle name"
                name="middlename"
                value={middlename}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your last name"
                name="lastname"
                value={lastname}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="personalemail" className="form-label">
                Personal Email
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your personal email"
                name="personalemail"
                value={personalemail}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateofbirth" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                name="dateofbirth"
                value={dateofbirth}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobilenumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your mobile number"
                name="mobilenumber"
                value={mobilenumber}
                onChange={onInputChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/userlist">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserManage;