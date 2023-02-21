import express from "express";
import {
    getProjects,
    getProjectsById,
    updateProject,
    updateColumn,
    addColumn,
    addField, getFilteredProjectById, createProject
} from "../controllers/ProjectController.js";
const router = express.Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectsById);
router.put('/projects/:id', updateProject);
router.put('/projects/column/:id', updateColumn);
router.post('/projects/column/add', addColumn);
router.post('/projects/field/add', addField);
router.post('/projects/filtered/:id', getFilteredProjectById);
router.post('/projects/', createProject);





// router.post('/users', createUser);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;
