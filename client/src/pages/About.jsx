import React from "react";
import "../styles/about.css";

export default function About() {
    return (
        <div className="about-page">
            <div className="about-container">
                <h1 className="about-title">About the Project</h1>
                <p className="intro-text">
                    <strong>Geo-Verified Biometric Attendance System</strong> is a
                    digital innovation designed to eliminate crowding near physical
                    biometric devices and prevent proxy attendance. By integrating
                    location-based verification and biometric authentication, this
                    system ensures secure and efficient attendance marking within the
                    VNR campus.
                </p>

                <section className="section">
                    <h2>🎯 Problem Statement</h2>
                    <p>
                        Students face significant delays and inconvenience during attendance
                        marking due to overcrowding near biometric scanners and occasional
                        device malfunctions. The current centralized hardware-based system
                        also limits scalability and causes timing issues during entry and
                        exit.
                    </p>
                </section>

                <section className="section">
                    <h2>🧠 Empathy Insights</h2>
                    <ul>
                        <li>
                            <strong>Students:</strong> Experience long queues and wasted time
                            during attendance marking.
                        </li>
                        <li>
                            <strong>Faculty/Admin:</strong> Struggle to validate large student
                            batches efficiently.
                        </li>
                        <li>
                            <strong>Environmental Impact:</strong> Traditional paper/manual
                            logs lead to unnecessary resource use.
                        </li>
                    </ul>
                </section>

                <section className="section">
                    <h2>💡 Proposed Solution</h2>
                    <p>
                        The system enables students to mark attendance digitally by
                        combining biometric verification (via device fingerprint sensor) and
                        geo-location validation (within VNR campus boundaries). The result
                        is a seamless, secure, and sustainable attendance process.
                    </p>
                </section>

                <section className="section">
                    <h2>🚀 Key Features</h2>
                    <ul>
                        <li>Biometric verification using Windows Hello or mobile sensors</li>
                        <li>Location-based validation using GPS</li>
                        <li>Real-time attendance status visualization</li>
                        <li>Admin dashboard for attendance logs</li>
                        <li>Digital, eco-friendly, and paperless workflow</li>
                    </ul>
                </section>

                <section className="section">
                    <h2>👥 Team Members</h2>
                    <ul>
                        <li><strong>P SIVA SAI SATYANAG (24071A12H4 IT-C)
                        </strong> </li>
                        <li><strong>P SAI SUPRIYA (24071A01B1 CE-B)</strong> </li>
                        <li><strong>K ANUDEEP (24071A04B0 ECE-B)
                        </strong> </li>
                    </ul>
                </section>

                <section className="section">
                    <h2>🔒 Academic Note</h2>
                    <p className="disclaimer">
                        This is a prototype created for academic purposes under the
                        <strong> Design Thinking Project </strong> initiative. No real
                        biometric or GPS data is permanently stored.
                    </p>
                </section>
            </div>
        </div>
    );
}
