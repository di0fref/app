import express from "express";
import {addCheckItem, updateCheckItem} from "../controllers/ChecklistController.js";


const router = express.Router();

router.put('/checkitems', updateCheckItem);
router.post('/checkitems', addCheckItem);


export default router;
