import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddClient() {

    let navigate = useNavigate();

    const [clients, setClients] = useState({
        name: "",
        address: "",
        workLocation: ""
    });

    const [projects, setProjects] = useState([
        {
            projectName: "",
            revenue: "",
            startDate: "",
            endDate: ""
        }
    ]);

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
        setProjects([...projects, { projectName: "", revenue: "", startDate: "", endDate: "" }]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const clientData = {
            ...clients,
            projects: projects
        };
        await axios.post("http://localhost:8096/client/save", clientData)
        navigate("/")
    };

    return (
        <div className='container'>
            <div className="row">
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register Client</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>Name</label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter the Name'
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='address' className='form-label'>Address</label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter the Address'
                                name="address"
                                value={address}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='workLocation' className='form-label'>Work Location</label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter the Work Location'
                                name="workLocation"
                                value={workLocation}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>

                        {projects.map((project, index) => (
                            <div key={index} className='mb-3'>
                                <h4>Project {index + 1}</h4>
                                <label htmlFor='projectName' className='form-label'>Project Name</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Enter the Project Name'
                                    name="projectName"
                                    value={project.projectName}
                                    onChange={(e) => onProjectChange(index, e)}
                                    required
                                />
                                <label htmlFor='revenue' className='form-label'>Revenue</label>
                                <input
                                    type="number"
                                    className='form-control'
                                    placeholder='Enter the Revenue'
                                    name="revenue"
                                    value={project.revenue}
                                    onChange={(e) => onProjectChange(index, e)}
                                    required
                                />
                                <label htmlFor='startDate' className='form-label'>Start Date</label>
                                <input
                                    type="date"
                                    className='form-control'
                                    name="startDate"
                                    value={project.startDate}
                                    onChange={(e) => onProjectChange(index, e)}
                                    required
                                />
                                <label htmlFor='endDate' className='form-label'>End Date</label>
                                <input
                                    type="date"
                                    className='form-control'
                                    name="endDate"
                                    value={project.endDate}
                                    onChange={(e) => onProjectChange(index, e)}
                                    required
                                />
                            </div>
                        ))}
                         <div className="row mb-3">
                         <div className="col">
                        <button type="button" className='btn btn-outline-secondary mb-3' onClick={addProject}>Add Project</button>
                        </div>
                        <div className="col">
                        <button type="submit" className='btn btn-outline-primary'>Submit</button>
                        </div>
                        <div className='col'>
                        <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
