import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase";

function Upload() {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils.sheet_to_json(sheet);

      for (let row of rows) {
        const { name, contact, email } = row;

        // Skip invalid rows
        if (!name || !contact || !email) continue;

        // Check if record exists by name OR contact OR email
        const q = query(
          collection(db, "AlumniMeet2025-26"),
          where("email", "==", email)
        );

        const snap = await getDocs(q);

        if (!snap.empty) {
          const existingDoc = snap.docs[0];

          const confirmUpdate = window.confirm(
            `Record found for ${name} (${email}). Do you want to override it?`
          );

          if (confirmUpdate) {
            await updateDoc(doc(db, "AlumniMeet2025-26", existingDoc.id), {
              ...row,
            });
          }
        } else {
          await addDoc(collection(db, "AlumniMeet2025-26"), {
            ...row,
          });
        }
      }

      alert("Upload completed successfully");
      setLoading(false);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="container mt-4">
      <h5>Upload Alumni XLSX</h5>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        disabled={loading}
      />

      {loading && <p className="mt-2">Uploading...</p>}
    </div>
  );
}

export default Upload;
