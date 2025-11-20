# 🌟 The Slime Co. E-Commerce Website

A full-stack Node.js application for managing products, customers, subscriptions, sales, shopping carts, and orders.

---

## 📌 Project Overview

**The Slime Co.** is a fictional slime e-commerce business created for a school project.

The goal was to design and develop a complete web application that includes:

- ✔ Product catalog  
- ✔ Shopping cart with session management  
- ✔ Customer registration & encrypted login  
- ✔ Subscriptions management  
- ✔ Sales & order details tracking  
- ✔ Full CRUD operations for all modules  
- ✔ A functional checkout workflow that writes to the database  

This project demonstrates full-stack development skills using **Node.js**, **Express**, **MariaDB/MySQL**, **EJS templates**, and **session-based cart logic**.

---

## 🎯 Features

### 🧼 Product Catalog
- Displays all products with images, price, description, and features  
- Allows users to select a quantity  
- Users can add multiple products to the shopping cart  

### 🛒 Shopping Cart
- Session-based cart (stored in `req.session`)  
- Users can view all items, change quantities, remove items  
- Cart totals calculated automatically  
- Checkout button saves the order to the database  

### 👤 Customer System
- Customer registration  
- Password hashing with **bcryptjs** (secure cryptographic hashing)  
- Login/logout system with session tracking  
- Ability to view and edit customer profiles  

### 📬 Subscription Management
Full CRUD for user subscriptions:
- Create new subscription  
- Edit subscription (with editable dates)  
- Delete subscription  
- Displays subscription type, status, and dates  

### 💳 Checkout & Sales Processing
- Validates that the user is logged in  
- Creates a new **sales** record  
- Automatically inserts multiple **orderdetails** records (one per cart item)  
- Clears cart after successful checkout  
- Displays a confirmation page  

### 📋 Admin-Style CRUD Pages
Includes separate sections for managing:

- Products  
- Customers  
- Subscriptions  
- Sales  
- Order details  
- Inventory  
- Suppliers (if implemented)  

---

## 🛠 Technologies Used

### Backend
- **Node.js** — JavaScript runtime environment  
- **Express.js** — Backend framework for routing & server logic  
- **bcryptjs** — Password hashing for secure login  
- **express-session** — For shopping cart & login session management  

### Frontend
- **EJS** — Server-side rendering for UI templates  
- **CSS3** — Styling  
- **HTML5 Forms** — User input and validation  

### Database
- **MariaDB / MySQL**  

---

## 🎓 What I Learned

This project taught me how to:

- ✔ Build a full CRUD web application in Node.js  
- ✔ Use Express routing & middleware  
- ✔ Work with relational databases and SQL joins  
- ✔ Securely hash and store passwords  
- ✔ Manage user session data  
- ✔ Implement shopping cart logic  
- ✔ Debug SQL/Express issues  
- ✔ Build server-rendered UI with EJS  
- ✔ Structure a multi-module Node.js application  
