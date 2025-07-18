# Doctor Appointment System - Server

This is the backend server for the Doctor Appointment System, a web application that facilitates booking and managing medical appointments between doctors and patients.

## Features

-   User authentication and authorization
-   Appointment scheduling and management
-   User management (patients and doctors)
-   RESTful API endpoints
-   MongoDB database integration

## Project Structure

```
server/
├── app.js              # Express app configuration
├── index.js            # Server entry point
├── controller/         # Route controllers
│   ├── appointment.controller.js
│   └── auth.controller.js
├── db/                 # Database configuration
│   └── db.js
├── middleware/         # Custom middleware
│   └── auth.middleware.js
├── models/            # MongoDB models
│   ├── appointment.model.js
│   └── user.model.js
└── routes/            # API routes
    ├── appointment.routes.js
    └── user.routes.js
```

## Prerequisites

-   Node.js (v14 or higher)
-   MongoDB
-   npm or yarn package manager

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd hospital-management-system/server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following variables:
    ```
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

## Running the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## API Endpoints

### Authentication

-   `POST /api/auth/register` - Register a new user
-   `POST /api/auth/login` - Login user

### Appointments

-   `GET /api/appointments` - Get all appointments
-   `POST /api/appointments` - Create new appointment
-   `GET /api/appointments/:id` - Get specific appointment
-   `PUT /api/appointments/:id` - Update appointment
-   `DELETE /api/appointments/:id` - Delete appointment

### Users

-   `GET /api/users` - Get all users
-   `GET /api/users/:id` - Get specific user
-   `PUT /api/users/:id` - Update user
-   `DELETE /api/users/:id` - Delete user

## Security

-   JWT authentication
-   Password hashing
-   Protected routes
-   Input validation

## Error Handling

The API uses consistent error handling and returns appropriate HTTP status codes:

-   200: Success
-   201: Created
-   400: Bad Request
-   401: Unauthorized
-   403: Forbidden
-   404: Not Found
-   500: Server Error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


