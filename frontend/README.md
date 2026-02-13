AutoService is a full-stack MERN application that simulates a real-world ride booking system where passengers can request rides and drivers can accept, complete rides, and earn money.
The project focuses on authentication, role-based access, ride lifecycle management, and earnings calculation.
📌 Tech Stack
Frontend
React.js
React Router DOM
Context API (AuthContext)
Axios
CSS (Custom UI, responsive design)
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
.............................
👥 User Roles
Passenger
Register & Login
Create ride request
................................
View completed ride history
Driver
Register & Login
View nearby ride requests
Accept & complete rides
View ride history
View total earnings
.....................................
🔐 Authentication & Security
JWT-based authentication
Token stored in frontend context
Role-based authorization (passenger / driver)
Protected routes using middleware
.......................................
🔄 Application Flow (High Level)
User registers/login
JWT token is generated
Passenger creates a ride request
Driver dashboard shows pending rides
Driver accepts the ride
Driver completes the ride
.........................................
Fare is calculated
Driver earnings are updated
Ride is stored in history
..........................................
💰 Fare & Earnings Logic
Fare = Distance (km) × 10
Fare is calculated only when ride is completed
Fare is stored inside Ride document
Driver’s totalEarnings is updated after ride completion
........................................................
🔌 APIs Used (Total: 9)
Authentication
POST /auth/register – Register user
POST /auth/login – Login & generate JWT
Ride Management
POST /rides – Create ride (Passenger)
GET /rides – Get requested rides (Driver)
PUT /rides/accept/:id – Accept ride
PUT /rides/complete/:id – Complete ride & calculate fare
GET /rides/passenger/history – Passenger ride history
GET /rides/driver/history – Driver ride history
Earnings
GET /driver/earnings – Total earnings & completed rides
.............................................................
📊 Driver Dashboard Features
Online status indicator
Real-time ride request display
Ride details (pickup, drop, distance, fare)
Accept & complete ride button
Empty state UI
Modern responsive UI with background gradients
...............................................
🎯 Key Features Implemented
Full ride lifecycle (requested → accepted → completed)
Real earnings calculation
Database-level earnings persistence
Clean UI with empty states
Proper error handling
Modular backend architecture
..........................................
🧠 Interview Talking Points
Role-based access control
JWT authentication
REST API design
State management using Context API
Real-world business logic implementation
MongoDB schema design
Secure backend routes
............................................
🚀 Future Enhancements
Live ride tracking
Driver availability toggle
Cancellation flow
Surge pricing
Admin dashboard
Payment gateway integration
✅ Project Status
✔ Authentication complete
✔ Ride flow complete
✔ Earnings logic implemented
✔ UI upgraded
✔ Database verified
.....................................................
📌 Conclusion
AutoService demonstrates a realistic MERN stack application with proper backend logic, frontend state handling, and business workflows similar to real ride-hailing platforms.