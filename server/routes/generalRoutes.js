import express from "express";
import {getUser, createUser} from '../controllers/general.js'

const router = express.Router();

router.get("/user/:id", getUser);
router.post("/register", createUser);

export default router;