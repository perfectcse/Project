# 🚗 AutoService – MERN Ride Booking Application

AutoService is a full-stack MERN application that simulates a real-world ride booking system. It allows passengers to request rides and drivers to accept, complete rides, and earn money.

This project demonstrates authentication, role-based access control, ride lifecycle management, and earnings calculation — similar to real ride-hailing platforms.

---

## 📌 Tech Stack

### Frontend

* React.js
* React Router DOM
* Context API (AuthContext)
* Axios
* Custom CSS (Responsive UI)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## 👥 User Roles

### 🚶 Passenger

* Register & Login
* Create ride requests
* View completed ride history

### 🚖 Driver

* Register & Login
* View available ride requests
* Accept & complete rides
* View ride history
* View total earnings

---

## 🔐 Authentication & Security

* JWT-based authentication
* Token stored in frontend context
* Role-based authorization (Passenger / Driver)
* Protected backend routes using middleware

---

## 🔄 Application Flow

1. User registers or logs in
2. JWT token is generated
3. Passenger creates a ride request
4. Driver dashboard displays pending rides
5. Driver accepts the ride
6. Driver completes the ride
7. Fare is calculated
8. Driver earnings are updated
9. Ride is stored in history

---

## 💰 Fare & Earnings Logic

* **Fare = Distance (km) × 10**
* Fare is calculated only after ride completion
* Fare is stored in the Ride document
* Driver’s `totalEarnings` is updated after each completed ride

---

## 🔌 API Endpoints

### 🔑 Authentication

* `POST /auth/register` → Register user
* `POST /auth/login` → Login & generate JWT

### 🚗 Ride Management

* `POST /rides` → Create ride (Passenger)
* `GET /rides` → Get requested rides (Driver)
* `PUT /rides/accept/:id` → Accept ride
* `PUT /rides/complete/:id` → Complete ride & calculate fare
* `GET /rides/passenger/history` → Passenger ride history
* `GET /rides/driver/history` → Driver ride history

### 💰 Earnings

* `GET /driver/earnings` → Get total earnings & completed rides

---

## 📊 Driver Dashboard Features

* Online status indicator
* Real-time ride request display
* Ride details (pickup, drop, distance, fare)
* Accept & Complete ride actions
* Empty state UI
* Modern responsive design

---

## 🎯 Key Features

* Full ride lifecycle: **Requested → Accepted → Completed**
* Real-time earnings calculation
* Persistent database storage
* Clean UI with proper empty states
* Error handling & validation
* Modular backend architecture

---

## 🧠 Interview Talking Points

* Role-based access control
* JWT authentication implementation
* REST API design
* State management using Context API
* Real-world business logic
* MongoDB schema design
* Secure backend routing

---

## 🚀 Future Enhancements

* Live ride tracking (Maps integration)
* Driver availability toggle
* Ride cancellation flow
* Surge pricing system
* Admin dashboard
* Payment gateway integration

---

## ✅ Project Status

* ✔ Authentication complete
* ✔ Ride lifecycle implemented
* ✔ Earnings logic working
* ✔ UI improved & responsive
* ✔ Database verified

---

## 📌 Conclusion

AutoService demonstrates a realistic MERN stack application with proper backend architecture, frontend state management, and real-world business workflows. It reflects how modern ride-hailing platforms operate at a functional level.

---

## 🛠️ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd autoservice
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3. Environment Variables

Create `.env` file in backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Run Application

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm start
```

---

## 👨‍💻 Author

**Vishal**

---

⭐ If you like this project, give it a star on GitHub!
