import { Router } from "express";
import { UserDown } from "../database/migrations";

const router = Router();

router.get("/user", UserDown);

export default router;
