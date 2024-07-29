import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container">
        <div className="d-flex justify-content-center w-100">
            <Link className="navbar-brand" to="/">
                VMS Client-Management
            </Link>
        </div>
    </div>
       
      </nav>
    </div>
  );
}
