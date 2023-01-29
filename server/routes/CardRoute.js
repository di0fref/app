import express from "express";
import {
    createCard,
    getCards,
} from "../controllers/CardController.js";

const router = express.Router();

router.get('/cards', getCards);
// router.get('/users/:id', getUserById);
router.post('/cards', createCard);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;
