import express from "express";
const router = express.Router();
import authController from "../../controllers/auth.controller.js";
//Route
router.post('/signup', authController.signup);



export default router;