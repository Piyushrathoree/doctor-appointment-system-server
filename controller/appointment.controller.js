import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";

const createAppointment = async (req, res) => {
    const { patientId, doctorId, date, time, symptoms, patientName } = req.body;
    if (
        !patientId ||
        !doctorId ||
        !date ||
        !time ||
        !symptoms ||
        !patientName
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (new Date(date) < new Date()) {
        return res.status(400).json({ message: "Date cannot be in the past" });
    }
    try {
        // Prevent duplicate appointment for same patient, doctor, date, and time
        const existing = await Appointment.findOne({
            patientId,
            doctorId,
            date: new Date(date),
            time,
        });
        if (existing) {
            return res
                .status(409)
                .json({ message: "Appointment already exists for this slot." });
        }
        // Fetch patient email
        const patient = await User.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        const appointment = new Appointment({
            patientId,
            patientEmail: patient.email,
            patientName,
            doctorId,
            date,
            time,
            symptoms,
        });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAppointmentById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Appointment ID is required" });
    }
    try {
        const appointment = await Appointment.findById(id)
            .populate("patientId", "email")
            .populate("doctorId", "email");
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAppointments = async (req, res) => {
    if (!req.user || req.user.role !== "doctor") {
        return res
            .status(403)
            .json({ message: "Only doctors can view appointments" });
    }
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const { userId, role } = req.user;
    if (!id) {
        return res.status(400).json({ message: "Appointment ID is required" });
    }
    if (role !== "doctor") {
        return res
            .status(403)
            .json({ message: "Only doctors can update appointment status" });
    }
    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        if (appointment.doctorId.toString() !== userId) {
            return res.status(403).json({
                message:
                    "Unauthorized: You can only update your own appointments",
            });
        }
        appointment.status = status || appointment.status;
        await appointment.save();
        res.status(200).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const cancelAppointment = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Appointment ID is required" });
    }
    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        appointment.status = "cancelled";
        await appointment.save();
        res.status(200).json({
            message: "Appointment canceled successfully",
            appointment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export {
    createAppointment,
    getAppointmentById,
    getAppointments,
    updateAppointment,
    cancelAppointment,
};
