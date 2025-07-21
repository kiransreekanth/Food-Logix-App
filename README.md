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


<img width="517" height="1080" alt="Screenshot (226)" src="https://github.com/user-attachments/assets/6dad2b8d-9354-491b-a222-30bee94c3bcf" />

<img width="520" height="1075" alt="Screenshot (227)" src="https://github.com/user-attachments/assets/edbfb18b-7b6a-4213-bd0f-0f61f97fee49" />

<img width="514" height="1075" alt="Screenshot (228)" src="https://github.com/user-attachments/assets/713aaac1-d3fe-4565-bbac-d15bf1e157c6" />

<img width="515" height="1081" alt="Screenshot (230)" src="https://github.com/user-attachments/assets/457759de-553b-43fe-9815-dc237896d918" />

<img width="513" height="1081" alt="Screenshot (231)" src="https://github.com/user-attachments/assets/0d9590f8-ecc0-4eeb-8547-268715772ba3" />

<img width="515" height="1075" alt="Screenshot (232)" src="https://github.com/user-attachments/assets/a74f81bd-959f-4282-bced-1cfa113db209" />

<img width="510" height="1084" alt="Screenshot (233)" src="https://github.com/user-attachments/assets/01b0b107-bb1c-4bb0-bce4-e9c54fa6507d" />


