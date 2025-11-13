import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "../styles/login.css";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        rollNo: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/home");
    }, [navigate]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                // LOGIN
                const response = await api.post("/login", {
                    email: formData.email,
                    password: formData.password,
                });
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                setMessage("✅ Login successful!");
                navigate("/home");
            } else {
                // REGISTER
                await api.post("/register", formData);
                setMessage("✅ Registration successful! You can now log in.");
                setIsLogin(true);
            }
        } catch (err) {
            console.error(err);
            setMessage("❌ " + (err.response?.data?.message || "Server error"));
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h3>{isLogin ? "Login" : "Register"}</h3>

                <div className="tab-container mb-3">
                    <button
                        className={`tab-btn ${isLogin ? "active" : ""}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`tab-btn ${!isLogin ? "active" : ""}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    onChange={handleChange}
                                    required={!isLogin}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Roll No</label>
                                <input
                                    type="text"
                                    name="rollNo"
                                    className="form-control"
                                    onChange={handleChange}
                                    required={!isLogin}
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-info w-100 mt-2">
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>

                {message && <p className="mt-3 text-light">{message}</p>}
            </div>
        </div>
    );
}
