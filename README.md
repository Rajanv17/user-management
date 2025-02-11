# User Management Backend

## Overview

This project is a Node.js backend application designed for user management. It provides APIs for user registration, login, listing, searching, and filtering users, as well as retrieving user details. The application supports role-based access control with `Admin` and `Staff` roles.

## Features

### 1. **Login API**

- Allows users to log in.
- **Fields:** Email and Password.

### 2. **Registration API**

- Allows users to register with validations.
- **Fields:**
  - Name
  - Email
  - Password
  - Role (Admin/Staff)
  - Phone
  - City
  - Country

### 3. **List Users API**

- Lists all registered users.
- **Authentication:** Only authorized users (Admin) can access this API using JWT tokens.
- **Search Users:** Allows searching users by name and email.
- **Filter Users:** Allows filtering users by country.

### 4. **User Details API**

- Retrieves the details of a user by userId.
- **Access Control:**
  - `Admin` can see any user's details.
  - `Staff` can only see their own registration details.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for handling HTTP requests.
- **TypeORM**: ORM for database interactions and validations.
- **PostgreSQL**: Database.
- **JWT (JSON Web Tokens)**: Secure user authentication.

## Project Structure

```
├── config
│   └── database.ts
├── controllers
├── entities
├── interfaces
├── middlewares
├── routes
├── services
├── utils
│   └── ApiError.ts
├── app.ts
├── package.json
└── tsconfig.json
```

## Setup Instructions

### Prerequisites

- Node.js (>= 14.x)
- PostgreSQL (Ensure it is installed and running)
- npm (Node package manager)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd user-management-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=user_management
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Step 4: Setup Database

Ensure PostgreSQL is running and create a database named `user_management`.

### Step 5: Run the Application

```bash
npm run start
```

The server will run at `http://localhost:5000`

## API Endpoints

### **Authentication Routes**

- `POST /api/v1/user/login`: Login a user.
  - Body: `{ "email": "user@example.com", "password": "password123" }`
- `POST /api/v1/user/register`: Register a user.
  - Body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123", "role": "Admin", "phone": "1234567890", "city": "New York", "country": "USA" }`

### **User Routes**

- `GET /api/v1/user/users`: List all users (Admin only, supports search and filter).
  - Query Parameters: `search`, `country`
- `GET /api/v1/user/:id`: Retrieve user details by ID (Admin can access any user; Staff can only access their own data).

## Error Handling

- Centralized error handling using a custom `ApiError` class.
- Meaningful error messages with proper HTTP status codes.

## Code Quality

- Clean and maintainable code following MVC architecture.
- Separation of concerns for better scalability.

## Conclusion

This project demonstrates a well-structured Node.js backend application with secure user management, robust authentication, and efficient data handling using TypeORM. Contributions and improvements are welcome!
