# 📍 Geo-Verified Attendance System

A **secure attendance management system** that ensures attendance is marked **only when a student is physically present at the campus** and **biometrically verified**, eliminating all forms of proxy attendance.

---

## 🧠 Problem Statement

Many attendance systems allow students to mark attendance remotely or through proxies.

This project prevents that by enforcing **two mandatory checks**:
1. 📍 **Location verification (Geofencing)**
2. 🧬 **Fingerprint-based authentication**

Attendance is recorded **only when both conditions are satisfied**.

---

## ✅ Solution Overview

The system verifies:
- The **real-time GPS location** of the student
- The **fingerprint identity** of the student

If either check fails, attendance is **rejected**.

---

## 🚀 Features

- 📍 **Geo-Location Verification**
  - Uses browser/device GPS
  - Attendance allowed only inside a predefined campus radius

- 🧬 **Fingerprint Authentication**
  - Confirms student identity
  - Prevents impersonation and proxy attendance

- 🔐 **Secure Login System**
  - Student and Admin roles
  - Protected backend APIs

- 📊 **Attendance Logging**
  - Stores date, time, and verification details
  - Accurate and tamper-resistant records

- 🖥️ **User-Friendly Interface**
  - Simple UI for students and admins

---

## 🛠️ Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB  

### APIs & Tools
- Geolocation API  
- Fingerprint Authentication (WebAuthn)  
- REST APIs  

---

## 🔄 How It Works

1. Student logs in  
2. System captures:
   - 📍 Current GPS coordinates  
   - 🧬 Fingerprint authentication  
3. Backend validates:
   - Location is within campus boundary  
   - Fingerprint belongs to the student  
4. Attendance is marked **only if both validations succeed**

---

## 📂 Project Structure

geo-verified-attendance/  
├── client/  
│   ├── index.html  
│   ├── styles.css  
│   └── script.js  
│  
├── server/  
│   ├── routes/  
│   ├── controllers/  
│   ├── models/  
│   └── server.js  
│  
├── .gitignore  
├── package.json  
└── README.md  

---

## 🧪 Fingerprint Verification Steps

### Step 1: Open the application
- Open the live demo link in **Google Chrome or Microsoft Edge**
- Use a device that supports **fingerprint authentication**

### Step 2: Open Browser Console
- Right-click on the page → **Inspect**
- Navigate to the **Console** tab

---

## ⚙️ Installation & Setup

### Step 1: Clone the repository

    git clone https://github.com/Sivaprava01/geo-verified-attendance.git
    cd geo-verified-attendance

### Step 2: Backend setup

    cd server
    npm install
    npm start

### Step 3: Frontend setup

Open the following file in your browser:

    client/index.html

> ⚠️ Make sure location permissions are enabled in your browser.

---

## 🔮 Future Enhancements

- Mobile application support  
- Face recognition integration  
- Admin analytics dashboard  
- Cloud deployment  
- Fraud detection alerts  

---

## 🎯 Use Cases

- Colleges and universities  
- Corporate training programs  
- Secure examination systems  
- Workplace attendance tracking  

---

## 🔐 Fingerprint Authentication (WebAuthn – Demo Mode)

This project uses the **Web Authentication API (WebAuthn)** for fingerprint-based verification.

Due to browser security restrictions, fingerprint authentication **cannot be triggered directly from the UI** in this demo.  
To demonstrate biometric verification, the WebAuthn logic must be executed manually via the browser console.

---

## 🌐 Live Demo

https://geo-verified-attendance.netlify.app/

---

## 🧪 Fingerprint Verification Steps

### Check Fingerprint Availability

    PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
      .then(res => console.log("Fingerprint available:", res))
      .catch(err => console.error(err));

---

### Trigger Fingerprint Authentication

    navigator.credentials.create({
      publicKey: {
        challenge: new Uint8Array([1,2,3,4,5,6,7,8]),
        rp: { name: "Geo Verified Attendance" },
        user: {
          id: new Uint8Array([1]),
          name: "testuser@example.com",
          displayName: "Test User"
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required"
        }
      }
    })
    .then(res => console.log("Fingerprint success:", res))
    .catch(err => console.error("Fingerprint error:", err));

---

## 👨‍💻 Author

**Siva Prava**  
2nd Year IT Student  
Aspiring Software Engineer  

GitHub: https://github.com/Sivaprava01

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub!
