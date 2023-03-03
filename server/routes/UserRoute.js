import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    getProjects, removeUserFromProject, addPendingUser
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

export default router;
