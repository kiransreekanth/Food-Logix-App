# 🍴 FoodLogix - Restaurant Order Tracker

**FoodLogix** is a full-stack application that allows users to browse a menu, place and manage food orders, track their status in real time, and view past orders. Built with a **Node.js + Express + MongoDB** backend and a **React Native (Expo)** frontend for mobile.

---

## 🧰 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Git](https://git-scm.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- [Expo Go](https://expo.dev/client) app on your Android/iOS phone *(for testing)*

---

## 📦 Cloning the Repository

```bash
git clone https://github.com/your-username/FoodLogix.git
cd FoodLogix
````

---

## 🔧 Backend Setup

### 1. Navigate to the backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `backend` directory and add the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

* Replace `your_mongodb_connection_string` with your MongoDB URI (e.g., from MongoDB Atlas).
* Replace `your_jwt_secret` with any strong secret key.

> ⚠️ `.env` is **excluded** from version control for security.

### 4. Start the backend server

```bash
npm run dev
```

Server will run at: `http://localhost:5000`

---

## 📱 Frontend (Mobile App) Setup

### 1. Navigate to the mobile folder

```bash
cd ../mobile
```

### 2. Install dependencies

```bash
npm install
```

### 3. Update API URL in code

Update all API calls using Axios to point to your local IP (not `localhost`), like:

```ts
// Example inside API calls
http://192.168.x.x:5000/api/orders
```

* Replace `192.168.x.x` with your local IP (use `ipconfig` / `ifconfig`).

### 4. Start the Expo development server

```bash
npx expo start
```

* Use the QR code to test in the **Expo Go** mobile app.
* Or press `a` to run on Android emulator / `i` for iOS simulator (if set up).

---

## ✅ Features

* 👤 User Registration & Login (with JWT Auth)
* 🛍️ Add to Cart & Modify Quantities
* 📦 Place & Track Orders in Real-Time
* ❌ Cancel Orders (within 5-minute window)
* 🎨 Beautifully Animated UI (Home, Cart, Orders)
* 🔐 Secure .env handling and API protection

---

## ⚙️ Technologies Used

| Tech         | Purpose                |
| ------------ | ---------------------- |
| React Native | Mobile Frontend (Expo) |
| Express.js   | REST API               |
| MongoDB      | Database               |
| Mongoose     | ODM for MongoDB        |
| JWT          | User Authentication    |
| Axios        | HTTP Client (Frontend) |
| AsyncStorage | Token Storage (Mobile) |

---

## 📝 Notes

* Ensure your backend is running **before** launching the mobile app.
* Make sure to match IP addresses across devices (especially if using a physical phone).
* This project separates frontend and backend for better scalability.

---
