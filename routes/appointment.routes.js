import Router from "express";
import {
    cancelAppointment,
    createAppointment,
    getAppointmentById,
    getAppointments,
    updateAppointment,
} from "../controller/appointment.controller.js";
const router = Router();

router.post("/create", createAppointment);
router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", cancelAppointment);

export default router;
