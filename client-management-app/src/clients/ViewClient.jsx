import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewClient() {

    const [clients, setClients] = useState({
        name: "",
        address: "",
        workLocation: ""
    });

const {id}=useParams();

useEffect(()=>{
    loadclients();
},[]);

const loadclients=async ()=>{
    const result = await axios.get(`http://localhost:8096/client/get/${id}`)
    setClients(result.data)
}

  return (
    <div className='container'>
        <div className="row">
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>Client details</h2>

            <div className="card">
                <div className='card-header'>
                    details of client id:
                    <ul className='list-group list-group-flash'>
                        <li className="list-group-item">
                            <b>Name:</b>
                            {clients.name}
                        </li>
                        <li className="list-group-item">
                            <b>Address:</b>
                            {clients.address}
                        </li>
                        <li className="list-group-item">
                            <b>Work Location:</b>
                            {clients.workLocation}
                        </li>
                    </ul>
                </div>
            </div>
            <Link className='btn btn-primary my-2' to={"/"}>Back to Home</Link>
            </div>
        </div>
    </div>
  )
}
