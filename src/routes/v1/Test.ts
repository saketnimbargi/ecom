import { Router } from "express";
import {getTestData, createTestUser, getTestUserById, deleteUserById} from "../../api/controller";

const router = Router();

router.get("/sanity", getTestData);

router.post("/", createTestUser);

router.get("/:id", getTestUserById);

router.delete("/:id", deleteUserById);

export default router;
