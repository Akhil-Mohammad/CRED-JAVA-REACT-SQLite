import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditClient() {
  let navigate = useNavigate();
  const { id } = useParams();

  console.log(id, "id");

  const [clients, setClients] = useState({
    name: "",
    address: "",
    workLocation: "",
  });

  const [projects, setProjects] = useState([]);
  const [isEditable, setIsEditable] = useState(false); // State to control field editability

  const { name, address, workLocation } = clients;

  const onInputChange = (e) => {
    setClients({ ...clients, [e.target.name]: e.target.value });
  };

  const onProjectChange = (index, e) => {
    const newProjects = projects.map((project, projIndex) => {
      if (index === projIndex) {
        return { ...project, [e.target.name]: e.target.value };
      }
      return project;
    });
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { projectName: "", revenue: "", startDate: "", endDate: "" },
    ]);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const clientData = {
      ...clients,
      projects: projects,
    };
    await axios.put(`http://localhost:8096/client/update/${id}`, clientData);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8096/client/get/${id}`);
    setClients(result.data);
    setProjects(result.data.projects || []);
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable); // Toggle the edit state
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">Client Details</h2>
            <button
              type="button"
              className="btn btn-outline-info mb-3"
              onClick={toggleEdit}
            >
              {isEditable ? "View Mode" : "Change Details"}
            </button>
          </div>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                disabled={!isEditable}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Address"
                name="address"
                value={address}
                onChange={(e) => onInputChange(e)}
                disabled={!isEditable}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="workLocation" className="form-label">
                Work Location
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the Work Location"
                name="workLocation"
                value={workLocation}
                onChange={(e) => onInputChange(e)}
                disabled={!isEditable}
              />
            </div>

            {projects.map((project, index) => (
              <div key={index} className="mb-3">
                <h4>Project {index + 1}</h4>
                <label htmlFor="projectName" className="form-label">
                  Project Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the Project Name"
                  name="projectName"
                  value={project.projectName}
                  onChange={(e) => onProjectChange(index, e)}
                  disabled={!isEditable}
                />
                <label htmlFor="revenue" className="form-label">
                  Revenue
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter the Revenue"
                  name="revenue"
                  value={project.revenue}
                  onChange={(e) => onProjectChange(index, e)}
                  disabled={!isEditable}
                />
                <label htmlFor="startDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={project.startDate}
                  onChange={(e) => onProjectChange(index, e)}
                  disabled={!isEditable}
                />
                <label htmlFor="endDate" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={project.endDate}
                  onChange={(e) => onProjectChange(index, e)}
                  disabled={!isEditable}
                />
              </div>
            ))}
            <div className="row mb-3">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-outline-secondary mb-2"
                  onClick={addProject}
                  disabled={!isEditable}
                >
                  Add Project
                </button>
              </div>
              <div className="col">
                {isEditable && (
                  <button type="submit" className="btn btn-outline-primary">
                    Save
                  </button>
                )}
              </div>
              <div className="col">
                <Link className="btn btn-outline-danger mx-2" to="/">
                  Home
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
