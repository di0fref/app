import express from "express";
import {
    createCard,
    getCards, updateCard, reorderCards
} from "../controllers/CardController.js";

const router = express.Router();

router.get('/cards', getCards);
// router.get('/users/:id', getUserById);
router.post('/cards', createCard);
router.put('/cards', updateCard);
router.post('/cards/reorder', reorderCards);

// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;
