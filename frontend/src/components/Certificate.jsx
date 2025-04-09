import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Certificate = () => {
  const [user, setUser] = useState(null);
  const certRef = useRef();

  useEffect(() => {
    // Fetch logged-in user data
    axios.get("/api/user/profile")
      .then(res => setUser(res.data))
      .catch(err => console.error("User fetch failed:", err));
  }, []);

  const downloadPDF = () => {
    const input = certRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("ZehraSec_Certificate.pdf");
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Certificate</h1>

      {user ? (
        <div className="bg-white text-black rounded-lg shadow-xl p-8 max-w-4xl mx-auto" ref={certRef}>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Zehra Sec</h2>
            <p className="text-lg italic">Certificate of Completion</p>
            <p className="mt-4 text-md">This is to certify that</p>
            <h3 className="text-2xl font-bold mt-2">{user.name}</h3>
            <p className="mt-2">has successfully completed the Cybersecurity Workshop</p>
            <p className="mt-1">on {new Date().toLocaleDateString()}</p>
            <div className="mt-8 text-left text-sm">
              <p>Certificate ID: ZS-{user._id.slice(-6).toUpperCase()}</p>
              <p>Issued by: Zehra Sec | Your Security, Our Priority</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded text-white transition"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Certificate;
