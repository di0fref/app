import express from "express";
import {
    createCard,
    getCards, updateCard, reorderCards,
    addLabel, removeLabel, getCardsByIds, updateField, archiveCards, getCard, deleteCard, addComment,
    deleteComment
} from "../controllers/CardController.js";

const router = express.Router();

router.get('/cards', getCards);
router.get('/cards/:id', getCard);

// router.get('/users/:id', getUserById);
router.post('/cards', createCard);
router.put('/cards', updateCard);
router.post('/cards/reorder', reorderCards);
router.post('/cards/addlabel', addLabel);
router.post('/cards/removelabel', removeLabel);
router.post('/cards/get', getCardsByIds);
router.put('/cards/field/update', updateField);
router.post('/cards/archive', archiveCards);
router.delete("/cards/:id", deleteCard)
router.post('/cards/comment/add', addComment);
router.post('/cards/comment/delete', deleteComment);


// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;
