import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="container-fluid main">
        <h5 className="section-title">Dashboard</h5>
        <div className="row">
          <div className="col-lg-3 mb-2">
            <div className="card p-3">
              <h4 className="mb-1">Registrations</h4>
              <p className="mb-2">Silver Jubilee Alumni Meet 2025-26</p>
              <Link className="btn btn-dark" to="/registration-alumni-meet-2025-26">View</Link>
            </div>
          </div>

            <div className="col-lg-3">
            <div className="card p-3">
              <h4 className="mb-1">Add Donation</h4>
              <p className="mb-2">Silver Jubilee Alumni Meet 2025-26</p>
              <Link className="btn btn-danger" to="/add-donation">Add Donation</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
