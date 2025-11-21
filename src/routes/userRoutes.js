import express from 'express';
const router = express.Router();

import { getUsers, createUser, deleteUser, updateUser, updateUserRole } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

// Protege todas as rotas de usuário
router.use(authMiddleware);

router.get("/user", getUsers);
router.post("/user", createUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", updateUser);
router.patch("/user/:id/role", updateUserRole);

export default router;