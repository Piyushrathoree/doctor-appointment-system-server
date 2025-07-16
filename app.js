import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());

const corsOptions = {
    origin: "*", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
};

app.use(cors(corsOptions));

import appointmentRoutes from "./routes/appointment.routes.js";
import userRoutes from "./routes/user.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";
app.use("/api/users", userRoutes);
app.use("/api/appointments", authMiddleware, appointmentRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Hospital Management System API");
});
export default app;
