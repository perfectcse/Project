🚗 AutoService – MERN Ride-Hailing Application
AutoService is a full-stack MERN application that simulates a real-world ride-hailing system where passengers can request rides and drivers can accept, complete, and earn money from them.
The project focuses on:
🔐 Authentication & Authorization
👥 Role-Based Access (Passenger / Driver)
🚘 Ride Lifecycle Management
💰 Earnings Calculation
📊 Dashboard-based UI

📌 Tech Stack
💻 Frontend
React.js
React Router DOM
Context API (AuthContext)
Axios
Custom CSS (Responsive UI)

🛠 Backend
Node.js
Express.js
MongoDB
Mongoose

👤 Role-Based Access
Passengers can:
Request a ride
View ride history

Drivers can:
View available rides
Accept rides
Complete rides
View total earnings

🚘 Ride Lifecycle Management
Passenger creates ride request
Driver accepts ride
Ride status updates to "Ongoing"
Driver completes ride
Earnings automatically calculated

💰 Earnings Calculation
Drivers earn money per completed ride
Total earnings displayed on the dashboard
Dynamic updates after ride completion


cd backend
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

npm start

cd frontend
npm install
npm start

http://localhost:5173
http://localhost:5000

🔒 API Endpoints Overview
Auth Routes
POST /api/auth/register
POST /api/auth/login

Ride Routes
POST /api/rides/create
GET /api/rides
PUT /api/rides/accept/:id
PUT /api/rides/complete/:id

🧠 Learning Outcomes
This project demonstrates:

Full-stack MERN architecture
RESTful API design
Authentication using JWT
Role-based authorization
Context API state management
MongoDB schema design
Real-world application flow

🚀 Future Improvements
Live location tracking (Google Maps API)
Real-time updates using Socket.io
Payment gateway integration
Admin dashboard
Ride fare estimation algorithm

👨‍💻 Author
Vishal
MERN Stack Developer

