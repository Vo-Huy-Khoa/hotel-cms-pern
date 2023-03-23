import { Router } from "express";
import { UserUp } from "../database/migrations";

const router = Router();

router.get("/user", UserUp);

export default router;
