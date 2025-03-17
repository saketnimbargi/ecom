import { Router } from "express";
import {getTestData} from "../../api/controller";

const router = Router();

router.get("/", getTestData) ;

export default router;
