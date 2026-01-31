# MERN E-Commerce Application  
**Major Project - Group 3**

A full-stack **MERN (MongoDB, Express, React, Node.js)** based E-Commerce web application developed as part of the **Full Stack Web Development (FWSD) – Major Project by Group 3**.

---

## Members of Group 3

Roll / Batch Code | Name 
-----------------------------------------
25/WD-FWSD-A4/NOV-8132 | Leena Ashok Borkar 
25/WD-FWSD-A4/DEC-8500 | Charmika Kommu 
25/WD-FWSD-A4/DEC-8626 | Varun Sai Jonnalagadda 
25/WD-FWSD-A4/NOV-8145 | Tapas Kumar Malik 
25/WD-FWSD-A4/DEC-8529 | Sai Sankalp Biswal
25/WD-FWSD-A4/DEC-8537 | Rapaka Saketh 
25/WD-FWSD-A4/DEC-8628 | T Nikhil

---

## 🚀 Features

### 👤 User Features
- User Registration & Login (JWT Authentication)
- View Products
- Add Products to Cart
- Checkout (Mock Payment)
- View Order History with Status
- Logout

### 🛠 Admin Features
- Admin Login
- Add / Edit / Delete Products
- View All Orders
- Update Order Status (Pending / Completed / Cancelled)

---

## 🧱 Tech Stack

### Frontend
- React.js
- React Router
- CSS (Custom styling)
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication

---

## 🌐 Deployment

- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** MongoDB Atlas  

---

## 📂 Project Structure
mern-ecommerce-app/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── config.js
│ │ └── App.js
│ └── package.json
├── screenshots/
├── DeployedURL.txt
└── README.md

---
## 🔐 Demo Credentials 

### Customer Account
The following demo customer account is available right now:
- **Email:** SS@gmail.com  
- **Password:** sai2006  

### Admin Account
The following admin account can be used to access admin features:
- **Email:** admin@gmail.com  
- **Password:** admin123  

---

## 📸 Screenshots

All major user and admin flows have been captured and stored in the `screenshots/` directory, including:
- Product listing
- Login & authentication
- Cart & checkout
- Order history
- Admin order & product management

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=supersecretkey
PORT=5000

## 🔗 Project Deployment & Source Code

- **Live Deployment (Vercel):**  
  The application is deployed and accessible at:  
  https://mern-ecommerce-app-umber.vercel.app/products

- **Source Code (GitHub Repository):**  
  The complete source code is available at:  
  https://github.com/Sai-Sankalp-Biswal/mern-ecommerce-app

## ✅ Deployment Verification

The MERN E-Commerce application has been successfully deployed and verified.

- The frontend is deployed on **Vercel** and is accessible via the live URL provided above.
- The backend APIs are deployed and connected to **MongoDB Atlas**.
- All core functionalities including user authentication, product listing, cart operations, order placement, and admin operations have been tested on the deployed environment.
- The deployed application is fully functional and mirrors the local development setup.

This confirms successful end-to-end deployment of the project.
