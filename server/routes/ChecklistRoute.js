import express from "express";
import {addCheckItem, addChecklist, deleteChecklist, deleteChecklistItem, updateCheckItem} from "../controllers/ChecklistController.js";


const router = express.Router();

router.put('/checkitems', updateCheckItem);
router.post('/checkitems', addCheckItem);
router.post("/checklist", addChecklist)
router.delete("/checklist/:id", deleteChecklist)
router.delete("/checkitems/:id", deleteChecklistItem)

export default router;
