# 💵 Cash Register Angular App

A modular full-stack application for managing sales, inventory, and basic point-of-sale operations.
Built with **Angular**, **Node.js (Express)**, and **MongoDB**, this project demonstrates a clean, containerized architecture where the frontend and backend communicate through a RESTful API.

---

## 🧱 Overview

This project serves as a simple yet complete example of a CRUD-based web app.
It provides a user interface for managing items and transactions, backed by a secure API and persistent database storage.

You can use it as:
- A base for POS (point-of-sale) or inventory tools
- A teaching or demo app for Angular–Express integration
- A playground for Dockerized deployment and environment configuration

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Angular 18, TypeScript, RxJS |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB |
| Environment | Docker, Docker Compose |
| Utilities | dotenv, body-parser, CORS, nodemon |

---

## 🚀 Getting Started

### Prerequisites

Install or have access to:
- **Node.js** (≥ 18.x)
- **npm**
- **MongoDB** (local or cloud)
- **Docker + Docker Compose** (for containerized setup)

### Installation

Clone the repository:

```bash
git clone https://github.com/ncasteln/cash-register-angular-app.git
cd cash-register-angular-app
```

Install dependencies for both services:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### Environment Configuration
Create a `.env` file inside `backend/`:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/cash-register
```

### Running the Application

## Dev mode

Run backend and frontend separately:
```bash
# Backend (Express API)
cd backend
npm run dev

# Frontend (Angular app)
cd ../frontend
npm start
```

Access the app at:

- Frontend → http://localhost:4200
- Backend → http://localhost:3000

## Production Mode (Dockerized)

To build and run everything with Docker Compose:

```bash
docker-compose up --build
```

Both containers will start and communicate internally.

### License
Licensed under the MIT License.
See the [LICENSE](/LICENSE) for more information.
