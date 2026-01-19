import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { supabase } from "../../../supabase";
import GoToTop from "../../../GoToTop";

ChartJS.register(ArcElement, Tooltip, Legend);

function AlumniMeet202526({ searchText }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();

    // 🔴 Realtime subscription
    const channel = supabase
      .channel("alumni-meet-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "AlumniRecord" },
        () => {
          fetchMembers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("AlumniRecord")
      .select("*")
      .order("name", { ascending: true });

    if (!error) {
      setMembers(data || []);
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  // 🔍 Search filter
  const filteredMembers = members.filter((m) =>
    (m?.name || "").toLowerCase().includes((searchText || "").toLowerCase())
  );

  // 📊 Batch count
  const batchCounts = filteredMembers.reduce((acc, curr) => {
    const batch = curr.batch || "Unknown";
    acc[batch] = (acc[batch] || 0) + 1;
    return acc;
  }, {});

  const groupedByCount = Object.entries(batchCounts).reduce(
    (acc, [batch, count]) => {
      if (!acc[count]) acc[count] = [];
      acc[count].push(batch);
      return acc;
    },
    {}
  );

  const batchCountArray = Object.entries(groupedByCount).map(
    ([count, batches], index) => ({
      id: index + 1,
      batches: batches.join(", "),
      count,
    })
  );

  // 🧑‍🤝‍🧑 Gender count
  const genderCounts = filteredMembers.reduce(
    (acc, curr) => {
      const gender = (curr.gender || "").toLowerCase();
      if (gender === "male") acc.male += 1;
      else if (gender === "female") acc.female += 1;
      else acc.other += 1;
      return acc;
    },
    { male: 0, female: 0, other: 0 }
  );

  const genderPieData = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        data: [
          genderCounts.male,
          genderCounts.female,
          genderCounts.other,
        ],
        backgroundColor: ["#0d6efd", "#dc3545", "#6c757d"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <>
      <GoToTop />
      <div className="container-fluid main">
        <h5 className="section-title">
          Registered Alumni ({members.length})
        </h5>

        {loading && <p className="text-center">Loading...</p>}

        <div className="row">
          {/* LEFT TABLE */}
          <div className="col-lg-7">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Sl</th>
                    <th>Name</th>
                    <th>Batch</th>
                    <th>Contact</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((data, index) => (
                    <tr key={data.id}>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.batch}</td>
                      <td>
                        <a href={`tel:${data.contact}`}>{data.contact}</a>
                      </td>
                      <td>{data.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* BATCH COUNT */}
          <div className="col-lg-2">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Batch</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {batchCountArray.map((item) => (
                    <tr key={item.id}>
                      <td>{item.batches}</td>
                      <td className="text-center">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PIE CHART */}
          <div className="col-lg-3">
            <h6 className="text-center">Gender Distribution</h6>
            <Pie data={genderPieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AlumniMeet202526;
