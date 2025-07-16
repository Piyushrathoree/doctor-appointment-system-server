import Router from "express";
import {
    loginUser,
    registerUser,
    getAllUsers,
} from "../controller/auth.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);

export default router;
