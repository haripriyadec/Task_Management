import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditUserManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    firstname: "",
    role: "",
    tasks: "",
    emailGeneration: false,
    middlename: "",
    lastname: "",
    personalemail: "",
    dateofbirth: "",
    mobilenumber: ""
  });

  const { username, password, firstname, role, tasks, emailGeneration, middlename, lastname, personalemail, dateofbirth, mobilenumber } = user;

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
      navigate("/users"); // Redirect to the user list page
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = async () => {
    try {
      const response = await axios.get(`http://localhost:8017/usermanage/${id}`);
      const userData = response.data;
      setUser(userData);
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
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </div>
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
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter role"
                name="role"
                value={role}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tasks" className="form-label">
                Tasks
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter tasks"
                name="tasks"
                value={tasks}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailGeneration" className="form-label">
                Email Generation
              </label>
              <select
                className="form-control"
                name="emailGeneration"
                value={emailGeneration}
                onChange={onInputChange}
              >
                <option value={true}>Enabled</option>
                <option value={false}>Disabled</option>
              </select>
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
            <Link className="btn btn-outline-danger mx-2" to="/userhome">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserManage;
