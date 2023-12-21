import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayUser = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    mobileNo: "",
    project: "",
  });

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/client/getalluser"
        );
        setUserData(res.data.user);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
        setLoading(false);
      }
    };

    getAllUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!Array.isArray(userData) || userData.length === 0) {
    return <p>No user data available</p>;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = async () => {
    const data = await axios.post(
      "http://localhost:8000/api/client/register",
      formData
    );
    console.log(data);
  };
  
  const handleDelete = async (index) => {
    try {
      // Assuming userData is an array of objects with unique IDs
      const userId = userData[index]._id;
  
      // Make a DELETE request to delete the user
      const deleteData = await axios.delete(`http://localhost:8000/api/client/deleteruser/${userId}`);
  
      // Log the response
      console.log(deleteData);
  
      // If you want to update the user data after deletion, you can fetch the updated data
      const updatedUserData = await axios.get("http://localhost:8000/api/client/getalluser");
      setUserData(updatedUserData.data.user);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
      

  return (
    <>
      {/* ... (your existing code) */}
      <nav className="navbar bg-dark">
        <ul className="text-white d-flex gap-5">
          <li style={{ textDecoration: "none", listStyleType: "none" }}>
            Clients Panel
          </li>
          <li style={{ textDecoration: "none", listStyleType: "none" }}>
            Client
          </li>
        </ul>
      </nav>

      <div className="container-fluid  ">
        <div className="row">
          <div className="col-md-7 col-sm-12">
            <h3>Clients</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Last_Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile No.</th>
                  <th scope="col">Project</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.mobileNo}</td>
                    <td>{user.project}</td>
                    <div className="d-flex">
                      <button class="btn btn-primary" type="button" onClick={() => handleEdit(index)}>
                        Edit
                      </button> |
                      <button class="btn btn-danger"  onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <h3>Create Clients</h3>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={formData.name}
                name="name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                LastName
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={formData.lastName}
                name="lastName"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                onChange={handleChange}
                value={formData.email}
                name="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Mobile No.
              </label>
              <input
                type="number"
                className="form-control"
                onChange={handleChange}
                value={formData.mobileNo}
                name="mobileNo"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Project
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={formData.project}
                name="project"
              />
            </div>
            <div className="mb-3">
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleClick}
              >
                Create Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayUser;
