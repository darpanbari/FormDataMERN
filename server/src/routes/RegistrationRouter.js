import express from "express";
import { registerController, getDataController } from "../controllers/RegistrationController.js";

const router = express.Router();

router.post("/register", registerController);

router.get("/get-data", getDataController);

export default router;