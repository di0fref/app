import express from "express";
import {addLabel} from "../controllers/LabelController.js";

const router = express.Router();

router.post('/labels', addLabel);

export default router;
