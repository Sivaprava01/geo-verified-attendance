import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/home.css";

// Fix default marker icons (Leaflet image URLs)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const [authResult, setAuthResult] = useState("");
  const [locationResult, setLocationResult] = useState("");
  const [finalStatus, setFinalStatus] = useState("");

  // new states
  const [userLocation, setUserLocation] = useState(null); // [lat, lng]
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // --- Fingerprint authentication ---
  async function handleFingerprintAuth() {
    try {
      const publicKey = {
        challenge: new Uint8Array(32),
        userVerification: "preferred",
      };
      await navigator.credentials.get({ publicKey });
      setAuthResult("✅ Fingerprint / Face verified successfully!");
    } catch (err) {
      console.error(err);
      setAuthResult("❌ Authentication failed or cancelled.");
    }
  }

  // --- GPS location check ---
  function checkLocation() {
    if (!navigator.geolocation) {
      setLocationResult("❌ Geolocation not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const campusLat = 17.5388;
        const campusLng = 78.3854;
        const distance = Math.sqrt(
          (latitude - campusLat) ** 2 + (longitude - campusLng) ** 2
        );

        // store user location for map
        setUserLocation([latitude, longitude]);

        if (distance < 0.01) {
          setLocationResult("✅ You are within VNR Campus area.");
        } else {
          setLocationResult("❌ Outside campus boundaries.");
        }
      },
      () => setLocationResult("❌ Unable to get location.")
    );
  }

  // --- Mark Attendance + Save to MongoDB ---
  async function markAttendance() {
    if (authResult.includes("✅") && locationResult.includes("✅")) {
      const now = new Date();
      const newRecord = {
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        status: "Present",
        location: "VNR Campus",
      };

      setAttendanceRecords((prev) => [newRecord, ...prev]);
      setFinalStatus("🎉 Attendance marked successfully!");

      // Save attendance record to backend
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        await fetch("http://localhost:5000/api/attendance/mark", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            name: user.name,
            rollNo: user.rollNo,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
            status: "Present",
            location: "VNR Campus",
          }),
        });
      } catch (err) {
        console.error("Error saving attendance:", err);
      }
    } else {
      setFinalStatus("⚠️ Please complete both verifications first.");
    }
  }

  return (
    <div className="home-page">
      <h1 className="page-title">Geo-Verified Biometric Attendance</h1>

      <div className="verification-container">
        {/* Left: Biometric */}
        <div className="verification-card">
          <h3>Biometric Attendance</h3>
          <button className="btn-verify" onClick={handleFingerprintAuth}>
            Verify Fingerprint / Face
          </button>
          <p className="result-text">{authResult}</p>
        </div>

        {/* Right: Location */}
        <div className="verification-card">
          <h3>Location Verification</h3>
          <button className="btn-verify" onClick={checkLocation}>
            Check My Location
          </button>
          <p className="result-text">{locationResult}</p>

          {/* Map Container (shows only after getting location) */}
          {userLocation && (
            <div
              style={{
                height: "250px",
                marginTop: "15px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <MapContainer
                center={userLocation}
                zoom={16}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="© OpenStreetMap contributors"
                />
                <Marker position={userLocation} />
              </MapContainer>
            </div>
          )}
        </div>
      </div>

      <button className="btn-final" onClick={markAttendance}>
        Mark Attendance
      </button>
      <p className="final-status">{finalStatus}</p>

      {/* Attendance Logs */}
      <div className="attendance-logs">
        <h3>Attendance Records</h3>
        <table className="table table-dark table-striped mt-3">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No records yet
                </td>
              </tr>
            ) : (
              attendanceRecords.map((rec, i) => (
                <tr key={i}>
                  <td>{rec.date}</td>
                  <td>{rec.time}</td>
                  <td>{rec.status}</td>
                  <td>{rec.location}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
