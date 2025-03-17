import { Router } from "express";
const router = Router();

import Test from './Test';

router.use("/test", Test);

export default router;