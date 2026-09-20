# 💬 Dropmsg

Dropmsg is a members-only messaging application built with Node.js, Express, EJS, and PostgreSQL. Users can create accounts, log in securely, post messages, and unlock additional features by joining the club. The project focuses on authentication, authorization, server-side rendering, and working with a relational database.

---

## 🎯 Project Goal

This project was built as part of The Odin Project curriculum to practice building a web app with authentication, authorization, database integration, and server-side rendering.

Dropmsg is an expanded version of an earlier Message Board project I built as part of the TOP.
[Mini Message Board](https://github.com/pawelgawron3/odin-mini-message-board)

---

## 🚀 Features

- User registration and login
- Secure password hashing with bcrypt
- Session-based authentication with Passport.js
- Create and view messages
- Display message authors and creation dates for club members
- Secret passcode to join the club
- Secret passcode to become an admin
- Admin-only message deletion
- Authorization middleware
- PostgreSQL database integration
- Clean and responsive UI

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- Passport.js (Local Strategy)
- PostgreSQL

### Frontend

- HTML
- EJS
- CSS
- JavaScript
- Material Design Icons (MDI)

### Other

- bcryptjs — password hashing
- express-validator — form validation
- express-session - sessions
- dotenv — environment variables
- connect-pg-simple - session store
- pg - connection with psql

---

## 🔐 Authentication & Authorization

Dropmsg uses Passport.js with a Local Strategy for user authentication.

- Passwords are hashed before being stored in the database.
- Passport manages authentication through sessions.
- Authenticated users are available through req.user.
- Protected routes use custom authentication and authorization middleware.
- Admin-only actions are protected on the server side.

---

## 👤 User Roles

- Guest - can access public content
- Authenticated user - can create messages
- Club member - can see message author and creation date
- Admin - can delete messages

---

## 🗄️ Database

The application uses PostgreSQL to store:

- Users
- Messages
- Sessions

Messages are connected to their authors through a relationship between the `messages` and `users` tables.

---

## 🎮 Live Demo

Due to Render's Free Tier limitation of having only one active PostgreSQL database, I decided not to deploy this project at the moment.

To see the project in action, please clone the repository to your local machine, install the required dependencies, configure the necessary environment variables, and run the application locally.
