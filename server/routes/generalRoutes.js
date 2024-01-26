import express from "express";
import {getUser, createUser, getDashboardStats} from '../controllers/general.js'

const router = express.Router();

router.get("/user/:id", getUser);
router.post("/register", createUser);
router.get("/dashboard", getDashboardStats)

export default router;