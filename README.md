# MERN CRM Solution

A simple **Customer Relationship Management (CRM) system** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
This project was created as part of an assignment to practice **full-stack development** with authentication, protected APIs, and basic CRUD operations.

---

## 🚀 Features & Functionalities

### 🔐 User Authentication
- Register new users with username, email, and password.
- Login using JWT-based authentication.
- Logout functionality with token clearance.
- Protected API routes accessible only with valid tokens.

### 👥 Customer Management
- **Create**: Add new customers with name, email, phone, and company details.
- **Read**: View a complete list of customers in a user-friendly table.
- **Update**: Edit and update customer information.
- **Delete**: Remove customers permanently from the database.

### 📊 Dashboard
- React-based front-end dashboard to manage customers easily.
- Dynamic updates without page reloads (using React state management).
- Search and filter customers by name or email.
- Responsive design for both desktop and mobile devices.

### 🌐 RESTful API
- Authentication APIs for user registration and login.
- CRUD APIs for managing customers.
- Error handling for invalid inputs and unauthorized requests.



## 🛠️ Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB (Mongoose ODM)  
- **Authentication**: JWT (JSON Web Token)  
- **Other Tools**: Nodemon, dotenv, bcrypt  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/mern-crm-solution.git
cd mern-crm-solution
```

### 2️⃣ Install dependencies
For the **server**:
```bash
cd server
npm install
```

For the **client**:
```bash
cd ../client
npm install
```

### 3️⃣ Environment variables
Create a `.env` file inside the **server** folder:

```
PORT=4001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the development servers
Start backend (server):
```bash
cd server
npm run dev
```

Start frontend (client):
```bash
cd client
npm start
```

Now, the API will be available at **http://localhost:4001** and the React app at **http://localhost:3000**.

---

## 📌 API Endpoints

### Auth
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login & get JWT token  

### Customers (Protected)
- `GET /api/customers` → Get all customers  
- `POST /api/customers` → Add a new customer  
- `PUT /api/customers/:id` → Update customer by ID  
- `DELETE /api/customers/:id` → Delete customer by ID  

---

## 🖼️ Screenshots

> (Optional: add some screenshots of your frontend UI here)

---

## 📚 Learning Outcomes

- Setting up a **MERN project** from scratch  
- Implementing **JWT authentication**  
- Building **protected REST APIs**  
- Connecting **React frontend with Express backend**  
- Hands-on practice with **MongoDB + Mongoose**  
- Designing a simple **CRM system** with CRUD functionalities  

---


---

## 🧭 User Flows

1. **Sign Up / Login**
   - User registers or logs in to obtain a JWT.
   - Frontend stores token (e.g., localStorage) and uses it for subsequent API calls.

2. **Manage Customers**
   - Navigate to Customers page → see paginated list.
   - Search/filter to find a customer.
   - Add / Edit / Delete customers via forms and confirm dialogs.
   - Open a customer to view detailed profile and notes.

---

## 🧪 API Contract (Examples)

### Auth
**POST** `/api/auth/register`  
Body:
```json
{
  "name": "Alex Doe",
  "email": "alex@example.com",
  "password": "StrongPass!23"
}
```
Responses:
- `201 Created` → `{ "message": "User created" }`
- `400 Bad Request` → `{ "message": "All fields are required" }`

**POST** `/api/auth/login`  
Body:
```json
{
  "email": "alex@example.com",
  "password": "StrongPass!23"
}
```
Responses:
- `200 OK` → `{ "token": "<JWT>" }`
- `401 Unauthorized` → `{ "message": "Invalid credentials" }`

### Customers (Protected – send `Authorization: Bearer <token>`)
**GET** `/api/customers?search=alex&page=1&pageSize=10&sort=name`
- `200 OK` → `{ "data": [ ... ], "page": 1, "pageSize": 10, "total": 123 }`

**POST** `/api/customers`  
Body:
```json
{
  "name": "Alex Doe",
  "email": "alex@example.com",
  "phone": "+31 612345678",
  "company": "Acme BV",
  "address": "Keizersgracht 123, Amsterdam",
  "tags": ["lead", "priority"],
  "notes": "Met at Web Summit."
}
```
- `201 Created` → `{ "_id": "...", "name": "...", ... }`
- `400 Bad Request` → `{ "message": "Email already exists" }`

**PUT** `/api/customers/:id` → update fields  
**DELETE** `/api/customers/:id` → soft/hard delete depending on implementation

---

## 🖥️ Frontend Pages

- **/login** – login form
- **/register** – registration form (optional if seeded user)
- **/** – Dashboard (KPIs & recent activity)
- **/customers** – list with search/filter/pagination
- **/customers/new** – create form
- **/customers/:id** – customer details & notes
- **/customers/:id/edit** – edit form

---

## 🔧 Configuration & Scripts

**Server**
- `npm run dev` – start with nodemon
- `npm start` – start production
- `.env`:
  ```
  PORT=4001
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  ```

**Client**
- `npm start` – run React dev server
- `npm run build` – production build

---

## 📦 Project Structure (suggested)


```
└── mern-crm-solution
    ├── client
    │   ├── src
    │   │   ├── components
    │   │   ├── api.js
    │   │   ├── App.jsx
    │   │   └── main.jsx
    │   ├── index.html
    │   ├── package.json
    │   └── vite.config.js
    ├── server
    │   ├── config
    │   │   └── README.txt
    │   ├── middleware
    │   │   └── auth.js
    │   ├── models
    │   │   ├── Customer.js
    │   │   └── User.js
    │   ├── routes
    │   │   ├── auth.js
    │   │   └── customers.js
    │   ├── .env.example
    │   ├── package.json
    │   └── server.js
    └── README.md
```

- **Client root**: `mern-crm-solution/client`
- **Server root**: `mern-crm-solution/server`
- **Server entry**: `mern-crm-solution/server/server.js`

---

