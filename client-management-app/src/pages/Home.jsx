import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [clients, setclients] = useState([]);

  const { id } = useParams();

  console.log(clients, "clients");

  useEffect(() => {
    loadclients();
    console.log("code with Akhil.");
  }, []);

  const loadclients = async () => {
    const result = await axios.get("http://localhost:8096/client/getAll");
    setclients(result.data);
  };

  const deleteClient = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (isConfirmed) {
      console.log("Deleting client with id:", id);
      await axios.delete(`http://localhost:8096/client/delete/${id}`);
      loadclients();
    } else {
      console.log("Deletion cancelled");
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end mb-3 pt-5">
        <Link className="btn btn-outline-dark" to="/addclient">
          Add Client
        </Link>
      </div>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">s.no</th>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Work location</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.address}</td>
                <td>{client.workLocation}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editclient/${client.id}`}
                  >
                    Projects
                  </Link>

                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteClient(client.id)}
                  >
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
