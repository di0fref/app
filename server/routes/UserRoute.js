import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    getProjects, removeUserFromProject, addPendingUser,
    getNotifications, resetNotifications, addUserToCard, removeUserFromCard
} from "../controllers/UserController.js";

const router = express.Router();

router.post('/login', login);
router.get('/users/:projectId', getUsers);
router.get('/users/:id', getUserById);

router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/users/projects/:userId', getProjects);
router.post("/users/removeUserFromProject", removeUserFromProject)
router.post("/users/addPendingUser", addPendingUser)
router.get('/users/notifications/get', getNotifications);
router.put("/users/notifications/reset", resetNotifications)
router.post("/users/toCard/add", addUserToCard)
router.post("/users/toCard/delete", removeUserFromCard)

export default router;
