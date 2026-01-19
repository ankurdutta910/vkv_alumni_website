import React, { useState, useEffect } from "react";
import banner from "../assets/img/AlumniMeet.webp";
import male from "../assets/img/man.webp";
import female from "../assets/img/woman.webp";
import GoToTop from "../../GoToTop";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import Upload from "./Upload.jsx";

function AlumniMeet2025({ searchText }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "AlumniMeet2025-26"), orderBy("name"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalCount = members.length;

  // 🔍 Safe Dynamic Filter
  const filteredMembers = members.filter((m) =>
    (m?.name || "").toLowerCase().includes((searchText || "").toLowerCase())
  );

  return (
    <>
      <GoToTop />
      <img src={banner} className="img-fluid" style={{ marginTop: "70px" }} />
      <div
        style={{
          padding: "7px",
          backgroundColor: "white",
          position: "sticky",
          top: "70px",
          zIndex: 10,
          borderBottom: "1px solid #e8e8e8",
        }}
      >
        <h5 className="section-title text-center mb-0">
          Registered Alumni ({totalCount})
        </h5>
      </div>
      <div className="container-fluid main" style={{ marginTop: "12px" }}>
        {loading && <p className="text-center">Loading...</p>}

        <div className="row">
          {filteredMembers.map((data) => (
            <div className="col-md-3 mb-2" key={data.id}>
              <div className="card p-2">
                <div className="d-flex gap-2 align-items-center">
                  <img
                    src={data.gender === "Female" ? female : male}
                    alt="alumni"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div>
                    <h6 className="mb-0 text-uppercase">{data.name}</h6>
                    <p className="mb-0">
                      Batch : <b>{data.batch}</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!loading && filteredMembers.length === 0 && (
            <p className="text-center">No alumni found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AlumniMeet2025;
